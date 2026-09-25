// Verify dist/_headers. Run: node scripts/verify-headers.cjs [--preview]
//
//   (no flag)   expects a PRODUCTION build — the noindex must be ABSENT
//   --preview   expects `npm run build:preview` — the noindex must be PRESENT
//
// ── WHY THIS EXISTS ──────────────────────────────────────────────────────────
// This file guards the two ways this repo's header setup has actually broken,
// and both are silent. Neither shows up in a build log, in `astro check`, or in
// a page that looks right in a browser.
//
// 1. THE NOINDEX SAFETY PROPERTY.
//    `X-Robots-Tag: noindex, nofollow` must be on the client preview and must
//    NEVER be in a production build. Cloudflare Pages has no root-level header
//    config: its only mechanism is a `_headers` file INSIDE the build output, so
//    anything committed to public/_headers ships wherever the build ships. Put
//    the noindex there and the day procedoinfo.com launches from this repo, the
//    launch is silently de-indexed and nothing in the repo looks wrong.
//
//    So the rule is attached to the ACT OF DEPLOYING A PREVIEW instead:
//    `npm run build:preview` runs scripts/preview-headers.cjs, and plain
//    `npm run build` does not. This check proves both halves still hold — that
//    the preview has it AND that production cannot.
//
// 2. A SECOND `/*` RULE MAKES CLOUDFLARE DROP MOST OF THE FIRST ONE'S HEADERS.
//    Measured against `wrangler pages dev` on 2026-09-19, one server, the file
//    swapped between probes:
//
//        one /* rule with 7 headers             -> 7 applied
//        the same, plus a /_astro/* rule        -> 7 applied
//        the same, plus a SECOND /* rule        -> 3 applied
//        all 8 headers merged into ONE /* rule  -> 8 applied
//
//    Nothing warns about it. Wrangler still reports "Parsed 3 valid header
//    rules" and the build is clean. It was harmless while `/*` held only two
//    headers, and it began eating HSTS, X-Frame-Options, Permissions-Policy,
//    COOP and the entire CSP the moment those were added. That is how a site
//    loses its security headers without a single error anywhere.
const fs = require('fs');
const path = require('path');

const PREVIEW = process.argv.includes('--preview');
const FILE = path.join(__dirname, '..', 'dist', '_headers');

// Every header that must reach a visitor, all inside the single `/*` rule.
const REQUIRED = [
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Strict-Transport-Security',
  'X-Frame-Options',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
  'Content-Security-Policy',
];

if (!fs.existsSync(FILE)) {
  console.error('dist/_headers is missing. Run `npm run build` first.');
  process.exit(2);
}

/* Parse the way Cloudflare does: an unindented path pattern, then indented
   "Name: value" lines belonging to it. */
const blocks = [];
let current = null;
for (const raw of fs.readFileSync(FILE, 'utf8').split(/\r?\n/)) {
  if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
  if (!/^\s/.test(raw)) {
    current = { pattern: raw.trim(), headers: [] };
    blocks.push(current);
  } else if (current) {
    const i = raw.indexOf(':');
    if (i > 0) current.headers.push(raw.slice(0, i).trim());
  }
}

const problems = [];
const note = (s) => problems.push(s);

// ── 1. Exactly one `/*` rule ────────────────────────────────────────────────
const wildcards = blocks.filter((b) => b.pattern === '/*');
if (wildcards.length === 0) {
  note('No `/*` rule at all. Every site-wide header is missing.');
} else if (wildcards.length > 1) {
  note(
    wildcards.length + ' separate `/*` rules. Cloudflare keeps roughly the ' +
      'LAST one and drops most of the earlier headers — measured, see the ' +
      'header of this file. Merge them into one.',
  );
}

// ── 2. Every security header present, and in that `/*` rule ─────────────────
const star = wildcards[0];
if (star) {
  const have = new Set(star.headers.map((h) => h.toLowerCase()));
  for (const h of REQUIRED) {
    if (!have.has(h.toLowerCase())) note('`/*` is missing ' + h + '.');
  }
}

// ── 3. The noindex, in whichever direction this run expects ─────────────────
const noindexIn = blocks.filter((b) => b.headers.some((h) => /^x-robots-tag$/i.test(h)));

if (PREVIEW) {
  if (noindexIn.length === 0) {
    note(
      'PREVIEW build has NO X-Robots-Tag. The preview would be indexable — ' +
        'check that scripts/preview-headers.cjs ran, and that the Cloudflare ' +
        'project build command is still `npm run build:preview`.',
    );
  } else if (!noindexIn.some((b) => b.pattern === '/*')) {
    note('X-Robots-Tag exists but not in the `/*` rule, so it covers only some paths.');
  }
} else {
  if (noindexIn.length > 0) {
    note(
      'PRODUCTION build CONTAINS X-Robots-Tag, in rule `' + noindexIn[0].pattern +
        '`. Shipping this de-indexes the real site. The noindex must never be ' +
        'committed to public/_headers — see the header of this file.',
    );
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const mode = PREVIEW ? 'preview' : 'production';
console.log('\nHEADERS — dist/_headers, expecting a ' + mode.toUpperCase() + ' build\n');
console.log('  rules          ' + blocks.map((b) => b.pattern).join(', '));
console.log('  /* headers     ' + (star ? star.headers.length : 0));
console.log('  X-Robots-Tag   ' + (noindexIn.length ? 'present' : 'absent') +
  '  (expected: ' + (PREVIEW ? 'present' : 'absent') + ')');

if (problems.length) {
  console.log('\n' + problems.length + ' problem(s):\n');
  for (const p of problems) console.log('  ✗ ' + p);
  console.log('');
  process.exitCode = 1;
} else {
  console.log('\nAll header checks pass.\n');
}
