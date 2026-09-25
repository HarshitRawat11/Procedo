# PROGRESS

Status board for the Procedo Infosystems website.
**Update this file whenever a task changes state.** New sessions should read it
immediately after `CLAUDE.md`.

- **Last updated:** 2026-09-25
- **Build:** ✅ passing — 10 pages, **0 errors / 0 warnings / 0 hints** (`npm run build`)
- **CI:** ✅ `.github/workflows/ci.yml` — build plus eight checks on every push to
  `master` and every pull request. Since 2026-09-25 a branch ruleset **requires**
  the `verify` job green before a merge, so **`git push origin master` is
  refused**: branch, open a pull request, merge when green
- **Deployed:** ✅ preview live at https://procedoinfo-preview.pages.dev, git-connected,
  auto-deploying from `master`. **Not** on procedoinfo.com — that domain still
  serves the old site and the cutover is the client's call
- **Repo:** ✅ `HarshitRawat11/Procedo` on GitHub
- **Scope:** `FINISH-LINE.md` names the ten routes and holds ~30 measured
  criteria — a baseline not to regress. It was briefly frozen on 2026-09-19 and
  **unfrozen the same day**; it is a record, not a gate. Open work is in
  `BACKLOG.md`
- **Design gates:** `QUALITY-GATES.md` v1.3 — **7 of 10 passing**, 2 checks
  waived, 2 not measurable until launch. Only **Gate 3 (hierarchy)** still
  fails, at 16 of 30 views, almost all at 375 where a single-column stack gives
  nothing dominance
- **Legal:** ✅ **signed off 2026-09-22.** All three policy pages approved and
  stamped. One change on the advisor's instruction: the Privacy Policy's
  newsletter clause is gone. ⚠️ This did **not** lift the preview's `noindex` —
  that had two reasons and only one is resolved
- **Overall:** v1 is complete against every written criterion in
  `FINISH-LINE.md`, and the legal review is done. **Launch now waits on one
  thing: the DNS cutover**, which is Procedo's to do. The design audit is a
  separate and later standard the site does not yet fully meet — see the gate
  line above.

Legend — ✅ done · 🟡 needs a decision · 🔴 blocked on someone else · ⬜ not started

---

## Board

| # | Task | Status | Blocker | Next step |
|---|---|---|---|---|
| 1 | Site scaffold, theme, layout, components | ✅ | — | — |
| 2 | Real copy across all 9 public pages | ✅ | — | — |
| 3 | Recover real copy from the old React bundle | ✅ | — | — |
| 4 | Remove all Aviator Infotech material | ✅ | — | — |
| 5 | Legal pages (privacy / terms / cookies) | ✅ | — | **SIGNED OFF 2026-09-22.** Procedo’s legal advisor approved all three; the one instruction was to remove the Privacy Policy’s "send updates, marketing material, or newsletters (only with your consent)" line, which had no mailing list, no sign-up and no consent mechanism behind it. Removed, with a note at that spot saying not to reinstate it without building the mechanism first. All three pages restamped 22 September 2026. The Cookie Policy had already been rewritten on 2026-09-18 and its claims now DERIVE from `analytics.provider`, so it cannot go stale again. **This was the last thing blocking launch.** ⚠️ Sign-off did NOT lift the preview’s `noindex`: that had two reasons and only one is gone — an indexed preview would still compete with procedoinfo.com for Procedo’s own terms |
| 6 | Contact form delivery | ✅ | — | Web3Forms key set 2026-08-30. First key was tied to the wrong inbox and replaced same day; the current key (ending `...6a36`) is verified live via two real form submissions through `/contact` |
| 7 | Office address | ✅ | — | 324 Guru Ram Das Nagar, Laxmi Nagar, Delhi – 110092. PIN confirmed by user 2026-08-30. Live on `/contact` and in the homepage JSON-LD |
| 8 | LinkedIn profile URL | 🔴 | Not supplied | Client to provide; replace `'#'` in `socials` — footer icon unhides itself |
| 9 | Governance docs (CLAUDE / README / PROGRESS) | ✅ | — | Keep this board current |
| 10 | QuietScene illustration | ✅ | — | Landed on the real site in three places: the 404 page, `/our-mission`, and the contact-form success state. The standalone `/quiet` concept page was deleted 2026-08-30 once adopted |
| 11 | Custom 404 page | ✅ | — | Built 2026-08-30 using QuietScene inside BaseLayout (header/footer present so visitors can recover). Emits `dist/404.html`, excluded from sitemap |
| 12 | Illustration on Our Mission page | ✅ | — | Adopted 2026-08-30 — QuietScene now sits beside the mission statement on the live `/our-mission`. Preview page deleted |
| 13 | Contact-form success state | ✅ | — | Done 2026-08-30: on a successful send the form is replaced by QuietScene + "Message received". Verified with a real submission |
| 14 | Design inspiration folder | ✅ | — | Images saved and renamed to the index 2026-09-05, verified by opening each. 11 of 12 present — ref 11 (two-hands) never made it in; ref 12 (Google Meet "meeting is safe") is new and now catalogued as ANALYSIS §8. Notes tracked in git, images stay local |
| 15 | Illustration set for the site | ✅ | — | Governed by `reference/illustration-loop.md`. **Six scenes, and every one has a home:** QuietScene (`/our-mission` + contact success), ReceptionScene (`/contact` + contact success), CareersScene (`/careers` header + open-application card), CompanyScene (`/company` statement band), RackScene (`/services` header), UptimeScene (the **404**). `src/components/preview/` holds exactly one file now — `SceneVariant`, the 404 comparison strip. A seventh scene would need a slot that does not exist today |
| 16 | Deployment | ✅ | — | **Preview is on Cloudflare Pages at https://procedoinfo-preview.pages.dev, git-connected, auto-deploying from `master` since 2026-09-18.** Build command `npm run build:preview`, output `dist`, `NODE_VERSION=22`. **Netlify removed the same day** — site deleted, repo disconnected, `netlify.toml` gone; nothing was attached to it (no custom domain, no DNS zone, no form submissions) so only the `.netlify.app` URL went with it. It had refused every build from 14 Sept — six consecutive *Skipped due to account credit usage exceeded* while its own API reported `credits used: 0`. **Watch the build command:** plain `npm run build` produces no noindex, and it lives in the Cloudflare project rather than the repo, so changing it by accident is easy and invisible. Production on procedoinfo.com is still a separate, later decision |
| 17 | Version control | ✅ | — | Git configured, first commit made, and pushed to GitHub (`HarshitRawat11/Procedo`) 2026-08-30 |
| 18 | Analytics | 🔴 | Needs one value from the client: the Web Analytics site token | **Provider chosen 2026-09-18: Cloudflare Web Analytics.** Free, cookieless, and the site is already on Cloudflare Pages. Wired into `Analytics.astro` as a fourth provider alongside Plausible, Umami and GA4, so `site.ts` stays the single switch — deliberately NOT toggled on the Pages project, which would put the on/off somewhere `site.ts` cannot see. Output tested with a dummy token: the beacon appears once per page, the `data-cf-beacon` attribute decodes to valid JSON, and no other provider leaks in. **To turn on:** Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → copy the 32-hex site token → in `site.ts` set `provider: 'cloudflare'` and paste it as `id`. Nothing else. Still emits nothing while `provider` is `'none'`. **Note:** the beacon is not hostname-locked, so enabling it before launch mixes preview traffic into the data — filter by hostname, or wait for launch. Cookieless means NO consent banner is needed, which also unblocks the Cookie Policy rewrite (#5) |
| 19 | Photography / real imagery | ✅ | — | **Decided 2026-08-30: no photography.** The illustration-and-icon style is a deliberate choice, not a gap. Revisit only if real project photos become available |
| 20 | Dark mode | ❌ | **Rejected by the client 2026-09-12** | Closed. The site stays light-only; no `prefers-color-scheme` handling anywhere, and none is to be added |
| 21 | `Container.astro` unused `Props` warning | ✅ | — | Fixed 2026-08-30 by exporting the interface. Build is now 0 errors / 0 warnings / 0 hints |
| 22 | `/uptime` illustration concept | ✅ | — | **Resolved 2026-09-18: UptimeScene went to the 404**, which is what the picture had to say all along — a storm outside, the lamp still lit, the cat asleep through it. It passes Gate 1b as shipped: **66.0% cream / 3.2% dark**. `_uptime` stays parked as rehearsal space, not as a lifeboat |
| 23 | Illustration technique — outline vs flat colour | ✅ | — | **Decided 2026-09-06: technique B.** Applied to all three QuietScene call sites 2026-09-07 — the 404, the contact-form success state and `/our-mission`. `QuietScene` takes a `palette` prop (`outline` default, `coloured`); every live instance now passes `coloured` |
| 24 | Our Mission illustration | ❌ | Abandoned 2026-09-07 | **Dropped.** Two iterations rejected by both Harshit and the client; the second passed all six countable gates and was still no good. `MissionScene.astro` and `/our-mission-preview` deleted 2026-09-07. `/our-mission` keeps QuietScene, now in technique B. The cause is now a standing rule, not an open question — no human figures (CLAUDE.md §5b) |
| 25 | Client copy revision — services | ✅ | — | Applied 2026-09-06, revised after Harshit reviewed the deployed preview 2026-09-07. Telecom removed; **Digital Workplace Services** and **Datacenter Infrastructure** now sit **first and second**, each condensed to **4 cards / 12 pointers** to match the existing three. The two per-section closing banners were removed as redundant against the page-level CTA |
| 26 | Company page illustration | ✅ | — | **Adopted 2026-09-14.** `WorkshopScene` was not refined, it was replaced: it failed Gate 1b at 29.7% cream / 7.2% dark and was deleted. **CompanyScene** took its place in the `/company` statement band — a shadow board with six tools over their painted outlines, one outline bare because the cat on top of the board has that screwdriver. Passes as shipped: **72.8% cream / 4.5% dark**. `_company-preview` parked on adoption |
| 27 | Careers cat — working, not sleeping | ✅ | — | **Done.** `DeskScene` and `DeskSceneWorking` were both deleted 2026-09-14 and **CareersScene** shipped instead, on the `/careers` header and the open-application card. Harshit 2026-09-18: the cat should work the mouse, not just rest a paw on it — two `.mousing` groups now share one `mouseSlide` clock and the lead was redrawn so it stays under the body. Passes as shipped: **86.5% cream / 4.4% dark** |
| 28 | Contact page illustration | ✅ | — | **Adopted 2026-09-13.** All three placement previews deleted; `ReceptionScene` moved to `src/components/` and now appears in exactly one place — the contact form's success card, `state="hungup"`. The image is the reward for having sent something. Still due the Gate 1b weight pass |
| 29 | Home hero illustration | ❌ | **Rejected by Harshit 2026-09-18** | Closed. *"the hero page will not have any image it will be same as the current one."* The home hero keeps its competency index card, and that is deliberate — the first thing a visitor reads is the list of five disciplines. **RackScene was not wasted:** rebuilt from 0.2% cream / 30.0% dark to **75.5% / 4.8%** and adopted on the `/services` header instead, where the cat now works the rack rather than sleeping on it. Putting an illustration in the hero would reopen a decision the client made |
| 30 | Blog / MDX plumbing | ✅ | — | **Removed 2026-09-10** on Harshit's call ("no blog for now"). `@astrojs/mdx` and `@astrojs/rss` are out of `package.json`, the lockfile and `astro.config.mjs`; there was never an `.mdx` document or an RSS route to lose |
| 31 | Structured data | ✅ | — | Builders in `src/lib/schema.ts`, so no page restates the company. Organization now carries **contactPoint** (support and sales) and **areaServed: India**; Services carries its five competencies as **Service** nodes anchored to their sections, with an Organization stub so the `provider` reference resolves in-document; Company, Our Mission, Careers and Contact each carry a **BreadcrumbList**. Verified on the built output: one block per page, all in `<head>`, all parse |
| 32 | `robots.txt` | ✅ | — | Added 2026-09-10; it was a 404. Allow all, plus the sitemap. Names no preview paths deliberately — a `Disallow` line advertises the routes it hides — and the Netlify preview's `X-Robots-Tag` header overrides it on that host |
| 33 | View transitions | ✅ | — | Done 2026-09-12. `ClientRouter` in `BaseLayout`, ~15.9 kB of JS (the only runtime JS on the site). All three element-holding scripts rebound on `astro:page-load`: the reveal observer re-scans, `Header` re-queries and delegates its menu click, and **ContactForm binds per page load** with a `data-bound` guard — the silent failure this was declined for last time. Verified live: second client-side visit to `/contact` binds and intercepts the submit |
| 34 | Preview pages — parked, then reviewed | ✅ | — | Parked 2026-09-12; reviewed 2026-09-13. **Deleted:** `illustrations-preview`, `contact-preview` ×3, `hero-preview`, `home-preview` (recoverable from `3caa023`). **Still parked:** `_company-preview`, `_careers-preview` (pending refinement), `_404-preview`, `_uptime`. Every illustration component was kept — the pages went, the images did not |
| 35 | Client pending list | ✅ | — | `CLIENT-PENDING.txt` at the repo root: one page, what the client owes — legal sign-off (the only blocker), domain, analytics choice, LinkedIn, proof material, engagement process, FAQs, WhatsApp. Plus what is already decided, so it is not reopened |
| 36 | WhatsApp channel | ✅ | — | Number confirmed by Harshit 2026-09-13 — the same line as the phone. `contact.whatsapp` in `site.ts` with a derived `whatsappHref`; the channel drops out entirely if the number is ever cleared (§3). Live on the Contact page |
| 37 | Illustration weight — the "subtle" pass | ✅ | — | **All six pass, measured on the built pages 2026-09-19** — on each scene’s live viewBox, which is what a visitor sees, not the component in isolation. Two gates, because weight and scale fail independently. **Gate 1b** (`scripts/measure-density.cjs`): at least 60% bare cream, at most 5% dark. **Balance** (`scripts/measure-balance.cjs`): the ink centred in the frame, which Gate 1b cannot see. **And scale**: apparent size is subject width over CANVAS width. Standing, cream/dark: ReceptionScene 88.2/2.5 · CareersScene 86.5/4.4 · QuietScene 80.9/3.4 · RackScene 75.5/4.8 · CompanyScene 72.8/4.5 · UptimeScene 66.0/3.2. The two that used to fail were not tuned but rebuilt — RackScene from 0.2/30.0, and WorkshopScene replaced outright |
| 38 | Continuous integration | ✅ | — | **Added 2026-09-22**, `.github/workflows/ci.yml`, Node 22 to match the Cloudflare project. Build plus eight checks on every push to `master` and every pull request. It guards the failure modes this repo has actually been broken by, every one of which is **silent** — no error, no warning, a page that still looks right. Two scripts were written for the two that had no check at all: `verify-headers.cjs` (a noindex leaking into a PRODUCTION build; a second `/*` rule making Cloudflare drop most security headers) and `verify-tokens.cjs` (stock palette colours, an eighth type size, a fourth radius, raw hex outside `@theme`, `theme-color` drifting from `--color-cream`). ⚠️ **The content gate is PARTIAL in CI**: its provenance half needs `scrape/procedo/app.js`, which is gitignored on purpose, so **CI cannot catch an invented claim** — run `measure-content.cjs` locally before shipping copy. The first run went red for exactly that reason, unguarded, and local runs could never have found it |
| 39 | Branch protection | ✅ | — | **Added 2026-09-25**, and it is what turned CI from reporting into preventing. For three days work went straight to `master` and Cloudflare built on push, so the workflow finished **after** the preview had already published. Ruleset `23984970` on `master`: a pull request required, `verify` green before merge, force pushes and deletion refused, and **no bypass actors, including Harshit** — GitHub reports `current_user_can_bypass: never`, because an admin bypass on a one-contributor repo makes the whole thing decorative. **Zero approvals required, deliberately**: GitHub will not let you approve your own pull request, so requiring one would deadlock every merge. The ruleset is committed at `.github/rulesets/master.json` and `scripts/verify-branch-protection.cjs` fails when github.com stops matching it — it is the only part of this setup that lives entirely outside the repo. **Two things it does not cover, by design:** `npm run deploy:preview` still bypasses all of it, and an admin can delete the ruleset from the settings UI. It is a speed bump against your own mistakes, not a control against yourself |

---

## What's actually blocking launch

**One thing, and it is not ours: the DNS cutover.** Procedo pointing
procedoinfo.com at this build. About fifteen minutes once they say go.

**Legal sign-off arrived 2026-09-22** and was the last item that was. All three
policy pages are approved and stamped with that date.

The advisor changed one thing. The Privacy Policy's *"To send updates, marketing
material, or newsletters (only with your consent)"* is **removed**. It had been
flagged for that review on 2026-09-18 and deliberately left alone until someone
with the authority ruled on it: there is no newsletter, no mailing list and no
way on this site for anyone to give the consent it referred to. The sentence was
not false — it was conditional on a consent never sought — but it described a
thing that does not exist, on a page whose whole job is to be true. The note at
that spot in `site.ts` says not to reinstate it without building the mechanism
first, because adding the sentence back on its own would recreate the promise.

The Cookie Policy needed nothing at sign-off because it had already been fixed
on 2026-09-18. The old text was the previous React site's policy describing
*that* site — it claimed analytics and preference cookies and "relevant content
or ads". Measured in a browser on the built output, this site sets none:
`document.cookie` empty, no localStorage, no sessionStorage, no IndexedDB, not
one third-party origin. **Its claims now derive from `analytics.provider`**, so
the page and the configuration cannot drift apart again — set `ga4` and it
switches to "Yes" by itself.

> ⚠️ **SIGN-OFF DID NOT LIFT THE PREVIEW'S `noindex`, AND THIS IS THE EASIEST
> THING ON THIS PAGE TO GET WRONG.** There were two reasons for it. One is gone.
> The other stands: an indexed preview at `procedoinfo-preview.pages.dev` would
> compete with procedoinfo.com for Procedo's own terms — two sites, the same
> copy, the same company, and the one that would lose is the one that matters.
> **The noindex comes off when the real domain is live and this preview is
> retired, not when the lawyer says yes.**

⚠️ **Sign-off covers what is written today, not whatever it becomes.** A
material change to any of the three pages needs re-approval, and the `updated`
date needs moving with it. Switching `analytics.provider` to `ga4` would be one:
the Cookie Policy would correctly start saying the site sets cookies, and a site
that sets analytics cookies needs a consent banner asking *before* the script
loads. There is none.

Deployment (#16) is done for the preview and auto-deploys from `master`.
**Nothing is blocked on code.**

**Everything else is finished** against `FINISH-LINE.md`, whose gap is empty.
The design audit in `QUALITY-GATES.md` is a separate and later bar: 7 of 10
gates pass, 2 checks are waived, 2 cannot be measured until the site is live,
and Gate 3 (hierarchy) fails at 16 of 30 views — almost all at 375px, where a
single-column stack gives nothing dominance.

---

## Log

### 2026-09-25 — CI stops reporting and starts preventing

Harshit: *"do the branch protection"*. It was the open item left over from the
CI work on 2026-09-22, and the reason every record in the repo carried the same
caveat: **CI reported, it could not prevent.** Work went straight to `master`,
Cloudflare Pages builds on push, so the workflow finished after the preview had
already published. A red run meant "the last push broke something", never "that
push was stopped".

**Ruleset `23984970` on `master`.** A pull request is required, the `verify` job
must be green before a merge, force pushes and deletion are refused, and there
are **no bypass actors at all**. GitHub reports `current_user_can_bypass: never`.

Two choices in it are worth the words:

- **Zero approvals required.** Not laxity — GitHub will not let you approve your
  own pull request, and this repo has one contributor. Requiring one approval
  would have deadlocked every merge with nothing able to clear it. The status
  check is what gates; the pull request is only what makes the check run before
  the deploy instead of after it.
- **No bypass, including Harshit.** An admin bypass on a one-person repo makes
  the whole thing decorative. The cost is real and was stated before it was
  applied: the direct pushes these sessions had been making stop working, and
  every change now needs a branch and a pull request. That is the change he
  asked for.

**The setting lives outside the repo, which is the whole problem.** It can be
switched to `evaluate`, handed a bypass actor, or deleted on github.com, and not
one file here would change — the same hazard as the Cloudflare build command
that `CLAUDE.md` warns about, with the same failure mode, which is silence. So
the ruleset is committed at `.github/rulesets/master.json` in the format
GitHub's own *Import a ruleset* button reads, and `verify-branch-protection.cjs`
compares that file against the live API as a ninth CI step.

**Its comparison logic was tested, not trusted.** Four measurement scripts in
this repo have shipped confidently wrong, and every branch in this one fires
only on a bad day. A fixture seam feeds it thirteen answers — ruleset missing,
wrong name, `evaluate` instead of `active`, a bypass actor added, the required
context renamed, the check bound to the wrong app, the `pull_request` rule
removed, coverage pointed at another branch, network down, rate limited, repo
gone. All thirteen behave as intended. Network trouble is a **loud skip**, not a
failure: "GitHub had a bad minute" is not a statement about the ruleset, and a
gate that goes red for unrelated reasons is a gate that gets switched off.

**`verify` is now a load-bearing name in two places** — the job id in `ci.yml`
and the required context in the ruleset, bound to app `15368`. Both were read
off a real check run rather than remembered, because getting the pair wrong does
not weaken the protection, it **deadlocks** it: a context nobody reports leaves
every pull request waiting forever for a status that will never arrive. The new
step exists mostly to catch that.

**GitHub set a parameter we never sent.** Creating the ruleset returned
`require_extra_approval_for_unattributed_changes: true`. On a repo where every
commit carries a `Co-Authored-By` trailer for an address with no GitHub account,
and where zero approvers are available, that had an obvious route to deadlocking
every merge. It did not — PR 1 reached `CLEAN` with both checks green and zero
approvals. The field is recorded in the JSON as GitHub set it rather than fought
or omitted, because that file is what you re-POST to rebuild the ruleset, and
one reproducing our intentions instead of reality would rebuild something
subtly different from what was tested. The verifier's header now states which
fields it **asserts** and which the JSON merely **records** — deliberately not
the same set, since GitHub will keep adding parameters.

**Proved end to end, through the thing itself.** PR 1 carried the records
correction, sat at `mergeStateStatus: BLOCKED` until `verify` reported, then
merged; PR 2 carried the parameter reconciliation the same way. Both rebased to
fast-forwards, so history stays linear and the commit messages survived intact.

**One thing was NOT verified, and should not be read as if it were.** The
obvious negative test — push a commit straight to `master` and watch it bounce
— was refused by the tooling, which reads that command as an attempt to bypass
CI. That is a fair reading and it was not worked around. So a rejected push has
not been observed first-hand; what has been observed is the configuration that
produces one, plus a merge that was genuinely blocked until the check went
green. Strong, but not the same observation.

**Also corrected here:** the board had no row for CI at all. It was added
2026-09-22 and never recorded, which is precisely the drift `CLAUDE.md` warns
about and that `README.md`, `PROGRESS.md` and `CLIENT-PENDING.txt` had all
suffered before. Rows 38 and 39 now cover both, including the honest limitation
that **CI cannot catch an invented claim** — the provenance half of the content
gate needs a gitignored bundle, so rule 1 is still enforced by running
`measure-content.cjs` locally before shipping copy, and by nothing else.


### 2026-09-20 (last) — a design audit, three fix batches, and four broken instruments

The site passed every criterion in `FINISH-LINE.md` and was still, by its own
admission, forgettable. A second prompt supplied a way to test that: extract
what the site is trying to make a specific person feel and do, turn it into
falsifiable gates, measure, fix, judge. `INTENT-BRIEF.md` and
`QUALITY-GATES.md` are the result, and this entry is what they cost.

**The intent, agreed rather than assumed.** Audience: a corporate IT or
facilities manager in Delhi NCR or elsewhere in India who specifies
infrastructure work, shortlists who does it, and carries the risk if the branch
opening slips. Evoke *precise, dependable, quietly expert*; avoid *hypey,
generic, consumer-cute*. Benchmarks: Fly.io, Oxide Computer, 37signals — each
picked against a weakness the audit had already measured, not for general
excellence.

**That third anti-adjective immediately collided with six cat illustrations.**
Rather than leave Gate 1 to discover it, the tension was named in the brief and
resolved in advance: no illustration may be the dominant element of any view,
and every caption must carry a technical claim rather than a punchline. Both
live captions pass unwaived — *"ALL OTHER SYSTEMS NOMINAL"* is a claim, and
*"The lamp stayed on. The page did not."* states what happened.

---

#### What the gates found

**Gate 1b was the worst of it, and it had nothing to do with beauty.** Below
`md` the header's "Get in Touch" was hidden and the inner pages carry no CTA in
their `PageHeader`, so **eight of ten pages opened on a phone with no visible
way to make contact** until the visitor scrolled. The button inside the mobile
menu does not count; it is behind a tap. Fixed in `Header.astro` — a compact
"Contact" button now sits beside the hamburger at every width. 0 → 1–3 CTAs
above the fold on 10 of 10 pages, overflow still 0.

**Gate 2a: the palette was never closed.** 81 stock-Tailwind colour utilities
across `src/`, and the site's commonest text colour was `slate-600` — a
framework default. The cause was structural: `@theme` defined `cream`,
`surface`, `band` and `line`, all *surfaces*, and **no colour for text**, so
every component reaching for body grey had nothing to reach for.

The utility grep had also missed the actual worst offender. `body { color }` in
`@layer base` was a raw `#475569` — invisible to a class-name search and
responsible for more rendered pixels than any utility. It surfaced only because
the post-fix computed-style sweep still reported 32 off-palette text nodes
*after* every utility had been swapped.

**Gate 2c: fourteen rendered type sizes at 1280.** Six one-off
`text-[clamp(…)]` expressions had accumulated, one per component, with
overlapping ranges — two of them covering the same range with a different `vw`
term. Now seven steps, three of them `@theme` clamps. Every collapse picked the
*smaller* neighbour, because the brief asks for quietly expert: hero 52→48,
section headings 40→36, mid-level 30→24, card titles 20→18 with weight carrying
that step instead of size. The only things that grew were the 10px and 11px
mono labels, which became 12px — three sizes existed for one semantic role and
the smallest was below any legibility floor worth defending.

**Gate 2e: five corner radii down to three.** Downward again —
`rounded-xl` folded into `rounded-lg` rather than up into `rounded-2xl`,
because at 16px the cards read softer and more consumer.

**Gate 4 is the one still failing, and it is the point of the whole document.**
With the logo masked the home hero reads as *"a B2B infrastructure firm with an
orange accent"* and follows the Tailwind UI marketing shape exactly. A related
finding: the site's actual site-wide signature is **not** the illustrations —
they appear on 6 of 10 pages and not on the home page — but the IBM Plex Mono
eyebrow, which appears on 10 of 10.

`/hero-preview` is the proposed answer and is **not adopted**. It moves the five
disciplines out of the white card and into a full-width numbered index: hairline
rules, large mono numerals, no card chrome. Gate 4b passes; 4a improves from
"nothing" to marginal. Adopting it changes the client's signed-off front page,
so it wants Harshit's eye and then Procedo's.

---

#### Four instruments produced confident, wrong answers

More time went into finding these than into the fixes. Each is now recorded in
the script that has it, because every one looked exactly like a site defect.

**1. The 375px screenshots were cropped desktop layouts.** Windows enforces a
minimum window width of about 500px and headless Chrome honours it, so
`--window-size=375,812` produced files that *are* 375×812 but showed the left
375px of a wider render — text cut mid-word, no hamburger. It reads as a mobile
overflow bug and is not one: measured in-browser at a true 375px viewport, all
ten routes report `scrollWidth - clientWidth = 0`. Widths below the clamp are
now shot inside an iframe pinned to that width and cropped back.

**2. The hierarchy metric split headlines and called the halves rivals.** A 4×4
grid scored cell by cell reported 16 of 30 views as having no focal point,
including the home page at 1280 where the blurred image shows one unmistakable
dark mass. Replaced with flood-fill clustering.

**3. The same metric then swung 15–17 on identical source.** Six of the ten
pages carry scene loops of 2.4–26s and `--virtual-time-budget` lands the shutter
at an arbitrary phase. Batch 2 was reported on that basis as regressing Gate 3a
from 19 to 15, and a `--text-h2` bump appeared to recover a view; **both
readings were noise.** Fixed with `--force-prefers-reduced-motion`, which stops
every animation on this site — they all sit inside
`@media (prefers-reduced-motion: no-preference)` — and resolves the scroll
reveals instantly. Three consecutive runs now return the same number. Re-derived
properly by checking out each source state: **19 before batch 2, 16 after, and
16 with the h2 bump**, so the regression is real at three views and the bump
does nothing. It was reverted.

**4. Screenshots render with fallback fonts, and fallbacks break lines
differently.** A capture of the closing CTA at 375 showed *"Ready to Future-"* /
*"Proof Your Business?"* — a hyphenated compound split across lines, which was
nearly fixed as a real typographic fault. In a real browser with Inter loaded it
breaks at the space. **Never read a measure, an orphan or a line break off these
images.**

A fifth was nearly a fifth: the Gate 2a rename was verified by pixel-diffing
every route at 1280, and six pages differed by 0.01–0.22%, which looks exactly
like a botched rename. Running the same build twice reproduced the same
differences on the same six pages with no code change at all. The four pages
with no animation came back byte-for-byte identical — which is the actual proof
the rename was inert.

---

#### Housekeeping

Six measurement scripts moved into `scripts/` so the gates are reproducible by
someone who was not here: `serve-dist`, `shoot-screens`, `measure-hierarchy`,
`measure-weight`, `extract-scenes`, `diff-screens`. `review/` is gitignored — a
full run is 21 MB of PNGs against a 6.3 MB repo, and it is regenerable output
like `dist/`. The scripts were the half worth keeping.

Two waivers granted, both scoped: Gate 1c on `/404` only, because a 404 has no
content for its illustration to compete with; and Gate 5f, because the only
raster on the site is an 11 KB logo.

Two items logged as EXTRA and deliberately not done: `/assets/*` carries no
`Cache-Control` rule, and the header logo is about 1.6× oversized.

Lighthouse, run once by hand after an `npm cache clean --force` fixed a
corrupted cache: **desktop 100/100/100/100, mobile 92/100/100/100, CLS 0 on
both.** It is still not a gate and still not installed.

**Standing state: 5 of 10 gates passing, 2 checks waived, 2 not measurable until
the site launches and analytics exist.** Gates 1, 3 and 4 fail, and all three
are the same finding.

### 2026-09-19 — the finish line, locked, and unfrozen an hour later

The project had no defined end. Requests arrived, were built, and were followed
by more requests, with nothing in the repo distinguishing "in scope" from
"extra". That is fixed now, and it is fixed in writing rather than by intention.

**`FINISH-LINE.md` is locked at v1.0.** It names the ten routes and what must be
on each, the visual system as the v1 system, ten optimization thresholds, the
deployment criterion, and a long list of what is deliberately NOT in v1. Every
criterion is falsifiable — checkable by someone with no context, in under a
minute, with a yes or no. Every claim in it carries VERIFIED, UNVERIFIED or
UNKNOWN, and nothing was allowed to sit at UNVERIFIED for convenience.

**The rule that follows from it** is now in `CLAUDE.md`, so a fresh session
inherits it without being told: every request is a **DEFECT** (a criterion
written in the document is failing) or an **EXTRA** (everything else, including
suggestions from Claude). There is no third bucket. Extras get one line in
`BACKLOG.md` and wait. Reopening scope takes the explicit word **UNFREEZE**.

**Two gaps were closed by measurement rather than argument**, before the lock:

- **Responsive floor at 768px** had never been measured — only 375 and 1280
  had. Measured across all ten routes: horizontal overflow **0 on every one**.
- **Console errors** had been measured on `/` only. Measured on all ten:
  **zero**. The 404's single entry is its own 404 status, which a browser logs
  by definition, so the criterion was reworded to exclude it rather than left to
  look like a failure.

**One non-defect was recorded so nobody chases it again.** Driving the nav with
a script produces repeated `InvalidStateError: Transition was aborted because of
invalid state`. It is the View Transitions API correctly refusing to start a
transition while the previous one is still running — caused by clicking faster
than a human can. A fresh tab, a clean load and three human-paced navigations
produce **no console output at all**. It was checked before being reported,
which is the only reason it is not now an open bug in this file.

**The last of the gap was three stale documents, and they are what this session
actually changed.** No site code was touched.

- **`README.md`** still sold "telecom, and power & precision systems". The
  client removed telecom on 2026-09-06 and the site has shipped five different
  competencies ever since. It also listed `/quiet` and `/our-mission-preview` as
  live routes — both deleted — named Netlify first under Deploying, and told the
  reader the office address was an unfilled TODO. It has been rewritten against
  what the repo actually contains.
- **`PROGRESS.md`** — this file — said "16 pages" when the build emits 10, and
  "Deployed: ❌ not yet" when the preview has been live and auto-deploying since
  2026-09-18. Rows 15, 18, 22, 26, 27, 29 and 37 described work as pending that
  had shipped days earlier.
- **`CLIENT-PENDING.txt`** offered the client a choice of analytics tool that
  had already been made, asked whether the phone line takes WhatsApp when that
  was confirmed on 2026-09-13, and told them the illustrations "sit on internal
  preview pages and are not on the public site" when all six are live.

**Row 37's numbers were re-measured rather than copied forward.** The recorded
figures had been taken on the components in isolation; these are taken on each
scene's live viewBox, which is what a visitor actually sees. All six pass Gate
1b — cream at or above 60%, dark at or below 5%:

| scene | cream | dark |
|---|---|---|
| ReceptionScene | 88.2% | 2.5% |
| CareersScene | 86.5% | 4.4% |
| QuietScene | 80.9% | 3.4% |
| RackScene | 75.5% | 4.8% |
| CompanyScene | 72.8% | 4.5% |
| UptimeScene | 66.0% | 3.2% |

Getting those numbers took three attempts and the failures are worth recording,
because the next person to measure a live scene will hit all three. The built
SVG cannot be handed to `measure-density.cjs` as-is: searching forward from a
fixed offset for the opening `<svg` finds the wrong one and yields a fragment
that starts mid-element; `data-scene` and `data-astro-cid-…` are written
valueless, which is legal HTML and illegal XML, so librsvg stops at the first
one; and fixing that with a general attribute regex rewrites
`viewBox="0 0 420 330"` into `viewBox="0 0="" 420="" 330"`, which parses
cleanly and renders nothing. A scene that renders nothing measures as 100% cream
and would have passed. The extractor is in the session scratchpad, not the repo
— it is a measuring instrument, not part of the build.

**What remains is the client's, and it is two items:** legal sign-off, and the
domain cutover. Both are recorded in `FINISH-LINE.md` as owed content with an
owner, which under the rule agreed at lock means v1 is done — the site is
finished; the client owes the content.

**`ACCEPTANCE-CHECKLIST.md`** is the document to send them: the Definition of
Done rephrased as tick-boxes in plain language, with no jargon and no file
paths. The freeze stays **PROVISIONAL** until their acceptance is recorded in
`FINISH-LINE.md` with a date and the method.

**Then it was unfrozen, the same day, and that is the more useful half of this
entry.** Harshit had read LOCK as *"lock the finish-line document"* — which it
did — not as *"stop work and ask permission for everything after this"*, which
is what the prompt’s rule actually imposed. That is a fair reading of the word,
and the misunderstanding is worth recording because the rule was genuinely
heavy: it would have made every future session classify his requests and hold
them for approval before touching anything.

**What was removed:** the DEFECT/EXTRA classification, the permission gate, and
the instruction in `CLAUDE.md` telling future sessions to enforce them. **What
was kept:** the ten routes named and described, ~30 criteria with measured
values and the method used to get each, and §4’s list of what was considered
and rejected with dates. Those are worth having whether or not anything is
frozen. `BACKLOG.md` was repurposed from a holding pen for refused work into a
plain list of what is not done yet.

The `v1.0` tag stays where it is. It points at a commit where every criterion
was measured and met, which is a useful thing to be able to return to. It is a
snapshot, not a boundary.

### 2026-09-18 — the Cookie Policy says something true now

Unblocked by the analytics decision, and drafted for the legal advisor rather
than quietly applied: the `updated` date should be reset to the sign-off date
when that happens.

**What was wrong.** The old text was the previous React site's policy describing
the previous React site. It said Procedo uses cookies to understand how you use
the website, remember your preferences and *"provide relevant content or ads"*,
and listed essential, analytics and preference cookies as types in use. The
Privacy Policy agreed with it in two places. None of it was true here, on the
two pages whose entire job is to be true, and a visitor could disprove it in ten
seconds with developer tools.

**Measured on the live site before a word was written** — no cookies, no
localStorage, no sessionStorage, no IndexedDB, and *zero* third-party origins:
the fonts are self-hosted and the only script is Astro's own router. The contact
form posts to Web3Forms, and only when submitted.

**What the new policy does differently.** It answers the question first and
plainly — "No. This site sets no cookies." — and then earns it: what cookies
are and why this site needs none, why there is therefore no consent banner, how
traffic is measured instead, what happens when you use the contact form, and
what we do if any of that changes. Gone: the three invented cookie categories,
and the "managing cookies" advice, which was telling people how to block
something that does not exist.

**The part that stops it recurring.** The policy's cookie claims are DERIVED
from `analytics.provider`, not written down beside it:

    provider      opening answer                       sections
    none          No. This site sets no cookies.       + why no banner
    cloudflare    No. This site sets no cookies.       + why no banner
                                                       + how traffic is measured
    ga4           Yes. We use Google Analytics 4 ...   + managing cookies
                                                         (banner section drops)

Verified by building all three. The old bug was a policy hard-coding a claim
about configuration; a policy that reads the configuration cannot drift from it.
`analyticsSetsCookies` carries a loud warning: GA4 would make the page honest
and still not compliant, because honest is not the same as having the consent
banner the law then requires, and this site has none.

**Two lines corrected in the Privacy Policy**, both making the same false cookie
claim — the "Information we collect" bullet and the Cookies section.

**One line flagged and deliberately NOT changed:** the Privacy Policy still
offers *"updates, marketing material, or newsletters (only with your consent)"*.
There is no list, no newsletter, and no mechanism by which that consent could be
given. The sentence is not false — it is conditional on a consent never sought —
but it describes something that does not exist. Whether to keep it as headroom
or drop it is a judgement about marketing permissions, not a factual correction,
so it is the advisor's call and is marked as such in the file.

Terms of Service untouched: nothing in it was contradicted by the code.

### 2026-09-18 (later still) — analytics: Cloudflare Web Analytics

The provider question has been open since the wiring landed on 2026-09-12. It is
answered: **Cloudflare Web Analytics.** Free, cookieless, and the site moved onto
Cloudflare Pages earlier the same day — which is what put this option on the
table at all. It was not available when the original three were chosen.

**The choice was made on the cookie axis as much as on features.** Three of the
four candidates are cookieless; GA4 is not. Picking GA4 would have meant
building a consent banner, consent storage and script gating before it could
legally ship, and would have left the site with an ongoing compliance surface.
Picking a cookieless one keeps the answer to *"does this site set cookies?"* a
plain no — which is exactly what the Cookie Policy has to be rewritten around,
so this decision unblocks that too (#5).

Against Cloudflare: no funnels, no custom events, and it ties measurement to the
host — and this site has changed host once already, under duress. That is a real
argument and it is why the beacon is **wired into `Analytics.astro` rather than
toggled on the Pages project.** Cloudflare will inject it for you from the
project settings, which would be one fewer thing in the repo, but it would put
the on/off switch somewhere `site.ts` cannot see — the same failure mode the
build command already has. One switch, one file, and it survives a host change.

**Tested, not assumed.** Built once with a dummy token to check the branch:

    beacon present         once per page, on all 10 including the 404
    data-cf-beacon         decodes to valid JSON; token reads back intact
    other providers        absent
    provider: 'none'       nothing emitted at all — all four silent

That middle line is the one worth having checked. The token travels in a JSON
string inside an HTML attribute, so it is emitted entity-escaped
(`{&quot;token&quot;: …}`). That is correct and a parser hands the beacon back
clean JSON — but it looks wrong enough at a glance to be worth proving rather
than assuming.

**Still needs one value, and it is not one to invent:** the 32-hex site token
from Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site. The
wrangler OAuth token has no RUM scope, so this cannot be done from here; probed
and confirmed 403 rather than guessed. Until it is pasted in, `provider` stays
`'none'` and the live site is byte-identical.

**One thing to decide when pasting it:** the beacon is not hostname-locked, so
switching it on now mixes preview traffic — mostly Harshit's and the client's —
into the same dataset as the eventual real traffic. Either filter by hostname in
the dashboard, or leave it off until launch.

### 2026-09-18 (later still) — Netlify removed

*"remove netlify"*. Done, in this order, and the order was the point: the
fallback only went once Cloudflare had been building from git for three
consecutive pushes and serving the noindex from its own CI.

**Looked before deleting.** The site carried no custom domain, no domain
aliases, no DNS zone and no form submissions — the contact form posts to
Web3Forms, not Netlify Forms — and its only environment variable was one named
`DEPRECATED`. So the only things that went with it were the
`procedoinfo-preview.netlify.app` URL and the deploy history, and the history is
in git anyway.

Removed: the site itself (API `deleteSite`), which also drops the repo
connection, and `netlify.toml`. The local `.netlify/` CLI scratch directory went
too — it was gitignored, but it is dead state pointing at a site that no longer
exists.

Verified: `procedoinfo-preview.netlify.app` now returns **404**, the account
lists only `acharya-amit-puri` and `log-book-hr`, and Cloudflare built and
published the commit that deleted `netlify.toml` — which is the check that
matters, because it proves nothing in the build ever depended on that file.

`public/robots.txt` stopped referring to netlify.toml on 2026-09-18 when the
Cloudflare work started, so no dangling reference is left. `README.md` and
`404.astro` still name Netlify, and correctly — both are generic lists of static
hosts that can serve `dist/404.html`, not claims about where this site lives.

**The history in this log stays as written.** The Netlify entries are a record of
what happened and why the move was made; deleting them would leave the Cloudflare
setup looking like an arbitrary choice rather than a forced one.

### 2026-09-18 (later still) — auto-deploy, and two settings that would have failed silently

**A push to `master` now builds and publishes.** Proven, not assumed: the commit
that wired it is itself the first CI build, and the live URL is serving it.

**A direct-upload project cannot be converted to a git-connected one.** The API
says so outright — `8000069, "You cannot update the source object in a Direct
Uploads project"` — and the dashboard offers nothing either. So the question was
whether a git-connected project could be created through the API at all, given
the GitHub App was already installed for `HarshitRawat11` (both of the account's
other Pages projects use it). That was answered by creating a **throwaway probe
project**, reading its `source` back, and deleting it — rather than finding out
by experimenting on the live one. It can.

Which made it Harshit's call: the name `procedoinfo-preview` was taken by the
direct-upload project, so keeping the URL meant deleting and recreating. He
chose that over a second project on a new URL, so the URL is unchanged.

**TWO SETTINGS THAT WOULD HAVE FAILED SILENTLY.** Both are the kind that leave
everything looking fine:

1. `production_branch` was **`main`**, because that is wrangler's default when
   creating a project. This repo's default branch is **`master`**. No push would
   ever have matched, so the project would have sat there looking connected and
   never building, and the URL would have gone stale exactly the way Netlify's
   did — for a completely different reason.
2. `build_command` is **`npm run build:preview`**, not `npm run build`. Plain
   `build` deliberately produces a `dist/` with no noindex; that is the safety
   property the whole migration was designed around. Had Cloudflare built this
   preview with `build`, the preview would have gone live indexable, with
   unreviewed legal pages on it, and **nothing in the repo would look wrong** —
   because the setting lives in the Cloudflare project, not in the repo. That
   asymmetry is now written into CLAUDE.md, with where to look if the header
   ever goes missing.

`NODE_VERSION` pinned to 22 for the same reason netlify.toml pinned it: Astro 6
needs >= 18.20.8 / 20.3 / 22 and Pages defaults older.

**Verified on the CI-built deployment** — and it is definitively CI-built, since
deleting the project took the earlier direct upload with it and only one
deployment exists:

    x-robots-tag           noindex, nofollow   ← produced by Cloudflare's own
                                                 build running preview-headers.cjs
    x-content-type-options nosniff
    referrer-policy        strict-origin-when-cross-origin
    /_astro/*              max-age=31536000, immutable
    _headers as a file     404
    routes                 9/9 200; /our-mission-preview 404; unknown → custom 404
    content                press keyframes, 4 .mousing groups, lamp caption,
                           Five disciplines, no double full stop, sitemap 9

That first line is the one worth keeping: the noindex reached a live response
having been generated inside Cloudflare's build, from a script that is committed
while the rule it writes is not.

`npm run deploy:preview` still works and now means something different — a way
to bypass the git build for a quick test. Anything it publishes is overwritten
by the next push, and it deploys the working tree rather than master.

Still open: `netlify.toml` and the Netlify project both remain, deliberately,
until Harshit signs off the Cloudflare URL.

### 2026-09-18 (later still) — Cloudflare Pages is live

Harshit said *"unable to login"*. The login had in fact succeeded — `whoami`
returned the account and `~/.wrangler/config/default.toml` held a valid
`oauth_token` and `refresh_token` — so the diagnosis was worth doing before
answering: port 8976 showed a recent connection, `dash.cloudflare.com` was
reachable, no proxy, a default browser registered. Nothing was wrong.

**Live at https://procedoinfo-preview.pages.dev.** Project `procedoinfo-preview`,
production branch `main`, direct upload, deployed with the `npm run deploy:preview`
script exactly as committed — no edits needed to make it work.

**Two wrangler gotchas, both worth the write-up.**

1. `wrangler pages project create` FAILED on wrangler 4.135. It delegates
   `wrangler pages …` into Workers static assets, reinterprets the command, and
   dies with *"Missing entry-point to Worker script or to assets directory"* —
   an error that says nothing about the real cause. `--force` reaches classic
   Pages, and it is needed **only once, on project create**: once the project
   exists, later commands run against Pages directly. So `deploy:preview` does
   not carry `--force`, and that is deliberate rather than an omission. Proven,
   not assumed — the deploy ran without it.
2. That delegation is Cloudflare folding Pages into Workers. This is on the
   older product on purpose: it is what the account's other two projects use,
   and `_headers` is guaranteed to work there. **Expect to migrate eventually,
   and re-check `_headers` support first when that happens** — the whole noindex
   design depends on it.

**Verified on the live URL**, not inferred:

    routes            9/9 200; /our-mission-preview 404; unknown routes
                      serve the custom 404 (the lamp caption is in the body)
    _headers          404 as a file — Cloudflare consumes it, does not serve it
    headers           x-robots-tag: noindex, nofollow
                      x-content-type-options: nosniff
                      referrer-policy: strict-origin-when-cross-origin
    /_astro/*         Cache-Control: public, max-age=31536000, immutable
    sitemap           9 <loc> entries, pointing at the production domain
    this session      press/tilt keyframes, 4 .mousing groups, no invented
                      careers line, no double full stop, Five disciplines,
                      Organization schema on /contact, Security First restored

The noindex is the one that mattered, and it is the thing the whole migration
was designed around: it reached the live response from `scripts/preview-headers.cjs`
via `dist/_headers`, without ever being committed.

**THE ONE REGRESSION, and it is worth saying plainly.** The project has no Git
provider attached, so **a push no longer publishes.** Netlify auto-deployed on
push (in principle — in practice it had been refusing for four days). Cloudflare
here is direct-upload only, so pushing and deploying are two separate acts.
Connecting the repo needs a GitHub OAuth grant in the Cloudflare dashboard,
which is Harshit's to give. Until then: `npm run deploy:preview`, or the URL
goes stale exactly the way the Netlify one did.

`netlify.toml` and the Netlify project are both still in place, deliberately —
the fallback goes only once the Cloudflare URL is signed off.

### 2026-09-18 (later) — off Netlify, onto Cloudflare Pages

*"move this from netlify to cloudflare"*. The repo side is done and verified;
the cutover itself is blocked on an interactive Cloudflare login.

**Why the move is right.** Netlify had refused every build since 14 September —
six consecutive *"Skipped due to account credit usage exceeded"* — while its own
API reported `credits: {included: 300, used: 0}`, `usages_exceeded: []` and
`lifecycle_state: active`. The published URL sat 19 commits stale. Getting it
current took finding that uploads were permitted, `--prod` returned `Forbidden`,
and only a `restoreSiteDeploy` API call would actually publish. Nobody should
have to remember that to ship a static site.

**The one thing that did not port cleanly, and the whole of the work.** The
preview is kept out of search by `X-Robots-Tag: noindex, nofollow`. On Netlify
that lived in `netlify.toml` — and it was SAFE there for one specific reason:
that file sits at the repo root and is never copied into `dist/`, so it could
carry a rule the real site must never have.

Cloudflare Pages has no root-level header config. Its only mechanism is a
`_headers` file **inside the build output**, so anything in it ships wherever the
build ships. Put the noindex in `public/_headers` and the day procedoinfo.com is
launched from this repo, the launch is silently de-indexed and nothing in the
build says why. That is the same trap the robots.txt note has warned about since
September, one step further along.

So the rule is attached to the ACT OF DEPLOYING A PREVIEW rather than to the
source tree:

| | |
|---|---|
| `public/_headers` | only what is correct in production too — `nosniff`, `Referrer-Policy`, immutable cache on `/_astro/*`. Committed. |
| `scripts/preview-headers.cjs` | appends the noindex to `dist/_headers`. Run by `build:preview`, never by `build`. |

A production build physically cannot contain the rule, and that is a measured
claim rather than an intention:

    npm run build          -> 0 active X-Robots-Tag rules
    npm run build:preview  -> 1
    re-running the script  -> still 1 (idempotent)

Worth noting for later: Cloudflare adds a noindex to *non-production*
deployments by itself, but the preview is deployed as its project's PRODUCTION
deployment — that is what buys a stable URL instead of a hash-prefixed one — so
the automatic protection does not apply and this script is the only thing
standing between the preview and Google.

**Also done:** `npm run deploy:preview` as a one-command deploy, wrangler pinned
as a devDependency so the command is reproducible, the stale netlify.toml
reference in `public/robots.txt` corrected, and `netlify.toml` kept but headed
with a SUPERSEDED note mapping each of its parts to what replaced it. It stays
until the Cloudflare project is verified — deleting the fallback before the
replacement works would be the wrong order.

**Blocked on:** `npx wrangler login`, an interactive browser OAuth on Harshit's
Cloudflare account. A `CLOUDFLARE_API_TOKEN` in the environment would do the
same job non-interactively. Neither is something to do on his behalf.

### 2026-09-18 (later still) — a second gesture for the rack cat, and a better 404 line

**A different action, not the same one retimed.** *"can i have some other cat
working animation of the service image"*:

    was   two quick taps in one spot; all three lights blink together
    now   one deliberate press and hold; the lights then run left to right
          twice; the cat tilts its head at them; back to work

**The press is a rotation about the shoulder, and that is structural rather than
stylistic.** The foreleg is drawn behind the body specifically so its top end
stays hidden — and the shoulder is now the pivot, so the concealed end CANNOT
move at any angle. Nothing can peek out from under the body at the bottom of a
press, which is the failure a translate has to be kept small to avoid. It is
also what a foreleg actually does.

`transform-origin: 0% 0%` lands exactly on the shoulder, and the reason is worth
knowing: `transform-box: fill-box` uses the OBJECT bounding box, which EXCLUDES
the stroke. For this path that box is x[240,263] y[122,134], and its top-left
corner is the path's own start point. Edit the `d` and the origin follows it.

Six degrees at a 26-unit radius carries the paw 2.3 units down and 1.4 in — the
old tap's travel, on an arc instead of a straight line.

There are now three fill-box origins inside this cat (`.paw`, `.breathe`,
`.head`). They are **siblings**, which is the distinction `scene-motion.css`
draws: a transformed child *inside* another fill-box element moves its parent's
box and feeds back. Nesting is the hazard; siblings are fine.

The head tilt is the one movement in the scene that is not work, and it is what
keeps the thing reading as a cat rather than a mechanism. The LED sweep is a DIP
from full rather than a rise from dim, deliberately — those three dots are the
only saturated colour in the drawing, and holding them at partial opacity for
most of a 7s loop would mute the scene's one hit of green.

Verified by seeking each animation through its keyframes in a real browser
(6.00° at 33–43%, −7.00° on the head at 57–76%, the dip arriving at led-1 before
led-3), and by baking the two extreme poses into the built SVG and rendering
them at 1000px — a 6-degree rotation is four pixels at the scene's real 320px
width, which is not a size at which "does the shoulder stay hidden" can be
answered. It does. Gate 1b unchanged at 75.5% cream / 4.8% dark: nothing moved
except transforms.

**The 404 caption.** *"write something clever other than power cut line"*:

    was   Power cut at 3am. Nobody noticed.
    now   The lamp stayed on. The page did not.

The old line was written for the SCENE and is still the scene's own caption on
`_uptime`. On a 404 it described the weather and never mentioned the page, so
the joke never closed. The new one closes it, and only works with this picture —
the lamp is the one warm thing in the frame and the whole argument the drawing
makes. Six words, two clauses, no adjectives.

### 2026-09-18 (later) — both cats go to work, and the head gets a gate

Six things from Harshit in one message. Four were done; two are questions for
him and for a lawyer.

**1. The services cat is working, not sleeping.** *"in services image, the cat
should have a working on the server animation rather than sleeping in the
server."* The load-bearing change is not the animation — it is that **the spare
bay and the switch swapped rack units.** The cat sat at U3 with the switch above
it at U2, and reaching UP meant a foreleg crossing its own face, because the
head is at the right of the body and the switch's lights are at the right of its
face: thirty units of limb through the muzzle. With the spare bay at U2 and the
switch directly below it, the reach is four units and hits nothing. The two bays
are the same size and the same two fills, so Gate 1b did not move — 75.5% cream,
4.8% dark, the identical drawing with two rectangles' contents exchanged.

Then: eyes open with the pupils low and right; a foreleg drawn BEFORE the body
so the body and head lie over its top half and only the reaching part shows,
built as two stacked strokes on one path (navy 10, fur 6, round caps) which
leaves the site's 2-unit contour and gives the far end a cap that is already a
paw. The paw breaks the switch's top edge rather than sitting inside the face —
CareersScene's rule, for CareersScene's reason.

**A bare paw ellipse was tried first and was wrong.** The theory was that
CareersScene's paw works with no limb, so this one would too. It does not
transfer: there the paw sits ON the mouse and beside the head, and the mouse
explains it. Here it had a flat faceplate under it and nine units of cream
between it and the cat, and it read as a stray white blob — a second muzzle, if
anything. Caught by rendering the built SVG, not by reading the coordinates.

Paw, head and LEDs now share one 4.2s clock: head leans in, paw taps twice,
lights answer a beat later and ripple left to right on two 0.15s delays. On
three different durations the same three movements drift apart and read as a cat
near a switch instead of a cat operating one.

**2. The careers cat moves the mouse.** *"the cat should be moving the mouse back
and forth and clicking."* It was clicking a mouse that never moved, which reads
as a twitch. Mouse and paw now sit in two `.mousing` groups sharing one 5.6s
keyframe — two groups only because the cat is drawn between them — and the order
is the sentence: travel right, travel left, settle, THEN click. A click during
the travel reads as a mis-click; one that lands after the pointer stops reads as
a decision. The head tracks sideways at a tenth of the mouse's amplitude.

±6 user units, and both limits are real: at −6 the paw clears the cat's body
contour by 7, at +6 the mouse clears the monitor foot by 10. **The lead had to
move too** — it started at x=252 on the body's right edge, which was fine while
the mouse was still and a cable detaching from its own mouse the moment it
moved. It starts at 242 now, under the body and drawn before it, so what the eye
sees is the visible length of cable growing and shrinking, which is what slack
does.

**3. The 404 sits on grey, and the crush above it was real.** The panel was a
one-word change (`surface="bare"` deleted — `"panel"` is the component's own
default), and it earns its place beyond matching QuietScene: the scene's sky is
a pale grey-blue, so on bare cream the window had nothing to sit against and the
storm read as a hole in the page.

The congestion was **a bug, not a taste call.** `mt-12` on the figure computed to
**0px**. `UptimeScene` carried `margin: 0` in its scoped style; Astro compiles
that to `.uptime[data-astro-cid-x]` and leaves it UNLAYERED, and an unlayered
rule beats a layered one whatever the specificity — so it ate every margin
utility a caller passed, silently, with no way for the caller to know. Even
`:where()` would have won that fight, because the layer is decided before
specificity is looked at.

It was also redundant: Tailwind's preflight already carries
`*, ::before, ::after { margin: 0 }` in `@layer base`, which is what actually
zeroes the `<figure>` UA margin. Removing the line let `mt-12` through and
changed nothing else. Body-to-art went 0 → 48px, and the three lines above it
went from mt-4/mt-4 to mt-5/mt-5. **The other five scene components still carry
the same line** — none is passed a margin today, so none is broken, but that is
why, if one ever ignores an `mt-*`.

**4. Content: three real defects, and a fourth that is a question.**

- **"Procedo Infosystems Pvt. Ltd.. All rights reserved."** — a double full stop
  in the footer, on every page of the site. `legalName` ends in a stop and the
  template appended another.
- **An invented claim, live on /careers.** "We are a small, senior team — which
  means your work is visible, your decisions carry weight, and you learn across
  every layer of the stack." It states how many people work at Procedo and how
  senior they are. It is in no verified source: the old site's careers page had
  its intro line, four culture bullets and the roles, and nothing else. **Deleted
  and not replaced,** per rule #3. This is the second rule #1 breach found by an
  audit rather than by reading — the first was the Facilities Security intro on
  2026-09-17 — and both were the same shape: a plausible sentence written into a
  slot that wanted one.
- **Five blocks of copy hard-coded in pages**, breaking rule #2 — the Contact
  page's three section headings, its form's lead, the success card's heading and
  body, the form's subject dropdown, and the Careers open-application card. All
  moved into `site.ts` as `contactCopy` and `careers.openTitle`/`openBody`. The
  dropdown's five service labels stay shorter than the competency titles on
  purpose; an option reading "Digital Workplace Services & Field Operations" is
  unusable on a phone.
- **The Cookie Policy describes a site that does not exist.** See the launch
  blockers section above — measured, not edited, and it needs a decision first.

Two refinements beyond the defects. The competencies heading read "Comprehensive
technology, engineered as one system" directly above "Comprehensive technology
solutions designed to transform how your business operates" — the same two words
twice in adjacent lines, once at 40px. The sub is Procedo's own wording and
stays; the title is ours, so the title moved, to "Five disciplines, engineered as
one system", which also answers the first question the section raises. And the
"Security First" value was restored to Procedo's full sentence: it was the only
one of the six that did not match the bundle word for word, cut after "above all
else", losing the half that says what Procedo does about it.

**5. SEO — three findings, none of them visible in a browser.**

- The home `<title>` was **106 characters**. Google shows about 60, so the one
  title that matters most read "Procedo Infosystems — Designing intelligent
  systems that empower busi…": the brand, and then nothing a buyer searches for.
  It is `site.homeTitle` now, 62 characters, naming the three things Procedo
  names first in its own company overview.
- The default meta description was **215**, listing all five competencies and
  truncating mid-list so two of the five never appeared in a result. Now 152,
  naming four and closing with the service area.
- **Organization and WebSite were emitted from index.astro alone.** Every inner
  page — including /contact, which is where the address, the phone and the two
  contact points live — shipped a BreadcrumbList and nothing else, and referred
  to the Organization by an @id in another document, which Google resolves
  unreliably at best. Both nodes now come from BaseLayout on every indexable
  page. `organizationRef`, the stub that stood in for it on /services, is unused
  (kept only because the parked `_services-preview` imports it and `astro check`
  reads parked pages).

Also: breadcrumbs and fuller descriptions on the three legal pages, which had no
structured data at all, and `og:image:width`/`height`/`alt` plus
`twitter:image:alt`, so LinkedIn renders the card on a first share instead of
queueing a fetch and showing nothing.

**`scripts/measure-seo.cjs` is new** and is why this is a gate rather than an
anecdote. It reads `dist/`, not `src/` — what a crawler receives is the rendered
head, after layout defaults and per-page props resolve — and it fails on a long
title, a long or missing description, a page without exactly one `<h1>`, an
`<img>` with no alt, a missing canonical, unparseable or duplicate-`@id`
JSON-LD, a missing Organization node, or a missing `og:image:alt`. All ten pages
pass.

**6. The our-mission preview is rejected.** *"we will go with our-mission as it
is and its preview is rejected."* Parked, with the verdict written into the file.
The illustration stays beside the mission STATEMENT, deliberately unlike
/careers and /contact — on those two the image is a small bare ornament filling
white space beside a heading, while here it is a panel with a chip and a caption
that argues a point, and an argument belongs next to the claim it supports.
**Every preview page is now parked;** there is no un-parked one and no open
question.

Build clean throughout, `astro check` 0 errors / 0 warnings / 0 hints, no
horizontal overflow on any page, all three scene density gates still passing
(rack 75.5/4.8, careers 86.5/4.4, uptime 66.0/3.2), and both animations verified
by seeking their keyframes in a real browser rather than by watching them.

### 2026-09-18 — every scene has a page
- Harshit settled the three open placements in two sentences: *"we will be moving
  the uptime scene to 404 with a good caption and the hero image to services"*
  and *"the hero page will not have any image it will be same as the current
  one."*

**UptimeScene → the 404.** It is the right picture for that page and always was
— a storm outside, the lamp still lit, the cat asleep through it. Something went
down and nothing else noticed, which is the whole message a 404 has to carry.
- The heading had to move with it. The old one, *"This page isn't on the rack"*,
  was a joke that only worked while the picture was a cat on a server rack. It
  is now **"This page didn't come back up"**, which fits an outage and an
  infrastructure firm. Chip stays *"All other systems nominal"*; caption is
  *"Power cut at 3am. Nobody noticed."*
- That page's copy was hard-coded in `404.astro`, breaking #2. All of it moved to
  `site.ts` as `notFound` on the way past.
- QuietScene is not orphaned: it still carries `/our-mission` and the contact
  form's success card.

**RackScene → the /services header.** Services was the only page with no artwork
and this scene had no page. It costs the header **10px** — 326 without art, 336
with — because RackScene's 380x275 frame at 320 wide is 232 tall, which fits
inside the height the two-line title already needed. Bare at 20rem, matching
`/careers` and `/contact`.
- Adopted out of `components/preview/` into `components/`, per §5.
- `heroBand` renamed **`rackBand`**: a copy const named for a page the drawing is
  not on is exactly how `workshopBand` became confusing. Named for the drawing.

**The home hero keeps its competency index card.** `_hero-preview` parked,
rejected. `_services-preview` parked too — superseded, since the header slot it
proposed is live with a different scene in it.

**`components/preview/` is down to one file**, `SceneVariant`. Every scene the
site draws now has a page, which has not been true at any point in this project.

Measured on the built output at 1440: `/services` header 336 with the art at
320x232, `/404` art 384x240, `/careers` unchanged at 288, home unchanged at 647
with zero scenes. No duplicate ids, no overflow, `astro check` clean.

### 2026-09-17 — a content audit, and one line that was not Procedo's
- *"we can work on aesthetics all we want but it is of no use if the content is
  not up to the mark."* Correct, and the review found something worse than the
  depth gap I reported on 2026-09-16.
- **`/services` carried an invented intro.** Facilities Security read *"Security
  should be invisible until you need it. We integrate surveillance, access
  control and building management into one coherent, monitored system."* That
  sentence appears in NO verified source — not the scraped bundle, not the
  client's 2026-09-06 revision. It had been written by a previous session, which
  is precisely what rule #1 forbids, and it had been live and in the page's
  JSON-LD `Service.description`.
  Procedo's own line was sitting unused in the bundle the whole time and is now
  restored: *"We turn physical spaces into intelligent environments with
  integrated security systems that are proactive, not reactive."*
- **Nothing was checking.** The illustrations have measured gates; the copy had
  none, so an invented sentence survived several reviews. `scripts/measure-content.cjs`
  now counts both depth and provenance, and prints any services string that
  matches neither verified source.
- **The depth gap, measured:**

  | service | source | groups | items | avg chars | intro |
  |---|---|---|---|---|---|
  | digital-workplace | client | 4 | 12 | 56 | 214 |
  | datacenter-infrastructure | client | 4 | 12 | 62 | 214 |
  | it-infrastructure | old site | 4 | 12 | 34 | 157 |
  | facilities-security | old site | 4 | **10** | 35 | 120 |
  | av-conferencing | old site | **3** | **9** | 26 | 120 |

  The client's two average 12 items at 59 chars; the transcribed three average
  10 at 32. Half the words per bullet. AV is a whole group short and Facilities
  is two bullets short.
- **What only Harshit can supply**, and the whole of what is blocking parity:
  a 4th group for AV, 2 more Facilities bullets, ~31 bullets rewritten to name
  the mechanism rather than the category, and 3 intros at the length of the two
  he already wrote. The old React site has nothing more to give — its 49 bullets
  are the 49 on the page.
- The 11 remaining provenance flags are my own 2026-09-16 paraphrases, which add
  connectives only (`SSO, LDAP, Azure AD` → `SSO, LDAP and Azure AD`). Same
  claims, easier to read, fractionally harder to verify. Kept, and the script
  now lists them so the trade is visible rather than invisible.

### 2026-09-16 — reveal on every page, and RackScene rebuilt
- *"in the home page and company page the content comes out smoothly while
  scrolling but rest of the pages doesn't have that plus when we go back to the
  first 2 pages it doesn't happen like that as well. do that on every page plus
  work on the next image."*

**The reveal bug — one cause, both symptoms.** `.reveal` on `<html>` is what
holds `[data-reveal]` at opacity 0. The `ClientRouter` copies the INCOMING
document's root attributes over the live ones on every client-side navigation,
and the incoming document is static HTML with no class — so clicking any nav
link wiped it. Only the page you LANDED on animated; home and company were
simply where he started. Going back is a client-side navigation too, which is
the second half of the report.
- Measured before, clicking `/` → `/our-mission`: html class `""`, all 9 reveal
  targets at opacity 1, only 3 with `is-visible`. After: the class survives on
  every page in the nav, and below-the-fold content is correctly still hidden —
  home 13 of 16, services 20 of 26, careers 8 of 15.
- Fixed in `BaseLayout` on `astro:after-swap`, which runs before paint.
  `SectionHeading` also now reveals itself: those headings were the largest
  unrevealed blocks left, ~325px each, on every page including the two he liked.
- **Two measurement traps worth remembering.** The Browser pane reports
  `document.hidden` when it is not on screen, and a hidden document does not run
  IntersectionObserver — so the first three runs showed "nothing ever reveals"
  on pages that were fine. Layout (`getBoundingClientRect`) still works while
  hidden, which is why the geometry probes were trustworthy and the timing ones
  were not. Separately, the long-running dev server on 4321 was serving
  `504 (Outdated Optimize Dep)`; the real check has to be `astro preview` on the
  built output, added to `.claude/launch.json` as `procedo-preview-4322`.

**RackScene, rebuilt.** The old one was a close view of a rack FACE and failed
Gate 1b harder than anything on the site: 0.2% cream against a floor of 60, and
30.0% dark against a ceiling of 5. A wall, not a refinement problem.
- Redrawn as an object standing on cream in the family composition: cloud top
  left, then grass · mug · cabinet · plant · grass. Four units — patch panel,
  switch, THE SPARE ONE, blank filler — and the cat asleep in the spare, ears
  breaking the shelf above.
- Kept distinct from QuietScene deliberately: that one is a tall narrow rack with
  the cat ON TOP; this is a cabinet whose front is a visible stack of bays with
  the cat INSIDE one.
- **Gate 1 taught something reusable.** The curve ratio counts curved `<path>`s
  against EVERY drawn element, so thirteen decorative port rectangles pulled the
  scene to 35% against a 40% floor. Drawing each port row as ONE rounded path
  fixed it at 45% and looks identical. The old version used `<pattern>` tiles for
  the same reason.
- First cut had the cabinet at 160 wide and the cat read as a blob — 68 units of
  cat against 160 is 42%, where QuietScene's is 58%. Narrowed to 130.
- Final: **81.4% cream, 3.5% dark, curve 45%, spread 2.50, balance 0.4.** All six
  countable Gate 1 checks and both Gate 1b checks pass.
- `/hero-preview` is un-parked to carry the verdict: `index.astro` with the
  illustration in the hero's right column instead of the competency card. THE
  OPEN QUESTION is whether it should replace that card at all — the two cannot
  share the column. Replacing it costs no navigation (the five links repeat as
  full cards in ServicesPreview immediately below), but it is the home page.

### 2026-09-14 (last, cleanup) — the three dead scenes go
- *"remove workshopscene and the two dead desk scenes."* Checked first that
  nothing imported them — every remaining mention was a comment, in five files —
  then `git rm` on `components/preview/WorkshopScene.astro`,
  `components/preview/DeskSceneWorking.astro` and `components/DeskScene.astro`.
- **The comments were the actual work.** Deleting a file that five headers point
  at just moves the problem, so `CareersScene`, `CompanyScene`, `UptimeScene`,
  `_careers-preview` and the `workshopBand` doc comment in `site.ts` were all
  rewritten to say the files are gone, name the commit they are recoverable
  from (`9aeddcf`), and — where it matters — say why resurrecting them is a bad
  idea: `WorkshopScene` failed Gate 1b at 29.7% cream / 7.2% dark, the desk
  monitor was 4.6% flat dark on a 5% budget.
- `_careers-preview`'s header also still said "park it again once the scene is
  signed off" and "retire DeskScene and DeskSceneWorking" — both were done days
  ago in the file's own terms. Now corrected, with the warning that the page has
  drifted from careers.astro and needs re-syncing before use.
- **`components/preview/` is down to two files**, and both are unfinished rather
  than unused: `RackScene` (home hero, 0.2% cream, a rethink) and `SceneVariant`
  (the 404 comparison strip, used by `_404-preview`).
- Swept up one more piece of dead code while in there: `const KEYS` in
  `CareersScene`, declared and never read. `astro check` now reports **0 errors,
  0 warnings, 0 hints** — it had carried that one hint for days.
- `site.ts` still exports `workshopBand`, a name for a component that no longer
  exists. Left alone rather than renamed, because it is copy config and renaming
  it was not asked for; the doc comment now explains the name and says
  `companyBand` is the obvious replacement if anyone is in there anyway.

### 2026-09-14 (last, after the push) — CompanyScene goes live
- *"adopt CompanyScene on the live /company page and park the preview."* Done,
  and the moves are the ones CLAUDE.md §5 prescribes rather than anything new.
- `src/components/preview/CompanyScene.astro` → `src/components/CompanyScene.astro`
  (`git mv`, so the history follows it). Header comment rewritten: it no longer
  says PREVIEW ONLY and now carries a `WHERE IT IS USED` line, like the other
  three adopted scenes.
- `company.astro` gains the statement band the preview was built to try: the
  /our-mission layout, blockquote left, illustration right in a `bg-band` panel,
  chip and caption from `workshopBand` in site.ts. The **third** overview
  paragraph is the blockquote, so the Overview section below now prints only the
  first two — destructured as `[overviewA, overviewB, statement]` rather than
  mapped, which is what stops it appearing twice. Overview also gains
  `border-t border-line`, because it is no longer the first band under the
  header.
- `company-preview.astro` → `_company-preview.astro`. Kept, not deleted, for the
  same reason `_careers-preview` was: it is the rehearsal space for the next
  change to that band. Its header now warns that it has drifted from the live
  page and must be re-synced before it is any use.
- Verified: `/company-preview/index.html` is no longer built, the sitemap
  contains only `/company/`, the scene renders at 352px on the live page with
  all 12 animations running, and 375px shows no overflow — panel 20→355 inside a
  375 viewport, `body.scrollWidth` 375.
- `WorkshopScene` is now superseded and used nowhere. Left on disk per §4; noted
  in §5 alongside `DeskScene` and `DeskSceneWorking` so nobody copies from it.

### 2026-09-14 (last) — one vertical scale for the whole site
- *"now do the whitespace fix across the site."* Measured first, at 1280, as the
  run of empty pixels between one block's last ink and the next block's first:
  `/` 211/253/221/329, `/our-mission` 161/238/215/313, `/services`
  174/230/230/215/214/288.
- **Two causes.** Sections carried `py-16 lg:py-24` or `py-20 lg:py-28`, so a
  boundary was 192px of padding before a single margin counted — neither section
  knows the other is there. And `ClosingCta` stacked its own 112 on top of the
  navy card's 80, putting 192px above its heading on every page.
- **One scale now: `py-12 lg:py-16` on every band**, 48 mobile / 64 desktop.
  `PageHeader`, `Hero`, `ClosingCta` and `Footer` are the four things that are
  not plain sections; all four are listed in `CLAUDE.md` with why each differs.
  After: `/` 115/157/115/73, `/our-mission` 113/166/151/73, `/services`
  114/154/154/139/138/48.
- **Page height at 1280, same content, measured in an iframe before and after:**
  `/` 4567→4023, `/services` 4453→3917, `/our-mission` 3296→2888, `/company`
  3642→3234, `/careers` 3195→2851, `/contact` 1851→1715, `/privacy`
  2443→2307. Between 5.6% and 12.4%; around an eighth of every main page was
  nothing.
- **One hole the tightening exposed rather than caused.** The vision/mission
  panels on `/our-mission` stretch to equal height and `flex-1` pushed each
  card's tail block to the bottom, so the shorter Vision copy left ~160px of
  white in the middle of its own card. Fixed the way `/contact` was:
  `lg:items-start`, no `flex-1`. The roles and competency card rows keep their
  stretch on purpose — there the aligned "Apply"/"Learn more" links are the
  point.
- Checked at 1280 and 375 on every page: no horizontal overflow, `astro check`
  clean. Commit `e034514`.

### 2026-09-14 (later) — six slots, a cloud, and the full loop
- Harshit on the preview: *"increase the tool box length to adjust 2 rows of
  tools. plus the tools don't look clear enough. we will add cloud here too just
  like 404."* All three done, plus the animation brief below.
- **The board is 136x180 now**, two rows of three on a 420x330 canvas — the
  404's own canvas. Six slots: ring spanner · **bare outline** · pliers on the
  top row, hammer · tape measure · coiled cable beneath. Every tool is declared
  once as a const and used twice, flat as its painted outline and outlined as the
  tool, so a tool and its own shadow can never drift apart.
- The cloud is QuietScene's, and its drift moved into `scene-motion.css` with
  the rest of the shared motion — it is a shared prop now, so it follows the rule
  Harshit set: one definition, every scene.
- **The loop, 16s**, exactly as briefed: asleep with every tool in place · wakes
  at 3.5s · takes the screwdriver off the board at 4.3s · three bats · knocks it
  off at 8.6s · asleep again at 10.4s · the screwdriver puts itself back at
  13–14s · repeat. Verified frame by frame on the built page — tool in slot at
  0.8s, up top at 4.6s, on the floor at 9.2s, home at 14.6s, eyes and paw in step
  throughout.
- **The screwdriver is drawn once**, vertical, in its slot. Up top and on the
  floor are transforms of that one shape, which is why it lands back on its own
  painted outline to the unit. Its attribute transform is the pose the caption is
  about, so the still and the 26%/52% keyframe agree.
- Gates: **75.8% cream / 3.4% dark**, curve ratio 50%, ink centred to 0.0.
  Six tools cost 4.4 points of cream against the three-slot version; still 16
  points above the floor.
- **Answered a question rather than acting on it.** Harshit asked whether the
  mug and plant being swapped relative to the 404 was intentional. It was not:
  the plant went left when ReceptionScene first borrowed it because the left of
  that frame was empty, the mug then took the only free side, and careers and
  company copied contact. The 404 reads grass·mug·rack·plant·grass; the other
  three read grass·plant·object·mug·grass. One line each to flip if he wants it.
- **Done: `CompanyScene` is live on `/company`** and `_company-preview` is
  parked again. Nothing is un-parked without an underscore any more.
- **Done: the whitespace across the site.** See the log entry for
  2026-09-14 (last). One scale, `py-12 lg:py-16`, on every band; gaps between
  blocks went from 161–329px to 48–166px and every main page lost 11–12% of its
  height without losing a word. The scale is recorded in `CLAUDE.md` — read it
  before adding a section, and do not invent a new padding value.

### 2026-09-14 — the company scene, and three goes at one joke
- *"move on to the next image."* I took **company** rather than uptime, and said
  why: `WorkshopScene` has a slot waiting (`/company` carries no illustration
  today), `RackScene` has the home hero, and `UptimeScene` has **nowhere to go**
  — its only home is the parked `_uptime` concept page.
- `WorkshopScene` failed Gate 1b on both counts: **29.7% cream / 7.2% dark**.
  The cause was one shape — a pegboard **340x240 on a 420x360 canvas, 54% of the
  frame in a single flat panel**. Six tools with `#33415C` heads carried the
  dark, the bench ran x20→420 edge to edge, and the plant cropped x=-10.
- **The joke is worth keeping**: every tool over its own painted outline, one
  outline bare, and the missing screwdriver under a paw. site.ts already carries
  the caption — *"Every tool in its place. Nearly."* — so the bare outline has to
  be legible at the size the card gives it. That constraint drove three attempts:
  1. **Board on a bench, 100x72.** Quiet, gate-passing, and **unreadable**: at
     352px the board was 84px wide with 7px tools. You could not see anything
     was missing. Rendered it at real size rather than trusting the gates.
  2. **Board as hero, 136x142, cat on the floor in front.** The joke read; the
     cat became a lump at the base.
  3. **The 404's own composition** — a 136x100 board with the cat ON TOP of it.
     Stacking is the only arrangement that fits a board big enough for legible
     tools and a cat at full 20.4% size; side by side they need over 200 units
     and the props have nowhere left to stand. It doubles the joke too: the bare
     outline on the board, and the stolen screwdriver up top, half over the edge.
- Two tool shapes had to be redrawn after looking at them at 352px: the spanner
  read as a torch (now a **ring** spanner — a circle on a bar, unmistakable at
  any size) and the screwdriver read as an **arrow** (the triangular tip is now
  a flat blade).
- **80.2% cream / 2.9% dark**, curve ratio 48%, ink centred to 0.0 — against
  29.7 / 7.2. The cat, plant, grass and mug are the shared kit; motion comes
  from `scene-motion.css` plus two of its own, `bat` and `rock`.
- `company-preview` un-parked to review it. It renders at **352px at both 1280
  and 1440** — the 22rem cap holds, so there is no card-width question here, as
  there was on careers.

### 2026-09-14 (night, later) — one set of timings, and careers goes live
- *"not only the design but animation of the common elements should be same
  across the website like cat wag, heat from coffee cup, plants and grass moving
  by wind. so that when i tell to change something in the common element it will
  be changed across the site."* That is an architecture instruction, not a tweak.
- **`src/styles/scene-motion.css`** now owns breathing, the tail, the steam and
  the wind. Before this, all five were copied into QuietScene, ReceptionScene and
  CareersScene — three definitions of the same thing, so "make the wag more
  prominent" was three edits that could drift. The rules were **removed** from the
  components rather than left to be overridden: a scoped Astro rule
  (`.tail[data-astro-cid-x]`) and a global one (`[data-scene] .tail`) have the
  same specificity, so the winner would have come down to injection order.
- Each scene opts in with `data-scene` on its `<svg>` and keeps only its own
  motion: the 404 keeps `float · spin · led · blip · drift`, contact keeps its
  eleven sequence animations, careers keeps `click · peer · pip`.
- **The wag is prominent now**, and it is prominent on all three pages at once —
  which is the proof the file works. It was one 8° flick every 9s, easy to miss.
  It is now five beats to 15°, over 8s, still for the first five seconds so it
  reads as a gesture and not a twitch. 15° is a ceiling, not a preference: past
  it the tail tip drops below the desk line in the two desk scenes.
- **Careers gained its own two:** the paw double-clicks every 3.4s with 2.6 units
  of travel (it was a single 1.5-unit dip every 7s), and the head leans towards
  the screen on the same beat. Harshit asked for "cat moving and clicking mouse a
  bit" — one gesture, so they share a duration and their keyframes line up.
- **Adopted on the live site.** `CareersScene` moved out of
  `components/preview/`, `careers.astro` now imports it in place of
  `DeskScene`, and the card box went from `lg:w-52` to `lg:w-72` — **288px**,
  because at 208 the cat rendered 42px against the 404's 78px. `DeskScene` and
  `DeskSceneWorking` are kept on disk but are imported nowhere.
- `_careers-preview` parked again, per §5: it now only duplicates the live page.
- Verified on the built pages: /careers, /contact and /404 all run
  `scene-breathe · scene-tail · scene-wisp · scene-sway` with **identical
  timings — tail 8000ms on all three** — and no console errors anywhere.

### 2026-09-14 (night) — the prop kit, and a real responsive bug
- *"coffee cup should be there in both contact and careers image. we will follow
  this theme all across the site. we have the cat, plant, grass and coffee mug
  all of them with same color and design."* So the four props are now a fixed
  kit, written into `reference/illustration-loop.md` as a standing constraint.
- The mug is QuietScene's, path for path — body, rim, handle, the one `#F24E1E`
  band, both steam wisps and their 4s timing — moved by one translate on a
  **static** parent, because the steam is animated and a CSS transform replaces a
  transform attribute rather than composing with it. Same rule as the plant.
- Both scenes now read **grass · plant · desk · mug · grass**; the 404 reads
  grass · mug · rack · plant · grass. One family, one hand.
- **New tool: `scripts/measure-balance.cjs`.** Adding a prop on the right pushed
  both compositions off-centre, and neither gate can see framing — which is
  exactly the fault Harshit caught by eye on the contact scene weeks ago. The
  script renders the scene, finds the bounding box of every non-cream pixel and
  prints the viewBox that centres it. Contact moved to `22 136 420 240` and
  careers to `13 127 420 240`; both now measure **off by 0.0, 0.0**.
- Gates after: contact **89.2% cream / 2.3% dark**, curve 52%. Careers **87.6% /
  4.2%**, curve 46%. All pass.
- **A real bug, on the live page, not just the preview.** Harshit resized his
  window and the open-application card's text and button came apart. Measured on
  the preview at 288px art: at 960px the text column is 216px; at 880px it is
  136px and the heading breaks to two lines; at **760px it is 66px, the heading
  is on three lines and the button sits 34px past the card**; at 660px the button
  is 134px past and **the page scrolls sideways**. The card went to a row at
  `sm:` (640px), but the art, the gaps and a 255px button need ~660px before the
  text gets a single pixel.
- `careers.astro` had the same defect with its 208px art, about 80px later — so
  this was **shipping**, not something the preview introduced. Fixed on both:
  the row now holds until `lg:` (1024px), and the text column gets `min-w-0` so
  a flex child cannot push its siblings out of the box. Re-measured at 660, 760,
  900 and 1100: one heading line everywhere, no overflow, no sideways scroll.

### 2026-09-14 (later still) — careers preview un-parked
- *"add this to preview first."* `_careers-preview` → `careers-preview`: the
  underscore comes off, which is the whole mechanism. Reachable at
  `/careers-preview`.
- Sealed exactly as §5 requires, and verified against the built output rather
  than assumed: **noindex, nofollow** in the head; **absent from
  sitemap-0.xml**; **no other page links to it**; already named in the sitemap
  filter, so it could not have walked in by accident.
- Verified in the browser: the scene renders at **288px** in its `sm:w-72` box,
  viewBox `0 125 420 240`, five animations live (breathe, click, pip, sway,
  tail), dark screen present, no chair, no console errors.
- The box is deliberately wider than the live page's `sm:w-52`, and both the
  page header and the on-page banner say so, so the difference cannot be
  mistaken for an oversight.
- **Park it again once the scene is signed off.** CLAUDE.md §5 updated to say so.

### 2026-09-14 (later) — chair out, screen black again
- *"remove the chair completely and make the monitor screen black like before."*
  Both done. The chair is gone, not shrunk — and the component says so, because
  it was there for a reason and should not come back by accident.
- **The black screen is affordable now, and it was not before.** The old monitor
  was 76x64 on a 400x264 canvas: **4.6% of the frame in flat dark** against a 5%
  ceiling, which is most of why the old scene failed. This one is 50x42 on a 420
  canvas: **2.1%**. Same decision, less than half the cost, because the scale was
  fixed first. Gate 1b now **88.4% cream / 3.9% dark** — still inside the
  ceiling, with about a point of headroom. Gate 1 all pass, curve 44%.
- It also reads far better small. At 176px the pale screen was a faint square;
  the dark one is unmistakably a monitor. That was worth knowing.
- **Removing the chair unbalanced the frame**, which is not something the gates
  can see: it left a hole on the left, a stranded grass tuft at the far edge, and
  all the weight on the right, where the dark screen already sits. So the plant
  moved into the chair's slot as the counterweight, and the right grass and the
  ground line came in to match. Ink now spans x 51–363 on a 420 canvas, centred
  at 207 against a canvas centre of 210.
- The picture no longer contains the "the seat's yours" joke, because the seat is
  no longer in it. That reading has to come from the card's copy now.

### 2026-09-14 — the careers scene, rebuilt
- *"let us move to the careers image."* `DeskSceneWorking` passed Gate 1 but
  failed Gate 1b at **9.6% dark against a 5% ceiling**, and was drawn in a
  different hand from the 404. New component `CareersScene`; the old one is
  left on disk until this is approved.
- **Where the dark went.** The monitor was a solid navy rectangle, 76x64 on a
  400x264 canvas — **4.6% of the frame in flat fill, on a budget of 5%**. Nearly
  the whole allowance in one shape. The screen is now the 404 rack's pale blue
  with a navy outline: weight carried by line.
- **Four things ran off the edge** — desk (x150→400 on a 400 canvas), monitor
  (324→400), floor line (8→400), pot (y300→380). Nothing in the new one touches
  an edge; the ground line is 81% of the width, which is the 404's own ratio.
- **Scale.** The old cat spanned 172 units of a 400 canvas: **43%**, against the
  404's 20.4%. The new one is QuietScene's cat verbatim at 20.4%, and the desk
  is ReceptionScene's desk unchanged — careers and contact are the same room.
- Harshit chose the composition himself: desk as the single hero object, the
  empty chair kept but dropped to prop scale (42 units, between the 404's mug at
  34 and its plant at 36). The joke survives; the frame goes quiet.
- **Gate 1b: 86.8% cream / 2.6% dark** against 61.7 / 9.6. Quieter than the
  benchmark itself. Gate 1 all pass — curve 45%, spread 2.50, four widths.
- **The paw had to break the mouse's outline.** The first cut had it wholly
  inside, and it read as a hole cut in the mouse rather than a paw resting on
  one. Recorded in the component.
- **The card is the real problem, and it is not the drawing's fault.** careers.astro
  gives the illustration `w-44 sm:w-52` — **176px / 208px**. At 208px this cat
  renders **42px** wide against the 404's 78px, and the monitor, mouse and chair
  stop reading altogether. Rendered at 176 / 208 / 288 / 352 to show it. The
  parked preview page is set to 288px, which is the narrowest that holds
  together; **the live page is untouched pending Harshit's call.** If it must
  stay at 208px it needs a different, tighter drawing — not this one shrunk.

### 2026-09-13 (night, after sign-off) — three from Harshit, all measured
- *"too much negative space in the contact form reduce it."* — and it was not the
  form, it was the **grid**. `lg:grid-cols-2` stretches its items to equal
  height, so the white panel grew to match the taller contact-details column
  beside it: **766px of panel around 590px of form**. 176px of dead white under
  the Send button, 185px under the success card. `lg:items-start` lets the panel
  be its own height. Measured after: panel 590 (form) / 495 (success), slack
  below the content **21px and 1px**. Holds at 1440, 1280, 1100 and 1024.
- *"cap ReceptionScene at 22rem - yes."* Done, matching the cap QuietScene
  already had on its own `.scene`. The contact panel is fluid, so without it the
  same cat drew **495px against the 404's 352px** on a 1280 screen — 40% larger,
  on two pages meant to look like one hand drew them. Now 352px at every width.
- *"/contact-animation-preview - park it."* Renamed with the leading underscore,
  so Astro no longer routes or builds it — confirmed absent from `dist/`. Kept,
  not deleted: it is the only way to walk the submission without filing a real
  enquiry, and it comes back by removing one character. Its entry stays in the
  sitemap filter as the safety net that config describes. CLAUDE.md §5 updated.
- Sign-off recorded: *"i like it"* on the reception sequence, 2026-09-13. The
  page was parked the same hour.
- Build clean: 51 files, 0 errors / 0 warnings / 0 hints, no console errors.

### 2026-09-13 (night, last) — the grass was not touching the pot, it was on it
- *"on the left the grass and plant is touching almost, can you create a bit of
  a gap"* — and it was worse than "almost". The rightmost blade ended at x=105
  with a 3.5 stroke and a round cap, so its ink reached **106.75**; the pot rim
  starts at x=106 with a 2 stroke, so its ink starts at **105**. They overlapped
  by 1.75 units and read as one green blob.
- **Cause:** QuietScene's plant lives on the RIGHT of its canvas, a clear 5 units
  from the grass there. Bringing it over by `translate(-206 8)` set it down on
  top of the left tuft, which nobody had moved to match.
- **Fix:** move the tuft 12 units left, not the plant — the plant has only 8
  units to the desk leg on its other side, so moving it right would have traded
  one collision for another. Now 10.25 units of clear cream, about 9.5 at full
  sway (both sway, and they lean towards each other at the extremes — checked).
- The right side is unchanged and stays tighter at ~7 units of cream, which is
  fine: a thin vertical desk leg beside grass reads as two things. A pot beside
  grass does not.
- Gates unchanged, as they should be for ink that only moved: 90.3% cream, 2.0%
  dark, curve ratio 50%. Grid coordinates 20% → 19%. Build clean.

### 2026-09-13 (night, later) — the submission flow, walkable
- *"i want to check in the contact form submission as well. give me that preview"*
  → `/contact-animation-preview` now opens on the **form**, not the card, so the
  whole journey can be walked end to end.
- **Only `window.fetch` is stubbed, and only for the Web3Forms host.**
  ContactForm's submit handler is not touched, wrapped or re-implemented — so
  the disabled state, the "Sending…" label, the JSON parse, `form.reset()`, the
  swap to the card and both error branches are the production code path. The one
  thing that does not happen is the packet leaving the machine.
- Four answers, chosen before submitting: **accepted · rejected · network fails ·
  live**. Verified each on the built page:
  · accepted → label goes "Send message" → "Sending…" → back; card appears,
    form hides, fields reset, **16 animations at currentTime 0** — the sequence
    starts by itself through the real handler, not by anything the page does.
  · rejected → 422 with a message; red panel, card stays hidden, form keeps
    what was typed.
  · network fails → the fetch rejects; the real fallback appears, pointing at
    contact@procedoinfo.com.
  · Confirmed by `read_network_requests`: **no request to web3forms was made at
    any point**.
- **Live mode really does email the inbox**, so it sits behind a `confirm()` that
  names the address, wired as a capture listener on `document` — which runs
  before the form's own handler, so declining stops the event ever reaching it.
  Tested the decline path with a hard fetch blocker in place so a broken guard
  could not have sent anything: confirm asked, network never reached, form
  untouched.
- The card's reveal is watched with a `MutationObserver` on its `hidden`
  attribute rather than by hooking the submit handler, so the timeline controls
  arm themselves however the card arrives — real submit or "Skip to the card".
- Timeline controls are disabled while the form is up, and the primary button
  reads "Skip to the card" or "Replay" depending on what is on screen.
- Native validation still blocks an empty form (name, email, message). Build
  clean: 51 files, 0 errors / 0 warnings / 0 hints, no console errors.

### 2026-09-13 (night) — a preview page for the sequence
- *"give me a preview page of this new contact animation"* → `/contact-animation-preview`,
  live rather than parked so it is actually reachable, and sealed per CLAUDE.md
  §5 otherwise: noindex + nofollow, in no nav, linked from nowhere, in the
  sitemap filter. Verified against the built output — the sitemap lists nine
  real pages and not this one.
- **It renders the real `ContactForm`, not a copy**, and on load does exactly
  what the live submit handler does on success: `form.hidden = true;
  success.hidden = false`. Same `Container`, same
  `grid gap-12 lg:grid-cols-2 lg:gap-16`, same white panel — so the drawing is
  at production width and the controls sit where the contact details sit.
- Controls: replay · play/pause · a scrubber over the 5.2s · five beat jumps ·
  1x / 0.5x / 0.25x. Beats sample *inside* each beat, not on its boundary — the
  first cut had "wakes" at 2900ms, 12ms short of the eye swap at 2912, so the
  button showed the frame before the thing it names.
- **Replay is the production mechanism, and the pane made it better.** It hides
  the card and shows it again, because `display: none` cancels CSS animations.
  The first version scheduled the two writes across two `requestAnimationFrame`
  calls; in a context that was not painting, they coalesced and nothing
  restarted — 15 animations survived at their old `currentTime`. Forcing a
  reflow between the writes makes it synchronous and frame-independent:
  measured 15 animations before, **0** while hidden, **16 at currentTime 0**
  after, running, at whatever playback rate was selected.
- **The comparison section was lying by 60% until it was measured.** QuietScene
  caps its own `.scene` at 22rem; ReceptionScene caps at nothing, so in a 564px
  grid cell the reception cat drew far larger than the benchmark it exists to be
  compared against. Both are now capped at 22rem and **the cat's head measures
  20.1px in each** — same drawing, same size, finally provable on one screen.
- That cap also surfaced something about the live page: the contact panel is
  fluid and the component has no max-width, so at a 1280px viewport the scene
  renders **495px against the 404's 352px**. Same cat, 40% larger on a wide
  screen. Flagged to Harshit; a one-line `max-width: 22rem` on
  `ReceptionScene`'s `.scene` would match them, but it changes the live page so
  it is his call.
- `[data-still]` shows the reduced-motion frame honestly: it suppresses
  `transform-box` and `transform-origin` as well as the keyframes, because
  ReceptionScene keeps all three inside the media query and those two change how
  the `transform` ATTRIBUTE is read. Cancelling only the animation puts the
  handset off the desk. Verified: still handset at x 215–232 y 210–239, which is
  the animated last frame to the pixel.
- Build clean: 51 files, 0 errors / 0 warnings / 0 hints, no console errors.

### 2026-09-13 (evening, later) — the cat answers the phone
- *"i liked the draft. the image should be cat sleeping, phone ringing then cat
  waking up and picking up the phone."* So the still becomes a sequence.
- **5.2 seconds, played once.** Asleep · four rings from 1.1s · wakes on the
  fourth at 2.9s · the handset leaves the cradle at 3.3s and reaches the ear at
  4.3s · held there. It is not a loop: a loop would put the cat back to sleep
  and hang the call up every five seconds, against both the caption and the
  reason the card is on screen.
- **It starts when the visitor sees it, with no JavaScript.** The success card
  carries `hidden` until a message sends, and `display: none` cancels CSS
  animations — measured on the built page: 0 animations exist while the card is
  hidden, 15 the moment it is shown, all at `currentTime` 0.
- **Every attribute in the markup is the last frame**, and the keyframes rewind
  to the sleeping state at 0%. So reduced motion gets the finished picture, the
  gate scripts measure the picture that matters, and nothing that belongs only
  to the story can leak into the still. Gate 1b is unchanged at 90.3 / 2.0,
  which is the proof.
- New parts, all invisible at rest: QuietScene's closed eyes on a hard cut
  against the open ones, symmetric ring arcs either side of the phone (one side
  only reads as steam), a coiled cord swapped for the drawn one, and a head that
  droops while it sleeps and over-corrects when it startles.
- **A bug that had shipped twice.** A CSS animation's `transform` *replaces* the
  element's `transform` attribute. The plant carried `translate(-206 8)` and
  animated `sway`, so in every real browser the foliage drew 206 units right of
  its pot — measured at x 324–336 against a pot at 108–140. Every still I had
  measured was right, because sharp renders attributes and ignores CSS. Fixed by
  moving the translate to a static parent; the leaves now sit at 106.6–140.4
  with their base at y 282.5 on a rim at 282. Written into the loop as a
  standing rule: **the gates cannot see this class of fault, only the browser
  can.**
- The paw is retimed to be **in place and waiting** at 76% with the handset
  landing at 83%. Arriving together made the handset look as though it flew
  there by itself — the cat's body ends 40 units short of the cradle, so a
  literal reach is not available at this scale.
- Gate 1 improved on the way past: curve ratio 43% → 50%, load-bearing widths
  2 → 3. Build clean: 10 pages, 0 errors / 0 warnings / 0 hints, no console
  errors.

### 2026-09-13 (evening) — the cat wakes up
- Two faults, both Harshit's: *"phone is colliding with the table. it is in the
  table not above it. and the cat should be wake up getting the phone call not
  sleeping. i just told to copy the design and color not the task it is doing."*
- **The collision was real and measurable.** The desk's top surface is y=236;
  the phone's base was drawn 232–246, so ten of its fourteen units were inside
  the slab. It now spans 222–236 and stands on the surface. Written into the
  component's header as a rule: everything on the desk has its base at 236 and
  nothing crosses that line.
- **Copying the design is not copying the job.** The second pass took
  QuietScene's cat wholesale, sleeping pose and closed eyes included, when the
  instruction was the drawing language only. The cat is still QuietScene's
  paths — body mound, off-register shading, pale markings, circle head, ears
  behind, open-stroke tail, tucked-paw ellipse, the 2.0 / 1.8 / 1.4 weights —
  but its eyes are open with a lid line over each, and the far paw is up
  holding a handset to its ear. That is the only difference, and it is the only
  one that should be.
- **The phone took three tries to read.** A flat box reads as a router; a wedge
  reads as a keyboard. What says telephone at 10% of the frame is the notch in
  the top — where the handset sits when it is down — plus a 2x3 keypad. Noted
  in the component so it is not rediscovered.
- Removing the voice arcs dropped load-bearing stroke widths to one, because
  they were the only other user of 1.4. Fixed by the lid lines, which the face
  wanted anyway — bare pupils read blank. Gate 1 all pass, curve ratio 43%.
- 90.3% bare cream, 2.0% dark. Caption follows the picture: the handset is up,
  so "Someone has already picked it up."
- Verified on the built page: phone base 222→236, two filled pupils, no
  closed-eye arcs left, six animations, no console errors.

### 2026-09-13 (later still) — the pass corrected
- **The first refinement was half a fix.** Harshit: *"see the 404 every
  component is minisized and not loud. in the contact the cat is too big and
  even the plant is also big. due to this you have to make desk and phone
  big. colouring and design of the cat on the 404 and contact is different too
  make them same."* All three points held.
- **Apparent size is subject ÷ CANVAS width.** Gate 1b measures emptiness and
  says nothing about scale, so the first pass hit 76% cream with a cat taking
  45% of a 292-wide canvas — quiet by the metric, loud on the page. The 404
  cat is 85.5 units on a **420**-wide canvas, 20.4%. This scene is now the same
  canvas width and the same 20.4%, so at equal rendered width the two cats are
  the same size on screen. That is the number that was missing.
- **The cat is now literally the 404 cat** — QuietScene's own paths, moved by
  one translate. Circle head, closed eyes, one whisker each side, tucked-paw
  ellipse, open-stroke tail, markings back to the pale `#CBD5E1` from the
  darker `#93A3B8` this scene had drifted to. Verified on the built pages:
  both carry the identical body path and head circle. The animation timings are
  QuietScene's too — the scenes should move alike as well as look alike.
- Everything else shrank to suit: desk 174 units against the 404 rack's 152,
  phone at mug scale, plant and grass tufts QuietScene's own and unscaled.
  90.4% cream, 2.0% dark.
- **Working code deleted, deliberately**: the `oncall` state and the
  twelve-second ring-and-pickup loop. It needed an articulated paw to grip a
  handset and a body big enough to hold it at the ear; this cat has an
  eight-unit tucked paw and is asleep. The loop also had no caller left — the
  success card only ever showed the hung-up still. Recoverable at `b3386c4`.
- Lesson: Gate 1b needs a companion. Emptiness and scale are different
  failures, and passing one says nothing about the other.

### 2026-09-13 (later) — the refinement pass begins
- **ReceptionScene refined**, the first of five, and the only one live so the
  natural place to start. Before 41.3% cream / 6.6% dark; after **76.0 / 3.2**,
  against the 404 benchmark's 80.9 / 3.4. What actually moved the numbers:
  - the full-width counter became a **desk** — an object that ends inside the
    frame, with a drawer unit anchoring it and cream either side. A counter
    running edge to edge is a backdrop, not a prop, and it alone was costing
    about 30 points of cream.
  - the wall went: notice board, clock, visitor book and pen pot. Four props,
    including the two biggest slabs.
  - nothing is dark now.  faceplates are gone; the phone and handset
    carry their weight in the outline.
  - contours thinned to the 404 scene's own values — subject 2.0 (was 2.6),
    environment 1.4 (was 1.7), fine 1.0 — and the environment colour to the
    palest .
- The handset had to be **re-angled to -30°** to stay legible once it lost its
  dark fill, which meant re-deriving the cord keyframes from the rig's path.
  Verified live: the cord's end and the handset's plug are the **same point**,
  gap 0.00.
- The vignette variant went with the previews that used it — its crop
  coordinates would have pointed at empty desk after the redraw. Dead code that
  would have rotted silently.
- Four still to go: DeskSceneWorking (dark only, the easiest), UptimeScene,
  WorkshopScene, and RackScene — which at 0.2% cream needs rethinking rather
  than lightening.

### 2026-09-13
- **Preview review.** Harshit went through the parked previews and ruled:
  `illustrations-preview`, all three `contact-preview` pages, `hero-preview`
  and `home-preview` **deleted**; `company-preview` and `careers-preview`
  **kept parked** pending refinement. His words: *"remove the preview but don't
  delete the images"* — so every scene component survives. The deleted pages
  are recoverable from commit `3caa023`.
- **ReceptionScene adopted** (#28) and moved out of `components/preview/`. It
  now appears in exactly one place: the contact form's success card, hung up.
  The three placement options are moot — the image is the reward for having
  sent something, which is a better answer than any of them was.
- **WhatsApp** (#34): number confirmed, the same line as the phone. Derived
  link, hides itself if the number is ever cleared.
- **The real finding** (#35). Harshit put the 404 illustration beside the new
  ones: *"compare with the 404 page image how the elements are subtle not as
  large and bold as they are."* Rendering all three on cream and counting
  pixels gives the cause, and it is not stroke weight:

  | | bare cream | dark pixels |
  |---|---|---|
  | QuietScene (404) | **80.9%** | 3.4% |
  | ReceptionScene (contact) | 41.3% | 6.6% |
  | RackScene (hero) | **0.2%** | 30.0% |

  QuietScene is four fifths empty. RackScene has no cream in it at all. Added
  **Gate 1b** to the loop with a runnable check,
  `scripts/measure-density.cjs` — at least 60% cream, at most 5% dark, both
  calibrated from QuietScene with margin. Two corollaries: draw objects, not
  walls (nothing spans the full canvas width), and colour is punctuation, not
  area.
- Lesson for the loop itself: six countable gates all passed on scenes that
  were plainly too heavy, because every one of them measured the *drawing* and
  none measured the *frame*. A gate that counts elements cannot see emptiness.

### 2026-09-12
- **Preview pages parked** (#34). All ten prefixed with `_`; Astro drops them
  from routing, so the build goes 20 pages → 10 and none is reachable even
  locally. Nothing deleted, nothing rewritten — un-parking is removing one
  character. The sitemap filter stays as a net.
- **`CLIENT-PENDING.txt`** (#35) — one page for the client, in plain language:
  the legal sign-off that is blocking launch, then domain, analytics choice,
  LinkedIn, proof, engagement process, FAQs, WhatsApp. It also lists what is
  already decided (dark mode rejected, no blog, no photography) so those do
  not get reopened.
- **View transitions done** (#33), having declined them two days ago. The
  reason for declining was real and is now closed out: with client-side
  routing an ES module executes once, so a second visit to `/contact` in the
  same session would have left the form unbound — it would have native-POSTed
  to Web3Forms and taken the visitor off the site. All three scripts now bind
  on `astro:page-load`: the reveal observer re-scans for
  `[data-reveal]:not(.is-visible)`, Header re-queries its element and handles
  the menu button by delegation from `document`, and ContactForm binds per
  page load behind a `data-bound` guard.
- **Analytics wired** (#18) — Plausible, Umami or GA4, off until a provider is
  named. GA4 carries a condition worth repeating: it sets cookies, so it must
  not be enabled before a consent banner exists.
- **Dark mode closed** (#20) — rejected by the client.
- Verified on the built output: second client-side visit to `/contact` has
  `data-bound="true"` and intercepts a dispatched submit; nav active state
  follows the router; no console errors; 10 pages, 0/0/0.
- **A mistake worth recording.** To prove the submit handler was attached I
  dispatched a real `submit` event, which ran the real handler and POSTed an
  empty enquiry to Web3Forms. It was accepted, so a blank enquiry landed in
  `contact@procedoinfo.com` at about 21:13 IST on 2026-09-12. Reported to
  Harshit to delete. `form.dataset.bound` already answered the question;
  never fire a live endpoint to check a listener exists.

### 2026-09-10 (evening, later)
- **Vignette rebalanced.** Harshit: too much room below the cat, too little
  above. Measured: 6 units above, 21 below. Now 13 and 15, with the counter's
  front face cropped away. The width drops 256px → 224px and that is forced
  arithmetic, not taste: the ears sit 73 units above the counter surface, there
  are only 72px between the textarea and the Send button, and the desk line is
  pinned to the button's bottom edge — so 224px is the widest crop that still
  clears the textarea, by 8px. Verified: 14px above, 15px below, desk within
  2px of the button's line.
- **Structured data** (#31) and **robots.txt** (#32) — see the table.
- **Correction to an earlier suggestion of mine.** I listed "a proper
  social-share image" as a gap. It is not: `public/og-default.png` already
  exists — logo, tagline, brand colours, 1200×630, properly set in Inter. It
  did not need making. Putting the cat on it is an option, not a fix.
- **View transitions declined for now** (#33), with reasons in the table. The
  short version: three scripts would need converting and one of them is the
  contact form, whose failure mode is silent and costs an enquiry.
- Still open from the ideas list, and needing Harshit or the client rather than
  code: proof (client names, project stories, OEM partners — he has none to
  share yet), the engagement-process section and FAQ, WhatsApp Business,
  analytics, and the LinkedIn URL. One design bet also parked: **a vignette per
  service card**, now that the cat is formally the mascot.

### 2026-09-10 (evening)
- **A hero illustration** (#29), the one thing Harshit left entirely open
  ("can you suprise me with it"). **RackScene**: a rack face seen close up —
  patch panel with nine of twelve ports patched and the cables dressed away to
  both sides, a hank of spare cable tied to the rail, a switch with its link
  lights, a blank filler cropped by the bottom edge — and in the one empty
  rack unit, the cat asleep. Chip "One U spare", caption "Always leave room to
  grow." The picture is the sales point and the joke at once: good design
  leaves headroom, and something always moves into it.
- Two firsts for this site's illustrations. The **loaf pose** — one dome, a
  head at the right, two paws under the chin, no legs at all — so the pose
  cannot fail the way every articulated cat here has. And **real colour**: six
  patch cables in blue, green, light green, peach and grey, every hue already
  in use elsewhere, no new one invented. 15 saturated fills against
  ReceptionScene's 15 and the workshop's 24, but the cables read as colour in
  a way fills do not.
- Mounting holes and patch ports are `<pattern>` tiles, not 42 rects. Tidier,
  and it keeps the curve ratio honest — the measurement script counts every
  drawn element, and the first pass **failed at 32%** because the hardware
  outnumbered the drawing. Fixed by adding what the picture actually wanted
  (two more patched cables, the coiled hank, inner ears, a haunch, a third
  back marking, tail rings), never by padding: 43% on the built output.
- The tail fault turned up again — hanging white shape reads as a hook. Fixed
  with **two rings** across it, the first time that fix has been used here.
  Worth carrying forward.
- Placement: it replaces the competency index card in the hero. That card's
  five links are repeated as full cards in ServicesPreview, the very next
  section, so nothing is lost. `Hero` gained an optional `aside` slot on the
  PageHeader pattern; reverting just that file and diffing the built home page
  shows only the changed HTML comment and one whitespace character.
- **Blog plumbing removed** (#30): `@astrojs/mdx` and `@astrojs/rss` gone from
  package.json, the lockfile and the config. Nothing referenced them.
- **Office card, live page**: a "Get directions" link derived from the address
  (so the two cannot disagree, and it hides if the address is ever emptied),
  and a reach line — *Working with clients across India* — recorded in
  `site.ts` as confirmed by Harshit on 2026-09-10, not inferred.
- Not done from the suggestion list, and worth naming: richer structured data
  (ContactPoint, per-service Service, breadcrumbs), a rendered social-share
  image, view transitions, and a vignette per service card. There is also no
  `public/robots.txt` — a 404 today, which crawlers read as "allow all", but
  it should point at the sitemap before launch.

### 2026-09-10 (later)
- **Vignette fixed on two counts** Harshit raised. The tail was clipped on two
  sides — it runs to x 429.5 in a 420-wide canvas — and the desk sat 21px below
  the Send button. Now: the counter and floor are drawn out to x 440, which the
  full scene's own viewBox clips away, so the vignette's right edge is counter
  rather than air; the crop is x 178-434 y 170-270 from measured extents (tail
  388.6-429.5, ear tips from 176.2, voice arcs to y 174), and the aside's -24px
  offset is exactly the vignette's bottom-edge-to-counter distance. Measured
  live: the desk line and the button's bottom edge are the same pixel, and the
  whole tail sits 6px inside the box.
- **The story now finishes** (Harshit's request, preview only). ContactForm
  gained a `success-art` slot and ReceptionScene a `state` prop; the success
  card shows the same cat with the handset back on its cradle, the paw on the
  counter, the line light out and the call sequence stopped — only breathing,
  tail, leaves and badge keep running. Pass neither and the live page keeps
  QuietScene, byte for byte.
- Lesson worth keeping: `astro dev` served a **stale component stylesheet** —
  the new rule was absent from the dev CSS while present and correctly scoped
  in the build, so the preview showed the cat still on the call. Verified
  against `astro preview` (the built output) instead, where it is right. When
  a style change appears not to apply, check the dev server is serving it
  before touching the CSS.

### 2026-09-10
- **Contact scene placement, second attempt** (#28). Harshit liked the image
  but not its position at the top of the left column beside the form. Two
  options built instead of one, so the choice is a comparison rather than a
  round trip: **A** (`/contact-preview`) puts it straight under the header in
  the Our Mission layout — the header subtitle promoted to a blockquote
  statement on the left, the panel on the right, channels and form below; the
  header drops its subtitle as the mission page's does. **B**
  (`/contact-preview-b`) keeps the live page as it is and closes it with the
  illustration beside the office address, the address card leaving the channel
  list so it is not read twice; if the address were ever empty the panel
  stands alone (§3). A costs form visibility — the form card starts at ~1100px
  against ~560px in B — and that is the trade-off to decide on.
- The subtitle sentence now lives in `site.ts` as `contactStatement` and both
  previews read it from there; contact.astro still carries its own copy until
  one option is ported. Both pages sealed (noindex, out of the sitemap), 18
  pages clean, no console errors, 12 animations on each.
- **Option C — Harshit's idea.** A small crop of the scene beside the form's
  Send button (`/contact-preview-c`). `ReceptionScene` gained a `vignette`
  variant: same SVG, same animation, viewBox cropped to the cat, phone and
  handset (248 × 90). `ContactForm` gained an optional `aside` slot pinned to
  the form's bottom-right, hidden below `sm`, inert to the pointer; as a child
  of the form it disappears with the form on success, and a rule on the page
  hides it while a status message shows. Measured live: 256 × 93 px, 20 px
  clear of the textarea, 61 px from the button, flush with the card's inner
  right edge; rig origin still (268, 210) under the cropped viewBox; 12
  animations; no console errors.
- Proof the live Contact page is untouched: built with and without the change
  (git stash) and diffed the `<form>` fragment — identical bar one whitespace
  character before `</form>`. The page's stylesheet hash changes, as it does
  for any new utility class anywhere; that is the bundle, not the page.
- **Contact scene: the wall filled** (#28). Harshit: *"i like the new image but
  there is negative space above the cat. can you fill it something with
  reception like."* A notice board now hangs on the right wall over the cat —
  timber frame, blue felt laid 2/2 off inside it, a white sheet with a curled
  corner, a peach card with its colour off-register, a green sticky, and a
  visitor badge on a lanyard that swings from its pin (the 12th animation). It
  answers the clock on the left; 18 units of wall stay clear above the ears.
- Gate 0 honesty: named props are now **eight** against the budget of seven
  (clock, board, counter, floor, book, pot, phone, plant). Added at Harshit's
  request rather than blocked on the count; the visitor book is the weakest
  prop if it ever needs trimming. Gate 1 on the built output: curve ratio 45%
  (from 48%), 18 saturated fills (from 12), one orange, all six pass.
- Verified live: 12 animations by name, the badge's pin stays fixed while the
  badge swings ±1.4 units, no console errors, 17 pages clean.

### 2026-09-09 (evening)
- **Contact illustration, animated** (#28). Harshit asked for the phone near
  the cat, ringing, and the cat picking up. The phone moved to within reach of
  the paw. The handset and the paw that holds it share one animated group, so
  the paw travels with the handset; the cord is anchored at the phone and
  rotated + stretched to the plug, with keyframes sampled from the rig's
  easing so the two stay within 1.6 units through the lift. Loop: talk → hang
  up → paw down → quiet → ring twice (rattle, arcs, light, ear flick) → reach →
  lift → talk. The reduced-motion still is the call in progress. The bell went
  in the previous pass; the left of the counter now carries a visitor book and
  a pot of pens — a mug would have been the fourth on the site.
- Built as `ReceptionScene` (preview) on a sealed `/contact-preview`: the
  panel above the direct channels, top-aligned with the form. With the chips
  left where they were the left column ran ~600px past the form; moving the
  "What we can help with" box under the form brings the columns within 120px.
- Verified in the browser: 11 animations by name, every keyframe inside the
  reduced-motion query, resting values equal the attribute state to two
  decimals (CSS `transform-box: view-box; transform-origin: 0 0` reproduces
  the attribute transforms exactly, on a viewBox whose min-y is 70), both
  poses caught in live screenshots, no console or server errors, noindex, not
  in the sitemap, build clean.
- Housekeeping: row 27 of the table had been inserted inside the "blocking
  launch" paragraph by the previous pass's script (stale offset after the row
  26 rewrite). Moved back under row 26; the sentence it split is mended.
  Lesson: recompute an index after replacing text ahead of it.

### 2026-09-09 (later still)
- **Lamp removed from the workshop scene** at Harshit's request — cord, shade,
  bulb, rays, the pool of light on the bench, and their three animations. The
  scene stands on the board and the cat. Curve ratio rose to 52%; ten
  animations remain.
- Started the next image for the **Contact page**, the one content page with
  no artwork in its default state: "Ring for service" — a reception counter, a
  desk phone (ringing), a wall clock, a brass bell, and the cat on the counter
  with a paw on the bell. The workshop crouch reused verbatim and *mirrored*
  with one transform, so the pose is proven and faces the other way for
  variety. Image only so far; component and preview to follow a verdict.

### 2026-09-09 (later)
- **Company placement, third attempt.** Harshit did not like the illustration
  in the header either and asked for "something like the mission page". It now
  sits in a bordered panel with chip and caption beside a large-type statement —
  the third overview paragraph, about precision, promoted to a blockquote and
  removed from the Overview below. All Procedo's own copy, nothing new.
- **Lamp de-cluttered.** The clamp-arm lamp crowded the cat's head, paw and
  screwdriver into the right-hand corner. Swapped for a pendant on a cord from
  above the frame, dropped through the gap between the pliers and the tester.
  Harshit has since asked for the lamp to go entirely — queued as the next job.
- **Careers cat at work** (#27). The workshop play-crouch, moved onto the desktop
  with a single translate: paw on the mouse, eyes on the screen, chair empty.
  First pass had the monitor cropped at the edge and the head over the screen —
  cramped. Monitor pulled fully into frame, head given air, desk extended under
  the rump. Mug dropped as clutter.
- Lesson recorded: once a pose lands, **reuse its geometry verbatim and move it
  with a transform** rather than redrawing. The desk cat cost one composition
  fix and no anatomy fixes because the shape was already proven.
- Both scenes gated on the BUILT output and verified in the browser: 13 and 6
  animations, unique ids, noindex, no console errors, 16 pages clean.

### 2026-09-09
- **WorkshopScene built and previewed for the Company page** (#26). The concept
  came out of a one-off session on a different model at maximum effort, with the
  brief "make a masterpiece": a workshop shadow board, every tool hanging over
  its painted outline with a label strip under each hook, one hook empty, and
  the cat on the bench below with the missing screwdriver. Harshit's reaction
  to the first (asleep) version: "i love it". He then asked for the cat awake
  and playing, like the cat in reference 04, and chose that version.
- **The pose is the finding worth keeping.** An awake cat has failed here
  before. This one is a play-crouch built from convex parts only — long low
  body with the rump highest, head low at the front, tail up, paws emerging
  from under the chest, and no legs drawn at all. It reads. Every articulated
  cat that failed, failed on its legs; this pose has none. Recorded so the next
  awake cat starts here rather than at a sitting or walking pose.
- Two details did most of the work: dropping the pupils to the bottom of the
  eyes so the cat looks down at the screwdriver rather than across at the
  viewer, and drawing the raised tail so it tapers upward rather than curling
  under — a tail that curls under has read as a hook in every scene so far.
- The painted outlines behind each tool are the mis-registration technique made
  literal: a real shadow board practice, offset 2 units, with the empty one
  telling the story.
- Preview: `/company-preview`, sealed off per §5. Caption in `site.ts` as
  `workshopBand`. Verified in the browser: 13 animations running (paw bat,
  screwdriver rock, motion marks, breathing, tail sway, steam, lamp, tester LED,
  cable swing, leaves), unique pattern/title ids, noindex, no console errors,
  zero gradients. Build clean, 16 pages.
- Still open alongside it: `/home-preview` (UptimeScene band) and the earlier
  Company candidates. If WorkshopScene is adopted on Company, UptimeScene on the
  home page still stands as a separate proposal.

### 2026-09-07 — services page tightened after preview review
- **Removed the two per-section closing banners.** Harshit's call, reviewing the
  deployed preview: they were redundant against the page-level "Ready to
  Future-Proof Your Business?" CTA that already closes the page. The
  `CompetencyBanner` interface, the `banner` field, the render block and the
  now-unused `Button` import in `services.astro` all went with them — no dead
  machinery left behind.
- **Condensed the two new competencies to 4 cards each.** Digital Workplace went
  from 7 groups / 28 bullets to 4 / 12; Datacenter Infrastructure from 6 / 17 to
  4 / 12. Both intros cut from ~360-430 characters to 214. All five sections now
  read 4/4/4/4/3 cards — the two new ones no longer dwarf the rest.
- **Reordered: Digital Workplace first, Datacenter second**, then IT
  Infrastructure, Facilities Security, AV. The footer Solutions column, the
  contact form's subject dropdown and the mission page's Service Pillars were
  reordered to match; the services page, the company page's "What we deliver"
  list and the homepage JSON-LD all derive from the array and followed on their
  own.
- **What was cut, so it can be restored on request:** the whole *Tiered SLA
  Framework & Operational Cadence* group (business-impact SLAs, geographic
  break-fix tiers, continuous improvement programme, multi-tier governance);
  ITAM and Endpoint Compliance merged into one card; Life Safety, Physical
  Security and DCIM merged into *Safety, Security & Monitoring*; and the phrase
  "aligned with Tier-standard benchmarks" dropped from the Datacenter intro.
  Dropping the SLA group also removes the contractual-sounding promises flagged
  earlier as a risk to publish before legal sign-off (#5).
- The banner headline *"Empower Every User. Secure Every Asset."* survives as
  the Digital Workplace section quote, so that line is not lost. Datacenter kept
  the stronger power/precision quote it already had.
- Every condensed bullet is a compression of the client's own wording. Nothing
  new is claimed.

### 2026-09-07 (later still)
- **New hard rule: no human figures in illustrations.** Harshit, verbatim: *"no
  full images of people cause these are not looking good in geometric patterns
  but cat is looking good, server is also good but no people."* This reverses his
  2026-09-05 "including people in the images is fine as well just like the
  reference images", so it is written down in three places rather than one:
  Gate 0 of `reference/illustration-loop.md`, a new CLAUDE.md §5b, and the
  project memory. A banner at the top of `ANALYSIS.md` also warns that the
  reference set is full of people and we do not copy that part.
- The rule includes partial figures. A hand, or figures seen from behind, needs
  explicit per-scene approval — both were plausible next moves and both are
  closed off deliberately, so the decision is not relitigated.
- Deleted `src/components/preview/MissionScene.astro` and
  `src/pages/our-mission-preview.astro` (#24), and dropped the now-dead
  `/our-mission-preview` entry from the sitemap filter. `src/components/preview/`
  now holds only `SceneVariant.astro`, which backs `/404-preview`.
- Evidence behind the rule, for the record: accepted work is QuietScene,
  UptimeScene and DeskScene — all animal or machine subjects. Rejected work is
  the five competency illustrations (no character at all) and both "The handover"
  iterations (human figures).

### 2026-09-07 (later)
- **DeskScene adopted on the Careers page**, inside the open application card
  (placement B of two shown on `/careers-preview`). First illustration to pass
  through the whole critique loop and be accepted.
- Fixed the alignment Harshit spotted. The boxes were already centred perfectly;
  the fault was inside the SVG. The artwork's bounding box ran y=128..380 in a
  `0 0 400 380` viewBox, so 34% of the image was empty sky and the drawing sat
  low in its own box. Cropped the viewBox to `0 104 400 276`, which also makes
  the cat larger at the same footprint. Verified: image, heading block, button
  and card now share one centre line, measured offset 0px.
- Answered the negative-space question with measurements rather than opinion:
  every inner page uses the same left-aligned `PageHeader` with a `max-w-2xl`
  subtitle, and `/our-mission` has no subtitle at all, so it has more empty space
  than Careers. Not a Careers problem; changing it is a whole-site decision.
- **Self-inflicted bug worth recording.** Editing `careers-preview.astro` with
  PowerShell `Set-Content` double-encoded the file's UTF-8 (em dashes became
  mojibake). The build stayed green because mojibake is valid text. Added a
  scan, confirmed only that one untracked file was hit, and rewrote it.
  **Do not use PowerShell Set-Content on UTF-8 source files** — use the Edit
  tool or Node, which handle the encoding correctly.

### 2026-09-07
- Converted the remaining two QuietScene instances to technique B — the
  contact-form success state and `/our-mission`. All three live scenes now match.
  Only the contact page was reported, but leaving `/our-mission` on the old
  palette would have recreated the same mismatch a page later.
- Prepared a **client preview deploy** (#16). `netlify.toml` carries the build
  config and `X-Robots-Tag: noindex, nofollow` on every response. The noindex is
  in the Netlify config rather than `public/robots.txt` deliberately: a robots.txt
  in `public/` gets copied into `dist/` and would follow the site into production,
  quietly de-indexing the real launch.
- Started a new illustration for the **Careers page**, the only content page with
  no artwork. Concept: a cat asleep on an office chair beside a lit desk — the
  seat you would be taking. Animal-led on purpose; the honest read of the record
  is that the rejected batch of five was *object-only* and read as diagrams, while
  both scenes that landed had the cat in them.

### 2026-09-06 (later still)
- **404 illustration converted to technique B.** `QuietScene` gained a `palette`
  prop rather than being rewritten in place, because three live pages import it
  (404, `/our-mission`, the contact-form success state) and only the 404 was
  asked for. `outline` stays the default, so the other two are untouched.
- Verified the two unconverted pages did not drift: `/our-mission` still renders
  65 elements with the original stroke colours, identical to the pre-change
  measurement. The only delta is one `stroke-width` attribute paired with
  `stroke="none"`, which paints nothing. The coloured 404 renders 68 — the extra
  three are the cat's back shading, its re-stated contour and the head shading,
  which the outline version does not need.
- Consequence to plan for: the 404 now carries noticeably more colour than
  `/our-mission` and the contact success state. Converting those is
  `palette="coloured"` on each, whenever wanted.

### 2026-09-06 (later)
- **Client copy revision applied to the services page.** Telecom removed as a
  competency, Digital Workplace Services & Field Operations added in its place at
  position 4, and Power & Precision Systems renamed Datacenter Infrastructure at
  position 5 with the client's full replacement copy. Net count is still five, so
  every "five core competencies" line survives untouched.
- Telecom appeared in **14 places**, not one. All updated: `site.description`,
  the mission page's Service Pillars list, the footer Solutions column, the
  contact form's subject dropdown, the services / company / contact meta
  descriptions, the illustrations gallery, and this repo's own CLAUDE.md
  description of the firm. Homepage JSON-LD needed no edit — `makesOffer` derives
  from the `competencies` array.
- Slugs renamed (`power-precision` → `datacenter-infrastructure`, `telecom` →
  `digital-workplace`). Safe because the site has never been deployed, so no
  public URL carries the old anchors. The illustrations gallery looks competencies
  up by slug with a non-null assertion, so a stale slug there would have crashed
  the render — both were fixed in the same change.
- `Competency` gained two optional fields: `banner` (the client's closing banner)
  and an optional `quote`. The client supplied no quote line for Digital
  Workplace, so that section hides the blockquote rather than inventing one.
- **Two CTAs deliberately not built.** "Download Technical Overview" has no asset
  and "Explore Our Managed Services" has no page; rendering either would be a dead
  link, which CLAUDE.md #3 forbids. `CompetencyBanner.ctaSecondary` is wired and
  waiting — supply a target and each becomes a one-line change.
- Fixed on the way in: `$N+1$` and `$2N$` in the client's text were LaTeX
  delimiters and would have rendered literally. Now plain `N+1` / `2N`.
- **Mission illustration abandoned after two iterations (#24).** Rejected by both
  Harshit and the client. Recording the pattern rather than the excuse: every
  illustration that landed has an animal or an object as its subject; every one
  rejected has human figures. Worth treating as a known limit when planning the
  next one.
- `src/components/illustrations/IllustrationTelecom.astro` is now unreferenced.
  Left in place rather than deleted, pending confirmation (CLAUDE.md #4).

### 2026-09-06
- **Adopted a measured illustration procedure.** `reference/illustration-loop.md`
  replaces "take inspiration from the references" with gates that produce numbers.
  Wired into the `CLAUDE.md` read order as mandatory before any SVG.
- Calibrated it against the work rather than against taste. The first draft of the
  rubric **failed `QuietScene`** — the illustration that was called fantastic — on
  curve ratio (43% vs a 70% floor), on primitives (the cat's head is a `<circle>`)
  and on prop count. Every threshold was reset from measured values. Sanity check:
  `QuietScene` now passes all six countable gates; `UptimeScene` — "better but still
  not matching" — fails two by a hair. That split is the calibration.
- Added `scripts/measure-svg.cjs`, which prints the Gate 1 numbers with PASS/FAIL
  per floor and exits non-zero on failure. The procedure references the script
  rather than inlining it, so the two cannot drift apart.
- Built `/404-preview` — the 404 page rendered three times, once per technique,
  from a single component with a swappable palette so only the fills differ.
  Sealed off per §5. See #23.
- Withdrew the four-floor mission concept (#24) and recorded the consequence: the
  Our Mission page now has no approved illustration concept.
- `.gitignore` now tracks top-level `reference/*.md`. The procedure is project
  knowledge and must survive a machine change; only the third-party images stay local.

### 2026-09-05
- Reference images dropped into `reference/inspiration/` and renamed to match the
  index. Identified each by **opening it**, not by timestamp — which caught two
  things a filename sort would have missed: reference 11 (two hands, "No
  conversation selected") never actually made it into the folder, and the
  eleventh file was a **new** image entirely — a Google Meet "Your meeting is
  safe" reassurance state, now catalogued as reference 12 / `ANALYSIS.md` §8.
- Reference 12 is a genuinely different illustration system: no outlines at all,
  light theme, straight Google brand palette, and a *reassurance* register rather
  than reward-or-prompt. Noted as **the closest of the twelve to Procedo's own
  tone**, and as a possible third way for the Services page — a single symbolic
  object in a containing shape, rather than either a life scene or a diagram.
- Brought `CLAUDE.md` back in line with reality (it still said the repo was
  unpushed, listed two unknown values when only LinkedIn remains, and named two
  deleted pages as the sealed-off examples). Refreshed the stale project memory.

### 2026-08-30 (later)
- Deleted the standalone `/quiet` concept page now that its illustration is
  adopted in three real places (404, `/our-mission`, contact success). Kept
  `QuietScene.astro` — three live pages import it. Also cleaned up the stale
  `/quiet` references left behind in the sitemap comment, `404.astro` and
  `uptime.astro`. `dist-client/` kept deliberately, for future preview builds.
- **Illustration adopted on `/our-mission`** — QuietScene now sits beside the
  mission statement on the live page, and `our-mission-preview.astro` was deleted
  along with its sitemap exclusion. Verified the preview banner did not leak
  through into the live page.
- Git set up by the user and pushed to GitHub (`HarshitRawat11/Procedo`).
- Analytics (#18) and deployment (#16) parked by decision, not blocked.
- Office address supplied and wired in — live on `/contact` and in the homepage
  schema. PIN 110092 confirmed by the user.
- **`/quiet` moved to a real 404 page.** Now uses BaseLayout so the header, footer
  and two escape links are present — a bare page would strand anyone landing there.
  Astro emits `dist/404.html`, which static hosts serve automatically.
- **Contact form success state** swaps the whole form out for QuietScene plus
  "Message received", instead of a green text bar. Verified with a real send.
- Cleared the last `astro check` hint by exporting `Container.astro`'s `Props`
  interface — the build is now completely clean.
- Decisions logged: no photography (deliberate style, #19 closed), dark mode
  parked for the client (#20), illustrations parked until the style lands (#15/#22).

### 2026-08-30
- **Contact form is live.** Received the Web3Forms key, wired it into `site.ts`,
  and verified it end-to-end with a real API call — `success: true` back from
  Web3Forms itself, not just a UI check. `/contact` no longer shows the
  disabled-form fallback.
- The first key turned out to be registered to the wrong inbox and was replaced
  same day. Re-verified the replacement with a fresh trial submission through the
  real `/contact` form (not just a raw API call this time) — green success,
  form reset itself correctly.
- `git init` — this project had no version control until today. 52 files staged,
  `.gitignore` extended to cover `dist-client/`. Removed a stray `.tmp_head.ts`
  left over from an early failed command. Did **not** set `user.name`/`user.email`
  or make the first commit — that requires the user's own git identity, which I
  do not configure myself under any circumstance.
- Reviewed the illustration-set feedback (see #15/#22): the 5 competency
  illustrations diagrammed equipment instead of depicting the moment the service
  creates. Wrote up the root cause as `ANALYSIS.md` §6 and a standing memory note
  so future attempts start from the lesson.
- Built `/uptime` — a second empty-state scene, one at a time this time: a storm
  outside a window at 3am, lamp still lit, cat asleep on the sill. The UPS itself
  is never drawn. Rendering it to PNG caught a real bug (a lightning-bolt opacity
  rule sat inside the `prefers-reduced-motion` guard, so reduced-motion visitors
  would have seen a permanently opaque bolt) plus two visual fixes (a hard-edged
  glow reading as a solid wedge; the scene stuck at 300px because a page style
  wasn't `:global`).

### 2026-08-29
- Added `CLAUDE.md`, `README.md` and this board to stop scope drift between sessions.
- Created `reference/inspiration/` with `ANALYSIS.md` — a breakdown of Google Chat
  empty-state illustrations (now 10, after a couch/TV reference was added). Key
  finding: two-tone outlines (near-black on figures, thin blue on props) is the
  most transferable technique.
- Confirmed the site ships no photography and has no dark mode; both logged above
  as open decisions rather than defects.
- Built `dist-client/` — a client-safe copy of the static build with `/quiet` and
  `/our-mission-preview` stripped out, ready to share for feedback. Confirmed
  Netlify Drop as the fastest no-code path (instant anonymous URL, expires in 1hr
  unless claimed with a free signup) — account creation itself is something only
  the client/user can do, not something to automate.

### 2026-08-27 (later)
- Built `/quiet` — a standalone "all systems nominal" empty-state concept:
  hand-authored inline SVG of a cat asleep on a humming server rack, all motion
  gated behind `prefers-reduced-motion`. Sealed off from the site.
- Extracted the artwork into `QuietScene.astro` and built `/our-mission-preview`
  to try it beside the mission statement. The live `/our-mission` was left
  untouched pending a decision.
- Verified the tail-flick animation timing via the Web Animations API after a
  question about whether it would ever be visible: it fires over the last 1.8s of
  a 9s loop, indefinitely.

### 2026-08-27
- **Removed all Aviator Infotech material** (~1.6 MB): `CONTENT.md`, 12
  `scrape/*.html` pages, and `reference/legacy/`. Chose deletion over a
  find-and-replace, which would have fabricated ~60 claims — a founding date,
  testimonials and job vacancies — attributed to Procedo.
- Renamed the dev server configs from `aviator-*` to `procedo-*`.
- Verified zero occurrences of "aviator" remain anywhere in the project.

### 2026-08-26
- Discovered the repo's `CONTENT.md` described a different company, and that
  Procedo's real copy survived inside `scrape/procedo/app.js`. Recovered the
  genuine vision, mission, six core values, four "why partner" props, six careers
  roles and the full privacy/terms/cookie text.
- Filled every page from that recovered copy; added `/terms` and `/cookies`;
  replaced the placeholder privacy policy and the placeholder careers roles.
- Normalised the brand to **Procedo Infosystems** / **Procedo Infosystems Pvt. Ltd.**
- Added Organization + WebSite JSON-LD to the homepage.
