/*
 * Generates portfolio media for video items:
 *   - <slug>.vtt          captions, written from each item's `script` in content
 *   - <slug>-poster.webp  poster, rendered from the item's SVG art
 *   - <slug>.mp4          15-second placeholder video (only when `media.placeholder`)
 *
 * Usage (with the site running, e.g. `npm run build && npm start`):
 *   npm run media:portfolio            # BASE_URL defaults to http://localhost:3000
 *
 * Replace a placeholder by dropping the real .mp4 (and its .vtt) into
 * public/media/portfolio/ and setting `placeholder: false` in content.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { portfolioItems } from "@/content/portfolio-items";
import { toVtt } from "@/lib/portfolio";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = new URL("../public/media/portfolio/", import.meta.url).pathname;
const tmp = new URL("../.media-tmp/", import.meta.url).pathname;
mkdirSync(out, { recursive: true });
mkdirSync(tmp, { recursive: true });

const videos = portfolioItems.flatMap((item) => (item.type === "video" ? [item] : []));

for (const item of videos) {
  writeFileSync(`${out}${item.slug}.vtt`, toVtt(item.script) + "\n");
}

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

// 1. Read the static (no-JS) markup for each item's art from the live page.
const source = await browser.newPage({ javaScriptEnabled: false });
await source.goto(base + "/", { waitUntil: "load" });
const head = await source.evaluate(() =>
  [...document.querySelectorAll('link[rel="stylesheet"], style')].map((n) => n.outerHTML).join("\n"),
);
const htmlRoot = await source.evaluate(() => document.documentElement.className);
const markup: Record<string, string> = {};
for (const item of videos) {
  markup[item.slug] = await source
    .locator(`#portfolio [data-art-slug="${item.slug}"]`)
    .first()
    .evaluate((el) => el.outerHTML);
}
await source.close();

// 2. Render each one alone in a 180 × 320 frame at 6× → 1080 × 1920.
const page = await browser.newPage({ viewport: { width: 180, height: 320 }, deviceScaleFactor: 6 });
const slate = `<div style="position:absolute;inset:20% 8% auto 8%;padding:6px 8px;background:#111816;color:#f5f1e8;
  font:600 9px/1.35 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;text-align:center;
  box-shadow:inset 0 0 0 1px #e0552d">Placeholder video · final file to be supplied</div>`;

// Final animation states only; the placeholder video drops the burned-in
// caption because the .vtt track supplies captions during playback.
async function render(html: string, path: string, { hideCaption = false } = {}) {
  await page.setContent(
    `<!doctype html><html class="${htmlRoot}"><head><base href="${base}/">${head}
     <style>body{margin:0;background:#1b2421}[data-art-slug]{width:180px!important;border-radius:0!important}
       *{animation:none!important;transition:none!important}${hideCaption ? "[data-caption]{display:none}" : ""}</style>
     </head><body>${html}</body></html>`,
    { waitUntil: "load" },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, clip: { x: 0, y: 0, width: 180, height: 320 } });
}

for (const item of videos) {
  await render(markup[item.slug], `${tmp}${item.slug}.png`);
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    `${tmp}${item.slug}.png`,
    "-quality",
    "82",
    `${out}${item.slug}-poster.webp`,
  ]);

  if (item.media.placeholder) {
    await render(markup[item.slug].replace(/<\/div>$/, `${slate}</div>`), `${tmp}${item.slug}-slate.png`, {
      hideCaption: true,
    });
    execFileSync("ffmpeg", [
      "-y",
      "-loglevel",
      "error",
      "-loop",
      "1",
      "-framerate",
      "12",
      "-i",
      `${tmp}${item.slug}-slate.png`,
      "-t",
      "15",
      "-vf",
      "scale=540:960,format=yuv420p",
      "-c:v",
      "libx264",
      "-tune",
      "stillimage",
      "-preset",
      "medium",
      "-crf",
      "30",
      "-movflags",
      "+faststart",
      `${out}${item.slug}.mp4`,
    ]);
  }
  console.log("✓", item.slug);
}

await browser.close();
rmSync(tmp, { recursive: true, force: true });
