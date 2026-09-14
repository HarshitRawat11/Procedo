# CLAUDE.md — working agreement for this repo

Marketing website for **Procedo Infosystems Pvt. Ltd.**, an infrastructure-first
technology firm (IT infrastructure, facilities security, AV, digital workplace
services, datacenter infrastructure).

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
5. **`reference/illustration-loop.md`** — the standing procedure for any new
   illustration. Mandatory before writing a single line of SVG; it is a set of
   measured gates, not advice. Its countable checks run via
   `node scripts/measure-svg.cjs <file>`.
6. `reference/inspiration/ANALYSIS.md` — the reference set and what it teaches.

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
One value is still unknown (the LinkedIn URL). It
is wired so that an empty value **hides the feature** rather than rendering a
dead link, an empty card, or a form that silently fails. Preserve that pattern
for any new unknown.

### 4. Confirm before destructive changes
Git is set up and pushed to GitHub (`HarshitRawat11/Procedo`), but there is no CI
or branch protection — **confirm before deleting or overwriting anything**, and
prefer additive changes. Preview work goes in a new file, never on top of a live
page. Uncommitted work still has no undo.

### 5. Concept and preview pages must be sealed off — and are currently parked
Anything not part of the real site must be: not in `nav`, linked from nowhere,
marked `noindex`, and excluded from the sitemap filter in `astro.config.mjs`.

**Parked** pages carry a leading underscore in `src/pages/`
(`_company-preview.astro`), which Astro excludes from routing, so they are not
built and not reachable even locally. To bring one back, drop the underscore —
the sitemap filter still lists them, deliberately, so an un-parked page cannot
walk into the sitemap by accident.

Still parked: `_404-preview` and `_uptime` — older concept pages, no verdict
yet. `_uptime` is the only home `UptimeScene` has, and that scene has no slot on
the real site at all.

**Live, deliberately:** `company-preview` (no underscore), un-parked 2026-09-14
so the rebuilt `CompanyScene` can be reviewed in context. Sealed exactly as
everything else in §5 — noindex, in no nav, linked from nowhere, named in the
sitemap filter. **Park it again once the scene is signed off.**

**Parked again 2026-09-14, on adoption:** `_careers-preview`. `CareersScene`
now ships on the real Careers page, so the preview only duplicates it. Kept
rather than deleted, as a rehearsal space for the next change to that page.

**Parked 2026-09-13, after sign-off:** `_contact-animation-preview`. Added the
same day at Harshit's request, and parked the moment he approved the sequence
(*"i like it"*). Kept rather than deleted because it is the only way to walk the
submission without filing a real enquiry — drop the underscore to bring it back.
What it does: The reception sequence plays once and is
triggered on the real site by actually sending a message, so there was no way to
watch it twice, or to walk the submission that leads to it, without filing a real
enquiry each time. The page renders the real `ContactForm` in the real column
and gives it a replay button, a scrubber, beat jumps and four answers the server
can give: accepted, rejected, network failure, and a genuine live send behind a
`confirm()`. **Only `window.fetch` is stubbed**, and only for the Web3Forms
host — the submit handler, the "Sending…" label, `form.reset()`, the swap to the
card and both error panels are the production code running for real. Everything else in §5 still applies to it — noindex, in no nav,
linked from nowhere, listed in the sitemap filter. **Delete it once the sequence
is signed off.** It is parked, not deleted, so that stays true in reverse: if
the sequence is reopened, un-park it rather than rebuilding it.

**Deleted 2026-09-13** on his instruction, after review: `illustrations-preview`,
`contact-preview`, `contact-preview-b`, `contact-preview-c`, `hero-preview`,
`home-preview`. *The pages went; the illustrations did not.* Every scene
component survives — `RackScene`, `WorkshopScene`, `DeskSceneWorking` and
`SceneVariant` in `src/components/preview/`, `UptimeScene` in
`src/components/` — because all of them are to be refined, not discarded. The
deleted pages are recoverable from commit `3caa023` if ever needed.

`ReceptionScene` was **adopted** in the same review and moved to
`src/components/`. It appears in exactly one place: the contact form's success
card, in `state="hungup"`. The image is the reward for having sent something.
(`/quiet` and `/our-mission-preview` existed under this rule and were deleted —
the first once its illustration was adopted, the second when its illustration
was rejected outright on 2026-09-07.)

### 5b. No human figures in illustrations
**Hard rule, set by Harshit on 2026-09-07.** Illustrations carry animal or
machine subjects only — no people, not even a hand, without his explicit
per-scene approval. The reference set in `reference/inspiration/` is full of
people and draws them well; that is not reproducible at this standard in flat
geometric shapes. Every accepted illustration here has an animal or a machine as
its subject; every rejected one either had human figures or no character at all.
Full reasoning in Gate 0 of `reference/illustration-loop.md`.

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
- **Shared illustration motion lives in `src/styles/scene-motion.css`, once.**
  The cat's breathing and tail, the mug's steam and the wind in the plant and
  grass are defined there and nowhere else; each scene's `<svg>` opts in with
  `data-scene`. Set by Harshit on 2026-09-14 so that changing a common element
  changes it everywhere in one edit. A component's own `<style>` carries only
  what is unique to that scene — a phone ringing, a mouse being clicked, a rack
  LED. Do not re-declare a shared animation inside a component: a scoped rule and
  the global one have the same specificity, and which wins would come down to
  injection order.
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
