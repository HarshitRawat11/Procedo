// Screenshot every route at 375 / 768 / 1280 into review/.
// Run: node scripts/serve-dist.cjs --no-headers &  then  node scripts/shoot-screens.cjs
//
// Writes <page>-<width>-fold.png (first viewport) and <page>-<width>-full.png
// (whole page) for all ten routes. review/ is gitignored — these are
// regenerable output, like dist/.
//
// `--folds-only` skips the full-page half. measure-hierarchy.cjs reads nothing
// else, and the full-page shots are the slow part — a 375x17000 canvas takes
// longer than every fold on the page put together. Use it when iterating on a
// change and judging it by Gate 3.
//
// ── THREE TRAPS, ALL OF WHICH PRODUCED CONVINCING WRONG PICTURES ────────────
//
// 1. WINDOWS CLAMPS THE MINIMUM WINDOW WIDTH (~500px), AND HEADLESS HONOURS IT.
//    `--window-size=375,812` yields a file that IS 375x812 but whose page laid
//    out at the clamped width and was then cropped. The result shows text cut
//    off mid-word and no hamburger button — indistinguishable from a real
//    mobile overflow bug, and it wasted real time being investigated as one.
//    Measured in-browser at a true 375px viewport, every route reports
//    scrollWidth - clientWidth = 0.
//
//    So any width below MIN_WINDOW is shot inside an IFRAME pinned to that
//    width, in a window comfortably above the clamp, then cropped back to the
//    iframe's rectangle. An iframe's layout viewport is its own width, so media
//    queries resolve correctly however wide the host window is. The harness is
//    a file:// page (not subject to the site's X-Frame-Options) pointing at the
//    --no-headers server (not subject to its CSP). Neither affects layout.
//
// 2. WEBFONTS ARE NOT ALWAYS LOADED WHEN THE SHUTTER FIRES, AND A FALLBACK
//    FONT BREAKS LINES DIFFERENTLY. On 2026-09-20 a capture of the closing CTA
//    at 375 showed "Ready to Future-" / "Proof Your Business?" — a hyphenated
//    compound split across lines, which looks exactly like a real typographic
//    defect and was nearly "fixed" as one. In a real browser at a real 375px
//    viewport with Inter loaded, it breaks at the space:
//    "Ready to Future-Proof" / "Your Business?". The screenshot had rendered in
//    a wider fallback face.
//
//    So: DO NOT READ LINE BREAKS, MEASURE OR ORPHANS OFF THESE SCREENSHOTS.
//    Use a live probe against a real viewport for anything typographic — see
//    the Gate 7 method in QUALITY-GATES.md. These images are for judging mass,
//    layout and colour, where a font substitution changes little.
//
// 3. SCROLL REVEALS HOLD CONTENT AT opacity:0 UNTIL IT ENTERS THE VIEWPORT.
//    A naive full-page capture therefore returns a page of blank cream. The fix
//    is a viewport as tall as the document, so every IntersectionObserver fires
//    at once, plus virtual time for the transitions to finish before the
//    shutter. That makes the tallest page expensive, so the per-shot timeout is
//    generous and any route that still exceeds it is REPORTED — a missing
//    screenshot must not be mistaken for a page that had nothing on it.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const CHROME =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE_URL || 'http://localhost:4400';
const OUT = path.join(__dirname, '..', 'review');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'procedo-shots-'));
const PROFILE = path.join(TMP, 'profile');

const ROUTES = [
  ['home', '/'], ['company', '/company'], ['services', '/services'],
  ['our-mission', '/our-mission'], ['careers', '/careers'], ['contact', '/contact'],
  ['privacy', '/privacy'], ['terms', '/terms'], ['cookies', '/cookies'], ['404', '/404'],
];

const WIDTHS = [375, 768, 1280];
const FOLD_H = { 375: 812, 768: 1024, 1280: 800 };
const FULL_H = { 375: 17000, 768: 13000, 1280: 12000 };

const MIN_WINDOW = 520; // below this, Windows clamps and the shot is a crop
const HOST_W = 900;

fs.mkdirSync(OUT, { recursive: true });

const chrome = (args) => execFileSync(CHROME, args, { stdio: 'pipe', timeout: 240000 });

const flags = (w, h, budget, out) => [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  // Freeze motion. Six of the ten pages carry scene loops of 2.4-26s, and
  // --virtual-time-budget lands the shutter at an arbitrary phase, so repeat
  // runs of the SAME build differ. That made measure-hierarchy.cjs swing 15-17
  // on identical input and briefly look like a regression caused by a code
  // change. Every animation on this site sits inside
  // @media (prefers-reduced-motion: no-preference), so forcing 'reduce' stops
  // them dead AND resolves the scroll reveals instantly - deterministic
  // captures, fully revealed content, no mid-fade frames.
  '--force-prefers-reduced-motion',
  '--force-device-scale-factor=1', '--run-all-compositor-stages-before-draw',
  '--allow-file-access-from-files', '--user-data-dir=' + PROFILE,
  '--window-size=' + w + ',' + h,
  '--virtual-time-budget=' + budget,
  '--screenshot=' + out,
];

const shootDirect = (url, out, w, h, budget) => chrome([...flags(w, h, budget, out), url]);

const shootFramed = async (url, out, w, h, budget) => {
  const harness = path.join(TMP, 'harness.html');
  fs.writeFileSync(
    harness,
    '<!doctype html><meta charset="utf-8">' +
      '<style>html,body{margin:0;padding:0;background:#fff}' +
      'iframe{border:0;display:block;position:absolute;left:0;top:0}</style>' +
      '<iframe src="' + url + '" width="' + w + '" height="' + h + '" scrolling="no"></iframe>',
  );
  const raw = path.join(TMP, 'raw.png');
  chrome([...flags(HOST_W, h + 20, budget, raw), 'file:///' + harness.replace(/\\/g, '/')]);
  const meta = await sharp(raw).metadata();
  await sharp(raw)
    .extract({ left: 0, top: 0, width: w, height: Math.min(h, meta.height) })
    .toFile(out + '.tmp');
  fs.renameSync(out + '.tmp', out);
};

(async () => {
  const failures = [];
  for (const [name, route] of ROUTES) {
    for (const w of WIDTHS) {
      const line = [(name + ' @' + w).padEnd(20)];
      const KINDS = process.argv.includes('--folds-only') ? ['fold'] : ['fold', 'full'];
      for (const kind of KINDS) {
        const out = path.join(OUT, name + '-' + w + '-' + kind + '.png');
        const h = kind === 'fold' ? FOLD_H[w] : FULL_H[w];
        const budget = kind === 'fold' ? 4500 : 8000;
        try {
          if (w < MIN_WINDOW) await shootFramed(BASE + route, out, w, h, budget);
          else shootDirect(BASE + route, out, w, h, budget);
          line.push(kind + ' ' + String(Math.round(fs.statSync(out).size / 1024)).padStart(5) + 'K');
        } catch (e) {
          failures.push(name + ' @' + w + ' ' + kind + ': ' + (e.signal || e.code || e.message));
          try { fs.unlinkSync(out); } catch {}
          line.push(kind + '  FAILED');
        }
      }
      console.log(line.join('   '));
    }
  }
  console.log('\n' + fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).length + ' screenshots in review/');
  if (failures.length) {
    console.log('\nNOT CAPTURED — do not read these as empty pages:');
    for (const f of failures) console.log('  - ' + f);
    process.exitCode = 1;
  }
  fs.rmSync(TMP, { recursive: true, force: true });
})();
