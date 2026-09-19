// Pixel-diff the built site against a saved set of screenshots, to prove a
// change was cosmetically inert.
//
//   node scripts/diff-screens.cjs            compare live vs review/*-1280-fold.png
//   node scripts/diff-screens.cjs --control  shoot the SAME build twice and diff
//
// Needs the header-free server: node scripts/serve-dist.cjs --no-headers
//
// ── WHY --control EXISTS, AND WHY YOU MUST RUN IT BEFORE BELIEVING A DIFF ────
// A refactor that should change nothing — renaming colour utilities to tokens
// whose values are identical, say — can be verified by diffing screenshots. But
// the first such run here reported 6 of 10 pages differing by 0.01–0.22%, which
// looks exactly like a botched rename.
//
// It was not. Those six are precisely the six pages carrying an animated
// illustration, and --control proved it: shooting the same build twice, with no
// code change at all, reproduces the same differences on the same pages. The
// scene loops run 2.4–26 s and --virtual-time-budget lands the shutter at an
// arbitrary phase.
//
// So: pages WITHOUT a scene are pixel-deterministic and a difference there is
// real. Pages WITH one are not, and a difference there means nothing until
// --control says otherwise.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:4400';
const REVIEW = path.join(__dirname, '..', 'review');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'procedo-diff-'));
const CONTROL = process.argv.includes('--control');

const ROUTES = [
  ['home', '/'], ['company', '/company'], ['services', '/services'],
  ['our-mission', '/our-mission'], ['careers', '/careers'], ['contact', '/contact'],
  ['privacy', '/privacy'], ['terms', '/terms'], ['cookies', '/cookies'], ['404', '/404'],
];
// Pages carrying an animated illustration; see the header above.
const SCENE = new Set(['company', 'services', 'our-mission', 'careers', 'contact', '404']);

const shoot = (route, out) =>
  execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
     '--run-all-compositor-stages-before-draw', '--user-data-dir=' + path.join(TMP, 'profile'),
     '--window-size=1280,800', '--virtual-time-budget=4000', '--screenshot=' + out, BASE + route],
    { stdio: 'pipe', timeout: 120000 },
  );

const countDiff = async (a, b) => {
  const ra = await sharp(a).raw().toBuffer({ resolveWithObject: true });
  const rb = await sharp(b).raw().toBuffer({ resolveWithObject: true });
  if (ra.info.width !== rb.info.width || ra.info.height !== rb.info.height) return null;
  let diff = 0;
  for (let i = 0; i < ra.data.length; i += ra.info.channels) {
    if (ra.data[i] !== rb.data[i] || ra.data[i + 1] !== rb.data[i + 1] || ra.data[i + 2] !== rb.data[i + 2]) diff++;
  }
  return { diff, px: ra.info.width * ra.info.height };
};

(async () => {
  const rows = [];
  for (const [name, route] of ROUTES) {
    const fresh = path.join(TMP, name + '-b.png');
    shoot(route, fresh);

    let baseline;
    if (CONTROL) {
      baseline = path.join(TMP, name + '-a.png');
      shoot(route, baseline);
    } else {
      baseline = path.join(REVIEW, name + '-1280-fold.png');
      if (!fs.existsSync(baseline)) {
        console.error('Missing baseline ' + baseline + '. Run scripts/shoot-screens.cjs first.');
        process.exit(1);
      }
    }

    const r = await countDiff(baseline, fresh);
    rows.push(
      r === null
        ? { name, diff: 'SIZE MISMATCH', pct: 100, scene: SCENE.has(name) }
        : { name, diff: r.diff, pct: Math.round((r.diff / r.px) * 10000) / 100, scene: SCENE.has(name) },
    );
  }

  console.log('\n' + (CONTROL ? 'CONTROL — same build shot twice' : 'DIFF — review/ baseline vs live') + ', 1280\n');
  console.log('page'.padEnd(16) + 'scene?'.padEnd(9) + 'differing px'.padStart(13) + '   %');
  console.log('-'.repeat(48));
  for (const r of rows) {
    console.log(r.name.padEnd(16) + (r.scene ? 'yes' : 'no').padEnd(9) + String(r.diff).padStart(13) + '   ' + r.pct + '%');
  }

  const staticDiff = rows.filter((r) => !r.scene && r.diff !== 0);
  const sceneDiff = rows.filter((r) => r.scene && r.diff !== 0);
  console.log('\npages WITHOUT a scene that differ: ' + staticDiff.length + ' of 4' + (staticDiff.length ? '  <-- REAL, investigate' : ''));
  console.log('pages WITH a scene that differ:    ' + sceneDiff.length + ' of 6' + (sceneDiff.length ? '  (meaningless without --control)' : ''));
  console.log(
    staticDiff.length === 0
      ? '\nNo deterministic page changed. A change under test is cosmetically inert.'
      : '\nA page with no animation changed. That is a real visual difference.',
  );

  fs.rmSync(TMP, { recursive: true, force: true });
  process.exitCode = staticDiff.length ? 1 : 0;
})();
