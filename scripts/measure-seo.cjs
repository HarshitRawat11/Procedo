// Gate 2 — SEO surfaces, measured on the BUILT output. Run: npm run build first.
//
//   node scripts/measure-seo.cjs
//
// Why it exists. The illustrations have had measured gates since the start and
// the copy got one on 2026-09-17 (measure-content.cjs). The <head> had none,
// and on 2026-09-18 an audit found three things that had been live for weeks
// and that nobody could have spotted by looking at the site:
//
//   1. The home page <title> was 106 characters. Google shows about 60, so the
//      one title that matters most read "Procedo Infosystems — Designing
//      intelligent systems that empower busi…" — the brand, then nothing a
//      buyer searches for.
//   2. The default meta description was 215. It listed all five competencies
//      and was cut mid-list, so two of the five never appeared in a result.
//   3. Organization and WebSite were emitted from index.astro alone. Every
//      inner page — including /contact, which carries the address and phone —
//      shipped a BreadcrumbList and nothing else.
//
// None of it is visible in a browser. All of it is one string comparison.
//
// It reads dist/ rather than src/, deliberately: what a crawler receives is the
// rendered head, after layout defaults and per-page props have been resolved.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(ROOT)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(2);
}

/* Google truncates a title around 60 characters and a description around 160.
   The description floor is softer: under 120 simply wastes the slot. */
const TITLE_MAX = 62;
const DESC_MIN = 120;
const DESC_MAX = 160;

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(ROOT);

const one = (h, re) => {
  const m = h.match(re);
  return m ? m[1] : null;
};
const dec = (s) =>
  (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const rows = [];
for (const p of pages.sort()) {
  const h = fs.readFileSync(p, 'utf8');
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );
  const ids = [];
  const types = [];
  let unparseable = 0;
  for (const b of blocks) {
    try {
      const o = JSON.parse(b);
      for (const n of o['@graph'] || [o]) {
        types.push(n['@type']);
        if (n['@id']) ids.push(n['@id']);
      }
    } catch {
      unparseable++;
    }
  }
  rows.push({
    url: '/' + path.relative(ROOT, p).replace(/\\/g, '/').replace(/(index)?\.html$/, ''),
    title: dec(one(h, /<title>([\s\S]*?)<\/title>/)),
    desc: dec(one(h, /<meta name="description" content="([\s\S]*?)"/)),
    canonical: one(h, /<link rel="canonical" href="([^"]*)"/),
    noindex: /name="robots" content="noindex/.test(h),
    h1: (h.match(/<h1[\s>]/g) || []).length,
    imgNoAlt: (h.match(/<img\b[^>]*>/g) || []).filter((t) => !/\balt=/.test(t)).length,
    ogAlt: one(h, /<meta property="og:image:alt" content="([^"]*)"/),
    types,
    unparseable,
    dupIds: [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))],
  });
}

const fails = [];
const pad = (s, n) => String(s == null ? '—' : s).padEnd(n);

console.log('\nSEO — built output\n');
console.log(pad('url', 16) + pad('title', 7) + pad('desc', 7) + pad('h1', 4) + pad('no-alt', 8) + 'schema');
for (const r of rows) {
  const t = (r.title || '').length;
  const d = (r.desc || '').length;
  console.log(
    pad(r.url, 16) +
      pad(t + (t > TITLE_MAX ? '!' : ''), 7) +
      pad(d + (d > DESC_MAX ? '!' : d && d < DESC_MIN ? '?' : ''), 7) +
      pad(r.h1, 4) +
      pad(r.imgNoAlt || '', 8) +
      (r.types.length ? r.types.join(', ') : r.noindex ? '(noindex)' : 'NONE'),
  );

  const at = (m) => fails.push(r.url + ': ' + m);
  if (!r.title) at('no <title>');
  else if (t > TITLE_MAX) at('title is ' + t + ' chars, over ' + TITLE_MAX);
  if (!r.desc) at('no meta description');
  else if (d > DESC_MAX) at('description is ' + d + ' chars, over ' + DESC_MAX);
  if (r.h1 !== 1) at(r.h1 + ' <h1> elements, expected exactly 1');
  if (r.imgNoAlt) at(r.imgNoAlt + ' <img> without alt');
  if (!r.canonical) at('no canonical');
  if (r.unparseable) at(r.unparseable + ' unparseable ld+json block(s)');
  if (r.dupIds.length) at('duplicate @id in one document: ' + r.dupIds.join(', '));
  if (!r.noindex && !r.types.includes('Organization')) at('no Organization node');
  if (!r.ogAlt) at('no og:image:alt');
}

/* A description SHORTER than the floor is a note, not a failure — a legal page
   has less to say and padding it would be worse than leaving the slot short. */
const short = rows.filter((r) => r.desc && r.desc.length < DESC_MIN);
if (short.length) {
  console.log('\nshort descriptions (under ' + DESC_MIN + ', not a failure):');
  for (const r of short) console.log('   ' + r.url + '  ' + r.desc.length);
}

for (const f of ['robots.txt', 'sitemap-index.xml']) {
  if (!fs.existsSync(path.join(ROOT, f))) fails.push('dist/' + f + ' is missing');
}

console.log('');
if (fails.length) {
  console.log(fails.length + ' problem(s):');
  for (const f of fails) console.log('  FAIL  ' + f);
  process.exitCode = 1;
} else {
  console.log('All SEO checks pass.');
}
