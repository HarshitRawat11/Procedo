// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// NOTE: `site` is the canonical production URL. It is used to generate
// absolute canonical tags, the sitemap, and Open Graph URLs. Change this
// if the site is deployed under a different domain.
export default defineConfig({
  site: 'https://www.procedoinfo.com',

  integrations: [
    // No MDX and no RSS: there is no blog and none is planned (Harshit,
    // 2026-09-10). Both packages were removed rather than left installed.
    // Auto-generates /sitemap-index.xml for SEO.
    //
    // The routes listed below are standalone concept and preview pages, none of
    // which may reach the sitemap. Most are PARKED: the file in src/pages/
    // carries a leading underscore, which Astro excludes from routing, so it is
    // not built at all. The exception as of 2026-09-13 is
    // /contact-animation-preview, which is live and reachable so Harshit can
    // replay the reception sequence without filing a real enquiry each time —
    // it is noindex and linked from nowhere, and this filter is what keeps it
    // out of the sitemap. Entries stay listed after a page is parked again, as
    // a safety net for whenever one is un-parked.
    sitemap({
      filter: (page) =>
        ![
          '/uptime',
          '/illustrations-preview',
          '/404-preview',
          '/careers-preview',
          '/home-preview',
          '/company-preview',
          '/contact-preview',
          '/contact-preview-b',
          '/contact-preview-c',
          '/hero-preview',
          '/services-preview',
          '/our-mission-preview',
          '/contact-animation-preview',
        ].some((p) => page.includes(p)),
    }),
    icon(), // build-time inlined Lucide icons (zero runtime JS)
  ],

  // Tailwind v4 is wired via PostCSS (see postcss.config.mjs) rather than the
  // @tailwindcss/vite plugin, which is incompatible with Astro 6's rolldown-Vite.

  // Astro optimizes images with sharp by default → WebP/AVIF, no layout shift.
  image: {
    responsiveStyles: true,
  },
});
