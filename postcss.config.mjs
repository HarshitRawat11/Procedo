// Tailwind v4 via PostCSS. We use the PostCSS plugin (not @tailwindcss/vite)
// because Astro 6 bundles a rolldown-based Vite whose native resolver is
// incompatible with the Tailwind Vite plugin's build step. PostCSS runs in
// Vite's standard CSS pipeline and works reliably.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
