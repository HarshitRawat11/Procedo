// Serve dist/ for measurement. Run: node scripts/serve-dist.cjs [--no-headers] [--port N]
//
// ── WHY THIS EXISTS ──────────────────────────────────────────────────────────
// `astro preview` ignores _headers — that file is a Cloudflare Pages feature —
// so without this the only way to test the CSP or the security headers would be
// to deploy them and find out from visitors. A wrong CSP fails silently in the
// browser, which is exactly the failure mode worth a throwaway server to avoid.
//
// ── WHY THERE IS A --no-headers MODE ─────────────────────────────────────────
// The real headers include `X-Frame-Options: DENY` and `frame-src 'none'`, and
// they work: an iframe of this origin comes back with a null contentDocument.
//
// That matters because measuring typography, layout and colour across ten pages
// is far cheaper inside iframes — ten iframes in one page instead of thirty
// navigations — and the CSP correctly refuses to be framed. Headers do not
// affect layout, line breaking, computed colour or font metrics, so measuring
// those against a header-free copy measures the same pages.
//
// Use the DEFAULT mode for anything header-dependent (CSP, noindex, caching).
// Use --no-headers ONLY for layout and style measurement.
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const noHeaders = args.includes('--no-headers');
const portArg = args.indexOf('--port');
const PORT = portArg > -1 ? Number(args[portArg + 1]) : noHeaders ? 4400 : 4399;

const ROOT = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('dist/ is empty or missing. Run `npm run build` first.');
  process.exit(1);
}

/* Parse dist/_headers the way Cloudflare does: a path pattern line, then
   indented "Name: value" lines, merged across every matching block. */
const parseHeaders = () => {
  const file = path.join(ROOT, '_headers');
  if (!fs.existsSync(file)) return [];
  const blocks = [];
  let current = null;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(raw)) {
      current = { pattern: raw.trim(), headers: [] };
      blocks.push(current);
    } else if (current) {
      const i = raw.indexOf(':');
      if (i > 0) current.headers.push([raw.slice(0, i).trim(), raw.slice(i + 1).trim()]);
    }
  }
  return blocks;
};

const BLOCKS = noHeaders ? [] : parseHeaders();

const matches = (pattern, url) => {
  if (pattern === '/*') return true;
  if (pattern.endsWith('/*')) return url.startsWith(pattern.slice(0, -1));
  return pattern === url;
};

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(ROOT, url);
    if (!path.extname(file)) {
      const asDir = path.join(file, 'index.html');
      file = fs.existsSync(asDir) ? asDir : file + '.html';
    }
    const send = (code, body, ext) => {
      const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream' };
      for (const b of BLOCKS) if (matches(b.pattern, url)) for (const [k, v] of b.headers) headers[k] = v;
      res.writeHead(code, headers);
      res.end(body);
    };
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      send(200, fs.readFileSync(file), path.extname(file));
    } else {
      const nf = path.join(ROOT, '404.html');
      send(404, fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found', '.html');
    }
  })
  .listen(PORT, () => {
    const csp = BLOCKS.flatMap((b) => b.headers).find(([k]) => k.toLowerCase() === 'content-security-policy');
    console.log('dist/ on http://localhost:' + PORT);
    console.log(
      noHeaders
        ? 'headers: NONE (--no-headers) — framable, for layout/style measurement only'
        : 'headers: from dist/_headers · CSP ' + (csp ? 'present' : 'ABSENT'),
    );
  });
