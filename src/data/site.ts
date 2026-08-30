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
  description:
    'Procedo Infosystems is an infrastructure-first technology firm delivering integrated IT infrastructure, facilities security, AV conferencing, telecom and power & precision systems for enterprises.',
} as const;

/** Contact details. */
export const contact = {
  /** General enquiries — also where the contact form is delivered. */
  email: 'contact@procedoinfo.com',
  /** Sales enquiries. */
  salesEmail: 'sales@procedoinfo.com',
  phone: '+91 9958896172',
  /** Registered office. Leave empty to hide the Contact address card entirely. */
  address: '324 Guru Ram Das Nagar, Laxmi Nagar, Delhi – 110092',
} as const;

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

/** Section intro shared by the Home competencies preview and the Services page. */
export const competenciesIntro = {
  eyebrow: 'Our core competencies',
  title: 'Comprehensive technology, engineered as one system',
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
  quote: string;
}

/** The five core competencies (real Procedo content). */
export const competencies: Competency[] = [
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
        items: ['LAN/WAN design & deployment', 'Enterprise & mesh Wi-Fi', 'VPN, firewall, SD-WAN'],
      },
      {
        name: 'Server & Storage',
        items: [
          'On-prem + cloud (AWS / Azure / GCP)',
          'Virtualization (VMware / Proxmox / Hyper-V)',
          'NAS / SAN with redundancy',
        ],
      },
      {
        name: 'Endpoint & Access Security',
        items: ['SSO, LDAP, Azure AD', 'Role-based access control', 'Patch & asset management'],
      },
      {
        name: 'Continuity & Recovery',
        items: ['Backup (cloud / local / hybrid)', 'Disaster recovery', 'Monitoring & failover'],
      },
    ],
    quote: "We don't just install servers. We build systems that carry your ambitions.",
  },
  {
    slug: 'facilities-security',
    title: 'Facilities Security',
    icon: 'lucide:shield-check',
    tagline: 'Smart environments that sense, protect, and evolve.',
    intro:
      'Security should be invisible until you need it. We integrate surveillance, access control and building management into one coherent, monitored system.',
    groups: [
      {
        name: 'Surveillance',
        items: ['IP CCTV (PTZ / fisheye / thermal)', 'VMS + cloud archiving'],
      },
      {
        name: 'Access Control',
        items: [
          'Biometrics (fingerprint / facial)',
          'RFID / NFC / mobile credentials',
          'Zonal control & visitor workflows',
        ],
      },
      {
        name: 'Building Management Systems',
        items: ['HVAC, fire alarm, lighting automation', 'Central energy & environment dashboard'],
      },
      {
        name: 'Monitoring & Reporting',
        items: ['Real-time dashboards', 'Remote diagnostics & alerts', 'Compliance-ready audit trails'],
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
        items: ['Sightline & acoustic optimization', 'Lighting for engagement', 'Noise control'],
      },
      {
        name: 'Platform Integration',
        items: ['Zoom, Teams, Webex', 'AV control (Crestron, Extron)', 'BYOD & calendar sync'],
      },
      {
        name: 'Hardware Setup',
        items: ['PTZ cameras, ceiling mics, smart displays', 'Wireless presentation', 'Voice tracking'],
      },
    ],
    quote: "A great conversation shouldn't depend on your geography.",
  },
  {
    slug: 'telecom',
    title: 'Telecom Infrastructure',
    icon: 'lucide:radio-tower',
    tagline: 'Smart, scalable communication systems for modern enterprises.',
    intro:
      'Voice remains the backbone of enterprise communication. We design and maintain IP telephony that spans every branch, desk and remote worker.',
    groups: [
      {
        name: 'Voice Systems',
        items: [
          'IP EPABX (IVR, voicemail, call forwarding, routing)',
          'IP phones & SIP terminals (HD voice, remote provisioning)',
        ],
      },
      {
        name: 'Cabling & Racks',
        items: ['Structured cabling (CAT6 / Fiber)', 'Telecom rack setup (EPABX, switches, routers, backup)'],
      },
      {
        name: 'Integration & Support',
        items: [
          'LAN/WAN voice integration (VoIP, multi-branch)',
          'Ongoing support, troubleshooting & upgrades',
        ],
      },
    ],
    quote: 'Communication is the backbone of every modern business—make yours future-ready.',
  },
  {
    slug: 'power-precision',
    title: 'Power & Precision Systems',
    icon: 'lucide:zap',
    tagline: 'UPS • Cooling • Racks — scalable infrastructure for uptime and control.',
    intro:
      'Uptime is engineered, not hoped for. We build the power, cooling and rack layer that keeps critical infrastructure running through anything.',
    groups: [
      {
        name: 'UPS & Power',
        items: [
          'Online / modular UPS, battery banks',
          'Intelligent PDUs, surge protection, dual-feed failover',
          'Generator integration & AMC',
        ],
      },
      {
        name: 'Cooling',
        items: [
          'Rack- and room-level cooling',
          'N+1 / 2N redundancy',
          'Temp / humidity monitoring & HVAC integration',
        ],
      },
      {
        name: 'Smart Racks',
        items: [
          'High-density enclosures with airflow optimization and cable management',
          'Structured patching, secure access, and modular layout',
          'Integrated UPS, cooling, PDUs and sensors with real-time dashboards and remote control',
        ],
      },
    ],
    quote: 'Power without precision is chaos. Precision without power is limitation. We deliver both.',
  },
];

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
        { label: 'IT Infrastructure', href: '/services#it-infrastructure' },
        { label: 'Facilities Security', href: '/services#facilities-security' },
        { label: 'AV Conferencing', href: '/services#av-conferencing' },
        { label: 'Telecom Infrastructure', href: '/services#telecom' },
        { label: 'Power & Precision', href: '/services#power-precision' },
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
  valuesIntro: 'The principles that guide every solution we deliver and every partnership we build.',
  values: [
    {
      icon: 'lucide:lock',
      title: 'Security First',
      body: 'We prioritize the protection of your critical infrastructure and data above all else.',
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
    statement:
      'To be a leading provider of integrated infrastructure and facility security solutions that enable efficient, secure, and collaborative environments across industries.',
    listTitle: 'Key Focus Areas',
    items: ['Industry Leadership', 'Integrated Solutions', 'Cross-Industry Impact'],
  },
  purpose: {
    statement:
      'Deliver innovative, modular services in IT, facilities security, and audio-visual systems, with an emphasis on scalability, compliance, and reliability. We align advanced technology with operational clarity, helping businesses safeguard what matters while empowering seamless interaction.',
    listTitle: 'Service Pillars',
    items: [
      'IT Infrastructure',
      'Facilities Security',
      'Audio & Video Conferencing',
      'Telecom Infrastructure',
      'Power & Precision Systems',
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
  applyEmail: 'contact@procedoinfo.com',
} as const;

/** Contact form delivery — Web3Forms key registered to contact@procedoinfo.com. */
export const contactForm = {
  web3formsKey: 'b77d414b-ffd4-41bc-bca6-de1996718a36',
  deliversTo: 'contact@procedoinfo.com',
} as const;

/* ==========================================================================
 *  Legal pages — real policy text carried over from the previous Procedo site.
 *  ⚠️ Have these reviewed by your legal advisor before go-live, and keep the
 *  `updated` date current whenever you change the text.
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
  updated: '27 August 2026',
  sections: [
    {
      heading: 'Information we collect',
      list: [
        'Personal details you voluntarily submit (such as name, email, phone number).',
        'Technical data like IP address, browser type, device type, and time of visit.',
        'Cookies and similar tracking technologies to improve your browsing experience.',
      ],
    },
    {
      heading: 'How we use your information',
      list: [
        'To provide and maintain our services.',
        'To respond to your inquiries or customer support requests.',
        'To send updates, marketing material, or newsletters (only with your consent).',
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
      body: [
        'Our website may use cookies to remember preferences and collect analytics data. You can choose to disable cookies through your browser settings — see our Cookie Policy for details.',
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
  updated: '27 August 2026',
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

export const cookiePolicy: LegalDoc = {
  title: 'Cookie Policy',
  intro:
    'This Cookie Policy explains how Procedo Infosystems Pvt. Ltd. uses cookies and similar technologies to enhance your experience on our website.',
  updated: '27 August 2026',
  sections: [
    {
      heading: 'What are cookies?',
      body: [
        'Cookies are small text files stored on your device to collect standard internet log information and visitor behavior information.',
      ],
    },
    {
      heading: 'How we use cookies',
      body: ['We use cookies to:'],
      list: [
        'Understand how you use our website',
        'Improve site functionality and performance',
        'Remember your preferences',
        'Provide relevant content or ads',
      ],
    },
    {
      heading: 'Types of cookies we use',
      terms: [
        { term: 'Essential cookies', body: 'Required for the website to function correctly.' },
        { term: 'Analytics cookies', body: 'Help us analyze site usage and performance.' },
        { term: 'Preference cookies', body: 'Remember your settings and preferences.' },
      ],
    },
    {
      heading: 'Managing cookies',
      body: [
        'You can set your browser to not accept cookies or delete them manually. However, some features of our site may not function properly without cookies.',
      ],
    },
    {
      heading: 'Updates to this policy',
      body: [
        'We may update this Cookie Policy occasionally. Please review it regularly to stay informed.',
      ],
    },
  ],
  contactLine: 'For more information about our use of cookies, reach out to us at:',
};
