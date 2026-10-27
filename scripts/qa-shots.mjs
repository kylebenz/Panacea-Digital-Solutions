// Phase 8 visual QA: full-page and per-chapter screenshots at 375, 768, 1280,
// and 1440px, plus the legal pages and the 404.
//   node scripts/qa-shots.mjs [baseUrl] [outDir]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "screenshots/phase-8";
const widths = [375, 768, 1280, 1440];
const chapters = [
  "top",
  "why",
  "services",
  "ad-videos",
  "infographics",
  "demo",
  "process",
  "portfolio",
  "who-we-help",
  "pricing",
  "about",
  "faq",
  "contact",
];
// Render deferred chapters and finish entrance reveals so nothing is captured mid-wipe.
const settle =
  ".chapter[data-defer]{content-visibility:visible!important}.reveal-wipe,.reveal-mask,.anim-wipe{animation:none!important}";

mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

for (const width of widths) {
  // Reduced motion gives the hero its static final frame, so shots are stable.
  const context = await browser.newContext({
    viewport: { width, height: width < 800 ? 812 : 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Approach every chapter so each island hydrates.
  for (const id of chapters) {
    for (let i = 0; i < 3; i++) {
      await page.evaluate((t) => document.getElementById(t).scrollIntoView({ behavior: "instant" }), id);
      await page.waitForTimeout(120);
    }
  }
  await page.waitForLoadState("networkidle");
  await page.addStyleTag({ content: settle });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/${width}-home-full.png`, fullPage: true });
  for (const [i, id] of chapters.entries()) {
    await page.locator(`#${id}`).screenshot({ path: `${out}/${width}-ch${String(i).padStart(2, "0")}-${id}.png` });
  }
  await page
    .locator("footer")
    .last()
    .screenshot({ path: `${out}/${width}-footer.png` });

  for (const path of ["/privacy/", "/terms/", "/no-such-page/"]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    const name = path.replaceAll("/", "") || "home";
    await page.screenshot({ path: `${out}/${width}-${name}-full.png`, fullPage: true });
  }
  await context.close();
  console.log(`${width}px done`);
}
await browser.close();
