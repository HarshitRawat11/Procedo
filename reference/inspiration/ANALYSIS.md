# What the Google Chat illustration set is actually doing

Notes from eleven references (see [`README.md`](./README.md) for the index).
References 01–10 are one coherent system, so §1–§5 are reverse-engineered from
that set rather than guessed at from any single image.

**Read §7 before treating §1–§5 as universal.** Reference 11 deliberately breaks
most of them, because it serves a different kind of empty state.

---

## 1. Two-tone outlines — the most transferable technique

This is the thing that makes the whole set hang together, and it's easy to miss:

- **Figures** (people, cats) are outlined in **near-black**, ~2px.
- **Environment and props** (furniture, shelves, lamps, plant pots, stems, ground
  lines, motion arcs) are outlined in a **thin, bright blue**, ~1.5px, and are
  often left completely unfilled.

The result is depth and hierarchy with no shading, no gradients and no drop
shadows. The subject reads forward; the world recedes. It also means the
background can be near-black without the props disappearing, because the blue
holds its own against dark *and* light grounds.

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
- **Elevated / floating furniture** (10): the couch sits on visible thin-blue legs above a TV silhouette, with short motion-lines underneath signalling "settled" rather than "falling" — same device as #09's chips, repurposed for comfort instead of connection.

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
