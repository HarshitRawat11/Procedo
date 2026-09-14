# PROGRESS

Status board for the Procedo Infosystems website.
**Update this file whenever a task changes state.** New sessions should read it
immediately after `CLAUDE.md`.

- **Last updated:** 2026-09-09
- **Build:** ✅ passing — 16 pages, **0 errors / 0 warnings / 0 hints** (`npm run build`)
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
| 18 | Analytics | 🟡 | Wired; waiting on a provider | Wiring done 2026-09-12: `analytics` in `site.ts` plus `Analytics.astro`, supporting **Plausible**, **Umami** and **GA4**. Emits nothing at all while `provider` is `'none'` — turning it on is a two-line edit, no code change. Plausible/Umami are cookieless; **GA4 would require a cookie consent banner that does not exist**, so it must not be switched on without building one first. Provider choice is on the client (see `CLIENT-PENDING.txt`) |
| 19 | Photography / real imagery | ✅ | — | **Decided 2026-08-30: no photography.** The illustration-and-icon style is a deliberate choice, not a gap. Revisit only if real project photos become available |
| 20 | Dark mode | ❌ | **Rejected by the client 2026-09-12** | Closed. The site stays light-only; no `prefers-color-scheme` handling anywhere, and none is to be added |
| 21 | `Container.astro` unused `Props` warning | ✅ | — | Fixed 2026-08-30 by exporting the interface. Build is now 0 errors / 0 warnings / 0 hints |
| 22 | `/uptime` illustration concept | ⏸️ | Parked | `UptimeScene` kept, `_uptime` parked. Due the Gate 1b weight pass with the rest |
| 23 | Illustration technique — outline vs flat colour | ✅ | — | **Decided 2026-09-06: technique B.** Applied to all three QuietScene call sites 2026-09-07 — the 404, the contact-form success state and `/our-mission`. `QuietScene` takes a `palette` prop (`outline` default, `coloured`); every live instance now passes `coloured` |
| 24 | Our Mission illustration | ❌ | Abandoned 2026-09-07 | **Dropped.** Two iterations rejected by both Harshit and the client; the second passed all six countable gates and was still no good. `MissionScene.astro` and `/our-mission-preview` deleted 2026-09-07. `/our-mission` keeps QuietScene, now in technique B. The cause is now a standing rule, not an open question — no human figures (CLAUDE.md §5b) |
| 25 | Client copy revision — services | ✅ | — | Applied 2026-09-06, revised after Harshit reviewed the deployed preview 2026-09-07. Telecom removed; **Digital Workplace Services** and **Datacenter Infrastructure** now sit **first and second**, each condensed to **4 cards / 12 pointers** to match the existing three. The two per-section closing banners were removed as redundant against the page-level CTA |
| 26 | Company page illustration | 🟡 | Needs refining first | `WorkshopScene` kept, `_company-preview` still parked. Harshit 2026-09-13: refine the image before adopting — Gate 1b |
| 27 | Careers cat — working, not sleeping | 🟡 | Needs refining first | `DeskSceneWorking` kept, `_careers-preview` still parked. Same: Gate 1b before adoption |
| 28 | Contact page illustration | ✅ | — | **Adopted 2026-09-13.** All three placement previews deleted; `ReceptionScene` moved to `src/components/` and now appears in exactly one place — the contact form's success card, `state="hungup"`. The image is the reward for having sent something. Still due the Gate 1b weight pass |
| 29 | Home hero illustration | 🟡 | Preview removed, image kept | `RackScene` kept; `hero-preview` deleted. It fails Gate 1b hardest of all — 0.2% bare cream, 30% dark — so it is the clearest test of the refinement pass |
| 30 | Blog / MDX plumbing | ✅ | — | **Removed 2026-09-10** on Harshit's call ("no blog for now"). `@astrojs/mdx` and `@astrojs/rss` are out of `package.json`, the lockfile and `astro.config.mjs`; there was never an `.mdx` document or an RSS route to lose |
| 31 | Structured data | ✅ | — | Builders in `src/lib/schema.ts`, so no page restates the company. Organization now carries **contactPoint** (support and sales) and **areaServed: India**; Services carries its five competencies as **Service** nodes anchored to their sections, with an Organization stub so the `provider` reference resolves in-document; Company, Our Mission, Careers and Contact each carry a **BreadcrumbList**. Verified on the built output: one block per page, all in `<head>`, all parse |
| 32 | `robots.txt` | ✅ | — | Added 2026-09-10; it was a 404. Allow all, plus the sitemap. Names no preview paths deliberately — a `Disallow` line advertises the routes it hides — and the Netlify preview's `X-Robots-Tag` header overrides it on that host |
| 33 | View transitions | ✅ | — | Done 2026-09-12. `ClientRouter` in `BaseLayout`, ~15.9 kB of JS (the only runtime JS on the site). All three element-holding scripts rebound on `astro:page-load`: the reveal observer re-scans, `Header` re-queries and delegates its menu click, and **ContactForm binds per page load** with a `data-bound` guard — the silent failure this was declined for last time. Verified live: second client-side visit to `/contact` binds and intercepts the submit |
| 34 | Preview pages — parked, then reviewed | ✅ | — | Parked 2026-09-12; reviewed 2026-09-13. **Deleted:** `illustrations-preview`, `contact-preview` ×3, `hero-preview`, `home-preview` (recoverable from `3caa023`). **Still parked:** `_company-preview`, `_careers-preview` (pending refinement), `_404-preview`, `_uptime`. Every illustration component was kept — the pages went, the images did not |
| 35 | Client pending list | ✅ | — | `CLIENT-PENDING.txt` at the repo root: one page, what the client owes — legal sign-off (the only blocker), domain, analytics choice, LinkedIn, proof material, engagement process, FAQs, WhatsApp. Plus what is already decided, so it is not reopened |
| 36 | WhatsApp channel | ✅ | — | Number confirmed by Harshit 2026-09-13 — the same line as the phone. `contact.whatsapp` in `site.ts` with a derived `whatsappHref`; the channel drops out entirely if the number is ever cleared (§3). Live on the Contact page |
| 37 | Illustration weight — the "subtle" pass | 🟡 | 3 of 5 refined | Two gates, because weight and scale fail independently. **Gate 1b** (`scripts/measure-density.cjs`): at least 60% bare cream, at most 5% dark. **Balance** (`scripts/measure-balance.cjs`): the ink centred in the frame, which neither gate can see. **And scale**: apparent size is subject width over CANVAS width. Standing: QuietScene 80.9/3.4 · **ReceptionScene 89.2/2.3 — live** · **CareersScene 88.4/3.9 — live** · **CompanyScene 80.2/2.9 — done 2026-09-14, awaiting sign-off** · RackScene 0.2/30.0 · UptimeScene 32.1/6.7 *(no slot on the real site — lowest priority)* |

---

## What's actually blocking launch

**One thing:** legal sign-off (#5) on the privacy / terms / cookie pages. The
text is real, carried over from the previous site, but nobody has reviewed it.

Deployment (#16) is ready the moment the domain is pointed at the new build.
Nothing is blocked on code.

---

## Log

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
