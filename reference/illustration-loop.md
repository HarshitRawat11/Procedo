# Illustration critique loop — standing procedure (v2)

Read this in full before writing any SVG. It applies to every illustration on this
site, one at a time, never batched.

It replaces "take inspiration from the references" with checks that can be
measured rather than felt. Gates marked **[count]** produce a number you must
print. Gates marked **[judge]** cannot be reduced to a number — they are settled
by a person, not by the model grading its own work.

---

## Why this exists

Twelve references are catalogued in `reference/inspiration/` (eleven images —
reference 11 was removed as a duplicate; see that folder's `README.md`). Despite
them, five of six illustrations produced in one batch read as diagrams rather than
drawings and were rejected.

The exception matters as much as the failures. `QuietScene` — the cat asleep on
the rack — was called *"fantastic"* and is now live on three pages. So the problem
is not that the model cannot draw. It is that the model cannot reliably tell a
drawing from a diagram **in its own output**, and produces the second while
believing it has produced the first.

That single fact shapes this whole document:

1. Any threshold that would reject `QuietScene` is mis-calibrated, not strict.
2. The final gate cannot be self-assessment, because self-assessment is the
   faculty that is failing.

---

## Calibration baseline — measured, not assumed

These are the real numbers for `src/components/QuietScene.astro`, the known-good
illustration. Every threshold below is set relative to these. Re-measure with the
script in the appendix if the component changes.

| Metric | QuietScene | Notes |
|---|---|---|
| Drawn elements | 65 | 41 `path`, 12 `circle`, 9 `rect`, 3 `ellipse` |
| Paths carrying a curve command | 28 of 65 | **43%** of all elements |
| Distinct stroke widths | 1.4, 1.8, 2, 3 | widest ÷ narrowest = **2.14** |
| Distinct stroke colours | 4 | `#1B2A4A`, `#CBD5E1`, `#16A34A`, `#22C55E` |
| Coordinates that are multiples of 5 | 96 of 372 | **26%** |
| Named props | ~7 | rack, cushion, mug, plant, cloud, grass, ground |
| Human figures | 0 | the subject is an animal |

**Read the implications before setting any threshold.** A rule of "70% of elements
must be curved paths" scores the benchmark at 43% and rejects it. A rule of "zero
organic forms drawn as primitives" rejects it too — the cat's head is a `<circle>`
and its tucked paw an `<ellipse>`, and the drawing is better for it. A prop budget
of five rejects it. A stroke-weight ratio of 1.8× it passes, but only just, and
only because of the grass.

The lesson is not that measurement is useless. It is that thresholds invented in
the abstract will fail the work you like. Set them from the baseline.

**A second data point, as a sanity check.** `UptimeScene` — judged *"better than
the previous 5 but still not matching"* — scores curve ratio **39%** (floor 40%)
and stroke spread **1.79** (floor 2.0). It fails both by a hair. That is the
behaviour a calibrated rubric should show: a clear pass for the illustration that
was loved, a narrow fail for the one that was tolerated. If a future revision of
these thresholds passes `UptimeScene` comfortably or fails `QuietScene` at all,
the revision is wrong.

---

## How to run the loop

- **One illustration at a time.** Never batch.
- **Iteration** = one full pass through Gates 0 → 3.
- **Budget: four iterations.** Gate 0 revisions before any SVG exists do not
  count against it.
- **Same gate fails twice in a row** → stop. Report the gate, the measurement, the
  two attempts, and what you believe the obstacle is.
- **Budget exhausted** → stop and hand over the best version with its full
  scorecard and an honest statement of which gates it does not meet. Do not ship
  it into a live page, and do not quietly relax a threshold to get a pass.

Never mark a **[count]** gate as passed without printing the measurement. "Looks
close to the references" is not a result. For **[judge]** gates, print your own
answer *and* send the composite for a human verdict — your answer is evidence,
not the decision.

Throughout, **canvas** means the `viewBox` coordinate space, not rendered pixels.

---

## Gate 0 — Composition budget **[count]**

State the intended scene in prose, then measure it.

- **Human figures: ZERO. This is a hard rule, not a budget.**
  > Set 2026-09-07 by Harshit, and it reverses the earlier "people are fine, just
  > like the references" decision. His words: *"no full images of people cause
  > these are not looking good in geometric patterns but cat is looking good,
  > server is also good but no people."*
  >
  > The evidence backs it. Every illustration accepted here has an animal or a
  > machine as its subject — `QuietScene`, `UptimeScene`, `DeskScene`. Every one
  > rejected either had human figures ("The handover", two iterations) or was
  > pure equipment with no character at all (the batch of five). The references
  > are full of people and draw them well; that is not reproducible at this
  > standard in flat geometric shapes, and trying again wastes the client's time.
  >
  > Do not reopen this by proposing "just a hand" or "figures from behind"
  > either. A partial figure needs Harshit's explicit approval first, per scene.
  > If a concept only works with a person in it, the concept is wrong — say so
  > and propose another.
- **Characters carrying the scene: 1–2, animal or machine.** This is the subject
  the face and posture gates apply to. An animal does not exempt you from them —
  a sleeping cat still has closed eyes, a curled spine and a tucked paw. A
  machine subject needs the equivalent: something that reads as alive, like the
  rack's breathing status lights.
  > A scene with no character at all is what produced the rejected batch of five.
  > Equipment alone is a diagram. The cat is the thing that works.
- **Primary character height: at least 45% of canvas height**, or 35% of its
  width if the pose is horizontal. A curled or seated figure is measured across
  its longest axis.
  > Raised from 25% on 2026-09-06, after iteration 1 of "The handover" passed
  > every countable gate at 30% and still read as a diagram. The floor was set
  > low, I drew to the floor, and the gate certified a pictogram. The reference
  > figures run about 60%. `QuietScene`'s cat is the standing exception — it is
  > ~19% and works, because it is one animal in a near-empty frame; a scene
  > carrying furniture as well does not get that latitude. `DeskScene`'s cat is
  > 36% of canvas width and that is about the floor for a furnished scene.
- **Canvas proportion.** Do not draw a wide, short canvas unless the subject is
  genuinely horizontal. A 440x340 frame pushes everything onto one baseline in a
  row, which is the arrangement that reads as a diagram. The references are
  roughly square or portrait.
- **Depth: at least two overlaps.** Two named pairs of elements where one
  partially occludes the other. Objects lined up side by side, each fully
  visible, is schematic no matter how well each one is drawn.
- **The primary character must be the largest single organic mass in the scene**
  and must sit at or near an optical focal point. If equipment dominates, you are
  drawing the equipment, which is the failure mode this document exists to stop.
- **Named props: maximum 7**, counting each plant, mug, cloud, cushion and ground
  plane as one. Equipment that is the subject counts as one prop however many
  panels it has.
- **Rooms or compartments: maximum 1.** No stacked-floor cutaways.
- **No frame.** The scene does not sit inside a card, box, border or rectangle
  drawn *within the artwork*. A soft container shape — a pale disc or blob behind
  the subject — is permitted and is required for the outline-free technique, which
  otherwise loses its white shapes against cream. A CSS surface applied by the
  page (`surface="panel"` on `QuietScene`) is a layout decision, not part of the
  drawing, and is out of scope here.
- **At least one shape crops at the canvas edge.** Rely on the `viewBox` to crop
  it; do not let it paint outside, and do not set `overflow: visible`.

If the concept exceeds this budget, do not draw it. Report the specific overage,
propose a reduced scene, and wait for approval.

---

## Gate 1 — Construction **[count]**

Static check on the SVG source, before rendering. Run the appendix script; paste
its output. Then answer the two items it cannot measure.

- **Organic forms are curved paths — with a stated exception.** Every body, limb,
  hand, hair mass, garment, animal and leaf is a `<path>` with at least one `C`,
  `S`, `Q` or `A` command, **unless** the form is genuinely circular or elliptical
  (a head in profile, a tucked paw, a cushion). Primitives used this way must be
  named and justified in one line each. Unjustified primitives on organic
  forms: **must be zero**. Primitives are unrestricted for rectilinear objects —
  screens, tabletops, doors, rack panels.
- **Curve ratio: at least 40% of drawn elements**, measured over the whole file.
  Print the ratio. This is a floor set at the benchmark, not an aspiration; if
  your scene is mostly hardware you will sit near it, and that is acceptable for
  an infrastructure firm.
- **Stroke weights: at least three distinct values, of which at least two are
  load-bearing (used by two or more elements), widest ÷ narrowest ≥ 2.0.**
  Print every distinct value **with the number of elements using it**. The
  load-bearing clause closes the obvious dodge of adding one stray hairline to
  satisfy a spread. `QuietScene` scores 4 distinct / 2 load-bearing / 2.14 spread
  — it passes, but with no margin, so treat this as the floor it is.
- **Stroke colours: at least two.** The subject contour is the house navy
  `#1B2A4A` — not black; black is not in this site's palette. Environment
  contours use a pale blue-grey that visibly recedes. Print the distinct values
  and which is used on the subject.
- **Deliberate mis-registration: at least two instances.** A fill shape whose edge
  does not coincide with the outline it belongs to — colour overshooting a line or
  stopping short of it. This is the most characteristic property of the references
  and it will not appear by accident.
  **This requires splitting fill and stroke onto separate elements**, since a
  single path cannot have an offset fill. Say which two shapes, give the offset in
  canvas units, and note that the extra elements will move your curve ratio.
- **Faces: at least four separate marks on the primary character** from eye,
  second eye, brow, nose, mouth, ear, whisker. Closed eyes count. Print the count.
- **Posture: the primary character is asymmetric.** Weight on one leg, a lean,
  crossed legs, a turned shoulder, a curled spine, a tucked limb. Describe which
  and how. Bilateral symmetry about a vertical axis is a fail.
- **Coordinates.** Print the share that are multiples of 5. Above ~50% suggests
  grid-drawing. Treat a high number as a prompt to look at the shapes, not as
  something to fix by nudging values — jittering coordinates satisfies the metric
  and changes nothing about the drawing.

---

## Gate 1b — Visual weight **[count]**

Added 2026-09-13, and it is the gate that would have caught the last three
illustrations. Harshit put the 404 image beside the newer ones and said the
404's elements are *"subtle, not as large and bold as they are"*. He was right,
and the cause is not stroke weight. It is how much of the frame the drawing
leaves alone:

| | bare cream | dark pixels |
|---|---|---|
| `QuietScene` (404) — the one he likes | **80.9%** | 3.4% |
| `ReceptionScene` (contact) | 41.3% | 6.6% |
| `RackScene` (hero) | **0.2%** | 30.0% |

`QuietScene` is four fifths empty cream. `RackScene` has essentially no cream
in it at all — the rack fills the frame edge to edge. That is the whole
difference, and it is measurable:

```bash
node scripts/measure-density.cjs <file.svg>
```

- **Bare cream: at least 60% of the frame.** The subject sits *in* the canvas;
  it does not fill it.
- **Mid-to-dark pixels: at most 5%.** A dark faceplate, counter or wall of
  equipment is weight that outlines should be carrying.

Both floors are set from `QuietScene` with margin, per the rule at the top of
this document: a threshold that fails the benchmark is mis-calibrated, not
strict.

Two corollaries that follow from the numbers, and are easier to check by eye:

- **Draw objects, not walls.** Nothing may span the full canvas width. A
  counter or rack that runs edge to edge stops being a prop and becomes a
  backdrop, and the cream share collapses. `QuietScene`'s rack is an object
  with ground visible all round it.
- **Colour is punctuation.** Status pips, a mug, leaves. Not six coloured
  cables crossing the frame, and not a large tinted panel.

---

## Gate 2 — Render and compare **[count]**

Build logs cannot see any of this.

- Render the SVG to PNG with `sharp` on the page's own cream ground (`#FBFAF8`),
  not white — cream is what it will actually sit on.
- Pick the comparison reference **deliberately and say why**. The set is not
  uniform: `empty-state-google-chat-01-bike-coffee` and `-10-couch-tv` are flat
  colour *with* outlines; `illustration-google-meet-12-meeting-is-safe` is
  genuinely outline-free. Compare against one in the technique you are working in.
- Compose one side-by-side PNG at identical panel widths — yours left, the
  reference right.
- Open the composite and look at it. Not the SVG. The composite.

---

## Gate 3 — Verdict **[judge]**

Answer these from the composite alone, in writing, without referring to what you
intended. Then **send the composite and your answers for a human verdict.** Your
answers are evidence. They are not the pass.

1. Shown only the left half, would a stranger call it a drawing or a diagram? If
   "diagram", "schematic", "infographic", "icon set" or "wireframe" is the honest
   answer, it fails.
2. Where is the weight in the body? Symmetrical and square-on fails.
3. Name the expression in one word. "None" fails.
4. Cover the caption. Does the scene still carry its meaning? If it only works
   with a label attached, it fails.
5. Point to one place where colour crosses or falls short of a line. If you cannot
   point to one, it fails.

State plainly which of the five you think fail. A pass claimed on all five with no
reservations should itself be treated as suspicious — that is the pattern that
produced the five rejected illustrations.

---

## Palette

The brand tokens (navy `#1B2A4A`, orange `#F24E1E`, cream `#FBFAF8`) are low-chroma
by design and correct for UI. They are not sufficient for illustration: the
references carry large areas of saturated colour, and a washed-out palette reads as
under-baked even when the technique is right.

**Note what is already in use before adding anything.** The live scenes already
carry green (`#22C55E`, `#DCFCE7`), peach (`#FCDCCF`) and the orange accent. Any
new hue must earn its place beside these, not duplicate them.

**Skin tones are moot.** There are no human figures on the live site and, as of
2026-09-07, there will not be — see the first line of Gate 0. Any skin-tone
palette proposed in an earlier revision of this document is dead; ignore it.

**On mechanism:** illustration fills are SVG presentation *attributes*, which do
not read Tailwind `@theme` tokens. Adding `illus-*` to `@theme` only helps if the
artwork applies colour through CSS classes (`fill: var(--color-illus-blue)`) — and
Astro's scoped styles do not reach into a child component, so that has to be
deliberate. Either commit to the CSS route and say so, or keep illustration hexes
as named constants at the top of the component, which is what the existing scenes
do and what `CLAUDE.md` already permits as the one exception to the no-hex rule.
Decide this before adding tokens, or the tokens will sit unused.

Whatever is chosen: propose the hues with a swatch render and wait for approval
before committing. Orange stays reserved for the single active accent per scene —
the lamp bulb, the mug band. It is punctuation, not a fill.

---

## Standing constraints

- One illustration at a time. Never batch.
- **The prop kit is fixed: cat, plant, grass, coffee mug.** Same paths, same
  colours, same stroke weights, in every scene that has them — set by Harshit on
  2026-09-14: *"we will follow this theme all across the site."* Copy them from
  `QuietScene` verbatim and move them with a translate on a STATIC parent; do not
  redraw them and do not re-colour them. The mug is `#F7B9A3` with one
  `#F24E1E` band, and it carries two steam wisps.
- **Legibility is not a gate, and the gates will pass things nobody can read.**
  Render the scene at the width the card ACTUALLY gives it before believing any
  number. The company board passed every gate at 100x72 and was a blank blue
  rectangle at 352px. Two of its tools had to be redrawn for the same reason: a
  capsule read as a torch, a triangular tip read as an arrowhead.
- **An object filled with the colour of the surface behind it has no colour.**
  Every tool on the company board was `DEVICE`, and so was the board — leaving a
  contour to do all the work, while the flat ghosts (a shade darker than the
  board) read as the solid objects. Harshit's note was *"tools has no color
  except screwdriver"*, and he was describing exactly that. The fix is an order,
  not a palette: the object must be darker than its backing, and its ghost must
  sit between the two. Pick the colours off whichever element in the scene
  already reads correctly — here the screwdriver, whose orange grip and steel
  blade became the whole kit's two colours.
- **Shared motion is declared once**, in `src/styles/scene-motion.css`, and
  opted into with `data-scene` on the scene's `<svg>`. Breathing, the tail, the
  steam, the wind — all of it. A scene's own `<style>` holds only motion unique
  to that scene. Never copy a shared animation into a component.
- **Measure the balance, do not eyeball it.** `node scripts/measure-balance.cjs
  <file.svg>` renders the scene, finds the bounding box of every non-cream pixel,
  and prints the viewBox that would centre it. Neither Gate 1 nor Gate 1b can see
  framing, and it is what produced *"too much space below cat and too little
  above it"* the first time. Set the viewBox from the number it gives you.
- **No human figures.** Animal or machine subjects only. See Gate 0.
- Draw the calm moment the service creates, not the equipment that creates it.
- **Leave the frame mostly empty.** 60% bare cream, 5% dark, measured — see
  Gate 1b. This is the constraint the site's own benchmark passes most easily
  and that every illustration drawn after it has failed.
- Flat colour **and** outlines together. These are not rival techniques.
  (See `reference/inspiration/ANALYSIS.md` §1, corrected 2026-09-05.)
- Animation only inside `@media (prefers-reduced-motion: no-preference)`, with the
  resting value on an SVG attribute — never inside the media query, or
  reduced-motion visitors get the mid-animation state.
- **A CSS animation's `transform` REPLACES the element's `transform`
  attribute — it does not compose with it.** A presentation attribute is the
  lowest-priority source of a CSS property, so the moment an animation touches
  `transform`, the attribute is gone. Corollary: never put a static positioning
  transform on an element you also animate. Hang it on a parent instead.
  Found the hard way on 2026-09-13: `ReceptionScene`'s plant carried
  `translate(-206 8)` and animated `sway`, so the foliage drew 206 units right
  of its own pot in every real browser, and survived two commits — because
  **sharp renders attributes and ignores CSS**, every still measured by the gate
  scripts was correct. The gates cannot see this class of fault. Only the
  browser can.
- Animating a *transform*: keep the resting pose on the attribute and drive the
  motion with CSS `transform` keyframes on the same element, with the final
  keyframe reproducing the attribute exactly — so the still and the last frame
  agree, and reduced motion loses only the journey. Use
  `transform-box: fill-box` with percentage origins (`50% 100%` for anything
  hinged at its base); it is immune to any translate on an ancestor, which
  `view-box` is not. Two animated fill-boxes must never nest: a transformed
  child moves its parent's bounding box, which moves the parent's origin. A
  static parent is fine.
- **Put the whole motion block inside the media query — `transform-box` and
  `transform-origin` included.** They change how an *attribute* transform is
  interpreted too, so a reduced-motion visitor who inherits them without the
  keyframes gets a pose that is double-offset and wrong. Verified 2026-09-13:
  zero `transform-box`, `transform-origin` or `animation` declarations exist in
  `ReceptionScene`'s built CSS before `@media (prefers-reduced-motion)`.
- A sequence that tells a story (`ReceptionScene`: sleeps · rings · wakes ·
  answers) plays **once** with `animation-fill-mode: both`, and every SVG
  attribute describes the *last* frame — the keyframes rewind to the start and
  play forward. It restarts on its own because the card holding it is `hidden`
  until it is needed, and `display: none` cancels animations. No JavaScript.
- `role="img"` and a `<title>` with a unique `id`; pure decoration gets
  `aria-hidden`. Several instances on one page must not share an id.
- Preview work goes in a new file, sealed off per `CLAUDE.md` §5. Never overwrite
  a live illustration.

---

## Open decisions — settle these before the loop runs

These are decisions for the client, not gates. They are listed here because the
loop cannot start cleanly while they are open.

1. **Illustration technique is undecided.** `/404-preview` currently offers three:
   A outline (live today), B outline + flat colour, C flat without outlines. The
   Palette section above effectively assumes B or C. Choose first — the choice
   changes what Gate 1's mis-registration and stroke-colour rules even mean, since
   C has no outlines to mis-register against.
2. **The four-floor "connected building" mission concept is withdrawn** and must
   not be resurrected without new approval. Consequence: **the Our Mission page
   now has no approved concept.** A replacement has to be agreed at Gate 0 before
   any drawing starts.
3. **Concept C ("growth from a core") remains approved for the Services page**
   and parked. It has not been assessed against this budget.

---

## Appendix — measurement script

The countable Gate 1 metrics are produced by a script in this repo, not by
counting or by inlining code in this document (an inlined copy would drift):

```bash
node scripts/measure-svg.cjs src/components/QuietScene.astro
```

It prints the element counts, curve ratio, stroke hierarchy, stroke colours and
coordinate spread, with a PASS/FAIL line against each floor, and exits non-zero if
any countable gate fails. The floors live at the top of that file and are
calibrated against `QuietScene`; changing one means re-running both live scenes
and confirming the calibration in the table above still holds.

A companion script measures the rendered result rather than the source:

```bash
node scripts/measure-density.cjs <file.svg>
```

It renders on cream and reports the bare-cream and dark-pixel shares for Gate
1b, exiting non-zero if either floor is missed. Give it a plain `.svg` or
markup pulled out of `dist/`; an `.astro` component whose fills are
expressions will not render.

`measure-svg.cjs` also reports how many fills carry saturated colour versus near-white.
**That figure is informational and is not a gate.** `QuietScene` is roughly half
near-white and is the illustration that was loved, so there is no defensible floor
to set — the number is printed because the gap against the references is real and
worth seeing, not because it decides anything.

One limitation worth knowing: the script reads literal attributes, so a component
whose fills are Astro expressions (`fill={P.rack}`) will under-report colour. Run
it against the built HTML in `dist/`, or against a plain `.svg`, in that case.

Mis-registration, facial marks, posture asymmetry and any primitive used on an
organic form are not detectable by script. Report those by hand, and expect to be
asked for the specific shapes.
