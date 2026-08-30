// One-off: crop just the hexagon "P" mark from the full logo into a square
// transparent favicon. Run with: node scripts/crop-favicon.cjs
const sharp = require('sharp');
const src = 'public/assets/procedo-logo.png';
(async () => {
  const meta = await sharp(src).metadata();
  console.log('source', meta.width + 'x' + meta.height);
  await sharp(src)
    .extract({ left: 8, top: 10, width: 232, height: 298 })
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon.png');
  console.log('wrote public/favicon.png');
})();
