// Utility: convert a certificate PDF to optimized JPG for use in the cert modal.
//
// Usage:
//   node scripts/pdf-to-cert-image.mjs <input.pdf> <output-slug>
//
// Example:
//   node scripts/pdf-to-cert-image.mjs ~/Downloads/anthropic-claude.pdf anthropic-claude
//
// Output: public/img/certs/<output-slug>.jpg (1400px max width, JPEG q90)
//
// Don't forget to also reference the image in src/content/certificates/{pt,en}/<slug>.md:
//   image: '/img/certs/<output-slug>.jpg'

import { pdf } from 'pdf-to-img';
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync, unlinkSync, existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const [, , input, slug] = process.argv;
if (!input || !slug) {
  console.error('Usage: node scripts/pdf-to-cert-image.mjs <input.pdf> <output-slug>');
  process.exit(1);
}

const inputAbs = resolve(input);
if (!existsSync(inputAbs)) {
  console.error(`Input not found: ${inputAbs}`);
  process.exit(1);
}

const outputAbs = resolve(projectRoot, `public/img/certs/${slug}.jpg`);
const tempPng = resolve(projectRoot, `__temp-${slug}.png`);

console.log(`Converting ${inputAbs} → ${outputAbs}`);

// Step 1: PDF → PNG via pdf-to-img (uses pdfjs-dist + @napi-rs/canvas)
const document = await pdf(inputAbs, { scale: 2 });
let page1;
for await (const buf of document) {
  page1 = buf;
  break;
}
writeFileSync(tempPng, page1);

// Step 2: PNG → optimized JPEG via sharp
const info = await sharp(tempPng)
  .resize({ width: 1400, withoutEnlargement: true })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(outputAbs);

unlinkSync(tempPng);

console.log(`Done: ${info.width}x${info.height} · ${(info.size / 1024).toFixed(1)} KB`);
console.log(`\nNext step: add to src/content/certificates/{pt,en}/${slug}.md frontmatter:`);
console.log(`  image: '/img/certs/${slug}.jpg'`);
