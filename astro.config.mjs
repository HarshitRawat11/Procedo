// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// NOTE: `site` is the canonical production URL. It is used to generate
// absolute canonical tags, the sitemap, and Open Graph URLs. Change this
// if the site is deployed under a different domain.
export default defineConfig({
  site: 'https://www.procedoinfo.com',

  integrations: [
    mdx(), // Markdown + components for blog posts
    // Auto-generates /sitemap-index.xml for SEO. `/quiet` is a standalone
    // concept page, not part of the site, so it is kept out of the sitemap
    // (it is also marked noindex and linked from nowhere).
    sitemap({
      filter: (page) =>
        !['/quiet', '/uptime', '/our-mission-preview', '/illustrations-preview'].some((p) =>
          page.includes(p),
        ),
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
