// One-off script to generate the OG image (1200x630) from an HTML template
// using Playwright/Chromium. Run with: node scripts/generate-og-image.mjs

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const photoPath = resolve(projectRoot, 'public/img/photo.jpg');
const outputPath = resolve(projectRoot, 'public/og-image.png');

// Read photo and inline as base64 so the template is self-contained
const photoBase64 = readFileSync(photoPath).toString('base64');
const photoDataUrl = `data:image/jpeg;base64,${photoBase64}`;

const html = `<!doctype html>
<html lang="pt">
<head>
<meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=Inter+Tight:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    background: #08080d;
    font-family: 'Inter Tight', sans-serif;
    color: #fff;
  }
  .frame {
    width: 1200px;
    height: 630px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    top: 20%;
    right: 25%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(30, 64, 175, 0.35) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  .photo-wrap {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .photo {
    position: absolute;
    inset: 0;
    background-image: url('${photoDataUrl}');
    background-size: cover;
    background-position: center top;
  }
  .photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 60%, rgba(8, 8, 13, 0.6));
  }
  .content {
    padding: 0 80px 0 60px;
    position: relative;
    z-index: 1;
  }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    color: #5582e8;
    letter-spacing: 4px;
    margin-bottom: 28px;
  }
  h1 {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-size: 96px;
    line-height: 0.95;
    letter-spacing: -3px;
    margin-bottom: 32px;
  }
  h1 em {
    color: #5582e8;
    font-style: normal;
    font-weight: 700;
  }
  .tagline {
    font-size: 22px;
    color: #bbbbbb;
    line-height: 1.4;
    margin-bottom: 56px;
    max-width: 600px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 80px;
  }
  .url {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #5582e8;
    letter-spacing: 1px;
    border: 1px solid #1e40af;
    padding: 10px 14px;
    white-space: nowrap;
  }
  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #555555;
    letter-spacing: 2px;
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="glow"></div>
    <div class="photo-wrap">
      <div class="photo"></div>
    </div>
    <div class="content">
      <div class="eyebrow">TECHNICAL ARCHITECT — AI INNOVATION</div>
      <h1>Rafael<br>Carrasco<em>.</em></h1>
      <p class="tagline">Engenheiro de software com foco em front-end, back-end e inteligência artificial aplicada.</p>
      <div class="footer">
        <div class="url">RAFAELCARRASCO-DEV.VERCEL.APP</div>
        <div class="tag">PORTFOLIO · 2026</div>
      </div>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2, // crisp output
});
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500); // wait for fonts to settle
await page.screenshot({
  path: outputPath,
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await browser.close();
console.log(`OG image generated at: ${outputPath}`);
