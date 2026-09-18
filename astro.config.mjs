// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// NOTE: `site` is the canonical production URL. It is used to generate
// absolute canonical tags, the sitemap, and Open Graph URLs. Change this
// if the site is deployed under a different domain.
export default defineConfig({
  site: 'https://www.procedoinfo.com',

  /*
   * NO `security.csp` HERE, and this is a measured conclusion rather than an
   * oversight. Astro 6.4.6 has a built-in CSP; it was enabled, tested, and
   * removed, because a hash-locked policy and this site's ClientRouter cannot
   * both work. Two hard blocks, both found by walking the nav in a browser with
   * a `securitypolicyviolation` listener running — neither shows up on a cold
   * page load, which is why a CSP written and shipped without that test would
   * have broken the site silently for visitors:
   *
   *  1. THE ROUTER'S OWN SCRIPTS. To stop an already-executed script running
   *     again after a swap, Astro's ClientRouter replaces its src with an empty
   *     `data:application/javascript,` URL. A hash-locked script-src blocks it:
   *
   *         Loading the script 'data:application/javascript,' violates the
   *         following Content Security Policy directive: "script-src 'self' ..."
   *
   *     `scriptDirective.strictDynamic: true` does NOT rescue it, and that was
   *     verified rather than assumed: strict-dynamic deliberately refuses
   *     `data:`, `blob:` and `filesystem:` script URLs, because those are the
   *     bypass it exists to prevent. The only ways through are allowing `data:`
   *     in script-src — a well-known bypass, so worse than no CSP at all — or
   *     dropping view transitions.
   *
   *  2. INLINE STYLE ATTRIBUTES. 64 elements carry style="--reveal-delay:Nms",
   *     which sets the scroll-reveal stagger per element. Astro's styleDirective
   *     always appends hashes, and per spec a hash in the source list makes
   *     'unsafe-inline' be IGNORED, so every one of them is blocked — 156
   *     violations on a five-page walk. `style-src-attr 'unsafe-inline'` would
   *     allow exactly those and nothing else, but Astro's config rejects any
   *     directive beginning `style-src`, so it cannot be expressed.
   *
   * What ships instead is a hand-written policy in public/_headers that keeps
   * every directive which genuinely constrains this site and drops the two that
   * cannot work. It needs no build step precisely because it carries no hashes.
   * See that file for what it does and does not buy.
   *
   * TO REVISIT THIS: if Astro stops using `data:` to neuter scripts, or exposes
   * style-src-attr, most of the above lifts. The remaining work would be turning
   * those 64 inline style attributes into utility classes — six distinct delay
   * values across about twenty call sites.
   */

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
