# Procedo Infosystems — website

Marketing site for **Procedo Infosystems Pvt. Ltd.**, an infrastructure-first
technology firm delivering digital workplace services, datacenter
infrastructure, IT infrastructure, facilities security, and audio & video
conferencing.

Built with [Astro](https://astro.build) as a static site — no backend, no
database, no runtime JavaScript framework beyond Astro's own client router. It
builds to plain HTML/CSS and can be hosted anywhere that serves files.

- **Working agreement for AI/dev sessions:** [`CLAUDE.md`](./CLAUDE.md)
- **What is in scope, and what is not:** [`FINISH-LINE.md`](./FINISH-LINE.md)
- **Current status and open tasks:** [`PROGRESS.md`](./PROGRESS.md)

---

## Quick start

Requires **Node 18.20.8+ / 20.3+ / 22+** (developed on v24.16.0; the host is
pinned to 22).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload on `:4321` |
| `npm run build` | Type-checks (`astro check`) then builds to `dist/` |
| `npm run build:preview` | `build`, then adds the preview-only `noindex` to `dist/_headers` |
| `npm run preview` | Serves the built `dist/` output locally |
| `npm run deploy:preview` | `build:preview`, then direct-uploads `dist/` to Cloudflare Pages |
| `npm run check` | Type-check only |

### Deploying

The client preview is on **Cloudflare Pages** at
<https://procedoinfo-preview.pages.dev>, git-connected to this repo on `master`.
**A push to `master` builds and publishes.** The project's build command is
`npm run build:preview`, and it must stay that way — plain `npm run build`
deliberately produces a `dist/` with no `noindex`, so a "tidied" build command
would put the preview into search results with unreviewed legal pages on it.

`npm run deploy:preview` still direct-uploads and is now a way to *bypass* the
git build, not the normal route. Anything it publishes is overwritten by the
next push.

The output is fully static, so any static host will serve it. Set the production
domain in `astro.config.mjs` (`site:`), which drives canonical URLs, Open Graph
tags and the sitemap. See `CLAUDE.md` for the header/`noindex` design — it is
the one part of the hosting setup that is easy to break invisibly.

---

## Directory layout

```
├── CLAUDE.md              Working agreement — read this first
├── FINISH-LINE.md         Locked scope: what v1 is, and what is EXTRA
├── BACKLOG.md             One line per EXTRA, held for a later version
├── PROGRESS.md            Status board and progress log
├── CLIENT-PENDING.txt     One page: what the client still owes
├── astro.config.mjs       Astro config: site URL, integrations, sitemap filter
├── postcss.config.mjs     Tailwind v4 via PostCSS (see note in CLAUDE.md)
│
├── src/
│   ├── data/site.ts       ⭐ SINGLE SOURCE OF TRUTH for all site copy
│   ├── pages/             One file per route; a leading _ parks a page
│   ├── components/        Reusable UI; home/ and preview/ hold scoped sets
│   ├── layouts/           BaseLayout — <head>, SEO, header/footer, scroll reveal
│   ├── lib/               Schema builders for the JSON-LD blocks
│   └── styles/            global.css (design tokens) + scene-motion.css
│
├── public/                Served verbatim at the site root
│   ├── _headers           Cloudflare Pages headers: security, CSP, caching
│   ├── robots.txt
│   ├── favicon.png
│   ├── og-default.png     1200×630 social share image
│   └── assets/            procedo-logo.png, procedo-logo-header.png
│
├── scripts/               Build utilities and the measured quality gates
│
└── reference/             ⚠️ Local only — gitignored, never shipped
    ├── procedo/           Original logos + the old site's CSS
    ├── illustration-loop.md
    └── inspiration/       Design references + ANALYSIS.md
```

`scrape/procedo/app.js` (also gitignored) is the minified bundle of Procedo's
previous React site. **Do not delete it** — it is the only surviving source of
the company's real copy.

### Quality gates

Each reads `dist/`, so it checks what a visitor actually gets:

```bash
node scripts/measure-seo.cjs         # titles, descriptions, schema, og, canonicals
node scripts/measure-integrity.cjs   # dead links/anchors, duplicate ids, headings, labels
node scripts/measure-content.cjs     # services copy depth and provenance
node scripts/measure-svg.cjs <file>  # the illustration loop's countable checks
```

### Routes

Ten routes, and that is the whole site.

| Route | Purpose |
|---|---|
| `/` | Home — hero, competencies, who we are, why Procedo |
| `/company` | Overview, core values, why partner with us |
| `/services` | The five core competencies in detail |
| `/our-mission` | Vision, mission, guiding principles |
| `/careers` | Culture and the disciplines Procedo hires for |
| `/contact` | Contact channels and enquiry form |
| `/privacy`, `/terms`, `/cookies` | Legal |
| `/404` | Custom not-found page, served for any unmatched route |

Files in `src/pages/` with a **leading underscore** are parked concept and
preview pages. Astro excludes them from routing, so they are not built and not
reachable, even locally. They are kept as rehearsal space; drop the underscore
to bring one back — and read the notes in `CLAUDE.md` §5 first, because a parked
preview drifts from its live page the moment either is edited.

---

## Governance

Rules that keep the site accurate and maintainable. The full rationale is in
[`CLAUDE.md`](./CLAUDE.md).

**1. Content changes go in `src/data/site.ts`.**
Nearly all site text — headings, service lists, values, careers, legal copy,
contact details — lives in that one file, with comments explaining each block.
You should not need to touch a `.astro` file to change wording.

**2. Never invent facts about the company.**
No founding dates, client names, numbers, certifications or testimonials without
a verified source. Real copy is recovered from `scrape/procedo/app.js`.

**3. Unknown values must hide their feature, not fake it.**
One value is still unknown — the LinkedIn URL — and it is wired so an empty
value hides the footer icon. No dead links, no empty cards, no forms that
silently fail.

**4. Experiments are additive.**
Build previews as new pages rather than editing live ones, and confirm before
deleting anything — there is no CI or branch protection here, only git history.

**5. Keep it accessible.**
All motion is gated behind `prefers-reduced-motion`. Keep semantic markup, real
form labels and visible focus states.

**6. Verify before calling it done.**
`npm run build` runs a type-check first and must pass with zero errors.

**7. Scope is locked.**
`FINISH-LINE.md` defines v1. A request is either a DEFECT (a criterion written
there is failing) or an EXTRA (everything else, which goes to `BACKLOG.md`).
Reopening scope takes the explicit word UNFREEZE.

---

## Licence & ownership

All content, logos and imagery are the property of Procedo Infosystems Pvt. Ltd.
The `reference/` and `scrape/` folders contain third-party and archival material
for local reference only and are excluded from version control and the build.
