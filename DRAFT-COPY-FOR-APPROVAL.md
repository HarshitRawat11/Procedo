# DRAFT COPY — NOT APPROVED, NOT ON THE SITE

> ## ⚠️ READ THIS BEFORE USING ANY LINE BELOW
>
> **Every word in this document was written by us, not by Procedo.** None of it
> is on the website and none of it may be copied into `src/data/site.ts` until
> Procedo has confirmed it.
>
> `CLAUDE.md` rule 1 — *never invent facts about Procedo* — is the most
> important rule in this repository, and this file is the one place that
> deliberately sits outside it. That is only safe while the file stays a
> **proposal**. The moment a line is pasted into `site.ts` it becomes a claim
> the company is making to prospective clients.
>
> **How to use it:** send it to Procedo and ask them to mark each line
> `KEEP` / `CHANGE` / `DELETE`. Anything they change is then *their* wording and
> can ship. Anything they delete goes. Anything they do not answer stays off the
> site — silence is not approval.
>
> Created 2026-09-27. Status: **awaiting Procedo.**

---

## Why this exists

`BACKLOG.md` records the finding from 2026-09-19: three of the five service
sections are visibly thinner than the two Procedo revised in September, and
**the gap is in the source, not in the transcription.** The old React bundle was
searched and contains no further copy for them. Every sentence that exists has
already been used.

Measured by `scripts/measure-content.cjs`:

| | groups | items | avg chars | intro |
|---|---|---|---|---|
| Client-revised — Digital Workplace, Datacenter | 4 | 12 | **59** | **214** |
| From the old site — IT Infra, Facilities Security, AV | 3–4 | 9–12 | **32** | **132** |

So the options were their words or invented words. Asking for their words has
not worked in eight days. This document is the third option: **propose the
words, and let them correct.** A form is easier to answer than a blank page.

**Two rules were followed in writing it:**

1. **Nothing here is a new capability.** Every line expands a bullet that is
   already on the site and already traced to Procedo's own bundle. Where a line
   would add something genuinely new, it is marked **`+ NEW`** and needs a yes
   rather than a correction.
2. **The Facilities Security intro is not touched.** `site.ts` records it as
   Procedo's own wording, restored under rule 1 on 2026-09-17 after someone had
   replaced it with a written line. It is extended, never rewritten.

---

# Part 1 — The three thin service sections

## 1.1 IT Infrastructure

### Intro

**Currently on the site** (157 characters):

> Modern businesses need more than just devices—they need a scalable, secure
> digital backbone. We deliver enterprise-grade IT solutions tailored to your
> goals.

**Proposed** (228 characters, against a 214 benchmark):

> Modern businesses need more than devices — they need a scalable, secure
> digital backbone. We design the network, servers, storage and access control
> as one system rather than four purchases, size it to the workload actually in
> front of it, and document what we hand over.

*Why:* the current version says what Procedo sells. The proposed version says
what Procedo *does differently*, which is the question a prospect is actually
asking. "Four purchases" is the claim to check — it is a positioning statement,
not a fact, and Procedo may not want it.

### Capability lines

Each row keeps the existing claim and adds the detail a buyer wants.

**Network Architecture**

| On the site now | Proposed |
|---|---|
| LAN and WAN design and deployment | LAN and WAN topology designed, deployed and documented |
| High-performance Wi-Fi, mesh and enterprise-grade | Enterprise and mesh Wi-Fi, surveyed for coverage before install |
| VPNs, firewalls and SD-WAN configuration | Firewalls, site-to-site VPN and SD-WAN across branch links |

**Server & Storage Solutions**

| On the site now | Proposed |
|---|---|
| On-prem and cloud server setups (AWS, Azure, GCP) | On-premise, AWS, Azure and GCP server builds, sized to workload |
| Virtualization: VMware, Proxmox, Hyper-V | Virtualisation on VMware, Proxmox or Hyper-V, with host sizing |
| NAS and SAN storage with redundancy | NAS and SAN storage with redundancy and growth headroom |

**Endpoint & Access Security**

| On the site now | Proposed |
|---|---|
| SSO, LDAP and Azure AD | Single sign-on against LDAP, Active Directory or Azure AD |
| Role-based access controls | Role-based access control, reviewed as people join and leave |
| Patch and asset management | Patch and asset management against a current hardware inventory |

**Continuity & Recovery**

| On the site now | Proposed |
|---|---|
| Backup strategy: cloud, local or hybrid | Backup to cloud, local or hybrid, with restores actually tested |
| Disaster recovery plans | Disaster recovery plans with an agreed RPO and RTO per system |
| Monitoring and failover systems | Monitoring and automatic failover, with alerts that reach a person |

> **Three lines to check hardest**, because they promise a behaviour rather than
> a product: *"restores actually tested"*, *"reviewed as people join and
> leave"*, and *"alerts that reach a person"*. Each is the single most
> persuasive line in its group and each is only worth having if it is true of
> how Procedo actually runs an engagement.

---

## 1.2 Facilities Security

### Intro

**Currently on the site — DO NOT REWRITE** (120 characters). This is Procedo's
own wording from the old site. It was replaced once by a written line and
restored under rule 1 on 2026-09-17:

> We turn physical spaces into intelligent environments with integrated security
> systems that are proactive, not reactive.

**Proposed: keep it exactly, and add one sentence after it** (total 241):

> We turn physical spaces into intelligent environments with integrated security
> systems that are proactive, not reactive. Cameras, doors, alarms and building
> services run on one control layer and report to one dashboard, so a site
> supervisor sees the whole building rather than four consoles.

*Why:* this is the only one of the three where the existing sentence is
genuinely Procedo's, so it stays untouched and gains a second sentence rather
than being replaced. The added sentence is the integration claim, which is what
separates this from buying a CCTV system.

### Capability lines

**Surveillance Systems**

| On the site now | Proposed |
|---|---|
| IP CCTV: PTZ, fisheye and thermal | IP CCTV — PTZ, fisheye and thermal, positioned to a site survey |
| VMS software and cloud-based archiving | VMS software with on-site or cloud archiving and retention rules |
| — | **`+ NEW`** Camera health monitoring, so a dead camera is noticed |

**Access Control**

| On the site now | Proposed |
|---|---|
| Biometrics: fingerprint and facial | Biometrics — fingerprint and facial, with anti-passback rules |
| RFID, NFC and mobile credentials | RFID, NFC and mobile credentials issued from one directory |
| Zonal control and visitor workflow integration | Zonal permissions plus visitor and contractor pass workflows |

**Building Management Systems (BMS)**

| On the site now | Proposed |
|---|---|
| HVAC, fire alarm and lighting automation | HVAC, fire alarm and lighting automation on one control layer |
| Central dashboard for energy and environment control | A single dashboard for energy use, temperature and occupancy |
| — | **`+ NEW`** Scheduling and setbacks that cut out-of-hours consumption |

**Monitoring & Reporting**

| On the site now | Proposed |
|---|---|
| Real-time dashboards | Real-time dashboards for cameras, doors and environmental alarms |
| Remote diagnostics and alerts | Remote diagnostics and alerting with a named escalation path |
| Compliance-ready audit trails | Audit trails built for compliance review, exportable on request |

> **The two `+ NEW` lines are the only additions in this whole document.** Both
> are ordinary parts of a managed security install, but neither is in the
> bundle, so both need an explicit yes rather than a correction. Delete them and
> the section still works.

---

## 1.3 Audio & Video Conferencing

### Intro

**Currently on the site** (121 characters):

> Whether it's boardrooms or remote workspaces, we engineer communication
> environments that feel effortless and immersive.

**Proposed** (236 characters):

> Whether it's boardrooms or remote workspaces, we engineer communication
> environments that feel effortless and immersive. The test is simple: someone
> walks in, presses one button, and the meeting starts — no cable hunt, no
> dial-in code, no call to IT.

*Why:* the existing sentence is kept whole and given a concrete standard. "One
button" is the single most checkable promise in the section and the one a
facilities manager will remember.

### Capability lines

**Room Design & Acoustics**

| On the site now | Proposed |
|---|---|
| Sightline and acoustic optimization | Sightlines and acoustics set out room by room, not by template |
| Lighting for engagement | Lighting placed for faces on camera, not just for the room |
| Noise control treatments | Noise control — treatment, isolation and HVAC noise checks |

**Platform Integration**

| On the site now | Proposed |
|---|---|
| Zoom, Teams and Webex | Rooms that join Zoom, Teams and Webex without a laptop |
| AV control: Crestron and Extron | AV control on Crestron or Extron, with one-touch join |
| BYOD and calendar sync | BYOD input and calendar sync, so the room knows its bookings |

**Hardware Setup**

| On the site now | Proposed |
|---|---|
| PTZ cameras, ceiling mics and smart displays | PTZ cameras, ceiling microphone arrays and smart displays |
| Wireless presentation | Wireless presentation from any device, with no dongle to lose |
| Voice tracking | Voice tracking and auto-framing that follows the speaker |

> **This section stays at three groups against the other four's four.** That is
> deliberate — a fourth group would have to be invented outright rather than
> expanded. If Procedo wants parity, the honest fourth group is **support**:
> what happens when a room stops working. That needs their answer, not ours.

---

# Part 2 — "How a project runs"

**Status: entirely proposed.** Nothing about Procedo's delivery process exists
in the bundle or anywhere else in the repository. This is a plausible sequence
for this kind of work, offered so Procedo can correct it rather than compose
from scratch. **If the steps are wrong, the whole section is wrong** — a process
a client is shown and then does not experience is worse than no process section.

Suggested section heading: **How a project runs**
Suggested standfirst: *Five steps, and you know which one you are in.*

### 1. Survey

> We walk the site before we quote. Cable routes, power, sightlines, existing
> kit, and the constraints nobody mentions on a call — a lift that cannot be
> used during business hours, a server room that is also a store cupboard.

### 2. Design and proposal

> You get drawings, a bill of materials and a fixed scope, not a price. Anything
> we are unsure about is listed as an assumption so it can be argued with before
> it becomes a variation.

### 3. Mobilisation

> Procurement, lead times and a dated schedule. We tell you the long-lead items
> up front, because those are what move a go-live date.

### 4. Installation and commissioning

> Installed, tested and signed off against the design. Every point is proven
> working — not powered on, working — and the snag list is ours to close, not
> yours to chase.

### 5. Handover and support

> As-built documentation, a trained handover to your team, and a named
> escalation path afterwards. You should not need us to operate what we built.

> **Four things to check with Procedo before any of this ships:**
>
> 1. Is it really five steps, or do they run a different shape?
> 2. *"We walk the site before we quote"* — is that always true, including for
>    small jobs?
> 3. *"a fixed scope, not a price"* — is that how they actually contract?
> 4. *"a named escalation path"* — does that exist as a standing thing, or only
>    where there is an AMC?

---

# Part 3 — FAQs

**Status: entirely proposed.** Six questions that a facilities manager or IT
lead genuinely asks before a first call. The *questions* are safe — they are
ours to choose. **The answers are claims about Procedo and every one needs
confirming.**

**Q1. Do you work with our existing equipment, or does everything have to be replaced?**

> We work with what is there wherever it is sound. A survey establishes what
> stays, what is extended and what is genuinely at end of life, and you see that
> split before you see a price.

**Q2. Which locations do you cover?**

> ⚠️ **PROCEDO MUST WRITE THIS ONE.** The site currently states an office in
> Delhi and the Digital Workplace section mentions "metro, tier 2 and tier 3
> locations". That is the only geographic claim anywhere on the site and we will
> not extend it. Name the actual coverage.

**Q3. Do you handle single sites, or multi-branch rollouts?**

> Both. The Digital Workplace and Field Operations practice exists for
> distributed estates — branch openings, relocations and closures — and the same
> engineering standards apply to one room.

**Q4. Who owns the project once it is installed?**

> You do, and you will have the documentation to prove it: as-built drawings,
> credentials and configurations handed over at closeout. Ongoing support is a
> separate agreement, not a dependency we design in.

**Q5. How long does a typical project take?**

> ⚠️ **PROCEDO MUST WRITE THIS ONE, OR IT SHOULD BE CUT.** Any duration we
> invent is a commitment they have to meet. If they would rather not commit, the
> honest answer is that it depends on lead times and site access, and that the
> schedule is agreed at step 3 — but that is close to saying nothing, and a
> question worth asking deserves a real answer or no place on the page.

**Q6. Can you work alongside our existing IT team or contractor?**

> Yes, and most engagements do. We define the boundary in the proposal — what we
> own, what your team owns, and who is called first when something breaks.

> **On Q2 and Q5:** both are deliberately left unanswered. They are the two
> questions where a made-up answer becomes a commercial promise, and a
> confidently wrong answer to either does more damage than the absent FAQ ever
> did.

---

# Part 4 — A longer Vision statement

**The current one is real and must not be edited.** It is Procedo's own
sentence, verbatim from the old site, and `site.ts` records that it was checked
against the bundle on 2026-09-18 — there is no more of it. It was not truncated;
there is simply nothing further to restore.

> To be a leading provider of integrated infrastructure and facility security
> solutions that enable efficient, secure, and collaborative environments across
> industries.

**So the only honest move is to ADD, never to rewrite.** Three options, all of
which keep that sentence untouched as the first line.

### Option A — the standard the vision implies (recommended)

> *(existing sentence)* We measure that ambition in a single way: whether the
> systems we build are still doing their job, quietly, years after we handed
> them over.

*Why this one:* it adds a test rather than an adjective, which matches the
register of Procedo's own *"Power without precision is chaos"*. It commits them
to nothing they are not already claiming.

### Option B — the scope

> *(existing sentence)* That means one partner across IT, security and AV
> infrastructure — from a single conference room to a multi-branch estate — and
> one standard of engineering applied to all of it.

*Why:* it earns its length by answering "integrated, how?". The risk is that it
restates the Mission, which already carries the five service pillars.

### Option C — leave it at one sentence

> *(existing sentence, unchanged)*

*Why this is a real option:* the Vision card was lengthened on 2026-09-18 by
adding three more Key Focus Areas — `Efficient Environments`, `Secure
Environments`, `Collaborative Environments` — which are an editorial re-cut of
the vision sentence, not Procedo's own list. `site.ts` says so in a comment. If
Procedo writes a genuinely longer vision, **those three chips should be deleted
and replaced by their real focus areas**, and the card gets its length from
substance instead of from a re-cut.

> **Recommendation: A, plus asking them to replace the three derived chips.**
> A short true vision with three real focus areas beats a long one with six
> derived ones.

---

# What to do with this

1. **Send it to Procedo** alongside `CLIENT-PENDING.txt`, which already names
   the same gap in their own numbers.
2. **Ask for `KEEP` / `CHANGE` / `DELETE` per line.** A correction is worth ten
   times a blank page, and correcting is quicker than composing — which is the
   entire reason this document exists.
3. **Anything unanswered stays off the site.** Silence is not approval, and
   `Q2`, `Q5` and every `+ NEW` line need a positive yes rather than an absence
   of objection.
4. **When answers come back**, the service lines go into `src/data/site.ts` in
   the `competencies` array, the process section and FAQs need new blocks in the
   same file plus a section component each, and the Vision line goes into
   `mission.vision.statement`. Run `node scripts/measure-content.cjs` afterwards
   — **on a machine that has `scrape/procedo/app.js`**, because CI cannot run
   the provenance half and therefore cannot catch an invented claim.
