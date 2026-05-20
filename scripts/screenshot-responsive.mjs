// One-off responsive audit: visit / and /en/ at multiple breakpoints, save screenshots.
// Usage: start dev server (npm run dev) then `node scripts/screenshot-responsive.mjs`
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BREAKPOINTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 800 },
  { name: '768', width: 768, height: 1024 },
  { name: '414', width: 414, height: 896 },
  { name: '375', width: 375, height: 812 },
];

const ROUTES = [
  { name: 'pt', url: 'http://localhost:4321/' },
  { name: 'en', url: 'http://localhost:4321/en/' },
];

const OUT_DIR = resolve(process.cwd(), 'tmp-screenshots');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const route of ROUTES) {
    for (const bp of BREAKPOINTS) {
      const ctx = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      const page = await ctx.newPage();
      await page.goto(route.url, { waitUntil: 'networkidle' });
      // Disable any GSAP/Lenis transitions for cleaner shots
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
      });
      const file = resolve(OUT_DIR, `${route.name}-${bp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('saved', file);
      await ctx.close();
    }
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
