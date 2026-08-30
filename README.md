# Procedo Infosystems — website

Marketing site for **Procedo Infosystems Pvt. Ltd.**, an infrastructure-first
technology firm delivering integrated IT infrastructure, facilities security,
audio-visual, telecom, and power & precision systems.

Built with [Astro](https://astro.build) as a static site — no backend, no
database, no runtime JavaScript framework. It builds to plain HTML/CSS and can be
hosted anywhere that serves files.

- **Working agreement for AI/dev sessions:** [`CLAUDE.md`](./CLAUDE.md)
- **Current status and open tasks:** [`PROGRESS.md`](./PROGRESS.md)

---

## Quick start

Requires **Node 18+** (developed on v24.16.0).

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
| `npm run preview` | Serves the built `dist/` output locally |
| `npm run check` | Type-check only |

### Deploying

`npm run build` produces a fully static `dist/` folder. Point any static host
(Netlify, Vercel, Cloudflare Pages, S3, nginx) at it — no server runtime needed.
Set the production domain in `astro.config.mjs` (`site:`), which drives canonical
URLs, Open Graph tags and the sitemap.

---

## Directory layout

```
├── CLAUDE.md              Working agreement — read this first
├── PROGRESS.md            Status board and progress log
├── astro.config.mjs       Astro config: site URL, integrations, sitemap filter
├── postcss.config.mjs     Tailwind v4 via PostCSS (see note in CLAUDE.md)
│
├── src/
│   ├── data/site.ts       ⭐ SINGLE SOURCE OF TRUTH for all site copy
│   ├── pages/             One file per route
│   ├── components/        Reusable UI; home/ holds homepage-only sections
│   ├── layouts/           BaseLayout — <head>, SEO, header/footer, scroll reveal
│   └── styles/global.css  Design tokens (@theme) and base styles
│
├── public/                Served verbatim at the site root
│   ├── favicon.png
│   ├── og-default.png     1200×630 social share image
│   └── assets/            procedo-logo.png
│
├── scripts/               One-off Node utilities (favicon crop, OG image build)
│
└── reference/             ⚠️ Local only — gitignored, never shipped
    ├── procedo/           Original logos + the old site's CSS
    └── inspiration/       Design references + ANALYSIS.md
```

`scrape/procedo/app.js` (also gitignored) is the minified bundle of Procedo's
previous React site. **Do not delete it** — it is the only surviving source of
the company's real copy.

### Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, competencies, who we are, why Procedo |
| `/company` | Overview, core values, why partner with us |
| `/services` | The five core competencies in detail |
| `/our-mission` | Vision, mission, guiding principles |
| `/careers` | Culture and the disciplines Procedo hires for |
| `/contact` | Contact channels and enquiry form |
| `/privacy`, `/terms`, `/cookies` | Legal |
| `/quiet` | 🧪 Concept page — illustration study, not part of the site |
| `/our-mission-preview` | 🧪 Placement mock-up, pending a keep/bin decision |

Pages marked 🧪 are `noindex`, linked from nowhere, and excluded from the sitemap.

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
Anything still marked `TODO` in `site.ts` (currently: office address, LinkedIn
URL) is wired so an empty value hides the relevant UI. No dead links, no empty
cards, no forms that silently fail.

**4. Experiments are additive.**
Build previews as new pages rather than editing live ones, and confirm before
deleting anything — there is no CI or branch protection here, only git history.

**5. Keep it accessible.**
All motion is gated behind `prefers-reduced-motion`. Keep semantic markup, real
form labels and visible focus states.

**6. Verify before calling it done.**
`npm run build` runs a type-check first and must pass with zero errors.

---

## Licence & ownership

All content, logos and imagery are the property of Procedo Infosystems Pvt. Ltd.
The `reference/` and `scrape/` folders contain third-party and archival material
for local reference only and are excluded from version control and the build.
