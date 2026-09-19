# INTENT BRIEF — Procedo Infosystems website

**Drafted:** 2026-09-19 · **Status:** awaiting approval
**Source:** Phase A discovery of this repo, plus a Phase B interview with Harshit.

> This brief exists so that "professional and eye-catching" stops being a matter
> of taste. Every quality gate must serve something written here. A gate that
> does not is removed, however sensible it sounds on its own.

---

## Audience

**A corporate IT or facilities manager at a mid-to-large organisation in Delhi
NCR or elsewhere in India — the person who specifies infrastructure work,
shortlists who does it, and signs off.**

Specifically, someone who:

- reads *"ITIL-aligned root cause analysis"*, *"N+1 redundancy"* and *"SD-WAN
  configuration"* without needing them translated, and judges a vendor partly on
  whether they used those words correctly;
- is comparing three or four firms, not discovering the category;
- carries the risk personally if the installation is late, the AMC is thin, or
  the branch opening slips.

**Not** a founder buying a whole office fit-out, **not** a procurement
generalist working from a scoring matrix, and **not** a developer. Those three
readings would each pull the site somewhere different, which is why naming this
one matters more than any gate below.

## Core message

**Procedo engineers the five systems a working office depends on — digital
workplace, datacenter, network, security and AV — as one system, not five
vendors.**

## Primary action

**Send an enquiry.** The `/contact` form is the conversion point; the header's
"Get in Touch" reaches it from all ten pages, and phone, email and WhatsApp sit
beside it for people who will not fill in a form.

## Three adjectives to evoke

| | |
|---|---|
| **Precise** | Specific claims, correct terminology, real numbers. Nothing vague enough to be true of any competitor. |
| **Dependable** | The site itself behaves like the infrastructure it sells — fast, nothing broken, nothing flashing. |
| **Quietly expert** | Authority expressed by knowing things, not by asserting them. |

## Three adjectives to avoid

| | |
|---|---|
| **Hypey** | Superlatives, exclamation marks, "revolutionary", "world-class", countdown urgency. |
| **Generic** | Anything a visitor could mistake for a different firm with the logo swapped. This is the failure mode the gates hunt hardest. |
| **Consumer-cute** | Whimsy that undercuts the seriousness of a six-figure infrastructure contract. |

### The tension to resolve, named now rather than at the gates

**"Consumer-cute" and the six cat illustrations point in opposite directions.**

They are this site's most distinctive asset and, on the anti-adjective just
chosen, its biggest risk. Both things are true, so Gate 1 has to adjudicate it
deliberately rather than discover it by accident.

The argument for keeping them: they are never the main event. They occupy the
margin of a page header or a success card, they are drawn flat and quiet
(66–88% bare ground, every one under the 5% dark ceiling), and their humour is
dry rather than broad — *"The lamp stayed on. The page did not."*, *"ALL OTHER
SYSTEMS NOMINAL"* over a sleeping cat while a storm runs outside the window.
That is an engineer's joke about uptime, told to someone who has sat through a
2 a.m. incident. It reads as confidence, not as cuteness.

The argument against: a cat is a cat, and a facilities manager forwarding the
link to a CFO may not want to explain one.

**Proposed resolution, for approval:** keep them, and let Gate 1 test the
specific risk rather than the general worry — *no illustration may be the
dominant element of any view, and every caption must carry a technical claim
rather than a punchline.* That makes it falsifiable. If you would rather they
went, say so now: it is a far cheaper decision before gates are written than
after.

## Desired first impression in five seconds

A visitor landing on the home page should come away with:

1. **What** — an infrastructure firm, not a software company or a reseller.
2. **How many** — five named disciplines, stated as a set.
3. **What next** — an obvious way to start a conversation.

And one thing they should **not** think: *"I have seen this template before."*

## Benchmarks

Three live sites, none a competitor, each chosen against a weakness Phase A
actually measured rather than for general excellence.

### 1. Fly.io — <https://fly.io>

Hand-drawn illustration carrying a technical infrastructure brand, which is
precisely what this site is attempting. Annie Ruygt's balloons are whimsical in
a domain far drier than Procedo's, and they never once make the product look
unserious — the lesson being that playful imagery survives a technical audience
when it is consistent, drawn rather than photographed, and present *everywhere*.

**What to learn, specifically:** the illustration appears on the front door.
Procedo's six scenes appear on six of ten pages and **not on the home page**,
which is the one most visitors see — the single largest distinctiveness gap
Phase A found.

### 2. Oxide Computer — <https://oxide.computer>

An infrastructure company selling to an audience at least as technical as
Procedo's, with zero hype anywhere on the site and a visual identity nobody
would mistake for another vendor. Monospace is used structurally — for labels,
specifications and data — rather than as decoration.

**What to learn, specifically:** how far restraint can be pushed before a site
becomes cold. Procedo already uses IBM Plex Mono for eyebrow labels; Oxide shows
the same move done systematically enough to become a signature.

### 3. 37signals — <https://37signals.com>

Plain, opinionated, and almost entirely typographic. Confidence is carried by
what is left out. A tight type scale does nearly all the hierarchical work, with
very little ornament and no stock imagery.

**What to learn, specifically:** a closed type scale. Phase A measured **14
distinct rendered font sizes at 1280px**, eight of them one-off `clamp()`
expressions used exactly once each. 37signals demonstrates that a handful of
steps, used consistently, reads as more authoritative than many steps used once.

*Replace any of these if they do not match what you have in mind — the gates
inherit whatever is approved here.*

---

## Integration with FINISH-LINE.md

**CASE 2 applies.** `FINISH-LINE.md` exists at **v1.0** and is **not locked** —
it was locked on 2026-09-19 and unfrozen the same day, and its header says so.
No `UNFREEZE FOR QUALITY` is needed.

Therefore, in Phase I:

- Gates 1–8 and Gate 10 are written into its **Design** section, one line each,
  **by reference** to `QUALITY-GATES.md` for method and threshold.
- Gate 6's performance bounds and Gate 5's technical items go into its
  **Optimization** section, again by reference.
- Its **Completion Authority** section gains: *"LOCK is not permitted until
  QUALITY-GATES.md shows Stage 2 PASSED. Gate 9 (behavioural) is exempt from
  this precondition and is verified post-launch."*
- Every currently failing gate is added to its **Gap to Finish Line** checklist
  as an in-scope defect.
- **Gate 9** is listed as out of scope for LOCK purposes — a post-launch
  verification, not a v1 criterion. It needs the Cloudflare Web Analytics token
  Procedo has not sent and 30 days of live traffic, so it can never gate a lock.

A failing gate is a **DEFECT** and its fix is in scope. A visual change serving
no gate is **EXTRA**.

### Gates that will duplicate existing criteria

These must reference the existing criterion rather than restate it, or the two
documents will drift apart:

| New gate | Existing criterion |
|---|---|
| Gate 2, colour and typography | **D1**, **D2** |
| Gate 6, reduced motion | **D4** |
| Gate 10, SVG labelling and focus rings | **D5**, **D6**, **O3** |
| Gate 5, image weight and dimensions | **O5** |
| Gate 3/7 responsive behaviour | **D3** (375 / 768 / 1280) |

---

## Still open

- **Anything you already consider visually wrong.** I should have asked this in
  the Phase B batch and did not. It is the one input no amount of measurement
  substitutes for: if something on the site already bothers you, the gate that
  catches it should be written deliberately rather than stumbled into.
- **The navy drift.** The old site's navy is `#1A355D`; this site's `navy-800`
  is `#1B2A4A`. There is no brand guidelines document anywhere, so there is
  nothing to be right or wrong against — but Gate 2 needs to know whether the
  current navy is the brand navy, or a drift to be corrected.
