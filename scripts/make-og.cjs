// One-off: build the 1200x630 Open Graph share image from the real logo +
// tagline on the cream brand background. Run: node scripts/make-og.cjs
const sharp = require('sharp');

const W = 1200;
const H = 630;

const textSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="80" y="300" width="48" height="4" fill="#F24E1E"/>
  <text x="80" y="334" font-family="IBM Plex Mono, monospace" font-size="22" letter-spacing="4" fill="#334a73">INTELLIGENT SYSTEMS INTEGRATION</text>
  <text x="78" y="408" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="54" fill="#0F172A">Designing intelligent systems</text>
  <text x="78" y="476" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="54" fill="#0F172A">that empower businesses to focus</text>
  <text x="78" y="544" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="54" fill="#0F172A">on <tspan fill="#F24E1E">what matters</tspan>.</text>
  <text x="1120" y="566" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="22" fill="#64748b">procedoinfo.com</text>
</svg>`;

(async () => {
  const logo = await sharp('public/assets/procedo-logo.png').resize({ width: 460 }).toBuffer();
  await sharp({
    create: { width: W, height: H, channels: 4, background: '#FBFAF8' },
  })
    .composite([
      { input: Buffer.from(textSvg), top: 0, left: 0 },
      { input: logo, top: 92, left: 80 },
    ])
    .png()
    .toFile('public/og-default.png');
  console.log('wrote public/og-default.png');
})();
