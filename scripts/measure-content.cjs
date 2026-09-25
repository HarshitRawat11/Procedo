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

/* ── THE BUNDLE IS GITIGNORED, SO IT IS ABSENT IN CI ────────────────────────
   scrape/procedo/app.js is a 1 MB minified third-party bundle, deliberately
   untracked. This script used to read it unguarded, which was fine for years of
   local runs and failed the moment CI ran it on a fresh checkout — ENOENT, and
   every later step skipped.

   This script has two halves and only one of them needs the bundle:

     DEPTH       reads src/data/site.ts. Works anywhere.
     PROVENANCE  compares copy against the bundle. Needs it.

   So when the bundle is missing, the depth half still runs and the provenance
   half is SKIPPED LOUDLY — named in the output, and the run does not pretend to
   have checked something it could not. It exits 0, because failing every CI run
   over an intentionally untracked file would just get the gate switched off.

   ⚠️ THAT MEANS CI CANNOT CATCH AN INVENTED CLAIM. Rule 1 is the most
   important rule in this repo and its automated check only runs on a machine
   that has the bundle. Run this locally before shipping copy. */
const BUNDLE = path.join(ROOT, 'scrape/procedo/app.js');
const HAVE_BUNDLE = fs.existsSync(BUNDLE);
const bundle = HAVE_BUNDLE ? fs.readFileSync(BUNDLE, 'utf8') : '';
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

/* ── provenance ──
   A literal substring match against the bundle is too strict to be useful on
   its own. Every one of the old-site bullets was lightly re-punctuated when it
   was transcribed — "AV control (Crestron, Extron)" became "AV control:
   Crestron and Extron" — so a literal check reported 11 failures on every run,
   all of them harmless. A gate that cries wolf eleven times is a gate people
   learn to skip, and the ONE thing it exists to catch is an invented claim
   hiding among them.

   So there are two passes:

     ATTESTED   the exact words are in the bundle, or every significant word is,
                in the same order and close together. The claim is Procedo's;
                only the punctuation changed. The matching bundle text is
                printed so it can be checked by eye rather than trusted.
     UNATTESTED nothing in the bundle carries those words. This is the rule #1
                risk and the only thing here worth acting on.

   Verified this way on 2026-09-19: all 11 were ATTESTED, including the two
   vendor names — the bundle really does say "AV control (Crestron, Extron)". */
const re = new RegExp("(['\"])((?:(?!\\1)[^\\\\\\n]|\\\\.){25,600})\\1", 'g');

/* Words carrying no claim. Dropping them is what lets "A, B, C" match
   "A, B and C" without letting two unrelated sentences match each other. */
const STOP = new Set(['and', 'or', 'the', 'a', 'an', 'with', 'for', 'of', 'to', 'in', 'on']);
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const tokens = (s) =>
  norm(s)
    .split(/[^a-z0-9.+&/-]+/)
    .filter((t) => t && !STOP.has(t));

/* All significant words, in order, separated by punctuation and at most ONE
   connective. Both halves are needed: dropping stop words from the site string
   is what lets 'A, B, C' match 'A, B and C', but the BUNDLE may be the side
   carrying the connective — it says 'NAS/SAN storage with redundancy' where
   the site says 'NAS and SAN storage with redundancy'. A separator that
   allowed punctuation only could not bridge that 'with', and reported two
   perfectly sourced bullets as invented. Tight enough that two unrelated
   sentences will not match; loose enough to absorb re-punctuation. */
const attestedBy = (s) => {
  const t = tokens(s);
  if (t.length < 2) return null;
  const GAP = "[^a-z0-9]{0,4}(?:(?:" + [...STOP].join('|') + ")[^a-z0-9]{0,4})?";
  const rx = new RegExp(t.map(esc).join(GAP), 'i');
  const m = rx.exec(bN);
  return m ? m[0] : null;
};

if (!HAVE_BUNDLE) {
  console.log('\nPROVENANCE — SKIPPED, and this run has NOT checked rule 1.\n');
  console.log('  scrape/procedo/app.js is not present. It is gitignored on purpose —');
  console.log('  a 1 MB minified third-party bundle — so any fresh checkout, CI');
  console.log('  included, lacks it.');
  console.log('\n  The depth table above is real. Nothing here has verified that the');
  console.log('  copy traces to a source, which is the most important rule in this');
  console.log('  repo. Run this on a machine that has the bundle before shipping copy.\n');
  process.exit(0);
}

const attested = [];
const unattested = [];
let m;
while ((m = re.exec(blk))) {
  const s = m[2];
  if (!/ /.test(s) || /^lucide:/.test(s)) continue;
  const slug = (blk.slice(0, m.index).match(/slug: '([^']+)'/g) || []).pop();
  const which = slug ? slug.slice(7, -1) : '?';
  if (CLIENT.has(which)) continue;
  if (bN.includes(norm(s))) continue; // verbatim, nothing to report
  const hit = attestedBy(s);
  if (hit) attested.push({ which, s, hit });
  else unattested.push({ which, s });
}

console.log('\nPROVENANCE — old-site wording that is not verbatim in the bundle');
console.log('  attested (same claim, re-punctuated): ' + attested.length);
console.log('  UNATTESTED (no source for the words): ' + unattested.length);

if (attested.length) {
  console.log('\n  Attested — site text, then the bundle text backing it:');
  for (const a of attested) {
    console.log('   · ' + a.which + ': ' + a.s.slice(0, 84));
    console.log('     bundle: ' + a.hit.slice(0, 84));
  }
}

if (unattested.length) {
  console.log('\n  UNATTESTED — each of these states something the bundle does not.');
  console.log('  This is a rule #1 defect unless the client supplied it. Check every one:');
  for (const u of unattested) console.log('   ✗ ' + u.which + ': ' + u.s.slice(0, 96));
  console.log('');
  process.exitCode = 1;
} else {
  console.log('\n  No unattested claims. Every capability on the services page traces to');
  console.log('  the old-site bundle or to a client revision.\n');
}
