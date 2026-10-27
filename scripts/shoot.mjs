// Quick screenshot helper: node scripts/shoot.mjs <url> <out-dir> [widths...]
import { chromium } from "playwright";
const [url = "http://localhost:3100/", out = "screenshots", ...w] = process.argv.slice(2);
const widths = w.length ? w.map(Number) : [375, 1440];
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 812 : 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // content-visibility: auto skips painting off-screen chapters, which a
  // full-page capture would show as blank bands.
  await page.addStyleTag({ content: ".chapter[data-defer]{content-visibility:visible!important}" });
  const name = new URL(url).pathname.replace(/\//g, "_") || "_";
  await page.screenshot({ path: `${out}/${name}-${width}-fold.png` });
  await page.screenshot({ path: `${out}/${name}-${width}-full.png`, fullPage: true });
  await page.close();
}
await browser.close();
