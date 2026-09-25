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
| ~~**Any CI pipeline**~~ | **DONE 2026-09-22.** `.github/workflows/ci.yml` runs the build and seven checks on every push to `master`. **It reports, it cannot prevent** — work goes straight to master and Cloudflare builds on push, so CI finishes after the deploy. Making it preventive needs PRs plus a branch-protection rule: a change to how the repo is worked, and still open |
| **Deleting the 8 parked previews, `dist-client/`, `deliverables/`** | **No.** None reaches the public site, and each parked page is rehearsal space for the next change to its live page |

---

## Done since the freeze

| Date | What |
|---|---|
| 2026-09-19 | **Wire weight measured on all ten routes**, not just home. Heaviest is `/services` at 49.9 KB against a 100 KB ceiling; lightest `/terms` at 44.1. 39.5 KB of that is shared across every page and cached after the first, so a second page view costs 5–10 KB |
| 2026-09-20 | **EXTRA, not done:** `public/_headers` sets `Cache-Control` for `/_astro/*` and nothing else, so the header logo — which loads on every page — carries no cache directive. Found by Lighthouse; serves no quality gate, so named rather than fixed |
| 2026-09-20 | **EXTRA, not done:** the header logo is 288x115 and renders at about 90x36, roughly 1.6x oversized even at 2x DPR. ~10 KiB. Gate 5f (WebP/AVIF) was waived on the same file |
| 2026-09-19 | **Provenance audit cleared.** `measure-content.cjs` flags 11 service bullets as "not literally in the bundle". All 11 traced to real bundle text — they differ by punctuation only. **No invented capability.** Details in `PROGRESS.md` |
