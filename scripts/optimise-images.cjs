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

/*
 * The header logo is DERIVED from the full-size one, and the two exist for
 * genuinely different jobs:
 *
 *   procedo-logo.png         790x316   Organization.logo in the JSON-LD. No
 *                                      visitor downloads it, only crawlers; it
 *                                      stays large because Google wants a logo
 *                                      well above its 112px floor.
 *   procedo-logo-header.png  288x115   What every page actually loads.
 *
 * The header renders it at 90x36 CSS pixels, so 288 wide is 3.2x - crisp on a
 * 3x display and past the point where more pixels can be seen. Serving the
 * 790px original there cost 47.7 KB of wire on every page against 11 KB here,
 * for no difference on screen.
 *
 * PNG rather than WebP, measured: for a flat mark like this a palette PNG beats
 * WebP at every size worth using (11.0 KB against 14.8 KB at 288 wide), so
 * there is nothing to gain from a <picture> element and a second format to keep
 * in step.
 *
 * If the brand logo is ever replaced, drop the new artwork in as
 * procedo-logo.png and re-run this script - the header copy regenerates.
 */
const DERIVED = {
  from: 'public/assets/procedo-logo.png',
  to: 'public/assets/procedo-logo-header.png',
  width: 288,
};

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
  /* ── the derived header logo ─────────────────────────────────────────── */
  const from = path.join(ROOT, DERIVED.from);
  const to = path.join(ROOT, DERIVED.to);
  const existed = fs.existsSync(to) ? fs.statSync(to).size : 0;
  const derived = await sharp(from)
    .resize({ width: DERIVED.width })
    .png({ palette: true, effort: 10 })
    .toBuffer();
  const dMeta = await sharp(derived).metadata();
  fs.writeFileSync(to, derived);
  console.log(
    '\n' + DERIVED.to.padEnd(32) + kb(derived.length) +
      '   ' + dMeta.width + 'x' + dMeta.height +
      (existed ? '   (regenerated)' : '   (created)'),
  );
  console.log('  ^ the header loads THIS; the 790px original is for schema only.');
  console.log('  Logo.astro must carry width="' + dMeta.width + '" height="' + dMeta.height + '".');

  console.log('\n' + 'total'.padEnd(32) + kb(before) + ' -> ' + kb(after) +
    '   saved ' + kb(before - after) + ' on every page load');
})();
