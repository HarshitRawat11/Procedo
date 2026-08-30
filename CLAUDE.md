# CLAUDE.md — working agreement for this repo

Marketing website for **Procedo Infosystems Pvt. Ltd.**, an infrastructure-first
technology firm (IT infrastructure, facilities security, AV, telecom, power &
precision systems).

---

## Prime objective

Ship a fast, accurate, accessible brochure site that wins enquiries.
**The client has already signed off on the theme and visual style.** The work is
filling in and refining *content*, not redesigning.

When in doubt, ask: does this help a prospective client understand what Procedo
does and get in touch? If not, it is probably out of scope.

---

## Read order for a new session

1. **`CLAUDE.md`** (this file) — the rules.
2. **`PROGRESS.md`** — what is done, what is blocked, what is next. Start work here.
3. **`src/data/site.ts`** — the single source of truth for all site copy.
4. The specific page or component you are changing, under `src/pages/` or `src/components/`.
5. `reference/inspiration/ANALYSIS.md` — only if doing visual/illustration work.

Do not read `scrape/procedo/app.js` cover to cover; it is a 1 MB minified
bundle. Grep it (see below).

---

## Hard constraints

### 1. Never invent facts about Procedo
No founding dates, client names, project counts, certifications, testimonials,
office locations or statistics unless they come from a verified source. This is
the most important rule in the repo.

**The verified source of real copy is `scrape/procedo/app.js`** — the minified
bundle of Procedo's previous React site. It contains the genuine vision, mission,
core values, "why partner" props, careers roles and legal text. Extract with:

```bash
grep -oE '"[A-Z][A-Za-z0-9 ,.&:;'"'"'’—–\-()/%+]{14,400}"' scrape/procedo/app.js | sort -u
```

…then an `awk` substring window around a known phrase for surrounding context.

> Historical note: this repo once contained `CONTENT.md` and `scrape/*.html`
> belonging to a **different company** (Aviator Infotech), left over from an
> earlier project. All of it was deleted on 2026-08-27. If anything resembling
> Aviator content reappears, it is not Procedo's — do not use it.

### 2. All copy lives in `src/data/site.ts`
Pages read from it; they do not hard-code sentences. A non-developer must be able
to change site text by editing that one file. If you are about to type a sentence
of marketing copy into a `.astro` file, stop and put it in `site.ts` instead.

### 3. Missing data degrades gracefully — never show a placeholder
Two values are still unknown (office address, LinkedIn URL). Each
is wired so that an empty value **hides the feature** rather than rendering a
dead link, an empty card, or a form that silently fails. Preserve that pattern
for any new unknown.

### 4. Confirm before destructive changes
Git was initialized 2026-08-30, but nothing is pushed anywhere and there is no CI
or branch protection — **confirm before deleting or overwriting anything**, and
prefer additive changes. Preview work goes in a new file, never on top of a live
page. Uncommitted work still has no undo.

### 5. Concept and preview pages must be sealed off
Anything not part of the real site must be: not in `nav`, linked from nowhere,
marked `noindex`, and excluded from the sitemap filter in `astro.config.mjs`.
Current examples: `/quiet`, `/our-mission-preview`.

### 6. Accessibility is not optional
- Every animation sits inside `@media (prefers-reduced-motion: no-preference)`.
- Decorative SVG gets `role="img"` + `<title>`; pure decoration gets `aria-hidden`.
- Keep semantic headings, real `<label>`s, and visible focus states.

### 7. Verify before reporting done
Run `npm run build` (it runs `astro check` first). If a change is visible in the
browser, load it and check it. Report what actually happened, including failures.

---

## Stack & gotchas

| | |
|---|---|
| Framework | Astro 6.4.6, static output |
| Styling | Tailwind v4.3.1 **via PostCSS**, not `@tailwindcss/vite` |
| Icons | `astro-icon` + Lucide, inlined at build time (zero runtime JS) |
| Fonts | Inter Variable (body/headings), IBM Plex Mono (small labels only) |
| Node | v24.16.0 |
| OS | Windows 11. Shell is PowerShell; a bash tool is also available |

- **Tailwind must stay on PostCSS.** Astro 6 ships a rolldown-based Vite whose
  native resolver breaks the Tailwind Vite plugin. See `postcss.config.mjs`.
- **Design tokens live in `src/styles/global.css`** under `@theme`. Use the
  tokens (`brand-*`, `navy-*`, `cream`, `band`, `line`) — do not hard-code hexes
  in components. Inline SVG artwork is the one exception.
- **The site is light-only.** There is no dark mode and no `prefers-color-scheme`
  handling anywhere. Adding one is a whole-site decision, not a per-component tweak.

## Commands

```bash
npm run dev      # dev server on :4321
npm run build    # astro check && astro build → dist/
npm run preview  # serve the built output
```

Dev server launch configs are in `.claude/launch.json` as `procedo-dev` and
`procedo-preview` (both port 4321).

---

## Tone of voice

Procedo's real copy is confident and engineering-led — *"Power without precision
is chaos. Precision without power is limitation."* Match that register:
plain, precise, quietly authoritative. Avoid hype, exclamation marks, and
consumer-app jokiness. British/Indian English spelling is fine; be consistent
with what is already in `site.ts`.
