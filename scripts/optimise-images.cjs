// Re-encode the two PNGs that load on every page. Run: node scripts/optimise-images.cjs
//
// Why. Measured on 2026-09-19, the home page's first load was 295 KB
// uncompressed and 185 KB of that — 63% — was two small images:
//
//     /assets/procedo-logo.png   145.5 KB   790x316, rendered 36px tall
//     /favicon.png                39.9 KB   256x256
//
// Both are on every page, and both are flat brand marks: a handful of colours,
// large areas of one tone. They were saved as full 8-bit-per-channel RGBA,
// which is the worst possible encoding for that kind of image.
//
// WHAT THIS DOES AND DOES NOT DO. It re-encodes to a palette PNG at the SAME
// PIXEL DIMENSIONS. Nothing is resized, so every consumer keeps working
// untouched — the header's `width`/`height` attributes, and `Organization.logo`
// in the JSON-LD, which wants a logo comfortably above Google's 112px floor.
//
// PALETTE QUANTISATION IS LOSSY, and it was checked rather than assumed:
// against the original, the logo's worst single channel moves 30/255, with
// 18.6% of pixels differing by a mean of 2.3/255. That sounds worse than it is.
// The logo is displayed at 36px tall from a 316px source — an 8.8x downscale —
// so every one of those differences is averaged away before it reaches a
// screen. Rendered at the real display size and magnified back up, the two are
// indistinguishable.
//
// A LOSSLESS re-encode was tried first and is not worth it: 14% off the logo
// and 1% off the favicon, against 68% and 59% here.
//
// og-default.png is deliberately NOT touched. It is referenced from a <meta>
// tag, so no visitor ever downloads it — only social crawlers do, and they
// want the quality.
//
// The originals are in git. `git show <commit>:public/assets/procedo-logo.png`
// brings either back.
const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const ROOT = path.join(__dirname, '..');
const TARGETS = ['public/assets/procedo-logo.png', 'public/favicon.png'];

const kb = (n) => (n / 1024).toFixed(1).padStart(7) + ' KB';

(async () => {
  let before = 0;
  let after = 0;
  for (const rel of TARGETS) {
    const file = path.join(ROOT, rel);
    const orig = fs.statSync(file).size;
    const meta = await sharp(file).metadata();

    const buf = await sharp(file).png({ palette: true, effort: 10 }).toBuffer();

    /* Never let this grow a file, and never let it change the dimensions. */
    const out = await sharp(buf).metadata();
    if (out.width !== meta.width || out.height !== meta.height) {
      console.log('SKIP  ' + rel + ' — dimensions would change, which breaks the markup');
      continue;
    }
    /* Only write for a MEANINGFUL saving. Re-quantising an already-quantised
       image shaves a fraction of a percent and costs a little more fidelity
       each time, so a bare `smaller?` test would let this script slowly degrade
       the logo every time someone ran it. Five percent is comfortably above
       that noise and far below the 68% and 59% a genuine first pass gives. */
    const saved = 1 - buf.length / orig;
    if (saved < 0.05) {
      console.log(rel.padEnd(32) + kb(orig) + '   already optimised — left alone');
      before += orig;
      after += orig;
      continue;
    }

    fs.writeFileSync(file, buf);
    before += orig;
    after += buf.length;
    console.log(
      rel.padEnd(32) + kb(orig) + ' -> ' + kb(buf.length) +
        '   ' + (100 - (buf.length / orig) * 100).toFixed(0) + '% smaller   ' +
        meta.width + 'x' + meta.height + ' (unchanged)',
    );
  }
  console.log('\n' + 'total'.padEnd(32) + kb(before) + ' -> ' + kb(after) +
    '   saved ' + kb(before - after) + ' on every page load');
})();
