// Gate 3 (QUALITY-GATES.md) — hierarchy. Run after scripts/shoot-screens.cjs:
//   node scripts/measure-hierarchy.cjs
//
// Writes three derivatives of every fold screenshot into review/gate3/ and
// reports where the visual weight actually lands.
//
//   -squint.png   heavy blur. Detail gone, only mass remains.
//   -grey.png     desaturated. Hierarchy that leaned on the orange CTA
//                 collapses here, which is the point of the test.
//   -thumb.png    20% scale, for the search-result / tab-preview case.
//
// Blur sigma is width/45 rather than a constant, so a 375px and a 1280px shot
// are squinted equally hard in relative terms. A fixed sigma would blur the
// phone screenshot roughly three times as hard and fail it unfairly.
//
// ── HOW DOMINANCE IS MEASURED, AND THE VERSION THAT WAS WRONG ────────────────
// The first attempt scored a 4x4 grid cell by cell and compared the top two
// cells. It reported 16 of 30 views as having no clear focal point — including
// the home page at 1280, where the blurred image shows one unmistakable dark
// mass. The fault: a headline SPANS several cells, so the metric cut it up and
// then reported the pieces as competing with each other. Every "contested"
// verdict it produced was an artifact of the grid.
//
// So the image is thresholded into ink and ground, adjacent ink cells are
// flood-filled into CLUSTERS, and clusters are compared. An element spanning
// ten cells is one cluster with ten cells of mass, which is what the eye sees.
//
// ── THE STICKY HEADER IS CROPPED FIRST ───────────────────────────────────────
// It is identical chrome on all ten pages, and on a light page — the three
// legal ones — the dark full-width nav band outweighs everything below it at
// ~86% of total ink. Including it measures the chrome rather than the content.
const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, '..', 'node_modules', 'sharp'));

const REVIEW = path.join(__dirname, '..', 'review');
const OUT = path.join(REVIEW, 'gate3');

const GROUND = { r: 251, g: 250, b: 248 }; // --color-cream
const INK_THRESHOLD = 35; // mean channel distance from ground before a cell counts as ink
const CLEAR_RATIO = 1.5; // dominant cluster must outweigh the runner-up by this

if (!fs.existsSync(REVIEW)) {
  console.error('review/ is missing. Run scripts/shoot-screens.cjs first.');
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const clusterise = (cells, cols, rows_) => {
  const seen = new Uint8Array(cells.length);
  const out = [];
  for (let i = 0; i < cells.length; i++) {
    if (seen[i] || cells[i] < INK_THRESHOLD) continue;
    const stack = [i];
    seen[i] = 1;
    let mass = 0, n = 0, sx = 0, sy = 0;
    while (stack.length) {
      const j = stack.pop();
      const x = j % cols, y = (j / cols) | 0;
      mass += cells[j]; n++; sx += x; sy += y;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows_) continue;
        const k = ny * cols + nx;
        if (!seen[k] && cells[k] >= INK_THRESHOLD) { seen[k] = 1; stack.push(k); }
      }
    }
    out.push({ mass, cx: sx / n / cols, cy: sy / n / rows_ });
  }
  return out.sort((a, b) => b.mass - a.mass);
};

const where = (cx, cy) =>
  (cy < 0.2 ? 'top' : cy < 0.45 ? 'upper' : cy < 0.72 ? 'middle' : 'lower') + '-' +
  (cx < 0.38 ? 'left' : cx < 0.62 ? 'centre' : 'right');

(async () => {
  const folds = fs.readdirSync(REVIEW).filter((f) => f.endsWith('-fold.png'));
  if (!folds.length) {
    console.error('No *-fold.png in review/. Run scripts/shoot-screens.cjs first.');
    process.exit(1);
  }

  const rows = [];
  for (const f of folds) {
    const src = path.join(REVIEW, f);
    const base = f.replace('-fold.png', '');
    const meta = await sharp(src).metadata();
    const sigma = Math.max(2, Math.round(meta.width / 45));

    await sharp(src).blur(sigma).toFile(path.join(OUT, base + '-squint.png'));
    await sharp(src).greyscale().toFile(path.join(OUT, base + '-grey.png'));
    await sharp(src).resize(Math.round(meta.width * 0.2)).toFile(path.join(OUT, base + '-thumb.png'));

    const HEADER = meta.width < 640 ? 64 : 72;
    const { data, info } = await sharp(src)
      .extract({ left: 0, top: HEADER, width: meta.width, height: meta.height - HEADER })
      .blur(sigma)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width: W, height: H, channels: C } = info;
    const cell = Math.max(8, Math.round(W / 40));
    const cols = Math.floor(W / cell), rws = Math.floor(H / cell);
    const grid = new Float64Array(cols * rws);
    for (let ry = 0; ry < rws; ry++) {
      for (let rx = 0; rx < cols; rx++) {
        let sum = 0, n = 0;
        for (let y = ry * cell; y < (ry + 1) * cell; y += 2) {
          for (let x = rx * cell; x < (rx + 1) * cell; x += 2) {
            const i = (y * W + x) * C;
            sum += (Math.abs(data[i] - GROUND.r) + Math.abs(data[i + 1] - GROUND.g) + Math.abs(data[i + 2] - GROUND.b)) / 3;
            n++;
          }
        }
        grid[ry * cols + rx] = sum / n;
      }
    }

    const cl = clusterise(grid, cols, rws);
    const total = cl.reduce((s, c) => s + c.mass, 0) || 1;
    const top = cl[0], second = cl[1];
    rows.push({
      page: base,
      clusters: cl.length,
      dominant: top ? where(top.cx, top.cy) : '(no ink)',
      share: top ? Math.round((top.mass / total) * 100) : 0,
      ratio: top && second ? Math.round((top.mass / second.mass) * 100) / 100 : Infinity,
    });
  }

  rows.sort((a, b) => a.page.localeCompare(b.page));
  console.log('\nGATE 3 — dominance of CONTENT (sticky header excluded)\n');
  console.log('page'.padEnd(18) + 'clusters'.padEnd(10) + 'dominant'.padEnd(16) + 'share'.padEnd(8) + 'vs 2nd');
  console.log('-'.repeat(64));
  for (const r of rows) {
    console.log(
      r.page.padEnd(18) + String(r.clusters).padEnd(10) + r.dominant.padEnd(16) +
      (r.share + '%').padEnd(8) + (r.ratio === Infinity ? 'only one' : r.ratio.toFixed(2)) +
      (r.ratio < CLEAR_RATIO ? '   <-- contested' : ''),
    );
  }
  const clear = rows.filter((r) => r.ratio >= CLEAR_RATIO).length;
  console.log('\n' + clear + ' of ' + rows.length + ' views have a clear single focal point (ratio >= ' + CLEAR_RATIO + ').');
  console.log('\nThe greyscale and thumbnail tests are judged by eye, not counted:');
  console.log('  review/gate3/*-grey.png   primary action must stay the most prominent control');
  console.log('  review/gate3/*-thumb.png  headline must stay legible at 20%');
})();
