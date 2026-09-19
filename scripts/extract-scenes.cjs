// Pull each live scene's rendered SVG out of dist/ so measure-density.cjs can
// read it. Run: node scripts/extract-scenes.cjs [outdir]
//
// measure-density.cjs cannot read the .astro sources directly: their fills are
// expressions, so a component is not valid SVG until Astro has built it. Its
// own header says "run it on a plain .svg or on markup extracted from dist/" —
// this is that extraction.
//
// ── THREE THINGS BITE, AND THE THIRD IS THE DANGEROUS ONE ────────────────────
//
// 1. Search BACKWARD from the marker for the opening tag. Searching forward
//    from a fixed offset finds the next <svg AFTER it whenever the real opening
//    tag is further back than the offset, yielding a fragment that starts
//    mid-element.
//
// 2. `data-scene` and `data-astro-cid-…` are written VALUELESS, which is legal
//    HTML and illegal XML. librsvg parses XML and stops at the first one with
//    "Couldn't find end of Start Tag svg". They need an empty value.
//
// 3. Fix those BY NAME, never with a general attribute regex. A general one
//    reads the spaces inside viewBox="0 0 420 330" as attribute boundaries and
//    rewrites the value to viewBox="0 0="" 420="" 330" — which parses cleanly,
//    renders NOTHING, and therefore measures as 100% bare cream and sails
//    through the density gate. A silent pass is worse than a crash.
//
// The marker is class="scene", not data-scene: UptimeScene carries the class
// but not the data attribute.
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const OUT = process.argv[2] || path.join(__dirname, '..', 'review', 'scenes');

const PAGES = {
  QuietScene: 'our-mission/index.html',
  ReceptionScene: 'contact/index.html',
  CareersScene: 'careers/index.html',
  CompanyScene: 'company/index.html',
  RackScene: 'services/index.html',
  UptimeScene: '404.html',
};

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('dist/ is empty or missing. Run `npm run build` first.');
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

let n = 0;
for (const [name, rel] of Object.entries(PAGES)) {
  const file = path.join(DIST, rel);
  if (!fs.existsSync(file)) { console.log(name + ': ' + rel + ' not built'); continue; }
  const html = fs.readFileSync(file, 'utf8');

  const marker = html.indexOf('class="scene"');
  if (marker < 0) { console.log(name + ': no class="scene" in ' + rel); continue; }
  const start = html.lastIndexOf('<svg', marker);
  const end = html.indexOf('</svg>', marker);
  if (start < 0 || end < 0) { console.log(name + ': no enclosing svg'); continue; }

  const svg = html.slice(start, end + 6).replace(/ (data-[a-zA-Z0-9-]+)(?![-\w=])/g, ' $1=""');

  const viewBox = (svg.match(/viewBox="[^"]*"/) || ['(none)'])[0];
  if (viewBox === '(none)' || /=""/.test(viewBox)) {
    console.log(name + ': viewBox looks mangled — ' + viewBox + ' — NOT written');
    continue;
  }

  fs.writeFileSync(path.join(OUT, name + '.svg'), svg);
  console.log(name.padEnd(16) + String(svg.length).padStart(6) + ' bytes  ' + viewBox);
  n++;
}

console.log('\n' + n + ' scene(s) written to ' + path.relative(path.join(__dirname, '..'), OUT).replace(/\\/g, '/'));
console.log('Measure them with: node scripts/measure-density.cjs <file.svg>');
