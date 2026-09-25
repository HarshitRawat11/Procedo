// Verify the design system has not drifted. Run: node scripts/verify-tokens.cjs
//
// Reads SOURCE, not dist/ — these are rules about what may be written, so
// catching them here names the file and line to fix.
//
// ── WHY EACH RULE IS HERE ────────────────────────────────────────────────────
// Every one was a real, measured drift found by the design audit in
// QUALITY-GATES.md. They are cheap to reintroduce by accident, and none makes a
// page look broken, so nothing else catches them.
//
// 1. STOCK PALETTE COLOURS. @theme defined only SURFACES — cream, surface,
//    band, line — and no colour for text, so every component needing body grey
//    reached for Tailwind's `slate-*`. 81 utilities across src/, and the site's
//    commonest text colour was a framework default rather than a Procedo one.
//    Fixed with the ink-300..700 ramp. One new `text-slate-600` re-opens it.
//
// 2. OFF-SCALE TYPE. Six one-off `text-[clamp(…)]` expressions had piled up,
//    one per component, with overlapping ranges — two covering the same range
//    with a different vw term. Fourteen rendered sizes at 1280. Collapsed to
//    seven steps, three of them @theme clamps. `text-xl`, `text-3xl` and
//    `text-[Npx]` were all removed deliberately.
//
// 3. OFF-SCALE RADIUS. Five distinct radii down to three: rounded-lg 8px,
//    rounded-2xl 16px, rounded-full. `rounded`, `rounded-md` and `rounded-xl`
//    folded into rounded-lg — downward on purpose, because at 16px cards read
//    softer and more consumer, an anti-adjective in INTENT-BRIEF.md.
//
// 4. RAW HEX OUTSIDE @theme. The worst offender the audit found was not a
//    utility class at all: `body { color }` in @layer base was a literal
//    #475569, invisible to a class-name grep and responsible for more rendered
//    pixels than any utility.
//
// 5. theme-color MUST EQUAL --color-cream. A <meta> content attribute cannot
//    take a CSS variable, so that one hex has to be literal — which makes it
//    the one value in the repo that can silently disagree with its token. So it
//    is not exempted, it is CHECKED: change the cream token and this fails
//    until the meta tag follows.
//
// ── WHAT IS EXEMPT, AND WHY ──────────────────────────────────────────────────
// · Comments, in every rule. This file's own rationale quotes `text-[clamp(…)]`
//   and the audit's hex values; an earlier version flagged its own prose.
// · Inline SVG artwork, for the hex rule only. CLAUDE.md excepts it and the six
//   scenes carry ~36 hexes between them. They are NOT exempt from the palette,
//   type or radius rules — those govern markup.
// · Parked `_`-prefixed pages are reported but do NOT fail the run. Astro never
//   builds them, so nothing in them reaches a visitor. Failing CI on rehearsal
//   space is how a check gets switched off.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );

const files = walk(SRC).filter((f) => /\.(astro|ts|css)$/.test(f));
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
const isParked = (f) => /[\\/]_[^\\/]*\.astro$/.test(f);
const isArtwork = (f) => /Scene\.astro$|[\\/]illustrations[\\/]|SceneVariant\.astro$/.test(f);

/* Blank out comments while KEEPING line numbers, so a finding still points at
   the right line.

   This replaced a per-line heuristic ("does the line start with * or //") that
   could not see this repo's dominant comment style — a /* … *​/ block whose
   continuation lines are plain indented prose with no leading asterisk. The
   rationale blocks in global.css are written that way, and the earlier version
   flagged its own explanation of the type scale as an off-scale type usage.
   A checker that reports its own documentation is worse than no checker. */
const blankComments = (src) => {
  let out = '';
  let i = 0;
  let state = 'code'; // code | block | line | sq | dq | tpl
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (state === 'code') {
      if (c === '/' && n === '*') { state = 'block'; out += '  '; i += 2; continue; }
      if (c === '/' && n === '/') { state = 'line'; out += '  '; i += 2; continue; }
      if (c === "'") state = 'sq';
      else if (c === '"') state = 'dq';
      else if (c === '`') state = 'tpl';
      out += c; i++; continue;
    }
    if (state === 'block') {
      if (c === '*' && n === '/') { state = 'code'; out += '  '; i += 2; continue; }
      out += c === '\n' ? '\n' : ' '; i++; continue;
    }
    if (state === 'line') {
      if (c === '\n') { state = 'code'; out += '\n'; i++; continue; }
      out += ' '; i++; continue;
    }
    // inside a string: copy verbatim so real class names survive
    if ((state === 'sq' && c === "'") || (state === 'dq' && c === '"') || (state === 'tpl' && c === '`')) {
      state = 'code';
    }
    out += c; i++;
  }
  return out;
};

const STOCK =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|' +
  'teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const PROPS =
  'text|bg|border|ring|from|to|via|decoration|divide|placeholder|shadow|fill|' +
  'stroke|outline|accent|caret';

const RULES = [
  {
    id: 'stock palette',
    re: new RegExp('\\b(?:' + PROPS + ')-(?:' + STOCK + ')-[0-9]{2,3}\\b', 'g'),
    hint: "Use a @theme token. If the role has no token, add one — do not reach for Tailwind's defaults.",
  },
  {
    id: 'off-scale type',
    re: /\btext-(?:xl|3xl|4xl|5xl|6xl|7xl|\[[^\]]+\])/g,
    hint: 'The scale is xs/sm/base/lg/2xl plus the text-h1|h2|h3 clamps. Seven steps, no eighth.',
  },
  {
    id: 'off-scale radius',
    re: /(?:^|[\s"'`:[])rounded(?:-(?:sm|md|xl|3xl))?(?![-\w])/g,
    hint: 'Three values only: rounded-lg (8px), rounded-2xl (16px), rounded-full.',
  },
  {
    id: 'raw hex',
    re: /#[0-9a-fA-F]{3,8}\b/g,
    hint: 'Define it in @theme and reference the token. Inline SVG artwork is the one exception.',
    skipFile: isArtwork,
    skipLine: (line) => /^\s*--color-/.test(line) || /name="theme-color"/.test(line),
  },
];

const live = [];
const parked = [];

for (const file of files) {
  const lines = blankComments(fs.readFileSync(file, 'utf8')).split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const r of RULES) {
      if (r.skipFile && r.skipFile(file)) continue;
      if (r.skipLine && r.skipLine(line)) continue;
      const hits = line.match(r.re);
      if (!hits) continue;
      for (const h of new Set(hits)) {
        (isParked(file) ? parked : live).push({
          rule: r.id, hint: r.hint, file: rel(file), line: i + 1, text: h.trim(),
        });
      }
    }
  });
}

// ── Rule 5: the one literal hex that has to exist must match its token ──────
const themeColour = (() => {
  const layout = fs.readFileSync(path.join(SRC, 'layouts', 'BaseLayout.astro'), 'utf8');
  const m = layout.match(/name="theme-color"\s+content="(#[0-9a-fA-F]{3,8})"/);
  const css = fs.readFileSync(path.join(SRC, 'styles', 'global.css'), 'utf8');
  const c = css.match(/--color-cream:\s*(#[0-9a-fA-F]{3,8})/);
  if (!m) return { ok: false, why: 'no <meta name="theme-color"> found in BaseLayout.astro' };
  if (!c) return { ok: false, why: 'no --color-cream found in global.css' };
  const a = m[1].toLowerCase(), b = c[1].toLowerCase();
  return a === b
    ? { ok: true, value: a }
    : { ok: false, why: 'theme-color is ' + m[1] + ' but --color-cream is ' + c[1] + ' — they must agree' };
})();

// ── Report ──────────────────────────────────────────────────────────────────
const group = (arr) => {
  const o = {};
  for (const f of arr) (o[f.rule] = o[f.rule] || []).push(f);
  return o;
};
const byRule = group(live);

console.log('\nDESIGN SYSTEM — source drift check\n');
console.log('  files scanned   ' + files.length + '  (' + files.filter(isParked).length + ' parked, reported but not failing)');
for (const r of RULES) {
  const n = (byRule[r.id] || []).length;
  console.log('  ' + (n ? '✗' : '✓') + ' ' + r.id.padEnd(17) + n);
}
console.log('  ' + (themeColour.ok ? '✓' : '✗') + ' theme-color       ' +
  (themeColour.ok ? 'matches --color-cream (' + themeColour.value + ')' : themeColour.why));

if (live.length) {
  console.log('');
  for (const r of RULES) {
    const hits = byRule[r.id];
    if (!hits) continue;
    console.log('── ' + r.id.toUpperCase() + '\n   ' + r.hint + '\n');
    for (const h of hits.slice(0, 25)) console.log('   ' + h.file + ':' + h.line + '  ' + h.text);
    if (hits.length > 25) console.log('   … and ' + (hits.length - 25) + ' more');
    console.log('');
  }
}

if (parked.length) {
  const pr = group(parked);
  console.log('\n── PARKED PAGES — advisory only, these never build\n');
  for (const k of Object.keys(pr)) console.log('   ' + k.padEnd(17) + pr[k].length);
  console.log('\n   Un-parking one means bringing it onto the current system first.\n');
}

if (live.length || !themeColour.ok) {
  process.exitCode = 1;
} else {
  console.log('\nNo drift. Palette, type scale, radius set and theme-color are intact.\n');
}
