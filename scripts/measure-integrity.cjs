// Gate 3 — link, anchor and accessibility integrity on the BUILT output.
//
//   node scripts/measure-integrity.cjs
//
// Why it exists. The site has gates for illustrations (measure-svg,
// measure-density, measure-balance), for copy (measure-content) and for the
// <head> (measure-seo). Nothing checked the things that break quietly as pages
// get edited: a footer link to an anchor that was renamed, a heading level
// skipped when a section was restructured, two elements sharing an id because a
// component was rendered twice.
//
// None of these show up in `astro build`, and none of them are visible unless
// you happen to click the exact link. All of them are one parse away.
//
// It reads dist/, so it sees what a visitor gets after every component and
// every prop has resolved.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(ROOT)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(2);
}

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(ROOT);

/* route -> { ids, html } so cross-page anchors can be resolved */
const site = new Map();
const routeOf = (file) =>
  '/' + path.relative(ROOT, file).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  site.set(routeOf(f), { html, ids, file: f });
}

const problems = [];
const note = (route, kind, detail) => problems.push({ route, kind, detail });

/* Strip the bits that are not page content: inline scripts carry JS with
   quotes that look like attributes, and SVG <title> is alt text. */
const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');

for (const [route, page] of site) {
  const html = strip(page.html);

  /* ── duplicate ids ───────────────────────────────────────────────────── */
  const seen = new Map();
  for (const id of page.ids) seen.set(id, (seen.get(id) || 0) + 1);
  for (const [id, n] of seen) if (n > 1) note(route, 'duplicate id', `#${id} appears ${n} times`);

  /* ── internal links and fragments ────────────────────────────────────── */
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) {
      if (href.startsWith('#')) {
        const id = decodeURIComponent(href.slice(1));
        if (id && !page.ids.includes(id)) note(route, 'dead anchor', `${href} — no element with that id on this page`);
      }
      continue;
    }
    if (!href.startsWith('/')) continue; // relative assets, left alone
    const [p0, frag] = href.split('#');
    const target = p0.endsWith('/') || p0 === '' ? p0 || '/' : p0 + '/';
    const alt = p0; // some links omit the trailing slash
    const hit = site.get(target) || site.get(alt) || site.get(alt + '/');
    const isAsset = /\.[a-z0-9]{2,5}$/i.test(p0);
    if (!hit && !isAsset) {
      note(route, 'dead link', `${href} — no such page in dist/`);
      continue;
    }
    if (hit && frag && !hit.ids.includes(decodeURIComponent(frag))) {
      note(route, 'dead anchor', `${href} — ${p0} has no #${frag}`);
    }
  }

  /* ── heading order ───────────────────────────────────────────────────── */
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) note(route, 'headings', `${h1s} <h1> elements, expected exactly 1`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      note(route, 'headings', `h${levels[i - 1]} followed by h${levels[i]} — a level is skipped`);
      break; // one report per page is enough to act on
    }
  }

  /* ── images ──────────────────────────────────────────────────────────── */
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) note(route, 'img', 'an <img> has no alt attribute');
  }

  /* ── decorative vs labelled svg ──────────────────────────────────────── */
  for (const m of html.matchAll(/<svg\b[^>]*>/g)) {
    const tag = m[0];
    const labelled = /aria-labelledby=|aria-label=|role="img"/.test(tag);
    const hidden = /aria-hidden="true"/.test(tag);
    if (!labelled && !hidden) note(route, 'svg', 'an <svg> is neither aria-hidden nor labelled');
  }

  /* ── form controls need a real label ─────────────────────────────────── */
  const labelFor = new Set([...html.matchAll(/<label\b[^>]*\sfor="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
    const tag = m[0];
    if (/type="(hidden|submit|button)"/.test(tag)) continue;
    /* A control that is display:none is not presented to anyone — it is out of
       the accessibility tree as well as off the screen — so "it has no label"
       is not a finding. The one on /contact is Web3Forms' honeypot, which is
       SUPPOSED to be invisible and unlabelled: a label would tell a spam bot
       exactly what it is for. Without this skip the gate reports a problem that
       must not be fixed, and a gate that cries wolf stops being read. */
    if (/\bhidden\b/.test(tag) || /display:\s*none/.test(tag)) continue;
    const id = (tag.match(/\sid="([^"]+)"/) || [])[1];
    const labelled = (id && labelFor.has(id)) || /aria-label=|aria-labelledby=/.test(tag);
    if (!labelled) note(route, 'form', `<${m[1]}${id ? ' #' + id : ''}> has no label`);
  }
}

/* ── report ───────────────────────────────────────────────────────────── */
const pad = (s, n) => String(s).padEnd(n);
console.log('\nINTEGRITY — built output\n');
console.log(pad('pages', 8) + site.size);
console.log(pad('problems', 8) + problems.length + '\n');

if (problems.length) {
  const byKind = {};
  for (const p of problems) (byKind[p.kind] ||= []).push(p);
  for (const [kind, list] of Object.entries(byKind)) {
    console.log(kind.toUpperCase() + '  (' + list.length + ')');
    for (const p of list) console.log('  ' + pad(p.route, 18) + p.detail);
    console.log('');
  }
  process.exitCode = 1;
} else {
  console.log('No dead links, dead anchors, duplicate ids, skipped heading levels,');
  console.log('unlabelled images, unlabelled SVGs or unlabelled form controls.');
}
