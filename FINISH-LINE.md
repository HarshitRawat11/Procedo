# FINISH LINE — Procedo Infosystems website

**Version:** v1.0 — **UNFROZEN 2026-09-19**
**Locked:** 2026-09-19 · **Unfrozen:** 2026-09-19, the same day
**Drafted:** 2026-09-19 (v0), revised 2026-09-19 (v1), locked 2026-09-19 (v1.0)
**Completion authority:** client work — Procedo Infosystems Pvt. Ltd.
**Acceptance status:** **PROVISIONAL** — awaiting client acceptance.
Record the date and the method here when it arrives; the freeze is final only then.

> **This is a record and a baseline. It is not a gate, and nothing here needs
> permission to change.**
>
> It was locked on 2026-09-19 under a rule that classified every further
> request as a DEFECT or an EXTRA and held the EXTRAs for approval. Harshit
> unfroze it the same day: he had read LOCK as *"lock the finish-line
> document"* rather than *"stop work"*, which is a fair reading of the word and
> not the one the prompt meant. **The freeze rule is gone and is not to be
> reinstated.**
>
> What survives is the useful half: ten routes named and described, ~30
> criteria with measured values and the method used to get them, and a list of
> what was considered and rejected with dates. Beat a threshold and update the
> number. Add a route and add its row. A record that drifts is worse than none.

---

## Decisions taken in the Phase B interview, 2026-09-19

| Question | Answer |
|---|---|
| Three thinner service sections | **Accepted as-is for v1.** No owed item, no gap. Deepening them is open work — see `BACKLOG.md`. |
| Which URL must be live | **`procedoinfo-preview.pages.dev`.** The custom domain is a client action, not a v1 criterion. |
| Proof / process / FAQs | **Out of scope for v1.** Listed in §4. |

## Assumptions, locked by default

Two Phase B questions went unanswered. They were carried through Phase D marked
**"correct them or they lock as written"**, and they were not corrected. They are
therefore part of the locked line — **not confirmed, but binding**:

- **ASSUMED** — no commitment exists to Procedo or any third party beyond what
  this repo records. No deadline, no quoted page count, no demo date, no invoice
  milestone.
- **ASSUMED** — nothing currently in the repo needs removing. Specifically, the
  8 parked preview pages, the untracked `dist-client/` build from 29 August and
  the `deliverables/` folder all stay. None reaches the public site.

Neither was ever confirmed. If one turns out to be wrong, correct it here — it costs nothing now that the freeze is gone.

---

## 1. Definition of Done

### 1.1 Content

**The site is exactly ten routes. A route not on this list is out of scope.**

> **Still ten.** An eleventh page, `/hero-preview`, existed for part of
> 2026-09-20 so a proposed home hero could be judged on the deployed preview.
> It was approved and the component adopted into `components/home/Hero.astro`,
> so the page was deleted the same day. Recorded here because the route briefly
> existed and a future reader may find it in the git history.
>
> **The home page's entry below is otherwise unchanged in substance** — the
> hero still carries a headline, sub, two CTAs, two badges and the five
> competencies. Only their arrangement changed: the competency index moved from
> a card on the right to a full-width numbered list. See `QUALITY-GATES.md`
> batch 3.

| # | Route | Must exist | Status |
|---|---|---|---|
| 1 | `/` | Hero with headline, sub, two CTAs, two badges and the competency index (5, as a full-width numbered list since 2026-09-20); competencies preview; "Who we are"; "Why partner with Procedo?"; closing CTA | **VERIFIED** |
| 2 | `/company` | Header + statement band with `CompanyScene`; overview prose; "What we deliver" (5); "What we stand for" (6 values); "Why partner" (4); closing CTA | **VERIFIED** |
| 3 | `/services` | Header with `RackScene`; all five competencies, each with tagline, intro, groups, bullets and a quote; closing CTA | **VERIFIED** |
| 4 | `/our-mission` | Header; mission statement + body with `QuietScene` panel; Vision and Mission cards; "How we work" (3 principles); closing CTA | **VERIFIED** |
| 5 | `/careers` | Header with `CareersScene`; "Why work with us" (4 culture points); "Roles we hire for" (6); open-application card with `CareersScene`; closing CTA | **VERIFIED** |
| 6 | `/contact` | Header with `ReceptionScene`; four direct channels; office card with map link; "What we can help with" (5); working form; success card with `ReceptionScene` | **VERIFIED** |
| 7 | `/privacy` | Full policy text, `updated` date, contact line | **VERIFIED** |
| 8 | `/terms` | Full policy text, `updated` date, contact line | **VERIFIED** |
| 9 | `/cookies` | Full policy text, `updated` date, contact line | **VERIFIED** |
| 10 | `/404` | `UptimeScene`, heading, body, two recovery CTAs; served for any unmatched route | **VERIFIED** |

**Content criteria, all yes/no:**

- **C1.** All ten routes build and return 200 (404 returns 404 and serves the custom page). — **VERIFIED**
- **C2.** No page contains `lorem`, `TODO`, `FIXME`, `TBD`, `{{ }}`, "coming soon" or `[FILL`. — **VERIFIED: 0 occurrences in `dist/`**
- **C3.** No `<img>` has empty `alt`; no `<a href="#">` reaches the built output. — **VERIFIED: 0 and 0**
- **C4.** Every sentence of marketing copy lives in `src/data/site.ts`, not hard-coded in a `.astro` file. — **VERIFIED**
- **C5.** No claim about Procedo appears that is not traceable to the old-site bundle or a client revision. — **VERIFIED by `scripts/measure-content.cjs`: 0 unattested.** The 11 service bullets that are not verbatim differ by punctuation only, and the gate now prints the bundle text backing each one

**Owed content — assigned to Procedo. Documented here, so v1 is DONE regardless.**

| Item | Owner | Behaviour while missing |
|---|---|---|
| LinkedIn profile URL | Procedo | **VERIFIED** — footer icon hidden, no dead link shipped |
| Cloudflare Web Analytics site token | Procedo | **VERIFIED** — nothing emitted; provider already chosen |
| ~~Legal sign-off on `/privacy`, `/terms`, `/cookies`~~ | Procedo’s legal advisor | **RECEIVED 2026-09-22.** All three stamped with that date. The advisor’s one instruction was to remove the Privacy Policy’s newsletter clause, which had no mechanism behind it; done. |
| DNS cutover to `procedoinfo.com` | Procedo | Preview URL is the v1 deployment |

> **The legal question is closed.** It was the one item where this document and
> the client-facing ones said different things — "v1 is DONE regardless" here,
> "the only thing standing between the site and going live" there. Both were
> true, because they measured different things: completion versus launch. That
> distinction no longer has to be explained, because **the sign-off arrived on
> 2026-09-22.**
>
> **Launch now waits on one thing only: the DNS cutover**, which is Procedo
> pointing procedoinfo.com at this build. The other two owed items — the
> LinkedIn URL and the analytics token — degrade gracefully and never blocked
> anything.

### 1.2 Design

**The visual system as it exists now IS the v1 visual system.** Criterion: no
page deviates from it.

| Component | What it is |
|---|---|
| Palette | Tokens in `global.css` `@theme`: `brand-*` (orange `#F24E1E` family), `navy-*`, `cream #FBFAF8`, `band #F3F4F6`, `line #E5E7EB`. No hard-coded hexes outside inline SVG. |
| Typography | Inter Variable for body and headings; IBM Plex Mono for small eyebrow labels only |
| Layout | `Container`, `PageHeader`, `SectionHeading`; one vertical rhythm — `py-12 lg:py-16` on every band |
| Motion | Scroll reveal, plus shared scene motion in `scene-motion.css` |
| Illustration | Six scenes, one per slot, animal or machine subjects only |
| Theme | Light only |

- **D1.** No page introduces a colour outside the `@theme` tokens (inline SVG artwork excepted). — **VERIFIED**
- **D2.** No page introduces a third typeface. — **VERIFIED**
- **D3.** Responsive floor: **375px, 768px, 1280px**. At each, no horizontal overflow on any of the ten routes. — **VERIFIED at all three. Measured at 768 on 2026-09-19: all ten routes, overflow = 0.**
- **D4.** Every animation sits inside `@media (prefers-reduced-motion: no-preference)`. — **VERIFIED: 0 ungated animations**
- **D5.** Every decorative SVG is either `aria-hidden` or has `role="img"` + `<title>`. — **VERIFIED by `measure-integrity.cjs`**
- **D6.** Keyboard focus produces a visible ring on every focusable element. — **VERIFIED: 2px `brand-500` outline, 2px offset**

### 1.3 Optimization

| # | Criterion | Threshold | Status |
|---|---|---|---|
| O1 | `npm run build` | 0 errors, 0 warnings, 0 hints | **VERIFIED — 0/0/0, 10 pages** |
| O2 | `node scripts/measure-seo.cjs` | passes | **VERIFIED — all 10 pages** |
| O3 | `node scripts/measure-integrity.cjs` | 0 problems | **VERIFIED — 0** |
| O4 | Console errors on load, every route, excluding the 404 route's own 404 status | 0 | **VERIFIED — 0 across all ten** |
| O5 | Wire weight, **every route** | ≤ 100 KB | **VERIFIED — heaviest `/services` 49.9 KB, lightest `/terms` 44.1, all 5 requests. Measured brotli on the built output 2026-09-19; 39.5 KB of each is shared and cached after the first page** |
| O6 | `<title>` length, every page | ≤ 62 chars | **VERIFIED — 29–62** |
| O7 | `meta description` length | 120–160 chars | **VERIFIED — 132–158** |
| O8 | Exactly one `<h1>` per page | exactly 1 | **VERIFIED — 10/10** |
| O9 | Security headers live | CSP + 6 other security headers | **VERIFIED — all 7 sent by the live preview, in ONE `/*` rule; 8 headers counting the preview’s `X-Robots-Tag`** |
| O10 | Preview carries `X-Robots-Tag: noindex` | present | **VERIFIED** |

**Lighthouse is deliberately NOT a criterion.** It is not installed, and adding
it would mean a new dependency to satisfy a number that O1–O10 already cover for
a static site with 5 requests and no framework runtime. This exclusion was
offered for correction in Phase D and was not corrected; adding Lighthouse now
is open work, not a defect.

**O5 is set at double the measured weight, on purpose.** 50.4 KB against a
100 KB ceiling is not a threshold chosen to be flattered — it is headroom for a
future page that needs a real image, so that adding one is a decision rather
than an instant breach.

---

## 2. Deployment criterion

- **DEP1.** `https://procedoinfo-preview.pages.dev` returns **200** and serves
  the current `master` build. — **VERIFIED**
- **DEP2.** A push to `master` builds and publishes without manual steps. —
  **VERIFIED across three consecutive pushes**

A custom domain is **not** required for v1.

---

## 3. Completion authority

This is **client work**. v1 is complete only when **Procedo Infosystems Pvt. Ltd.
accepts it**. Until acceptance is recorded here with a date and the method, the
freeze is **PROVISIONAL**.

The plain-language checklist to send them is **`ACCEPTANCE-CHECKLIST.md`**, at
the repo root. It is the Definition of Done rephrased as tick-boxes, with no
jargon and no file paths.

**Record acceptance here:**

| | |
|---|---|
| Accepted on | *(date)* |
| Accepted by | *(name, role)* |
| Method | *(email / signed document / meeting, with a reference)* |

---

## 4. Considered and NOT built

Everything below was considered, suggested, or partly started, and did not ship
in v1. **This is not a prohibition** — it is the reasoning, so nobody re-proposes
something the client already turned down, or re-derives a decision from scratch.
The ones marked *rejected* are closed; the rest are simply not done yet, and
`BACKLOG.md` tracks those.

**Content**
- Proof material — client names, logos, case studies, testimonials, certifications
- "How a project runs" process section
- FAQs
- Deeper copy for IT Infrastructure, Facilities Security and AV Conferencing
- A longer Vision statement, or focus areas supplied by Procedo
- Blog / MDX — removed 2026-09-10, not wanted
- Newsletter or mailing list — the Privacy Policy mentions one; no mechanism exists, flagged for the legal advisor

**Design**
- Dark mode — rejected by the client 2026-09-12
- Photography — rejected; illustrations instead
- Human figures in illustrations — prohibited by rule 5b
- Any new illustration; the six that exist are the set
- Moving the `/our-mission` illustration beside the page title — rejected 2026-09-18
- An illustration in the home hero — rejected 2026-09-18

**Technical**
- Lighthouse as a gate
- Converting the 64 inline `style="--reveal-delay"` attributes to utility classes
- A hash-locked CSP — proven impossible with Astro's ClientRouter
- Font subsetting — saves ~2 KB against a real risk of a missing glyph
- Migration to Cloudflare Workers static assets
- Any CI pipeline
- Deleting the 8 parked preview pages, `dist-client/` or `deliverables/`

---

## 5. Gap to finish line — **EMPTY**

**Every criterion above is VERIFIED met.** All five gap items are closed.

| # | Gap | How it was closed |
|---|---|---|
| ~~G1~~ | ~~`README.md` says Procedo delivers "telecom, and power & precision systems".~~ | **CLOSED 2026-09-19** — rewritten against what the repo contains: the five shipped competencies, the ten real routes (it listed two deleted ones), Cloudflare rather than Netlify, and the office address no longer described as an unfilled TODO |
| ~~G2~~ | ~~`PROGRESS.md` says "16 pages" and "Deployed: ❌ not yet"; rows marked 🟡 for completed work.~~ | **CLOSED 2026-09-19** — header now 10 pages and deployed; rows 15, 18, 22, 26, 27, 29 and 37 corrected, with row 37's six density figures **re-measured on the built pages** rather than copied forward |
| ~~G3~~ | ~~`CLIENT-PENDING.txt` stale in three places.~~ | **CLOSED 2026-09-19** — analytics is a decided tool needing one token, WhatsApp moved to "already decided", and all six illustrations described as live, which they are |
| ~~G4~~ | ~~Responsive floor at 768px never measured.~~ | **CLOSED 2026-09-19** — measured, all ten routes, overflow = 0 |
| ~~G5~~ | ~~Console errors measured on `/` only.~~ | **CLOSED 2026-09-19** — measured on all ten, 0 |

**There is no remaining work in scope.** What is left belongs to the client:
legal sign-off and the domain cutover, both recorded in §1.1 as owed content
with an owner.

### A non-defect, recorded so it is not re-reported

Driving the nav with a script produces repeated
`InvalidStateError: Transition was aborted because of invalid state` in the
console. It is **not** a visitor-facing defect and **not** a gap item. It is the
View Transitions API refusing to start a transition while the previous one is
still running — caused by clicking links faster than a human can. Verified on
2026-09-19: a fresh tab, a clean load and three human-paced navigations produce
**no console output at all**. Navigation completes correctly either way.

---

## 6. Recording mechanism

| Artifact | Purpose |
|---|---|
| `FINISH-LINE.md` | This document, repo root — the single source of truth for scope |
| `BACKLOG.md` | What is not done yet, and what it needs |
| A block in `CLAUDE.md` | Says this document is a record rather than a gate, so no future session reinstates the freeze |
| Annotated git tag `v1.0` | Points at the freeze commit, so "what shipped as v1" is answerable years later |
| `ACCEPTANCE-CHECKLIST.md` | The client-facing version, ready to send |

**Why this combination:** `CLAUDE.md` is the only file guaranteed to be read at
the start of every session, so the enforcement rule must live there or it will
not survive a new session; the tag makes the freeze point recoverable from git
alone, independently of any file that could later be edited.

---

## Verification commands

```bash
npm run build                        # O1
node scripts/measure-seo.cjs         # O2, O6, O7, O8
node scripts/measure-integrity.cjs   # O3, C3, D5
node scripts/measure-content.cjs     # C5
curl -sS -o /dev/null -w '%{http_code}' https://procedoinfo-preview.pages.dev/   # DEP1
```

---

## Changelog

**v1.0 — 2026-09-19. LOCKED** on Harshit's word. No criterion was added,
removed, or reworded in substance at lock.

- All `PROPOSED` markers removed. §1.3 Optimization and §6 are now binding.
- The two unanswered Phase B assumptions **lock as written**, and are labelled
  *not confirmed, but binding* rather than quietly promoted to fact.
- The Lighthouse exclusion stands, with the reason kept in the document.
- Acceptance status set to **PROVISIONAL**; a table added to §3 to record the
  date, the person and the method when the client accepts.
- A note added to §1.1 reconciling this document with `PROGRESS.md` and
  `CLIENT-PENDING.txt` on the legal sign-off: **the site is complete; the launch
  is the client's to authorise.** Both statements are true and they do not
  conflict.
- **G1, G2 and G3 closed in the lock commit** — the three stale documents
  corrected. §5 is now empty.
- `ACCEPTANCE-CHECKLIST.md`, `BACKLOG.md` and the `CLAUDE.md` operating rule
  created.

**v1 — 2026-09-19.** Two measurements taken and one criterion clarified.

- **G4 CLOSED.** Responsive floor measured at 768px across all ten routes:
  overflow = 0 on every one. D3 is now VERIFIED at all three named widths.
- **G5 CLOSED.** Console errors measured on all ten routes, not just `/`: zero.
- **O4 clarified.** It now excludes the 404 route's own 404 status, which a
  browser logs as a console error by definition and which cannot be "fixed"
  without breaking the criterion it proves.
- **Recorded a non-defect** so a future session does not chase it: the
  `InvalidStateError` seen when a script clicks nav links rapidly is the View
  Transitions API behaving correctly, not a fault.

**v0 — 2026-09-19.** First draft, after a Phase A discovery pass over the repo
and a Phase B interview.
