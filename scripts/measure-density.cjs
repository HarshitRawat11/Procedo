// Gate 1b — visual weight. Run: node scripts/measure-density.cjs <file.svg>
//
// measure-svg.cjs reads the source and counts elements. It cannot see how HEAVY
// a drawing looks, which turned out to be the thing that matters. This renders
// the SVG on the page's own cream and counts pixels.
//
// Why it exists: on 2026-09-13 Harshit compared the 404 illustration with the
// newer ones and said the 404's elements are "subtle, not as large and bold".
// He was right, and the difference is not stroke weight — it is how much of the
// frame is left alone:
//
//     404 / QuietScene    cream 80.9%   dark 3.4%    <- the one he likes
//     Contact / Reception cream 41.3%   dark 6.6%
//     Hero / RackScene    cream  0.2%   dark 30.0%
//
// QuietScene is four fifths empty. RackScene has no cream in it at all. The
// floors below are set from QuietScene with margin, per the rule in
// reference/illustration-loop.md that any threshold failing QuietScene is
// mis-calibrated rather than strict.
//
// NOTE: run it on a plain .svg or on markup extracted from dist/. An .astro
// component whose fills are expressions will not render.
const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const FLOOR_CREAM = 0.6; // share of the frame left as bare ground
const CEIL_DARK = 0.05; // share of the frame that is mid-to-dark
const CREAM = { r: 251, g: 250, b: 248 }; // #FBFAF8, the page ground
const TOL = 7;

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/measure-density.cjs <file.svg>');
  process.exit(2);
}

(async () => {
  const { data, info } = await sharp(Buffer.from(fs.readFileSync(file)))
    .resize({ height: 400 })
    .flatten({ background: '#FBFAF8' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cream = 0;
  let dark = 0;
  const total = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.abs(r - CREAM.r) < TOL && Math.abs(g - CREAM.g) < TOL && Math.abs(b - CREAM.b) < TOL) {
      cream++;
    }
    if ((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255 <= 0.45) dark++;
  }

  const creamShare = cream / total;
  const darkShare = dark / total;
  const pct = (x) => `${(x * 100).toFixed(1)}%`;
  const mark = (ok) => (ok ? 'PASS' : 'FAIL');

  const results = [
    [`bare cream     ${pct(creamShare)}`, `floor ${pct(FLOOR_CREAM)}`, creamShare >= FLOOR_CREAM],
    [`dark pixels    ${pct(darkShare)}`, `ceiling ${pct(CEIL_DARK)}`, darkShare <= CEIL_DARK],
  ];

  console.log(`\n${file}\n${'='.repeat(file.length)}`);
  console.log(`rendered at ${info.width}x${info.height} on ${'#FBFAF8'}\n`);
  for (const [label, bound, ok] of results) {
    console.log(`  ${mark(ok)}  ${label.padEnd(24)} ${bound}`);
  }

  const failed = results.filter(([, , ok]) => !ok).length;
  console.log(
    `\n${failed === 0 ? 'Both weight gates pass.' : `${failed} weight gate(s) failed.`}\n` +
      'Cream below the floor means the drawing fills its frame instead of sitting\n' +
      'in it. Dark above the ceiling means a slab — a faceplate, a counter, a wall\n' +
      'of equipment — is carrying weight that outlines should carry.\n',
  );
  process.exit(failed === 0 ? 0 : 1);
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(2);
});
