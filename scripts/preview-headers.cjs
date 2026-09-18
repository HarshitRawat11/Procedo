// Add the preview-only noindex to dist/_headers. Run: npm run build:preview
//
// ── WHY THIS SCRIPT EXISTS ───────────────────────────────────────────────────
// On Netlify the client preview was kept out of search by netlify.toml, which
// sat at the repo ROOT and was never copied into dist/. That single fact was
// what let it carry a rule the real site must never have:
//
//     X-Robots-Tag: noindex, nofollow
//
// Cloudflare Pages has no equivalent. Its only header mechanism is a `_headers`
// file, and that file has to be IN the build output — which means anything in
// it ships wherever the build ships. Put the noindex in public/_headers and the
// day procedoinfo.com is launched from this repo, the launch is de-indexed and
// nothing in the build says why. It is the same trap the robots.txt note warns
// about, one step further along.
//
// So the noindex is attached to the ACT OF DEPLOYING A PREVIEW rather than to
// the source tree. `npm run build:preview` runs this; `npm run build` does not.
// A production build physically cannot contain the rule.
//
// ── WHY THE PREVIEW NEEDS IT AT ALL ──────────────────────────────────────────
// Two reasons, both still live:
//   · the legal pages have not been through review (PROGRESS.md #5), and
//   · an indexed preview would compete with procedoinfo.com for its own terms.
//
// Cloudflare does add X-Robots-Tag: noindex to non-production deployments by
// itself — but the preview is deployed as its project's PRODUCTION deployment,
// because that is what gives it a stable URL instead of a hash-prefixed one.
// So the automatic protection does not apply and this is the only thing
// standing between the preview and Google.
//
// ── IT IS INSERTED INTO THE EXISTING `/*` RULE, NOT APPENDED AS A SECOND ONE ──
// That distinction is not cosmetic. This script used to append its own `/*`
// block at the end of the file, and doing so was silently destroying the site's
// other headers.
//
// Measured against Cloudflare's own emulator (`wrangler pages dev`) on
// 2026-09-19, one server, the file swapped between probes:
//
//     one /* rule with 7 headers                -> 7 applied
//     the same, plus a /_astro/* rule           -> 7 applied
//     the same, plus a SECOND /* rule           -> 3 applied
//     all 8 headers merged into ONE /* rule     -> 8 applied
//
// A second rule with the SAME pattern makes Cloudflare drop most of the first
// rule's headers. Nothing warns about it — wrangler still reports "Parsed 3
// valid header rules" and the build is clean. It was harmless for as long as
// the `/*` block held only nosniff and Referrer-Policy, and it began eating
// Strict-Transport-Security, X-Frame-Options, Permissions-Policy,
// Cross-Origin-Opener-Policy and the entire CSP the moment those were added.
//
// So this finds the `/*` rule and adds the line inside it. If that rule is ever
// renamed or removed, it fails loudly rather than appending a second one and
// quietly halving the site's headers.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'dist', '_headers');
const RULE = '/*';
const NOTE = '  # preview-only, added by scripts/preview-headers.cjs';
const LINE = '  X-Robots-Tag: noindex, nofollow';

if (!fs.existsSync(FILE)) {
  console.error(
    [
      'dist/_headers is missing.',
      'It should have been copied from public/_headers by the build. Either the',
      'build did not run, or public/_headers has been deleted — in which case the',
      'security, CSP and caching headers are gone too. Fix that before deploying.',
    ].join('\n'),
  );
  process.exit(1);
}

const current = fs.readFileSync(FILE, 'utf8');
const lines = current.split(/\r?\n/);

/* Look for an ACTIVE directive line, not the string anywhere in the file.
   public/_headers explains at length why the noindex is not committed there,
   and that explanation naturally contains the words "X-Robots-Tag" — a plain
   `includes()` matched the comment and made this script a no-op that still
   reported success, so a preview build shipped with no noindex at all. */
const ACTIVE = /^\s+X-Robots-Tag\s*:/;
if (lines.some((l) => ACTIVE.test(l))) {
  console.log('dist/_headers already carries the preview noindex — nothing to do.');
  process.exit(0);
}

const at = lines.findIndex((l) => l.trim() === RULE);
if (at === -1) {
  console.error(
    [
      'No `' + RULE + '` rule found in dist/_headers, so there is nothing to add the',
      'noindex to. Appending a second rule is NOT an acceptable fallback — see the',
      'note at the top of this file. Fix public/_headers instead.',
    ].join('\n'),
  );
  process.exit(1);
}

lines.splice(at + 1, 0, NOTE, LINE);
fs.writeFileSync(FILE, lines.join('\n'));
console.log(
  'dist/_headers: X-Robots-Tag: noindex, nofollow added INSIDE the ' + RULE + ' rule (preview only).',
);
