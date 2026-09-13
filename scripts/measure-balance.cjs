/* Where does the ink actually sit inside the frame?
 *
 * Balance is not something either gate measures, and eyeballing it is how the
 * contact scene ended up with "too much space below cat and too little above".
 * So: render on cream, find the bounding box of every pixel that is not cream,
 * convert back to viewBox units, and report the viewBox x/y that would centre
 * it. Then the framing is a measurement, not a guess.
 *
 *     node scripts/measure-balance.cjs <file.svg>
 */
const fs = require('fs');
const sharp = require('sharp');

const file = process.argv[2];
if (!file) throw new Error('usage: node scripts/measure-balance.cjs <file.svg>');
const svg = fs.readFileSync(file, 'utf8');
const vb = svg.match(/viewBox="([^"]+)"/)[1].trim().split(/\s+/).map(Number);
const [vx, vy, vw, vh] = vb;

const W = 1400;
const H = Math.round((W * vh) / vw);

(async () => {
  const { data, info } = await sharp(Buffer.from(svg), { density: 400 })
    .resize(W, H, { fit: 'contain', background: '#FBFAF8' })
    .flatten({ background: '#FBFAF8' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  let minX = info.width,
    maxX = -1,
    minY = info.height,
    maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * ch;
      /* anything that is not within a whisker of the cream ground */
      if (Math.abs(data[i] - 0xfb) > 6 || Math.abs(data[i + 1] - 0xfa) > 6 || Math.abs(data[i + 2] - 0xf8) > 6) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('no ink found');

  const sx = vw / info.width;
  const sy = vh / info.height;
  const l = vx + minX * sx;
  const r = vx + (maxX + 1) * sx;
  const t = vy + minY * sy;
  const b = vy + (maxY + 1) * sy;

  const cx = (l + r) / 2;
  const cy = (t + b) / 2;

  const p = (n) => n.toFixed(1);
  console.log(file.split(/[\\/]/).pop());
  console.log('  viewBox        ', vb.join(' '));
  console.log('  ink x          ', p(l), '->', p(r), '  width', p(r - l));
  console.log('  ink y          ', p(t), '->', p(b), '  height', p(b - t));
  console.log('  ink centre     ', p(cx), ',', p(cy));
  console.log('  frame centre   ', p(vx + vw / 2), ',', p(vy + vh / 2));
  console.log('  off by         ', p(cx - (vx + vw / 2)), ',', p(cy - (vy + vh / 2)));
  console.log('  -> centred viewBox:', p(cx - vw / 2), p(cy - vh / 2), vw, vh);
})();
