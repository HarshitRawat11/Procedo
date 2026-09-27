# BACKLOG

What is not done yet, and what each thing actually needs.

This is a working list, not a holding pen — nothing here needs permission to
start. It exists so that "what's left?" has an answer that does not depend on
anyone's memory. **Most of it is blocked on Procedo, not on work**, and the
column that matters is *what it needs*.

`FINISH-LINE.md` §4 explains anything here that was considered and set aside,
with dates and who decided.

---

## Blocked on Procedo

Nothing in this section can be started without them. `CLIENT-PENDING.txt` is the
same list written for the client to read.

| Item | What it needs | Effect while missing |
|---|---|---|
| ~~**Legal sign-off**~~ | **DONE 2026-09-22.** One instruction: remove the Privacy Policy’s newsletter clause. Done, and all three pages restamped | **Was the only launch blocker.** Launch now waits on the DNS cutover alone |
| **DNS cutover** to procedoinfo.com | Their say-so plus DNS access | Preview URL is the live deployment. ~15 minutes once approved |
| **LinkedIn URL** | One URL | Footer icon hides itself. No dead link ships |
| **Cloudflare Web Analytics token** | 32 hex characters from their dashboard | Nothing is measured. Provider already chosen and wired |
| **Deeper copy** for IT Infrastructure, Facilities Security, AV Conferencing | Their words. **Asked concretely 2026-09-19** — `CLIENT-PENDING.txt` item 5 shows the gap in their own sentences and says exactly what each section needs | Those three sections are visibly thinner than the two they revised: the page tapers from 2924px to 1631px as you scroll |
| **Proof material** — client names, logos, case studies, OEM authorisations, ISO/MSME | Permission to publish, and the material | No third-party proof anywhere on the site |
| **"How a project runs"** process section | Four to six steps in their words | The site cannot answer "what happens after I call you" |
| **FAQs** | Five or six real questions with their answers | — |
| **A longer Vision statement** | Their words | Current one is short but real |

### Finding, 2026-09-19: the three thin sections cannot be fixed without them

Measured by `scripts/measure-content.cjs`:

| | groups | items | avg chars | intro |
|---|---|---|---|---|
| Client-revised (digital workplace, datacenter) | 4 | 12 | **59** | **214** |
| From the old site (IT infra, facilities security, AV) | 3–4 | 9–12 | **32** | **132** |

The two Procedo revised in September are nearly twice the depth of the three
they have not touched. **The gap is in the source, not in the transcription** —
the old React bundle was searched on 2026-09-19 and contains no further copy for
those three. Every sentence that exists has already been used.

So the options are their words, or invented words, and rule 1 rules out the
second. **This is a question for Procedo, not a task.**

---

## Not blocked — nobody has asked for it

Honest assessment attached to each, including the ones not worth doing.

| Item | Worth doing? |
|---|---|
| **Lighthouse as a gate** | **Probably not.** It means a new dependency to produce a number that O1–O10 already cover for a static site with 5 requests and no framework runtime. Reconsider if the site ever gains real images or third-party scripts |
| **64 inline `style="--reveal-delay"` → utility classes** | **Only as a means to an end.** Six distinct delay values across ~20 call sites. It removes one of the two blockers to a hash-locked CSP — but not the other, so on its own it buys nothing |
| **Hash-locked CSP** | **No — proven impossible.** Astro's ClientRouter neuters already-run scripts with a `data:application/javascript,` URL, which no hash and not even `strict-dynamic` will allow. Tried twice, both broke the site. `public/_headers` records the full finding |
| **Font subsetting** | **No.** Saves ~2 KB against a real risk of a missing glyph |
| **Migration to Workers static assets** | **Not yet, but expect it.** Cloudflare is folding Pages into Workers. Re-check `_headers` support first — the whole preview `noindex` design depends on it |
| ~~**Any CI pipeline**~~ | **DONE 2026-09-22.** `.github/workflows/ci.yml` runs the build and eight checks on every push to `master` and on every pull request |
| ~~**Branch protection**~~ | **DONE 2026-09-25**, which is what made CI preventive rather than reporting-only. A ruleset on `master` requires a pull request and a green `verify` before merge, with **no bypass actors, including the owner**. `git push origin master` is refused. Committed at `.github/rulesets/master.json`; `scripts/verify-branch-protection.cjs` fails if github.com stops matching it |
| **Deleting the 8 parked previews, `dist-client/`, `deliverables/`** | **No.** None reaches the public site, and each parked page is rehearsal space for the next change to its live page |

---

## Done since the freeze

| Date | What |
|---|---|
| 2026-09-19 | **Wire weight measured on all ten routes**, not just home. Heaviest is `/services` at 49.9 KB against a 100 KB ceiling; lightest `/terms` at 44.1. 39.5 KB of that is shared across every page and cached after the first, so a second page view costs 5–10 KB |
| 2026-09-27 | ~~**EXTRA:** `public/_headers` had a `Cache-Control` rule for `/_astro/*` and nothing else~~ **DONE.** `/assets/*`, `/favicon.png` and `/og-default.png` now carry `max-age=86400, stale-while-revalidate=604800`. **Not `immutable`**, and that is the point: Astro fingerprints `/_astro/` filenames so a changed file is a new URL, while these names are fixed — an immutable logo is a rebrand that never reaches a returning visitor. Verified on the built output that HTML still carries no `Cache-Control` and that the `/*` rule still applies all **7** security headers, which is the failure mode a new rule can cause |
| 2026-09-27 | **EXTRA — CONSIDERED AND REJECTED.** The entry below claimed the header logo was "1.6× oversized even at 2× DPR". **That is only true if 2× is the target, and `Logo.astro` argues on the record that it is not.** Measured at the exact encoder settings `optimise-images.cjs` uses: 288px (**3.2×** of the 90px display) = 11,301 B · 270px (3.0×) = 10,529 · 236px (2.62×, what Lighthouse's emulated phone assumes) = 8,701 · 180px (2.0×) = 6,101. So the whole prize is **5.2 KB**, paid for by a soft logo on every 3× phone, on a site whose heaviest route is 49.9 KB against a 100 KB cap. **The two records contradicted each other and `Logo.astro` was right.** Do not "fix" this without deciding first that 2× is the supported ceiling |
| 2026-09-19 | **Provenance audit cleared.** `measure-content.cjs` flags 11 service bullets as "not literally in the bundle". All 11 traced to real bundle text — they differ by punctuation only. **No invented capability.** Details in `PROGRESS.md` |
