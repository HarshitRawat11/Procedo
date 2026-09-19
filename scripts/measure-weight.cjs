// Wire weight for every route. Run: node scripts/measure-weight.cjs
//
// FINISH-LINE.md O5 caps page weight at 100 KB. It used to measure the home
// page only; nothing checked whether another route was heavier, and /services
// carries roughly four times the markup of any other page.
//
// Brotli, because that is what Cloudflare serves. Counts the HTML plus every
// local asset it references. Fonts are counted once per page even though a
// visitor caches them across the site — this is per-page COLD weight, the
// pessimistic number.
//
// ⚠️ Do not measure this by fetching from a local server unless that server
// compresses. A plain static server sends raw bytes, and Lighthouse will then
// report ~87 KiB of "uncompressed text" that does not exist in production.
// Reading the files and compressing them here avoids inventing that number.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DIST = path.join(__dirname, '..', 'dist');
const CAP_KB = 100;

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('dist/ is empty or missing. Run `npm run build` first.');
  process.exit(1);
}

const PAGES = [
  ['/', 'index.html'], ['/company', 'company/index.html'], ['/services', 'services/index.html'],
  ['/our-mission', 'our-mission/index.html'], ['/careers', 'careers/index.html'],
  ['/contact', 'contact/index.html'], ['/privacy', 'privacy/index.html'],
  ['/terms', 'terms/index.html'], ['/cookies', 'cookies/index.html'], ['/404', '404.html'],
];

const br = (buf) =>
  zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }).length;

// Images and fonts are already compressed; brotli does nothing for them.
const PRECOMPRESSED = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.woff', '.woff2']);

const sizeOf = (rel) => {
  const file = path.join(DIST, rel.replace(/^\//, ''));
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
  const buf = fs.readFileSync(file);
  return PRECOMPRESSED.has(path.extname(file).toLowerCase()) ? buf.length : br(buf);
};

const rows = [];
for (const [route, rel] of PAGES) {
  const html = fs.readFileSync(path.join(DIST, rel), 'utf8');
  const htmlSize = br(Buffer.from(html));

  const refs = new Set();
  for (const re of [/<link[^>]+href="([^"]+)"/g, /<script[^>]+src="([^"]+)"/g, /<img[^>]+src="([^"]+)"/g]) {
    for (const m of html.matchAll(re)) {
      const u = m[1];
      if (u && u.startsWith('/') && !u.startsWith('//')) refs.add(u.split('?')[0]);
    }
  }

  let assets = 0;
  const missing = [];
  for (const r of refs) {
    const s = sizeOf(r);
    if (s === null) missing.push(r);
    else assets += s;
  }

  rows.push({ route, requests: 1 + refs.size - missing.length, html: htmlSize, assets, total: htmlSize + assets, missing });
}

rows.sort((a, b) => b.total - a.total);

const kb = (n) => (n / 1024).toFixed(1).padStart(7);
console.log('\nWIRE WEIGHT per route — brotli, cold cache, built output\n');
console.log('route'.padEnd(16) + 'reqs'.padStart(5) + 'html'.padStart(8) + 'assets'.padStart(8) + 'TOTAL'.padStart(8) + '   vs ' + CAP_KB + ' KB');
console.log('-'.repeat(62));
for (const r of rows) {
  console.log(
    r.route.padEnd(16) + String(r.requests).padStart(5) + kb(r.html) + kb(r.assets) + kb(r.total) +
    '   ' + String(Math.round((r.total / (CAP_KB * 1024)) * 100)).padStart(3) + '%',
  );
  if (r.missing.length) console.log('   not on disk: ' + r.missing.join(', '));
}

const worst = rows[0];
const shared = rows.every((r) => r.assets === rows[0].assets) ? rows[0].assets : null;
console.log('-'.repeat(62));
if (shared !== null) {
  console.log(
    (shared / 1024).toFixed(1) + ' KB of every page is the same shared bundle, cached after the\n' +
    'first page — so a second page view costs only its own HTML.',
  );
}
const over = rows.filter((r) => r.total > CAP_KB * 1024);
console.log(
  over.length
    ? '\nFAIL: ' + over.length + ' route(s) over the ' + CAP_KB + ' KB cap.'
    : '\nPASS: heaviest is ' + worst.route + ' at ' + (worst.total / 1024).toFixed(1) + ' KB.',
);
process.exitCode = over.length ? 1 : 0;
