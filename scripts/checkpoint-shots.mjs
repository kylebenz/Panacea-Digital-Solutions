// Captures the Checkpoint 2 set: node scripts/checkpoint-shots.mjs [baseUrl] [outDir]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "screenshots/checkpoint-2";
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const showDeferred =
  ".chapter[data-defer]{content-visibility:visible!important}.reveal-wipe,.reveal-mask{animation:none!important}";

async function open(width, path = "/") {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 812 : 900 }, deviceScaleFactor: 2 });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

for (const width of [375, 1440]) {
  // Home: first viewport and full page.
  let page = await open(width);
  await page.screenshot({ path: `${out}/home-${width}-01-fold.png` });
  await page.addStyleTag({ content: showDeferred });
  await page.screenshot({ path: `${out}/home-${width}-02-full.png`, fullPage: true });
  await page.close();

  // Mid-page: condensed header, scrollspy, rail playhead / mobile chapter label + CTA bar.
  page = await open(width);
  await page
    .locator('a[href="/#pricing"]')
    .first()
    .evaluate((a) => a.click());
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${out}/home-${width}-03-at-pricing.png` });
  if (width >= 1024) {
    await page.getByRole("navigation", { name: "Page chapters" }).locator('a[href="/#ad-videos"]').hover();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/home-${width}-04-rail-tooltip.png` });
  } else {
    // Real pointer click: locator.click() scrolls the sticky trigger "into view" first.
    const box = await page.getByRole("button", { name: "Menu" }).boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/home-${width}-04-mobile-menu.png` });
  }
  await page.close();

  // Style guide.
  page = await open(width, "/styleguide/");
  await page.screenshot({ path: `${out}/styleguide-${width}-full.png`, fullPage: true });
  await page.close();
}
await browser.close();
