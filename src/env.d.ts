/// <reference types="astro/client" />

// Fontsource packages ship CSS only (no type declarations).
// These ambient declarations satisfy the side-effect imports in BaseLayout.astro.
declare module '@fontsource-variable/inter';
declare module '@fontsource/ibm-plex-mono/*';
