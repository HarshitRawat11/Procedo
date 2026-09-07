# PROGRESS

Status board for the Procedo Infosystems website.
**Update this file whenever a task changes state.** New sessions should read it
immediately after `CLAUDE.md`.

- **Last updated:** 2026-09-06 (later)
- **Build:** ✅ passing — 14 pages, **0 errors / 0 warnings / 0 hints** (`npm run build`)
- **Deployed:** ❌ not yet — domain exists (procedoinfo.com) but still serves the old site
- **Repo:** ✅ `HarshitRawat11/Procedo` on GitHub
- **Overall:** the site is content-complete and shippable. Only the legal review
  and deployment remain before launch.

Legend — ✅ done · 🟡 needs a decision · 🔴 blocked on someone else · ⬜ not started

---

## Board

| # | Task | Status | Blocker | Next step |
|---|---|---|---|---|
| 1 | Site scaffold, theme, layout, components | ✅ | — | — |
| 2 | Real copy across all 9 public pages | ✅ | — | — |
| 3 | Recover real copy from the old React bundle | ✅ | — | — |
| 4 | Remove all Aviator Infotech material | ✅ | — | — |
| 5 | Legal pages (privacy / terms / cookies) | 🔴 | Needs review by Procedo's legal advisor | Send the three pages for sign-off; update the `updated` date in `site.ts` after |
| 6 | Contact form delivery | ✅ | — | Web3Forms key set 2026-08-30. First key was tied to the wrong inbox and replaced same day; the current key (ending `...6a36`) is verified live via two real form submissions through `/contact` |
| 7 | Office address | ✅ | — | 324 Guru Ram Das Nagar, Laxmi Nagar, Delhi – 110092. PIN confirmed by user 2026-08-30. Live on `/contact` and in the homepage JSON-LD |
| 8 | LinkedIn profile URL | 🔴 | Not supplied | Client to provide; replace `'#'` in `socials` — footer icon unhides itself |
| 9 | Governance docs (CLAUDE / README / PROGRESS) | ✅ | — | Keep this board current |
| 10 | QuietScene illustration | ✅ | — | Landed on the real site in three places: the 404 page, `/our-mission`, and the contact-form success state. The standalone `/quiet` concept page was deleted 2026-08-30 once adopted |
| 11 | Custom 404 page | ✅ | — | Built 2026-08-30 using QuietScene inside BaseLayout (header/footer present so visitors can recover). Emits `dist/404.html`, excluded from sitemap |
| 12 | Illustration on Our Mission page | ✅ | — | Adopted 2026-08-30 — QuietScene now sits beside the mission statement on the live `/our-mission`. Preview page deleted |
| 13 | Contact-form success state | ✅ | — | Done 2026-08-30: on a successful send the form is replaced by QuietScene + "Message received". Verified with a real submission |
| 14 | Design inspiration folder | ✅ | — | Images saved and renamed to the index 2026-09-05, verified by opening each. 11 of 12 present — ref 11 (two-hands) never made it in; ref 12 (Google Meet "meeting is safe") is new and now catalogued as ANALYSIS §8. Notes tracked in git, images stay local |
| 15 | Illustration set for the site | ✅ | — | Governed by `reference/illustration-loop.md`. Four scenes exist: QuietScene (404, contact success, `/our-mission`), UptimeScene (`/uptime`), the kept Power/Datacenter concept, and **DeskScene**, adopted on **Careers** 2026-09-07 — first illustration to clear the loop end to end |
| 16 | Deployment | 🟡 | Needs you to connect the repo | **Client preview deploy prepared 2026-09-07.** `netlify.toml` committed: build config plus `X-Robots-Tag: noindex, nofollow` on every response, so the preview can never be indexed while the legal pages are unreviewed. Connect `HarshitRawat11/Procedo` at app.netlify.com and it auto-deploys on push. Production on procedoinfo.com is still a separate, later decision — host unknown |
| 17 | Version control | ✅ | — | Git configured, first commit made, and pushed to GitHub (`HarshitRawat11/Procedo`) 2026-08-30 |
| 18 | Analytics | ⏸️ | Parked 2026-08-30 | Recommendation on record: Cloudflare Web Analytics (free, cookieless, no consent banner needed). ~5 min to add whenever you want it |
| 19 | Photography / real imagery | ✅ | — | **Decided 2026-08-30: no photography.** The illustration-and-icon style is a deliberate choice, not a gap. Revisit only if real project photos become available |
| 20 | Dark mode | ⏸️ | Parked 2026-08-30 — client decision | Big change; user will raise with the client. No `prefers-color-scheme` handling exists today |
| 21 | `Container.astro` unused `Props` warning | ✅ | — | Fixed 2026-08-30 by exporting the interface. Build is now 0 errors / 0 warnings / 0 hints |
| 22 | `/uptime` illustration concept ("power cut at 3am, nobody noticed") | 🟡 | Not yet matching the bar — see below | 2026-08-30 verdict: "better than the previous 5" but still short of `/quiet` and the Google references. Parked, not reworked — see `procedo-illustration-approach` memory for a color/frame-share theory to test on the next attempt |
| 23 | Illustration technique — outline vs flat colour | ✅ | — | **Decided 2026-09-06: technique B.** Applied to all three QuietScene call sites 2026-09-07 — the 404, the contact-form success state and `/our-mission`. `QuietScene` takes a `palette` prop (`outline` default, `coloured`); every live instance now passes `coloured` |
| 24 | Our Mission illustration | ⏸️ | Parked 2026-09-06 | **Two iterations rejected.** Iteration 1 read as a diagram (figures ~30% of canvas, everything on one baseline). Iteration 2 fixed scale and depth, passed all six countable gates, and was still rejected by both Harshit and the client. Pattern across attempts: 1 success with an animal subject (QuietScene), 4 + 2 failures whenever human figures are involved. Live page keeps QuietScene. `src/components/preview/MissionScene.astro` and `/our-mission-preview` left uncommitted pending a call on whether to bin them |
| 25 | Client copy revision — services | ✅ | — | Applied 2026-09-06. Telecom removed as a competency; **Digital Workplace Services & Field Operations** added at #4; **Power & Precision Systems** renamed **Datacenter Infrastructure** at #5 with the client’s full copy. Still five competencies. Two CTAs the client asked for are withheld until their targets exist — see the log |

---

## What's actually blocking launch

**One thing:** legal sign-off (#5) on the privacy / terms / cookie pages. The
text is real, carried over from the previous site, but nobody has reviewed it.

Deployment (#16) is ready the moment the domain is pointed at the new build.
Nothing is blocked on code.

---

## Log

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
