/* ============================================================================
 *  Procedo Infosystems — SINGLE SOURCE OF TRUTH for site content.
 *
 *  👋 NON-DEVELOPERS: edit the text inside the quotes to update the website.
 *  Keep the structure (commas, brackets, quotes) intact.
 *
 *  Anything marked "TODO" below still needs a real value from Procedo.
 * ========================================================================== */

/** Core company / SEO identity. */
export const site = {
  /** Short brand name — used in the nav, page titles and body copy. */
  name: 'Procedo Infosystems',
  /** Full registered name — used in the footer copyright, legal pages, schema. */
  legalName: 'Procedo Infosystems Pvt. Ltd.',
  /** Production domain — used for canonical URLs, sitemap, Open Graph. */
  url: 'https://www.procedoinfo.com',
  tagline: 'Designing intelligent systems that empower businesses to focus on what matters most.',
  /**
   * The HOME PAGE's <title>, and only the home page's — every other page builds
   * its own as "Page | Procedo Infosystems".
   *
   * It used to be `name — tagline`, which came out at 106 characters. Google
   * shows about 60, so what a searcher actually saw was "Procedo Infosystems —
   * Designing intelligent systems that empower busi…": the brand, then nothing
   * that says what the firm sells. This names the three things Procedo names
   * first in its own company overview, and still ends in the brand, so it reads
   * as part of the same set as the other nine titles.
   */
  homeTitle: 'IT Infrastructure, Security & AV Systems | Procedo Infosystems',
  /**
   * The default <meta name="description"> for any page that does not set one —
   * in practice the home page — and the `description` on the Organization and
   * WebSite schema nodes.
   *
   * Cut from 215 characters to fit the ~160 a search result shows. The old one
   * listed all five competencies and was truncated mid-list, so two of the five
   * never appeared; this names four and closes with the service area, which is
   * a real differentiator and is on the Contact page already.
   */
  description:
    'Procedo Infosystems delivers integrated IT infrastructure, facilities security, AV conferencing, digital workplace and datacenter services across India.',
} as const;

/** Contact details. */
export const contact = {
  /** General enquiries — also where the contact form is delivered. */
  email: 'contact@procedoinfo.com',
  /** Sales enquiries. */
  salesEmail: 'sales@procedoinfo.com',
  phone: '+91 9958896172',
  /**
   * WhatsApp Business number, confirmed by Harshit on 2026-09-13 — the same
   * line as the phone above. Digits only, with country code, no plus: that is
   * the format wa.me expects. Leave empty to hide the WhatsApp channel.
   */
  whatsapp: '919958896172',
  /** Registered office. Leave empty to hide the Contact address card entirely. */
  address: '324 Guru Ram Das Nagar, Laxmi Nagar, Delhi – 110092',
  /**
   * Where Procedo takes on work. Confirmed by Harshit on 2026-09-10: anywhere
   * in India, not only Delhi NCR. Leave empty to hide the line.
   */
  reach: 'Working with clients across India',
} as const;

/**
 * Maps link for the office, derived from the address so the two can never
 * disagree. Empty when there is no address, which hides the link (§3).
 */
/**
 * WhatsApp deep link. Empty when no number is set, which hides the channel (§3).
 * The prefilled text is a neutral opener the visitor can replace.
 */
export const whatsappHref = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      'Hello Procedo — I would like to discuss a requirement.',
    )}`
  : '';

export const directionsHref = contact.address
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
  : '';

/**
 * Analytics (#18). Nothing is emitted while `provider` is 'none' or `id` is
 * empty — that is the §3 pattern, a missing value hides the feature rather than
 * emitting a broken tag.
 *
 * ── CHOSEN: CLOUDFLARE, 2026-09-18 ──────────────────────────────────────
 * Free, cookieless, and the site is already hosted on Cloudflare Pages. It
 * gives pageviews, referrers, countries, devices and Core Web Vitals — enough
 * to answer the only question this site needs answered: which pages get read,
 * and who reaches /contact. No funnels or custom events; if those are ever
 * needed, Plausible is still wired below and is a two-line change.
 *
 * TO TURN IT ON, one value is needed and it comes from the dashboard:
 *   Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site
 *   → copy the SITE TOKEN (32 hex characters) → paste it as `id` below
 *   → set `provider` to 'cloudflare'.
 * Nothing else changes; no code edit, no redeploy beyond the usual push.
 *
 *   cloudflare  id = the Web Analytics site token, 32 hex characters
 *   plausible   id = the domain registered with Plausible, e.g. 'procedoinfo.com'
 *   umami       id = the website id from the Umami dashboard
 *   ga4         id = the measurement id, e.g. 'G-XXXXXXXXXX'
 *
 * `host` is only for a self-hosted Plausible or Umami; leave it empty for the
 * hosted service and for cloudflare.
 *
 * COOKIES. cloudflare, plausible and umami are all cookieless and need no
 * consent banner. GA4 sets cookies, so choosing it would mean building a
 * consent banner first — the site does not have one, and that is why the
 * choice was made on this axis as much as on features. It also keeps the
 * answer to "does this site set cookies?" a plain no, which is what the Cookie
 * Policy has to be rewritten around (see the legal note further down).
 *
 * ONE THING TO EXPECT: the beacon is not hostname-locked, so while the preview
 * at procedoinfo-preview.pages.dev is the only deployment, its traffic —
 * mostly yours and the client's — lands in the same dataset. Filter by hostname
 * in the Web Analytics dashboard, or leave `provider` as 'none' until launch.
 */
export type AnalyticsProvider = 'none' | 'cloudflare' | 'plausible' | 'umami' | 'ga4';
export const analytics: { provider: AnalyticsProvider; id: string; host: string } = {
  provider: 'none',
  id: '',
  host: '',
};

/* ── WHAT THE LEGAL PAGES ARE ALLOWED TO SAY ABOUT COOKIES ──────────────────
 *
 * The Cookie Policy used to hard-code "we use cookies to ... provide relevant
 * content or ads" while the site set none. That is the defect these three
 * values exist to make impossible: the policy DERIVES its cookie claims from
 * the analytics configuration above, so the two cannot drift apart again.
 *
 * Measured on the live site, 2026-09-18, with `provider: 'none'`:
 * no cookies, no localStorage, no sessionStorage, no IndexedDB, and not one
 * third-party origin — fonts are self-hosted and the only script is Astro's
 * own router. The contact form posts to Web3Forms, but only when submitted.
 *
 * ⚠️ IF YOU SET `provider` TO 'ga4', READ THIS. GA4 sets cookies. The policy
 * below will switch to saying so, which keeps it honest — but honest is not the
 * same as compliant. A site that sets analytics cookies needs a consent banner
 * that asks BEFORE the script loads, and this site has no banner and no consent
 * storage. Build those first, or choose one of the three cookieless providers.
 */
const COOKIE_SETTING_ANALYTICS: AnalyticsProvider[] = ['ga4'];
const ANALYTICS_NAMES: Record<AnalyticsProvider, string> = {
  none: '',
  cloudflare: 'Cloudflare Web Analytics',
  plausible: 'Plausible Analytics',
  umami: 'Umami',
  ga4: 'Google Analytics 4',
};
/** True once a provider is actually switched on (id filled in), per §3. */
export const analyticsEnabled = analytics.provider !== 'none' && analytics.id.trim() !== '';
/** True only when the switched-on provider is one that sets cookies. */
export const analyticsSetsCookies =
  analyticsEnabled && COOKIE_SETTING_ANALYTICS.includes(analytics.provider);
/** Display name for the legal pages. Empty while analytics is off. */
export const analyticsName = analyticsEnabled ? ANALYTICS_NAMES[analytics.provider] : '';

/**
 * Social links. TODO: replace `#` with the real profile URL.
 * Links still pointing at `#` are automatically hidden in the footer.
 */
export const socials = [{ label: 'LinkedIn', href: '#', icon: 'lucide:linkedin' }] as const;

/** Primary navigation. */
export const nav = [
  { label: 'Company', href: '/company' },
  { label: 'Services', href: '/services' },
  { label: 'Our Mission', href: '/our-mission' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Home hero. */
export const hero = {
  eyebrow: 'Intelligent systems integration',
  headline: 'We design systems that work intelligently—so you can focus on what matters.',
  sub: 'From secure IT infrastructure to advanced building automation and AV ecosystems—we help businesses operate smarter, safer, and more connected.',
  primaryCta: { label: 'Explore Our Solutions', href: '/services' },
  secondaryCta: { label: 'Talk to Us', href: '/contact' },
  badges: ['Enterprise Grade Solutions', '24/7 Support'],
} as const;

/**
 * Section intro shared by the Home competencies preview and the Services page.
 *
 * The title used to read "Comprehensive technology, engineered as one system",
 * which put "Comprehensive technology" twice in two adjacent lines — once in a
 * 40px heading and again in the sentence directly beneath it. The SUB is
 * Procedo's own wording from the old site and stays; the title is ours, so the
 * title moved. "Five disciplines" also says something the old line did not: how
 * many there are, which is the first question the section raises.
 */
export const competenciesIntro = {
  eyebrow: 'Our core competencies',
  title: 'Five disciplines, engineered as one system',
  sub: 'Comprehensive technology solutions designed to transform how your business operates.',
} as const;

export interface CompetencyGroup {
  name: string;
  items: string[];
}
export interface Competency {
  slug: string;
  title: string;
  /** Lucide icon name. */
  icon: string;
  tagline: string;
  /** Short lead paragraph shown at the top of the Services section. */
  intro: string;
  groups: CompetencyGroup[];
  /** Omitted where the client has not supplied a line; the section hides it. */
  quote?: string;
}

/** The five core competencies (real Procedo content). */
export const competencies: Competency[] = [

  {
    slug: 'digital-workplace',
    title: 'Digital Workplace Services & Field Operations',
    icon: 'lucide:laptop',
    tagline: 'End-to-end user computing, compliance automation, and distributed maintenance.',
    intro:
      'Frictionless technology for your people, tight control for your auditors. We run the service desk, keep endpoints compliant, govern the asset lifecycle, and put engineers on site across metro and regional branches.',
    groups: [
      {
        name: 'Service Desk & Incident Governance',
        items: [
          'Unified intake by portal, email and phone with tiered escalation',
          'VIP and key-user protocols with prioritized response',
          'ITIL-aligned root cause analysis to end repeat incidents',
        ],
      },
      {
        name: 'End-User Computing',
        items: [
          'L1/L2 support across operating systems and business applications',
          'Golden image deployment and standard IMAC execution',
          'Self-service password reset and account unlock',
        ],
      },
      {
        name: 'Asset & Endpoint Compliance',
        items: [
          'Hardware and software repository inside your ITSM platform',
          'Licence tracking, usage metering and audit preparation',
          'Patch deployment, rollback and quarantine for non-compliant endpoints',
        ],
      },
      {
        name: 'Field Operations & Break-Fix',
        items: [
          'Turnkey branch openings, relocations and closures',
          'On-site cover across metro, tier 2 and tier 3 locations',
          'Component-level rate contracts for post-warranty hardware',
        ],
      },
    ],
    quote: 'Empower every user. Secure every asset.',
  },
  {
    slug: 'datacenter-infrastructure',
    title: 'Datacenter Infrastructure',
    icon: 'lucide:zap',
    tagline: 'Power • Cooling • Containment • Monitoring — engineered for mission-critical uptime.',
    intro:
      'Uptime is engineered, not assumed. We design, deploy and commission high-availability datacenter and server room infrastructure — fault-tolerant power, precision cooling, intelligent containment and DCIM telemetry.',
    groups: [
      {
        name: 'Power & Redundancy',
        items: [
          'Modular online double-conversion UPS with VRLA or lithium banks',
          'Dual-path A+B topology, static transfer switches, metered rack PDUs',
          'Surge protection, AMF synchronization and generator integration',
        ],
      },
      {
        name: 'Cooling & Containment',
        items: [
          'In-row and perimeter PAC/PAHU with N+1 and 2N redundancy',
          'Hot aisle / cold aisle containment to remove hot spots and lower PUE',
          'Continuous temperature, humidity and air-pressure sensing',
        ],
      },
      {
        name: 'Racks & Structured Cabling',
        items: [
          '42U–52U high-density racks with front-to-back laminar airflow',
          'Overhead fibre raceways and pre-terminated copper/MPO trunking',
          'Labelled, segregated patch fields for zero-disruption expansion',
        ],
      },
      {
        name: 'Safety, Security & Monitoring',
        items: [
          'Clean-agent suppression (Novec 1230 / FM-200) with VESDA detection',
          'Biometric and RFID access control with HD IP surveillance',
          'DCIM telemetry, SNMP/Modbus into BMS, automated alerting',
        ],
      },
    ],
    quote: 'Power without precision is chaos. Precision without power is limitation. We deliver both.',
  },
  {
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    icon: 'lucide:server',
    tagline: 'Digital foundations built for agility and scale.',
    intro:
      'Modern businesses need more than just devices—they need a scalable, secure digital backbone. We deliver enterprise-grade IT solutions tailored to your goals.',
    groups: [
      {
        name: 'Network Architecture',
        items: [
          'LAN and WAN design and deployment',
          'High-performance Wi-Fi, mesh and enterprise-grade',
          'VPNs, firewalls and SD-WAN configuration',
        ],
      },
      {
        name: 'Server & Storage Solutions',
        items: [
          'On-prem and cloud server setups (AWS, Azure, GCP)',
          'Virtualization: VMware, Proxmox, Hyper-V',
          'NAS and SAN storage with redundancy',
        ],
      },
      {
        name: 'Endpoint & Access Security',
        items: [
          'SSO, LDAP and Azure AD',
          'Role-based access controls',
          'Patch and asset management',
        ],
      },
      {
        name: 'Continuity & Recovery',
        items: [
          'Backup strategy: cloud, local or hybrid',
          'Disaster recovery plans',
          'Monitoring and failover systems',
        ],
      },
    ],
    quote: "We don't just install servers. We build systems that carry your ambitions.",
  },
  {
    slug: 'facilities-security',
    title: 'Facilities Security',
    icon: 'lucide:shield-check',
    tagline: 'Smart environments that sense, protect, and evolve.',
    /* Procedo's own wording, from the old site. A written line had replaced it
       — one beginning Security should be invisible until you need it — which
       was nobody's but ours. Restored 2026-09-17 under rule #1. */
    intro:
      'We turn physical spaces into intelligent environments with integrated security systems that are proactive, not reactive.',
    groups: [
      {
        name: 'Surveillance Systems',
        items: [
          'IP CCTV: PTZ, fisheye and thermal',
          'VMS software and cloud-based archiving',
        ],
      },
      {
        name: 'Access Control',
        items: [
          'Biometrics: fingerprint and facial',
          'RFID, NFC and mobile credentials',
          'Zonal control and visitor workflow integration',
        ],
      },
      {
        name: 'Building Management Systems (BMS)',
        items: [
          'HVAC, fire alarm and lighting automation',
          'Central dashboard for energy and environment control',
        ],
      },
      {
        name: 'Monitoring & Reporting',
        items: [
          'Real-time dashboards',
          'Remote diagnostics and alerts',
          'Compliance-ready audit trails',
        ],
      },
    ],
    quote: "Security isn't about fear—it's about freedom to focus.",
  },
  {
    slug: 'av-conferencing',
    title: 'Audio & Video Conferencing',
    icon: 'lucide:video',
    tagline: 'Spaces that connect with clarity, ease, and presence.',
    intro:
      "Whether it's boardrooms or remote workspaces, we engineer communication environments that feel effortless and immersive.",
    groups: [
      {
        name: 'Room Design & Acoustics',
        items: [
          'Sightline and acoustic optimization',
          'Lighting for engagement',
          'Noise control treatments',
        ],
      },
      {
        name: 'Platform Integration',
        items: [
          'Zoom, Teams and Webex',
          'AV control: Crestron and Extron',
          'BYOD and calendar sync',
        ],
      },
      {
        name: 'Hardware Setup',
        items: [
          'PTZ cameras, ceiling mics and smart displays',
          'Wireless presentation',
          'Voice tracking',
        ],
      },
    ],
    quote: "A great conversation shouldn't depend on your geography.",
  },
];

/**
 * The 404 page, in full — heading, body and the illustration's two labels.
 *
 * All of it used to be hard-coded in `404.astro`, which broke #2. It moved here
 * 2026-09-18, when Harshit put UptimeScene on this page: the old heading was
 * "This page isn't on the rack", a joke that only worked while the picture was a
 * cat asleep on a server rack. The picture is now a storm at 3am with the lamp
 * still lit, so the words follow it — something went down, nothing else did,
 * which is exactly what a 404 has to say.
 */
export const notFound = {
  eyebrow: 'Error 404',
  title: 'This page didn’t come back up',
  body: 'The address you followed doesn’t exist, or it moved. Everything else is running exactly as it should.',
  chip: 'All other systems nominal',
  /*
   * "Power cut at 3am. Nobody noticed." until 2026-09-18, when Harshit asked
   * for something cleverer. That line was written for the SCENE, and it is
   * still the scene's own caption on `_uptime` — but on a 404 it described the
   * weather and left the page unmentioned, so the joke never closed.
   *
   * This one closes it, and it only works with this picture: the lamp is the
   * one warm thing in the frame and the whole argument the drawing makes. Six
   * words, two clauses, no adjectives — the register the tone note asks for.
   */
  caption: 'The lamp stayed on. The page did not.',
} as const;

/**
 * Copy for UptimeScene on `_uptime`, the parked concept page. The scene's real
 * home is the 404 now (see `notFound` above); this is kept only so un-parking
 * that page still renders.
 */
export const uptimeBand = {
  chip: 'On backup power',
  caption: 'Power cut at 3am. Nobody noticed.',
} as const;

/**
 * Copy for the RackScene illustration — the cat asleep in the one empty rack
 * unit, because every good design leaves headroom.
 *
 * Named `heroBand` until 2026-09-18, when Harshit decided the home hero keeps
 * its competency card and this scene goes to /services instead. A name that
 * points at a page the thing is not on is how `workshopBand` ended up confusing,
 * so it is `rackBand` now: named for the drawing, not the slot.
 */
export const rackBand = {
  chip: 'One U spare',
  caption: 'Always leave room to grow.',
} as const;

/**
 * Chip and caption for the illustration on the Company page — the statement
 * band under the page header, alongside the "technical precision and
 * implementation clarity" quote.
 *
 * The picture is a shadow board with one bay empty and the cat on top of it
 * holding the missing screwdriver.
 *
 * The caption used to BE the joke — "One tool out" / "Every tool in its place.
 * Nearly." Harshit, 2026-09-16: that "doesn't match the company page", and he is
 * right. The page argues technical precision and implementation clarity; a
 * caption laughing at disorder argues the opposite. So the words now make the
 * engineering point a shadow board actually makes — you can see at a glance what
 * is missing — and the cat is left to be the joke on its own, without the
 * caption nudging.
 *
 * The name is historical: this copy was written for WorkshopScene, which was
 * replaced by CompanyScene on 2026-09-14 and then deleted. The band also used
 * to sit between "Core values" and "Why us". Rename it to `companyBand` if you
 * are touching this area anyway — it is used in two places.
 */
export const workshopBand = {
  chip: 'One item signed out',
  caption: "A well-built system shows you what's missing.",
} as const;

/**
 * Copy for the ReceptionScene illustration (Contact page): the cat at the front
 * desk, answering the phone.
 */
export const receptionBand = {
  chip: 'Line open',
  caption: 'Ring the desk. Someone picks up.',
  /** The same scene after a message sends: the cat has picked the call up. */
  doneChip: 'Enquiry logged',
  doneCaption: 'Someone has already picked it up.',
} as const;

/**
 * The Contact page's one-line brief — today the header subtitle in
 * contact.astro, and on /contact-preview promoted to the statement beside the
 * reception illustration, in the Our Mission layout. One sentence, one place.
 */
export const contactStatement =
  'Tell us what you’re planning — we’ll help you scope the right solution. No pressure, just expert guidance.';

/**
 * The rest of the Contact page and its form: two column headings, the form's
 * own heading and lead, and what the visitor sees after a message sends.
 *
 * All of it was hard-coded in contact.astro and ContactForm.astro until
 * 2026-09-18, which broke #2 — the page a prospective client is most likely to
 * read carefully was the one page a non-developer could not edit. None of it is
 * a claim about Procedo, so none of it is a rule #1 problem; it is furniture,
 * and furniture still belongs in this file.
 *
 * `subjects` is the "What's this about?" dropdown. The five service entries are
 * DELIBERATELY shorter than the competency titles they point at — a <select>
 * option that reads "Digital Workplace Services & Field Operations" is unusable
 * on a phone. They are listed here rather than derived from `competencies` for
 * that reason, and because the first option is not a service at all. Keep the
 * order the same as `competencies` so the form and the page agree.
 */
export const contactCopy = {
  directTitle: 'Reach us directly',
  officeTitle: 'Office',
  helpTitle: 'What we can help with',
  formTitle: 'Send us a message',
  formIntro: 'Share a few details and the right engineer will get back to you.',
  successTitle: 'Message received',
  successBody:
    'It’s landed with the right team. We’ll be in touch shortly — nothing else needed from you.',
  subjects: [
    'General enquiry',
    'Digital Workplace Services',
    'Datacenter Infrastructure',
    'IT Infrastructure',
    'Facilities Security',
    'Audio & Video Conferencing',
  ],
} as const;

/** Closing call-to-action band. */
export const closingCta = {
  heading: 'Ready to Future-Proof Your Business?',
  sub: 'Whether you’re starting from scratch or upgrading legacy systems, our experts are ready to guide you through every step of your digital transformation journey.',
  primary: { label: 'Talk to Our Team', href: '/contact' },
  secondary: { label: 'Explore Our Services', href: '/services' },
} as const;

/** Footer structure. */
export const footer = {
  tagline: 'Designing intelligent systems that empower businesses to focus on what matters most.',
  columns: [
    {
      title: 'Solutions',
      links: [
        { label: 'Digital Workplace', href: '/services#digital-workplace' },
        { label: 'Datacenter Infrastructure', href: '/services#datacenter-infrastructure' },
        { label: 'IT Infrastructure', href: '/services#it-infrastructure' },
        { label: 'Facilities Security', href: '/services#facilities-security' },
        { label: 'AV Conferencing', href: '/services#av-conferencing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Company Overview', href: '/company' },
        { label: 'Our Core Values', href: '/company#values' },
        { label: 'Why Us?', href: '/company#why-us' },
        { label: 'Our Mission', href: '/our-mission' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ],
} as const;

export interface Feature {
  icon: string;
  title: string;
  body: string;
}

/** "Why partner with Procedo" value props (home + Company › Why Us). */
export const whyUs: Feature[] = [
  {
    icon: 'lucide:shield-check',
    title: 'Enterprise-Grade Security',
    body: 'Leveraging the latest advancements in security protocols and threat protection to safeguard your business operations.',
  },
  {
    icon: 'lucide:users',
    title: 'Expert Team',
    body: "Dedicated specialists committed to your project's success and long-term growth with industry-leading expertise.",
  },
  {
    icon: 'lucide:handshake',
    title: 'Collaborative Approach',
    body: 'Working closely with you to tailor solutions to your exact business needs and strategic objectives.',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Measurable Results',
    body: 'Focusing on delivering tangible business value and return on investment through proven methodologies.',
  },
];

/** Company page content. */
export const company = {
  overview: [
    'Procedo Infosystems Pvt. Ltd. is an infrastructure-first technology firm delivering integrated solutions across IT Infrastructure, Facilities Security, and Audio-Visual (AV) Systems. Our modular, enterprise-grade offerings are built to support secure operations, resilient growth, and seamless client engagement.',
    'Whether deploying robust network architecture, securing workspaces with intelligent surveillance systems, or enabling modern communication through advanced AV integration—Procedo ensures each environment is tailored, scalable, and aligned with business continuity.',
    'With a commitment to technical precision and implementation clarity, our solutions empower organizations to evolve confidently while protecting their assets, people, and digital workflows.',
  ],
  /**
   * The line that sits under the statement on /company, beside the
   * illustration. It was the PageHeader's `subtitle` and was hard-coded in the
   * page, which broke #2; it moved here 2026-09-16.
   *
   * Why it moved DOWN as well as out: a three-line subtitle in the header,
   * with nothing to its right, left the whole top-right corner of the page
   * empty. Harshit: "it is creating too much negative space on the top right
   * corner". /our-mission has always been eyebrow + title only for this
   * reason, and /company now matches it.
   */
  lede:
    'An infrastructure-first technology firm — bringing IT, security, AV, digital workplace and datacenter infrastructure together into systems that quietly work.',
  valuesIntro: 'The principles that guide every solution we deliver and every partnership we build.',
  values: [
    {
      icon: 'lucide:lock',
      title: 'Security First',
      /* Restored to Procedo's full sentence on 2026-09-18. It had been cut
         after "above all else", and it was the ONLY one of the six that did not
         match the old site's bundle word for word — the other five are verbatim.
         The dropped clause is the half that says what Procedo actually does
         about it. */
      body: 'We prioritize the protection of your critical infrastructure and data above all else, implementing enterprise-grade security measures in every solution.',
    },
    {
      icon: 'lucide:sparkles',
      title: 'Innovation',
      body: 'Continuously advancing technology solutions to meet evolving business needs and stay ahead of industry trends.',
    },
    {
      icon: 'lucide:handshake',
      title: 'Collaboration',
      body: 'Working closely with clients to understand their unique challenges and exceed their expectations through partnership.',
    },
    {
      icon: 'lucide:award',
      title: 'Excellence',
      body: 'Committed to delivering the highest quality solutions and maintaining industry-leading standards in all our services.',
    },
    {
      icon: 'lucide:layers',
      title: 'Scalability',
      body: 'Building solutions that grow with your business, ensuring long-term value and adaptability to future needs.',
    },
    {
      icon: 'lucide:gauge',
      title: 'Reliability',
      body: 'Providing dependable solutions and support that businesses can count on, with 24/7 monitoring and maintenance.',
    },
  ] satisfies Feature[],
} as const;

/** Our Mission page content — Vision, Mission and guiding principles. */
export const mission = {
  statement:
    'We believe technology should enable, not complicate. Our mission is to deliver integrated IT, security, and AV solutions that empower organizations to thrive in a rapidly evolving world.',
  body: 'From secure IT infrastructure to intelligent building automation and immersive AV, we help you create environments where people and ideas flourish—today and tomorrow.',
  vision: {
    /* Procedo's own vision sentence, verbatim from the old site. It is ONE
       sentence and there is no more of it — checked against the bundle on
       2026-09-18 when Harshit asked for the Vision card to be lengthened. Unlike
       the "Security First" value, this was not truncated; there is simply
       nothing further to restore. Lengthening it means Procedo writing a longer
       vision, not us. */
    statement:
      'To be a leading provider of integrated infrastructure and facility security solutions that enable efficient, secure, and collaborative environments across industries.',
    listTitle: 'Key Focus Areas',
    /*
     * The first three are the old site's own. The last three were added
     * 2026-09-18 so the Vision card carries as many chips as the Mission card,
     * at Harshit's request — and every one of them is lifted from the vision
     * sentence directly above, not invented:
     *
     *     "... enable EFFICIENT, SECURE, and COLLABORATIVE ENVIRONMENTS ..."
     *
     * which is the same move the old site made for the first three
     * ("Industry Leadership" ← "a leading provider", "Integrated Solutions"
     * ← "integrated ... solutions", "Cross-Industry Impact" ← "across
     * industries"). They repeat the noun on purpose: it makes the derivation
     * obvious to anyone reading the statement and the chips together.
     *
     * They are still an editorial re-cut of Procedo's words rather than
     * Procedo's own list. If Harshit or the client would rather have three real
     * focus areas, delete these three lines — the card simply gets shorter
     * again and nothing else breaks.
     */
    items: [
      'Industry Leadership',
      'Integrated Solutions',
      'Cross-Industry Impact',
      'Efficient Environments',
      'Secure Environments',
      'Collaborative Environments',
    ],
  },
  purpose: {
    statement:
      'Deliver innovative, modular services in IT, facilities security, and audio-visual systems, with an emphasis on scalability, compliance, and reliability. We align advanced technology with operational clarity, helping businesses safeguard what matters while empowering seamless interaction.',
    listTitle: 'Service Pillars',
    items: [
      'Digital Workplace Services',
      'Datacenter Infrastructure',
      'IT Infrastructure',
      'Facilities Security',
      'Audio & Video Conferencing',
    ],
  },
  points: [
    {
      icon: 'lucide:target',
      title: 'Outcomes over hardware',
      body: 'We start from the business result you need and engineer backwards to the right systems.',
    },
    {
      icon: 'lucide:lock',
      title: 'Secure and resilient',
      body: 'Every design assumes the unexpected — redundancy, recovery and protection are built in.',
    },
    {
      icon: 'lucide:infinity',
      title: 'Effortless to operate',
      body: 'Intelligent monitoring and clean integration mean far less to manage day to day.',
    },
  ] satisfies Feature[],
} as const;

export interface Role {
  title: string;
  icon: string;
  body: string;
}

/** Careers — roles Procedo hires for, and why people join. */
export const careers = {
  intro:
    'Help us build scalable digital infrastructure, secure smart environments, and immersive communication spaces.',
  cultureTitle: 'Why work with us',
  /*
   * There is deliberately NO intro paragraph under this heading. One used to be
   * hard-coded in careers.astro — "We are a small, senior team, which means your
   * work is visible, your decisions carry weight, and you learn across every
   * layer of the stack" — and it was removed on 2026-09-18 under rule #1. It is
   * a claim about how many people work at Procedo and how senior they are, and
   * it appears in no verified source; the old site's careers page had the intro
   * line above, these four bullets and the roles, and nothing else. The bullets
   * carry the section perfectly well on their own.
   *
   * If Procedo wants a line here, it has to come from Procedo.
   */
  culture: [
    'Innovation-driven culture that values creative solutions.',
    'Collaborative environment focused on continuous growth.',
    'Work-life balance with flexible opportunities.',
    'Challenging projects that make a real-world impact.',
  ],
  rolesTitle: 'Roles we hire for',
  rolesIntro:
    'These are the disciplines we recruit for as projects come in. Send us your CV even if nothing below matches exactly.',
  roles: [
    {
      title: 'Server & Security Engineer',
      icon: 'lucide:server-cog',
      body: 'Handle on-prem and cloud server setups (AWS, Azure, GCP), virtualization with VMware/Proxmox/Hyper-V, and storage redundancy. Manage endpoint security and access controls (SSO, LDAP, Azure AD), and lead backup and recovery initiatives with monitoring and failover strategies.',
    },
    {
      title: 'Security Systems Specialist',
      icon: 'lucide:shield-check',
      body: 'Configure and maintain IP surveillance, access control, and BMS integration.',
    },
    {
      title: 'AV Integration Expert',
      icon: 'lucide:video',
      body: 'Deliver seamless AV experiences with platform and hardware integration.',
    },
    {
      title: 'Software Engineer',
      icon: 'lucide:terminal',
      body: 'Design, develop, and optimize software systems that power secure, high-performance infrastructures.',
    },
    {
      title: 'Full Stack Developer',
      icon: 'lucide:code-xml',
      body: 'Build and maintain scalable web applications with modern frontend and backend frameworks.',
    },
    {
      title: 'Data Scientist',
      icon: 'lucide:brain-circuit',
      body: 'Develop ML models, analyze complex data sets, and deliver actionable insights that drive business decisions.',
    },
  ] satisfies Role[],
  /**
   * The open-application card at the foot of the page, beside CareersScene.
   * Hard-coded in careers.astro until 2026-09-18, which broke #2 — a
   * non-developer could not have changed either line.
   */
  openTitle: 'Don’t see your role?',
  openBody:
    'Send us your CV and a short note on what you’d like to build. We keep good people in mind for upcoming projects.',
  applyEmail: 'contact@procedoinfo.com',
} as const;

/** Contact form delivery — Web3Forms key registered to contact@procedoinfo.com. */
export const contactForm = {
  web3formsKey: 'b77d414b-ffd4-41bc-bca6-de1996718a36',
  deliversTo: 'contact@procedoinfo.com',
} as const;

/* ==========================================================================
 *  Legal pages — real policy text carried over from the previous Procedo site.
 *
 *  ✅ SIGNED OFF BY PROCEDO'S LEGAL ADVISOR, 2026-09-22. All three pages carry
 *  that date. This was the last thing blocking launch, and it no longer is.
 *
 *  ── WHAT THE REVIEW CHANGED ────────────────────────────────────────────────
 *  One thing: the Privacy Policy's "send updates, marketing material, or
 *  newsletters (only with your consent)" was REMOVED on the advisor's
 *  instruction. See the note at that spot, which also says why reinstating it
 *  without building the mechanism would recreate the problem.
 *
 *  ── WHAT HAD ALREADY BEEN FIXED BEFORE THE REVIEW ──────────────────────────
 *  The Cookie Policy was rewritten on 2026-09-18. The old text was the previous
 *  React site's policy describing THAT site: it claimed Procedo used cookies to
 *  understand how you use the website, remember preferences and "provide
 *  relevant content or ads", and listed analytics and preference cookies as
 *  types in use. Measured in a real browser on the built output, this site sets
 *  none of them — document.cookie empty, no localStorage, no sessionStorage, no
 *  IndexedDB, not one third-party origin.
 *
 *  Its cookie claims now DERIVE from `analytics.provider` (see the block above
 *  that comment), so the page and the configuration cannot drift apart again.
 *
 *  ── WHAT STILL APPLIES ─────────────────────────────────────────────────────
 *  ⚠️ Keep the `updated` date current whenever the text changes, and send a
 *  material change back for re-approval. Sign-off covers what is written here
 *  today, not whatever it becomes.
 *
 *  ⚠️ SIGN-OFF DOES NOT MEAN THE PREVIEW CAN BE INDEXED. It removed ONE of the
 *  two reasons for `X-Robots-Tag: noindex` — the other stands: an indexed
 *  preview at procedoinfo-preview.pages.dev would compete with
 *  procedoinfo.com for Procedo's own terms. The noindex stays until the real
 *  domain is live. See the hosting section of CLAUDE.md.
 *
 *  ⚠️ IF `analytics.provider` BECOMES 'ga4', the Cookie Policy will correctly
 *  start saying the site sets cookies — and a site that sets analytics cookies
 *  needs a consent banner asking BEFORE the script loads. There is none. That
 *  would be a material change and would need re-approval.
 * ========================================================================== */

export interface LegalSection {
  heading: string;
  body?: string[];
  list?: string[];
  /** Definition-style list: bold term + explanation. */
  terms?: { term: string; body: string }[];
}
export interface LegalDoc {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  /** Closing line shown above the contact email. */
  contactLine: string;
}

export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  intro:
    'At Procedo Infosystems Pvt. Ltd. (“we”, “our”, or “us”), your privacy is one of our top priorities. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website and services.',
  updated: '22 September 2026',
  sections: [
    {
      heading: 'Information we collect',
      list: [
        'Personal details you voluntarily submit (such as name, email, phone number).',
        'Technical data like IP address, browser type, device type, and time of visit.',
        /* DRAFT 2026-09-18. Was: "Cookies and similar tracking technologies to
           improve your browsing experience." The site sets no cookies, so the
           bullet claimed a collection that does not happen. It is replaced
           rather than deleted because a reader scanning this list should find
           the cookie answer here, not only on another page. */
        'No cookies and nothing stored on your device — see our Cookie Policy.',
      ],
    },
    {
      heading: 'How we use your information',
      list: [
        'To provide and maintain our services.',
        'To respond to your inquiries or customer support requests.',
        /* A line was REMOVED here on 2026-09-22, on the legal advisor's
           instruction at sign-off:
             "To send updates, marketing material, or newsletters (only with
              your consent)."
           It was flagged for that review on 2026-09-18 and deliberately left
           alone until someone with the authority ruled on it. There is no
           newsletter, no mailing list and no mechanism on this site by which
           anyone could give the consent it referred to. The sentence was not
           false — it was conditional on a consent never sought — but it
           described a thing that does not exist, on a page whose entire job is
           to be true.

           DO NOT REINSTATE IT without building the mechanism first: a sign-up,
           a list, a provider, and a record of consent. Adding the sentence back
           on its own would re-create a promise the site cannot keep. */
        'To analyze usage trends and improve website performance.',
      ],
    },
    {
      heading: 'Data security',
      body: [
        'We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.',
      ],
    },
    {
      heading: 'Third-party services',
      body: [
        'We may integrate third-party services such as analytics providers and hosting platforms. These services may collect data independently in accordance with their own privacy policies.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'You have the right to access, update, or delete your personal information. If you would like to exercise any of these rights, please contact us using the information below.',
      ],
    },
    {
      heading: 'Cookies',
      /* DRAFT 2026-09-18. Was: "Our website may use cookies to remember
         preferences and collect analytics data. You can choose to disable
         cookies through your browser settings." Neither half was true of this
         site: it sets no cookies, so there is nothing to disable. */
      body: [
        'This site sets no cookies and stores nothing on your device. Our Cookie Policy explains that in full, including how traffic is measured instead.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may revise this Privacy Policy from time to time. Any changes take effect as soon as they are posted on this page, and the date above is updated accordingly.',
      ],
    },
  ],
  contactLine:
    'If you have any questions or concerns regarding this Privacy Policy, please reach out to us at:',
};

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  intro:
    'These Terms of Service govern your use of the website and services provided by Procedo Infosystems Pvt. Ltd. Please read them carefully before using our services.',
  updated: '22 September 2026',
  sections: [
    {
      heading: 'Acceptance of terms',
      body: [
        'By accessing our website or using our services, you agree to be bound by these Terms and our Privacy Policy.',
      ],
    },
    {
      heading: 'Use of services',
      body: [
        'You agree to use our services only for lawful purposes and in accordance with all applicable laws and regulations.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        'All content on our site, including text, graphics, logos, and software, is the property of Procedo Infosystems or its licensors and is protected by copyright and trademark laws.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        'We are not liable for any damages resulting from the use or inability to use our services, including indirect or consequential losses.',
      ],
    },
    {
      heading: 'Termination',
      body: [
        'We reserve the right to suspend or terminate your access to our services at any time, without prior notice, for any reason.',
      ],
    },
    {
      heading: 'Changes to terms',
      body: [
        'We may update these Terms from time to time. Any changes will be effective immediately upon posting on this page.',
      ],
    },
  ],
  contactLine: 'For any questions regarding these Terms, please contact us at:',
};

/**
 * ⚖️ DRAFT, 2026-09-18 — REWRITTEN, AND NOT YET SIGNED OFF.
 *
 * The previous text was the old React site's policy describing the old React
 * site. It said Procedo uses cookies to understand how you use the website,
 * remember your preferences and "provide relevant content or ads", and listed
 * analytics and preference cookies as types in use. None of that was true of
 * this site, on a page whose entire job is to be true, and a visitor could
 * disprove it in ten seconds with developer tools.
 *
 * Measured on the live site before this was written: no cookies, no
 * localStorage, no sessionStorage, no IndexedDB, and zero third-party origins.
 *
 * WHAT CHANGED IN SUBSTANCE, for the reviewer:
 *   · The answer to "do you use cookies" is now no, stated first and plainly.
 *   · The old "Types of cookies we use" section is gone — it listed three
 *     categories of cookie that do not exist.
 *   · "Managing cookies" is gone in the cookieless case. Telling someone how to
 *     block cookies you do not set is noise.
 *   · New: why there is no consent banner; how traffic is measured instead;
 *     what happens when the contact form is used; what we do if this changes.
 *   · The sections about analytics are DERIVED from `analytics.provider`, so
 *     the policy cannot go stale the way the old one did.
 *
 * `updated` is set to the date of this rewrite. RESET IT to the date of legal
 * sign-off when that happens, since that is the date that matters.
 */
export const cookiePolicy: LegalDoc = {
  title: 'Cookie Policy',
  intro:
    'This policy explains how Procedo Infosystems Pvt. Ltd. uses cookies and similar technologies on this website, and what that means for you.',
  updated: '22 September 2026',
  sections: [
    analyticsSetsCookies
      ? {
          heading: 'Does this website use cookies?',
          body: [
            `Yes. We use ${analyticsName} to measure how this site is used, and it sets cookies in your browser to do so.`,
            'Nothing else on this site sets cookies. We do not use cookies for advertising, and we do not sell or share what they record.',
          ],
        }
      : {
          heading: 'Does this website use cookies?',
          body: [
            'No. This site sets no cookies.',
            'It also stores nothing else on your device: no local storage, no session storage, no device fingerprinting. Nothing you do here is remembered between visits, because nothing here needs to be.',
          ],
        },
    {
      heading: 'What cookies are',
      body: [
        'Cookies are small text files a website asks your browser to keep, so that it can recognise your browser on a later request. They are how most sites keep you signed in, remember a language or a basket, or follow what you look at from page to page and from site to site.',
        'This site does none of those things, so it needs none of them.',
      ],
    },
    ...(analyticsSetsCookies
      ? [
          {
            heading: 'Managing cookies',
            body: [
              'You can set your browser to refuse cookies, or delete any it has already stored. Doing so will not stop this site working — nothing here depends on them.',
            ],
          },
        ]
      : [
          {
            heading: 'Why there is no consent banner',
            body: [
              'Consent banners exist because cookies and similar technologies generally need your permission before they are set. Nothing on this site needs that permission, so there is nothing to ask you for and no banner to dismiss.',
            ],
          },
        ]),
    ...(analyticsEnabled && !analyticsSetsCookies
      ? [
          {
            heading: 'How we measure traffic instead',
            body: [
              `We use ${analyticsName}, which is cookieless. It counts page views and records, in aggregate, the site that referred you, your country, your browser and device type, and how quickly pages loaded.`,
              'It sets nothing on your device, does not fingerprint your browser, and cannot follow you to other websites. We use it to see which pages are read and which are not. None of it identifies you.',
            ],
          },
        ]
      : []),
    {
      heading: 'When you send us a message',
      body: [
        'The contact form is delivered by Web3Forms, which passes your message to us by email. Nothing is sent until you press send, and the form sets no cookies.',
        'What happens to the details you send is covered by our Privacy Policy.',
      ],
    },
    {
      heading: 'If this ever changes',
      body: [
        'If we add anything that does set cookies, we will update this page before it goes live and, where the law requires it, ask for your consent first. The date above is when this page was last changed.',
      ],
    },
  ],
  contactLine: 'If you have any questions about this policy, please contact us at:',
};
