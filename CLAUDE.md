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

This has been broken twice by accident and both times the copy that escaped was
copy nobody thought of as copy: the 404's whole page (moved back 2026-09-18) and
then the Contact page's section headings, its form's lead and its success card,
plus two blocks on Careers (moved back the same day). Section headings and form
furniture are still sentences a client will want to change.

**How to check:** the pattern is text sitting between tags with no `{}` in it.
An `<svg>`'s `<title>` is the one exception — that is alt text, not copy.

  ```bash
  grep -rn '>[A-Z][a-z].\{15,\}<' src/pages src/components --include=*.astro
  ```

### 2b. The home page and 404 titles and descriptions are SEO surfaces
`site.homeTitle` is the home page's `<title>` and nothing else's; every other
page builds `Page | Procedo Infosystems` from its own `title` prop.
`site.description` is the default `<meta name="description">` AND the
`description` on the Organization and WebSite schema nodes.

Keep titles at or under ~60 characters and descriptions between 120 and 160.
Both were out of band until 2026-09-18 — the home title was 106 characters, so a
searcher saw the brand and then nothing about what Procedo sells, and the
description was 215, which truncated mid-list and hid two of the five
competencies. `node scripts/measure-seo.cjs` counts them on the built output.

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
yet. `_uptime` was the only home `UptimeScene` had until 2026-09-18; that scene
now ships on the **404**, so the page is a rehearsal space rather than a
lifeboat.

**Parked again 2026-09-14, on adoption:** `_careers-preview` and
`_company-preview`. `CareersScene` ships on the real Careers page and
`CompanyScene` on the real Company page, so both previews only duplicate what is
live. Kept rather than deleted, as the rehearsal space for the next change to
each page. Note that a parked preview **drifts from its live page the moment
either is edited** — un-parking one means copying the live section back into it
first, not trusting what is in the file.

**EVERY preview page is parked.** There is no un-parked one and no open
question; `src/pages/` contains only the real site plus underscored files.

**Parked 2026-09-18, with verdicts:**
- `_our-mission-preview` — **rejected**. Harshit: *"we will go with our-mission
  as it is and its preview is rejected."* On `/our-mission` the illustration
  stays beside the mission STATEMENT, not beside the page title. That is
  deliberately the opposite of `/careers` and `/contact`, so do not "fix" the
  inconsistency: on those two the image is a small bare ornament filling white
  space beside a heading, while here it is a panel with a chip and a caption
  that argues a point, and an argument belongs next to the claim it supports.
- `_hero-preview` — **rejected**. Harshit: *"the hero page will not have any
  image it will be same as the current one."* The home hero keeps its competency
  index card. RackScene went to `/services` instead.
- `_services-preview` — **superseded**. The header slot was right and the scene
  was wrong: UptimeScene went to the 404, RackScene took this header, and both
  are live, so the page only duplicates `/services` with the wrong picture in it.

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

**An adopted scene moves out of `components/preview/` into `components/`** in
the commit that adopts it, and its header comment gains a `WHERE IT IS USED`
line. Five have made that trip: `QuietScene` (/our-mission and the contact
success card), `ReceptionScene` (the contact success card), `CareersScene` (the
Careers open-application card), `CompanyScene` (the Company statement band) and
`RackScene` (the Services page header, adopted 2026-09-18). What is left in
`components/preview/` is therefore exactly the set that has no home yet.

**Deleted 2026-09-14** on his instruction, once their replacements had shipped:
`WorkshopScene` (replaced by `CompanyScene`), `DeskScene` and `DeskSceneWorking`
(replaced by `CareersScene`). All three had become unreachable. Recoverable from
commit `9aeddcf`, but there is no reason to: `WorkshopScene` failed Gate 1b at
29.7% cream / 7.2% dark, and the desk monitor was 4.6% flat dark on a 5% budget.
This is the one place where an illustration did NOT survive its page — and the
rule above still holds, because what changed is that a better one was live first.

**What is left in `src/components/preview/` is therefore exactly ONE file:**
`SceneVariant`, the 404 comparison strip used by `_404-preview`. Every scene the
site draws now has a page:

| scene | where it lives |
|---|---|
| `QuietScene` | `/our-mission`, and the contact form's success card |
| `ReceptionScene` | `/contact` header, and the form's success card |
| `CareersScene` | `/careers` header, and the open-application card |
| `CompanyScene` | `/company` statement band |
| `RackScene` | `/services` header |
| `UptimeScene` | the **404**, adopted 2026-09-18 |

`UptimeScene` was the last scene with nowhere to go for weeks. It went to the
404 because the picture is what that page has to say — a storm outside, the lamp
still lit, the cat asleep through it: something went down and nothing else
noticed. The 404's heading moved with it. The old one, "This page isn't on the
rack", was a joke that only worked while the picture was a cat on a server rack;
all of that page's copy now lives in `site.ts` as `notFound`.

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
- **Custom element styles MUST live in `@layer base`.** Tailwind v4 puts its
  utilities in `@layer utilities`, and an UNLAYERED rule beats a layered one
  however specific the layered one is — that is the cascade-layers rule, not a
  specificity contest. While `h1,h2,h3,h4 { color }` sat outside a layer in
  `global.css` it silently overrode every `text-*` utility on every heading on
  the site, and the closing CTA's `<h2 class="… text-white">` rendered navy on a
  navy card: an invisible heading on every page, in the production build.
  Found 2026-09-17 by a contrast audit reporting it as 1.00:1; nothing else
  would have caught it, because ~35 headings ask for the navy that rule already
  gave them and looked correct by accident. Fixed by wrapping the base block.
  Do not unwrap it, and do not add a bare element selector outside the layer.
- **Brand orange is not a text colour at `brand-500`.** Measured: white on
  `#F24E1E` is 3.57:1 against a 4.5 requirement, and `brand-500` as text on
  cream is 3.42. Since 2026-09-17 buttons fill with **`brand-600`** (white on it
  = 4.59) and orange reading text is **`brand-700`** (6.09 on cream). `brand-500`
  stays for the logo, the hairline eyebrow ticks, blockquote borders, the
  blurred glow and icons — all non-text, where the bar is 3:1 and it clears at
  3.42. The hero's "intelligently" also stays at `brand-600`: it is 40px, so the
  large-text bar is 3:1 and it passes at 4.40.
- **The site is light-only.** There is no dark mode and no `prefers-color-scheme`
  handling anywhere. Adding one is a whole-site decision, not a per-component tweak.
- **Anything you put on `<html>` from JavaScript must be re-applied on
  `astro:after-swap`.** The `ClientRouter` copies the incoming document's root
  attributes over the live ones, and the incoming document is static HTML — so a
  class added at runtime is silently wiped on every client-side navigation. This
  is what broke scroll-reveal site-wide: `.reveal` survived only on the page you
  landed on, so a visitor clicking through the nav saw content simply appear,
  and going back to a page that had animated a minute earlier did nothing.
  Fixed 2026-09-16 in `BaseLayout.astro`; `after-swap` runs before paint, so
  restoring the class there causes no flash. If dark mode is ever added, its
  root class has the identical problem.
- **`SectionHeading` reveals itself** (`reveal` prop, default `true`). Section
  headings were the largest unrevealed blocks on the site, ~325px each. Pass
  `reveal={false}` where an ancestor already carries `data-reveal` and should
  reveal as one block — nesting two reveals fades the same pixels twice. Exactly
  one place does: the "Who we are" column on the home page.
- **Vertical rhythm is one scale: `py-12 lg:py-16` on every band.** 48px at
  mobile, 64px at desktop, and that is the whole system — a full-width `<section>`
  gets it, and nothing else gets more. Set 2026-09-14 when Harshit asked for the
  empty space across the site to come down.

  What it replaced: `py-16 lg:py-24` on inner pages and `py-20 lg:py-28` on the
  home page and the closing CTA. Two sections' padding adds up, so a boundary was
  192px of padding before a single margin was counted, and measured gaps between
  blocks ran 161–329px at 1280. They now run 48–166. Roughly **11–12% of every
  main page was empty space**, and the content did not change.

  The rest of the scale, for the four things that are not plain sections:

  | | |
  |---|---|
  | `PageHeader` | `pt-10 pb-10 lg:pt-14 lg:pb-12` (`main` already clears the fixed header with `pt-16 lg:pt-[4.5rem]`) |
  | `Hero` | `pb-14 pt-24 sm:pb-16 lg:pb-16 lg:pt-28` — the tall `pt` is header clearance, since the home hero overlaps it |
  | `ClosingCta` | `py-12 lg:py-16` outside, `py-12 lg:py-14` on the navy card inside. It used to carry 112 + 80 = 192px above its own heading |
  | `Footer` | `py-12 lg:py-16` on its Container |

  Inside a section, `mt-12` is the standing gap between a `SectionHeading` and
  whatever it introduces. Do not invent a new value; if a band needs to breathe
  more than the scale allows, that is a signal the content is wrong, not the
  padding.

  **Equal-height cards are the other source of holes, and they do not always
  earn it.** A row of cards should align; a two-up panel whose halves carry very
  different amounts of copy should not. `lg:items-start` on the grid — plus
  removing the `flex-1` that pushes a card's tail block down — is the fix, and it
  is what killed 176px of dead white on `/contact` and about 160 in the Vision
  panel on `/our-mission`. Roles and competency cards keep their stretch on
  purpose: their "Apply"/"Learn more" links line up across the row.

## Commands

```bash
npm run dev             # dev server on :4321
npm run build           # astro check && astro build → dist/
npm run preview         # serve the built output
npm run build:preview   # build, then add the preview-only noindex to dist/_headers
npm run deploy:preview  # build:preview, then push dist/ to Cloudflare Pages
```

Dev server launch configs are in `.claude/launch.json` as `procedo-dev` and
`procedo-preview` (both port 4321).

### Hosting: the preview is on Cloudflare Pages

**Live at https://procedoinfo-preview.pages.dev** — project `procedoinfo-preview`,
production branch `main`, deployed by direct upload. Moved there 2026-09-18.

Netlify had refused every build since 14 September — six consecutive *"Skipped
due to account credit usage exceeded"* — while its own API reported
`credits used: 0`, so the last deploy it accepted was 19 commits stale. Direct
uploads still worked, which is how the site was got current, but `--prod` came
back `Forbidden` and only a `restoreSiteDeploy` call would publish.

**DEPLOYS ARE MANUAL.** The project has no Git provider attached, so a push does
NOT publish — run `npm run deploy:preview`. Connecting the repo is a dashboard
job (it needs a GitHub OAuth grant) and has not been done. Until it is, pushing
and deploying are two separate acts; do both, or the URL goes stale the way the
Netlify one did.

**Two wrangler gotchas, both cost time on 2026-09-18:**

1. Wrangler 4.135+ **delegates `wrangler pages …` into Workers static assets**,
   where it reinterprets the command and dies with *"Missing entry-point to
   Worker script or to assets directory"*. Pass `--force` to reach classic Pages
   — but **only on `pages project create`, and only once**. Once the project
   exists, every later command runs against Pages directly and `--force` is
   wrong. `npm run deploy:preview` therefore does not carry it, and that is
   deliberate rather than an omission.
2. That delegation is Cloudflare folding Pages into Workers. This setup is on
   the older product on purpose — it is what the account's other two projects
   use and what `_headers` is guaranteed to support — but **expect to migrate to
   Workers static assets eventually.** When that happens, re-check `_headers`
   support first: the entire noindex design below depends on it.

`netlify.toml` is kept as a fallback until Harshit says the Cloudflare URL is
signed off, then it and the repo connection both go. Its header maps each of its
parts to what replaced it.

**THE ONE RULE THAT MATTERS HERE: the preview's `X-Robots-Tag: noindex, nofollow`
must never be committed.** `netlify.toml` could hold it safely because it sat at
the repo root and was never copied into `dist/`. Cloudflare Pages has no
root-level header config — its only mechanism is a `_headers` file *inside the
build output*, so anything in it ships wherever the build ships. Put the noindex
in `public/_headers` and the day procedoinfo.com launches from this repo, the
launch is silently de-indexed.

So the split is:

| | |
|---|---|
| `public/_headers` | rules that are correct **in production too** — `nosniff`, `Referrer-Policy`, and the immutable cache on `/_astro/*`. Committed. |
| `scripts/preview-headers.cjs` | appends the noindex to `dist/_headers`. Run by `build:preview`, **never** by `build`. |

A production build therefore cannot contain the rule. Verify with:

```bash
npm run build && grep -cE '^[[:space:]]+X-Robots-Tag:' dist/_headers   # 0
npm run build:preview && grep -cE '^[[:space:]]+X-Robots-Tag:' dist/_headers   # 1
```

Two things still make the noindex necessary: the legal pages have not been
reviewed (PROGRESS.md #5), and an indexed preview would compete with
procedoinfo.com for its own terms. Cloudflare adds a noindex to *non-production*
deployments by itself, but the preview is deployed as its project's production
deployment — that is what gives it a stable URL rather than a hash-prefixed one
— so the automatic protection does not apply.

`site` in `astro.config.mjs` still points at `https://www.procedoinfo.com`, so
canonicals on the preview point at the production domain. That is deliberate and
is the second layer.

---

## Tone of voice

Procedo's real copy is confident and engineering-led — *"Power without precision
is chaos. Precision without power is limitation."* Match that register:
plain, precise, quietly authoritative. Avoid hype, exclamation marks, and
consumer-app jokiness. British/Indian English spelling is fine; be consistent
with what is already in `site.ts`.
