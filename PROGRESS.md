# PROGRESS

Status board for the Procedo Infosystems website.
**Update this file whenever a task changes state.** New sessions should read it
immediately after `CLAUDE.md`.

- **Last updated:** 2026-08-30
- **Build:** ✅ passing — 12 pages, **0 errors / 0 warnings / 0 hints** (`npm run build`)
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
| 14 | Design inspiration folder | ✅ | Image files not saved (can't write images from chat) | Drop the 10 PNGs into `reference/inspiration/` using the filenames in its README |
| 15 | Illustration set for the site | 🟡 | Awaiting your call on the 4 rejected drafts | First batch of 5 rejected 2026-08-29 — only Power & Precision kept. Root cause and rules in `ANALYSIS.md` §6: draw the *moment* the service creates, not the equipment; one illustration at a time, not batched |
| 16 | Deployment | ⏸️ | Parked 2026-08-30 | Netlify path parked. Repo is on GitHub, so connecting a host later is a 3-click job. Still unknown: who currently hosts procedoinfo.com |
| 17 | Version control | ✅ | — | Git configured, first commit made, and pushed to GitHub (`HarshitRawat11/Procedo`) 2026-08-30 |
| 18 | Analytics | ⏸️ | Parked 2026-08-30 | Recommendation on record: Cloudflare Web Analytics (free, cookieless, no consent banner needed). ~5 min to add whenever you want it |
| 19 | Photography / real imagery | ✅ | — | **Decided 2026-08-30: no photography.** The illustration-and-icon style is a deliberate choice, not a gap. Revisit only if real project photos become available |
| 20 | Dark mode | ⏸️ | Parked 2026-08-30 — client decision | Big change; user will raise with the client. No `prefers-color-scheme` handling exists today |
| 21 | `Container.astro` unused `Props` warning | ✅ | — | Fixed 2026-08-30 by exporting the interface. Build is now 0 errors / 0 warnings / 0 hints |
| 22 | `/uptime` illustration concept ("power cut at 3am, nobody noticed") | 🟡 | Not yet matching the bar — see below | 2026-08-30 verdict: "better than the previous 5" but still short of `/quiet` and the Google references. Parked, not reworked — see `procedo-illustration-approach` memory for a color/frame-share theory to test on the next attempt |

---

## What's actually blocking launch

**One thing:** legal sign-off (#5) on the privacy / terms / cookie pages. The
text is real, carried over from the previous site, but nobody has reviewed it.

Deployment (#16) is ready the moment the domain is pointed at the new build.
Nothing is blocked on code.

---

## Log

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
