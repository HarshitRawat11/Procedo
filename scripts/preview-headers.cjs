// Append the preview-only noindex to dist/_headers. Run: npm run build:preview
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
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'dist', '_headers');
const MARKER = '# ── preview-only, appended by scripts/preview-headers.cjs ──';
const BLOCK = `
${MARKER}
# Not present in a production build. See the header of that script.
/*
  X-Robots-Tag: noindex, nofollow
`;

if (!fs.existsSync(FILE)) {
  console.error(
    'dist/_headers is missing.\n' +
      'It should have been copied from public/_headers by the build. Either the\n' +
      'build did not run, or public/_headers has been deleted — in which case the\n' +
      'security and caching headers are gone too. Fix that before deploying.',
  );
  process.exit(1);
}

const current = fs.readFileSync(FILE, 'utf8');
if (current.includes(MARKER)) {
  console.log('dist/_headers already carries the preview noindex — nothing to do.');
  process.exit(0);
}

fs.writeFileSync(FILE, current.trimEnd() + '\n' + BLOCK);
console.log('dist/_headers: appended X-Robots-Tag: noindex, nofollow (preview only).');
