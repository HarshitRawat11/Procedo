# What the reference illustrations are actually doing

Notes from twelve references (see [`README.md`](./README.md) for the index).

**§1–§5 describe references 01–10 only** — those are one coherent Google Chat
system, so the rules are reverse-engineered from the set rather than guessed at
from any single image. Do not treat them as universal:

- **§7 — reference 11** breaks most of them, because it serves a different kind
  of empty state (absence as a *prompt*, not a *reward*).
- **§8 — reference 12** is a different illustration system altogether: Google
  Meet, no outlines at all, light theme, and a *reassurance* register. It is the
  closest of the twelve to Procedo's own tone. Note it is genuinely outline-free,
  unlike 01–11 which combine flat colour *with* outlines (see §1).

---

## 1. Flat colour AND outlines — not one or the other

> **Corrected 2026-09-05.** This section previously described the set as a
> *line-art* system and treated "flat" (§8) as a rival technique. That was a
> false binary and it caused a real error: `QuietScene` was built almost entirely
> from white fills with hairline accents, which is why it reads thin beside the
> references. The client spotted it — *"flat is used for colour but outline is
> used to make the white look visible."* That is exactly right.

The set uses **both at once**. Every shape gets a flat colour fill *and* an
outline on top:

- The trousers in 01 are flat light blue **with** a dark outline.
- The couch in 10 is flat blue **with** an outline; the cushions flat pink, the
  cactus flat green, the pot flat pink — all outlined.
- White is used as a *colour in its own right* (a t-shirt, a cat's belly) and the
  outline is what keeps it legible against a coloured neighbour. Without the
  outline, white-on-blue or white-on-cream simply disappears.

So the two jobs are cleanly separated:

| Job | Done by |
|---|---|
| Carrying colour, mass, warmth | **flat fills** |
| Keeping shapes legible against each other | **outlines** |
| Pushing environment back behind the subject | **thinner / paler outlines** |

Outline weight still varies by role — figures get near-black ~2px, props and
environment get a thinner, paler stroke — which is what produces depth with no
shading, gradients or drop shadows. But the weight hierarchy sits *on top of*
flat colour; it does not replace it.

**For Procedo:** the fix is not "go flat" or "stay outline". It is **keep the
outlines and put real colour underneath them**. `QuietScene` today is roughly 90%
white fill; the references are closer to half saturated colour. Giving the rack,
mug, cat and foliage genuine fills — while keeping every existing navy stroke —
closes most of the gap without changing the drawing at all.

**For Procedo:** `/quiet` already separates subject from environment, but it does
it with navy `#1B2A4A` on everything and `#CBD5E1` for secondary detail. Adopting
a distinct thin-blue environment outline would sharpen it noticeably. Worth
trying on the rack modules, mug and plant pot.

## 2. Palette

Tight and repeated across references 01–10:

| Role | Value (approx) |
|---|---|
| Ground (dark theme) | near-black `#111111` |
| Figure outline | near-black |
| Prop outline | bright blue `#4A90E2` |
| Clothing | white, light blue `#8CC5F0`, yellow `#F5D98B`, black |
| Foliage | two greens — mid `#7DD87D`, deep `#2E9B4F` |
| Warm accents | coral `#E8734A`, pink `#F0B8C0`, lavender `#C5C0F0` |
| Skin | a genuine range of warm browns, varied across the set |

Only **one or two** warm accents appear per illustration. Everything else is
white, blue, green or black. The restraint is what stops it looking childish.

## 3. Composition devices

- **Hard-cropped geometry.** Rectangles and blobs run off the frame edge rather
  than sitting politely inside it (02, 03). Adds energy to an otherwise still scene.
- **The framed inset** (03). A white-bordered window contains a second scene —
  sky, tree, sun — and the figure sits on its edge, breaking out. The strongest
  idea in the set and the one we haven't used.
- **A single thin ground line** anchors most scenes. No full floor, no horizon.
- **Negative space as subject** (05): the figure's body forms an arch and the cat
  occupies the gap inside it.
- **Floating UI chips** (09): product icons orbit the figure at varying sizes.
- **Stacked, unreal furniture** (10): the couch sits on thin-blue legs *above* the
  TV rather than in front of it. Nobody's living room looks like this, and it
  doesn't matter — the arrangement reads as "evening in" without needing a room.
- **Light drawn as rays, never as glow** (10): thin white lines fan up from the TV
  screen onto the couch. No gradient, no blur, no bloom — just strokes. This is
  how the set does light everywhere, and it's the cheapest way to imply a lit
  source in flat vector work.

  > Correction, 2026-08-30: these rays were first catalogued here as "motion
  > lines signalling settled." A clearer copy of the same reference showed they
  > originate at the screen and land on the figures — they are light, not motion.
  > The original note also had the cat curled in the figure's arm; it is actually
  > stretched out full-length beside them.

  **For Procedo — this is a concrete lead on the style gap.** `UptimeScene` draws
  its lamplight as a `radialGradient` pool. The reference set never uses a
  gradient for anything; light is always discrete strokes. That difference in
  *technique* may be part of why `/uptime` reads as "close but not matching"
  (see §6 and the `procedo-illustration-approach` memory). Worth testing on the
  next attempt: replace the gradient glow with fanned strokes and compare.

## 4. Characters

- Faces are almost nothing — two curved strokes for eyes, a small smile, no nose
  or a single dot. Expression comes from posture, not features.
- Hair is a solid dark silhouette with two or three curl notches.
- Bodies are long and loose; wide-leg trousers throughout. Chunky white trainers
  or bare feet.
- **A grey-and-white tuxedo cat appears in eight of references 01–10** (all but 08 and 09,
  the two non-empty-states) — often tucked into the crook of an arm (04, 10)
  rather than sitting apart. It's a mascot, and
  it does a lot of the emotional work.
- Nobody is ever working. Strolling, reading, stretching, pouring tea, sitting in
  grass — the activity is always the reward for the empty inbox.

## 5. The caption formula

Eight captions across references 01–10, and they follow one shape:

> **`[status]. [playful reframe].`**

- "Nothing unread. **Keep moving & grooving.**"
- "No new messages. **Clear skies ahead.**"
- "All quiet here in message land. **In a word, sublime.**"
- "You're up to date. **Hello, me time!**"
- "Nothing unread. **Two words: Good vibes.**"
- "You're all caught up. **Time for a cup.**"
- "New messages: Zero. **You: 100% awesome**"
- "All caught up on messages. **Way to go, Chat hero!**"

Observations worth stealing:

- The second beat frequently uses a **set-up phrase** — "In a word,", "Two
  words:", "Hello,", "Time for", "You:" — which buys a beat before the payoff.
- Rhyme or alliteration when it's available ("moving & grooving", "Time for a
  cup"), never forced.
- **Absence is never framed as a problem.** No "empty", no "nothing found", no
  apology. The state is a reward. (True of 01–10; reference 11 is the deliberate
  exception — see §7.)
- Short. Two clauses, one full stop, no semicolons, no exclamation beyond one.

---

## How much of this should Procedo actually take?

Honestly: **the technique, not the register.**

This is consumer-product illustration — playful, informal, a bit goofy. Procedo
sells infrastructure to businesses. Copying the tone directly would read as
borrowed and slightly unserious next to copy like *"Power without precision is
chaos."*

What transfers cleanly:

1. **Two-tone outlines** (§1) — purely technical, no tonal baggage. Best single
   upgrade available to `/quiet`.
2. **The caption formula** (§5) — `/quiet` already independently landed on it
   ("Zero alerts. The best dashboard is a boring one."). Reassuring.
3. **Restraint in the palette** (§2) — one or two warm accents, everything else
   structural. Already how the site works.
4. **Activity as reward** (§4) — for Procedo the "reward" isn't leisure, it's
   *nothing needing attention*. Hence a sleeping cat on a humming rack.

What doesn't transfer:

- The goofier captions ("You: 100% awesome") — wrong register entirely.
- Fast motion (08) — the whole Procedo idea is calm.
- Dark backgrounds, for now — the site is light-only, with no
  `prefers-color-scheme` handling anywhere in `src/styles/global.css`. Ten of
  the eleven are dark-theme, which is a decent argument for adding one, but
  that's a whole-site decision and its own piece of work, not an illustration tweak.

---

## 6. Post-mortem: why the first illustration attempt failed

Recorded 2026-08-29, after five competency illustrations were made in one batch
and four were rejected. Worth keeping, because the mistake is an easy one to
repeat.

**What was made:** a server tower with connector lines; a CCTV camera watching a
building; a room display with participant tiles; an IP desk phone with signal
arcs; a UPS beside a battery bank and fan.

**What the client said:** only the fifth worked. The rest were "really simple."
The references, by contrast, are "intricate and soothing."

### The actual mistake

Each one **diagrammed the service instead of depicting the moment the service
creates.** They are labelled equipment — competent, but they are diagrams, and a
diagram cannot be soothing.

Look again at the reference set (§3, §4): *none of them draw an inbox.* They draw
a person reading, stretching, pouring tea — enjoying the **result** of an empty
inbox. The product is implied and never shown. That is the entire source of the
warmth, and it was the one thing not carried across.

`/quiet` got this right by instinct and is the benchmark to beat:

| `/quiet` (worked) | The five (didn't) |
|---|---|
| A living creature asleep — an emotional anchor | No life at all |
| Hardware is the *setting* | Hardware is the *subject* |
| Warmth props: mug, steam, plant, grass, cloud | No props |
| Foreground / midground / background | One flat plane |
| Dense small detail: bays, vents, whiskers, a tucked paw | A box and a few rectangles |
| A story: everyone's away, it's fine, the cat sleeps | Nothing is happening |

The fifth survived because it was closest to this — three layered forms, a bold
graphic focal point (the bolt), and the most detail of the set.

### Rules going forward

1. **One illustration at a time.** Batching five produced a template — box, status
   light, connector line — and each got a fraction of the thought `/quiet` had.
2. **Decide the *moment* before drawing anything.** Who or what is at ease, and
   why? If there's no answer, there's no illustration yet.
3. **Never draw the product.** Draw the calm it produces. For Facilities Security
   that is not a camera on a wall — it is a dark, quiet lobby at 2am where nothing
   is happening and something small is asleep.
4. **Earn the intricacy.** The reference illustrations carry a lot of small detail.
   Sparse reads as unfinished, not as minimal.

---

## 7. Reference 11 — the exception that redraws the rules

Added 2026-08-30. Worth its own section because it breaks most of §1–§5, and the
*reason* it breaks them is the useful part.

**What it shows:** two hands entering from opposite corners — one pale, one dark
reddish-brown, in 180° rotational symmetry. Between them: a blue speech bubble
with text lines, a white outlined bubble, an amber badge reading `0`, and a green
avatar dot. A single continuous thin-blue path loops through all of it,
hand → bubble → badge → hand, closing into a loose rounded rectangle.

**Caption:** "No conversation selected" in **accent blue**, then a second,
smaller, plain-white line: *"Use the toggle to switch between single and split
pane modes."*

### What it breaks

| Established rule | Reference 11 |
|---|---|
| A person or a cat as emotional anchor (§4) | **Hands only.** No figure, no animal — the first in the set |
| Nature softens the product UI (§4) | **None at all.** No plants, sky, grass |
| Never draw the product (§5, §6) | **Draws it directly** — bubbles, unread badge, avatar |
| Two-beat playful caption (§5) | **Two-tier functional caption**: accent headline + plain instruction |
| Neutral white caption text | **Headline is accent-coloured** |

### Why it breaks them, and why that's correct

Because **this is a different kind of empty state.** Every other empty state in
the set says *"there is nothing to do — enjoy it."* Absence is the reward, so the
illustration is a life scene and the caption is a joke.

This one says *"there is nothing here because you haven't chosen yet."* Absence
is a **prompt**, not a prize. So:

- the warmth machinery is dropped, because being cosy about an unfinished action
  would be patronising;
- the product *is* drawn, because the user needs to understand what they're
  selecting;
- the caption instructs rather than jokes, and the accent colour pulls the eye to
  the status line first, then down to the fix.

**The lesson: match the illustration's register to whether the empty state is a
reward or a request.** Getting this backwards is the mistake — a joke on a state
that needs action is annoying, and an instruction on a state that needs nothing
is joyless.

### New devices worth stealing

1. **The continuous connecting path.** One unbroken thin line threading every
   element into a closed loop. Cheap to draw, and it makes scattered objects read
   as a single composition. We have nothing like it.
2. **Rotational symmetry from cropped limbs.** Two hands, 180° apart, entering
   from opposite corners. Balance without needing a full figure.
3. **The two-tier caption**: accent-coloured status headline + plain-text
   instruction beneath. Directly reusable — our 404 page already does a version of
   this (mono eyebrow → headline → body), which is reassuring.
4. **Diversity signalled through hands.** Two contrasting skin tones with no
   faces, no bodies, no characterisation needed.

### Where this fits Procedo

Not the marketing pages — those are all "reward" states or plain content. But it's
the right model for any **interactive state that needs the user to act**: a form
validation error, a filter with no results, an incomplete selection. If those ever
appear, use this register, not the sleeping cat.

---

## 8. Reference 12 — a different illustration system entirely

Added 2026-09-05. Worth separating from §1–§7 because it is **not Google Chat**
and does not share the technique. Treating it as part of the same set would
muddle the rules.

**What it shows:** two figures seen from behind, shoulders-up, inside a pale blue
circle. A blue shield with a padlock floats between their heads. White background.

**Caption:** "Your meeting is safe", then *"No one outside your organization can
join a meeting unless invited or admitted by the host."*

### What makes it a different system

- **No outlines at all.** Not thin blue, not near-black — none. Pure flat shapes
  with colour boundaries doing all the work. Every one of references 01–11 is
  built on outlines; this abandons them completely.
- **Light theme.** White ground, where 10 of the 11 Chat references are near-black.
- **Straight brand palette** — Google's yellow, green and blue, used literally
  rather than the muted, restrained scheme of §2.
- **Figures from behind.** No faces at all, so no expression work is needed.
- **A containing circle** rather than a scene. The circle *is* the composition;
  there is no environment, ground line or props.

### The category it belongs to

This is neither "absence as reward" (§1–§6) nor "absence as prompt" (§7). It is a
**reassurance** state: nothing is wrong, nothing is missing, and the user has not
asked anything — the screen exists to pre-empt a worry.

That dictates the tone. The caption makes no joke, offers no reward, and gives no
instruction. It states a fact plainly and then explains the mechanism behind it.
Humour here would actively undermine the message, because the subject is trust.

### Where this fits Procedo

**This is the closest reference yet to Procedo's actual register.** Procedo sells
infrastructure on the promise that it will not fail — which is a trust argument,
not a delight argument. Note how much this illustration achieves with:

- no faces to characterise,
- no scene to build,
- one icon (shield + padlock) carrying the entire meaning,
- and a plain, factual two-tier caption.

Compare with §6's post-mortem: the five rejected competency illustrations failed
because they *diagrammed equipment*. This shows a third way — neither a life
scene nor a diagram, but **a single symbolic object inside a simple containing
shape**, with the copy doing the explaining. Worth considering for the Services
page, where five life-scenes may be the wrong ambition anyway.

⚠️ One caution: adopting this system means dropping outlines, which would clash
with `QuietScene` and `UptimeScene`. Do not mix the two techniques in one site —
pick one and stay with it.
