# Inspiration

Visual reference for the Procedo site. Drop images here, add a row to the index.

Reference only — nothing is copied. This sits outside `public/` so none of it
ships, and `reference/` is already in `.gitignore`.

**The design breakdown lives in [`ANALYSIS.md`](./ANALYSIS.md)** — that's the part
worth reading before building anything.

---

## How to add one

1. Save the image here.
2. Name it `<area>-<source>-<nn>-<slug>.<ext>`.
   Areas so far: `empty-state`, `illustration`, `hero`, `type`, `color`.
3. Add a row below, and a line on **what specifically** to take from it.
   "Two-tone outlines — dark on figures, thin blue on props" beats "looks nice".

Past ~20 files, split into subfolders by area.

---

## Index

### Google Chat empty states

A single coherent set, which is why it's worth analysing as a system.

| # | Filename | Caption | Note |
|---|---|---|---|
| 01 | `empty-state-google-chat-01-bike-coffee.png` | "Nothing unread. Keep moving & grooving." | The only **light-theme** one. Thin uniform line art, muted pastels, lots of white space. Cat in the bike basket. |
| 02 | `empty-state-google-chat-02-walker-sling.png` | "No new messages. Clear skies ahead." | Bold flat shapes, no outlines on the foliage. Shapes **cropped hard at the frame edge**. Cat in a sling. |
| 03 | `empty-state-google-chat-03-ledge-cat.png` | "All quiet here in message land. In a word, sublime." | **Framed inset** — a white-bordered window holds sky/tree/sun, and the figure breaks out of it. Strongest composition device in the set. |
| 04 | `empty-state-google-chat-04-reading-chair.png` | "You're up to date. Hello, me time!" | Cosiest of the set. Pink chair + pink pot as the warm accent. Cat with an orange ball. |
| 05 | `empty-state-google-chat-05-yoga-fold.png` | "Nothing unread. Two words: Good vibes." | Figure forms an arch; the cat sits in the negative space inside it. Shelving in thin blue outline. |
| 06 | `empty-state-google-chat-06-pouring-tea.png` | "You're all caught up. Time for a cup." | Most "props" of any — lamp, frame, fruit bowl, counter — all thin blue outline. Cat asleep on a shelf. |
| 07 | `empty-state-google-chat-07-grass-flower.png` | "New messages: Zero. You: 100% awesome" | Flat green blob foliage on thin blue stems. Cat climbing a tree. |
| 10 | `empty-state-google-chat-10-couch-tv.png` | "All caught up on messages. Way to go, Chat hero!" | Blue couch on thin-blue legs sitting *above* a TV — a stacked, deliberately unreal arrangement rather than a real room. **Thin white rays fan up from the TV screen onto the couch**: the light source is drawn, not the glow. Cat stretched out full-length beside the reclining figure, who has one arm up behind their head. Blue-and-white striped popcorn box. Pink cushions on the couch, pink pot holding a cactus on the TV stand, thin-blue cable running from the TV. |

### Google Chat — other states (not empty states)

| # | Filename | Note |
|---|---|---|
| 08 | `illustration-google-chat-08-checkmark-leap.png` | A **success/done** state. The only one with implied fast motion — a leap, plus a thin blue arc for the trajectory. Green circle + white tick masks the head entirely. |
| 09 | `illustration-google-chat-09-video-call.png` | A **meeting/connection** state. Note the **floating UI chips** — video icon, calendar, avatar badge — orbiting the figure. A device we could borrow for a services section. |

### Google Chat — "needs action" empty state

A genuinely different category, which is why it sits on its own. See
[`ANALYSIS.md`](./ANALYSIS.md) §7 for why it breaks most of the rules above.

| # | Filename | Caption | Note |
|---|---|---|---|
| 11 | `empty-state-google-chat-11-two-hands-bubbles.png` | "No conversation selected" + *"Use the toggle to switch between single and split pane modes"* | **Hands only** — no figure, no cat, no nature, first in the set. Two hands enter from opposite corners in 180° rotational symmetry, with deliberately contrasting skin tones. A single continuous thin-blue path loops hand → bubble → badge → hand, tying the whole composition into a loose rounded rectangle. Subject is pure product iconography: speech bubbles, a `0` unread badge, an avatar dot. **Two-tier caption with an accent-coloured headline** — the only instructional caption in the set. |

> ⚠️ **The image files are not saved here yet.** I can't write images out of a
> chat conversation. Please drop the eleven PNGs in using the filenames above and
> the index will line up. Everything else — the analysis, the notes — is written
> from the images as shared, so it stands on its own either way.
