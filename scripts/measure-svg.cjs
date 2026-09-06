// Gate 1 measurements for the illustration critique loop.
// Run: node scripts/measure-svg.cjs src/components/QuietScene.astro
//
// Prints the countable construction metrics and a PASS/FAIL line per gate, so
// an illustration is judged on numbers rather than on how it feels. Thresholds
// are calibrated against QuietScene — the known-good drawing — and are documented
// in reference/illustration-loop.md. Do not raise a floor without re-checking it
// against that file; a rule that fails QuietScene is wrong by definition.
//
// NOTE: this reads literal attributes. A component whose fills are Astro
// expressions (fill={P.rack}) will under-report colour — run it against the
// BUILT html in dist/ instead, or against a plain .svg.
const fs = require('fs');

const FLOOR_CURVE = 0.4; // share of drawn elements that are curved paths
const FLOOR_SPREAD = 2.0; // widest stroke ÷ narrowest
const FLOOR_DISTINCT_W = 3; // distinct stroke widths
const FLOOR_LOADBEARING_W = 2; // widths used by 2+ elements
const FLOOR_COLOURS = 2; // distinct stroke colours
const GRID_WARN = 0.5; // share of coords on a multiple of 5

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/measure-svg.cjs <file.astro|file.svg|file.html>');
  process.exit(2);
}

const src = fs.readFileSync(file, 'utf8');
const start = src.indexOf('<svg');
const end = src.lastIndexOf('</svg>');
if (start === -1 || end === -1) {
  console.error(`no <svg> found in ${file}`);
  process.exit(2);
}
const svg = src.slice(start, end);

const tally = (arr) =>
  arr.reduce((m, k) => {
    m[k] = (m[k] || 0) + 1;
    return m;
  }, {});

/* ── elements and curves ── */
const tags = [...svg.matchAll(/<(path|rect|circle|ellipse|line|polygon|polyline)\b/g)].map(
  (m) => m[1],
);
const counts = tally(tags);
const total = tags.length;

const paths = svg.match(/<path\b[^>]*>/gs) || [];
const curvy = paths.filter((p) => /\sd="[^"]*[CSQAcsqa]/.test(p));
const curveRatio = total ? curvy.length / total : 0;

/* ── stroke hierarchy ── */
const widths = tally([...svg.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => m[1]));
const wNums = Object.keys(widths).map(Number);
const spread = wNums.length ? Math.max(...wNums) / Math.min(...wNums) : 0;
const loadBearing = Object.entries(widths)
  .filter(([, n]) => n >= 2)
  .map(([w]) => w);

const strokeColours = [...new Set([...svg.matchAll(/stroke="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]))].sort();

/* ── coordinate grid ── */
const d = [...svg.matchAll(/\sd="([^"]*)"/g)].map((m) => m[1]).join(' ');
const nums = (d.match(/[-+]?[0-9]*\.?[0-9]+/g) || []).map(Number);
const onGrid = nums.filter((n) => n % 5 === 0).length;
const gridShare = nums.length ? onGrid / nums.length : 0;

/* ── colour carried by fills (informational, NOT a gate) ──
   QuietScene is loved and is almost entirely white, so there is no defensible
   floor here. Reported because the gap against the references is real and worth
   seeing, not because a number decides anything. */
const toHsl = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (l > 0.5 ? 2 - max - min : max + min);
  return { s, l };
};
const fills = [...svg.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]);
const saturated = fills.filter((f) => {
  const { s, l } = toHsl(f);
  return s >= 0.35 && l <= 0.9;
});
const nearWhite = fills.filter((f) => toHsl(f).l >= 0.93);

/* ── report ── */
const mark = (ok) => (ok ? 'PASS' : 'FAIL');
const pct = (x) => `${Math.round(x * 100)}%`;

const results = [
  [`curve ratio     ${curvy.length}/${total} = ${pct(curveRatio)}`, `floor ${pct(FLOOR_CURVE)}`, curveRatio >= FLOOR_CURVE],
  [`stroke spread   ${spread.toFixed(2)}`, `floor ${FLOOR_SPREAD.toFixed(1)}`, spread >= FLOOR_SPREAD],
  [`distinct widths ${wNums.length}`, `floor ${FLOOR_DISTINCT_W}`, wNums.length >= FLOOR_DISTINCT_W],
  [`load-bearing    ${loadBearing.length} (${loadBearing.join(', ') || 'none'})`, `floor ${FLOOR_LOADBEARING_W}`, loadBearing.length >= FLOOR_LOADBEARING_W],
  [`stroke colours  ${strokeColours.length}`, `floor ${FLOOR_COLOURS}`, strokeColours.length >= FLOOR_COLOURS],
  [`grid coords     ${onGrid}/${nums.length} = ${pct(gridShare)}`, `warn above ${pct(GRID_WARN)}`, gridShare <= GRID_WARN],
];

console.log(`\n${file}\n${'='.repeat(file.length)}`);
console.log('elements       :', JSON.stringify(counts), '| total', total);
console.log('stroke widths  :', JSON.stringify(widths));
console.log('stroke colours :', strokeColours.join(' ') || 'none');
console.log(
  'fills          :',
  `${fills.length} literal — ${saturated.length} saturated, ${nearWhite.length} near-white (informational only)`,
);
console.log('');
for (const [label, floor, ok] of results) {
  console.log(`  ${mark(ok)}  ${label.padEnd(34)} ${floor}`);
}

const failed = results.filter(([, , ok]) => !ok).length;
console.log(
  `\n${failed === 0 ? 'All countable gates pass.' : `${failed} countable gate(s) failed.`}`,
);
console.log(
  'Not measurable here — report by hand: mis-registration, facial marks,\n' +
    'posture asymmetry, and any primitive used on an organic form.\n',
);

process.exit(failed === 0 ? 0 : 1);
