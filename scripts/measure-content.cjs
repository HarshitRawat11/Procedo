// Content depth + provenance for the services page.
//
//   node scripts/measure-content.cjs
//
// Why this exists. The illustrations have measured gates; the copy had none,
// and on 2026-09-17 Harshit said the thing that matters: "we can work on
// aesthetics all we want but it is of no use if the content is not up to the
// mark." Two faults had gone unnoticed because nothing counted them.
//
//   1. DEPTH. Digital Workplace and Datacenter Infrastructure carry the
//      client's own copy (supplied 2026-09-06). The other three are
//      transcriptions of the old React site, which simply says less. The count
//      of bullets hid it — the difference is how much each bullet says.
//
//   2. PROVENANCE. One intro on the page was neither the client's nor the old
//      site's; it had been written. Rule #1 in CLAUDE.md forbids exactly that,
//      and nothing was checking.
//
// A line "matched neither" is a QUESTION, not a verdict: illustration captions
// and page furniture are not claims about Procedo and are fine to have been
// written. Claims about what Procedo does are not.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const bundle = fs.readFileSync(path.join(ROOT, 'scrape/procedo/app.js'), 'utf8');
const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
const bN = norm(bundle);

const src = fs.readFileSync(path.join(ROOT, 'src/data/site.ts'), 'utf8');
const i = src.indexOf('export const competencies: Competency[] = [');
const blk = src.slice(i, src.indexOf('\n];', i));

/* The two blocks PROGRESS.md records as client-supplied on 2026-09-06. */
const CLIENT = new Set(['digital-workplace', 'datacenter-infrastructure']);

const rows = [];
for (const c of blk.split(/\n  \{\n    slug: '/).slice(1)) {
  const slug = c.split("'")[0];
  const grab = (k) => {
    const m = c.match(new RegExp(k + ":\\s*\\n?\\s*(['\"])([\\s\\S]*?)\\1"));
    return m ? m[2] : '';
  };
  const groups = [...c.matchAll(/name: '([^']*)'/g)].map((m) => m[1]);
  const items = [...c.matchAll(/\n\s{10}'([^']+)',/g)].map((m) => m[1]);
  const avg = items.length ? Math.round(items.reduce((a, b) => a + b.length, 0) / items.length) : 0;
  rows.push({
    slug,
    src: CLIENT.has(slug) ? 'client' : 'old site',
    groups: groups.length,
    items: items.length,
    avg,
    intro: grab('intro').length,
    quote: grab('quote').length,
    thin: items.filter((s) => s.length < 34).length,
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log('\nDEPTH — services page\n');
console.log(pad('slug', 27) + pad('source', 10) + pad('groups', 8) + pad('items', 7) + pad('avg chars', 11) + pad('under 34', 10) + 'intro');
for (const r of rows) {
  console.log(
    pad(r.slug, 27) + pad(r.src, 10) + pad(r.groups, 8) + pad(r.items, 7) + pad(r.avg, 11) + pad(r.thin, 10) + r.intro,
  );
}
const client = rows.filter((r) => r.src === 'client');
const old = rows.filter((r) => r.src !== 'client');
const mean = (a, k) => Math.round(a.reduce((s, r) => s + r[k], 0) / a.length);
console.log(
  '\nclient-supplied average: ' + mean(client, 'items') + ' items at ' + mean(client, 'avg') + ' chars, intro ' + mean(client, 'intro'),
);
console.log(
  'old-site average       : ' + mean(old, 'items') + ' items at ' + mean(old, 'avg') + ' chars, intro ' + mean(old, 'intro'),
);

/* ── provenance ── */
const re = new RegExp("(['\"])((?:(?!\\1)[^\\\\\\n]|\\\\.){25,600})\\1", 'g');
const unsourced = [];
let m;
while ((m = re.exec(blk))) {
  const s = m[2];
  if (!/ /.test(s) || /^lucide:/.test(s)) continue;
  const slug = (blk.slice(0, m.index).match(/slug: '([^']+)'/g) || []).pop();
  const which = slug ? slug.slice(7, -1) : '?';
  if (CLIENT.has(which)) continue;
  if (!bN.includes(norm(s))) unsourced.push(which + ': ' + s.slice(0, 96));
}
console.log('\nPROVENANCE — old-site services whose wording is not literally in the bundle: ' + unsourced.length);
for (const u of unsourced) console.log('   - ' + u);
console.log(
  '\nThese are paraphrases that add connectives ("SSO, LDAP, Azure AD" ->\n' +
    '"SSO, LDAP and Azure AD"). Same claim, easier to read, harder to verify.\n' +
    'Anything here that states a NEW capability is a rule #1 defect — check it.\n',
);
