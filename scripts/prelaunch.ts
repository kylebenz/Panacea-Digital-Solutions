/*
 * npm run prelaunch — launch gate (brief Phase 7).
 *
 * Builds nothing itself: `npm run prelaunch` runs `next build` first, then
 * this script starts the production server, loads every public route with
 * JavaScript disabled (the server-rendered HTML a crawler sees), and checks:
 *
 * Hard failures
 *   - any "[VERIFY" in rendered output
 *   - an invalid or incomplete promo object (and the rest of site.config)
 *   - a client portfolio item without written permission on file
 *   - more or fewer than one H1 on any route
 *   - duplicate or missing chapter ids, or chapters out of config order
 *   - any in-page nav, rail, or CTA link that doesn't resolve to an element
 *   - leftover build slates, banned hype words, exclamation marks in
 *     headings, emoji, web design offered as a service
 *   - metadata: title/description/canonical, and structured data that is
 *     invalid JSON or uses Review / AggregateRating / LocalBusiness
 *
 * Warnings
 *   - claims linter: guarantee, viral, #1, best, cure, treat, results,
 *     proven — the guide's own disclaimer sentences are allowlisted.
 *
 * Exit code 1 when any hard failure remains. PRELAUNCH_ALLOW_VERIFY=1 lists
 * [VERIFY] items as warnings instead (useful while content is still open).
 */
import { spawn } from "node:child_process";
import { chromium, type Page } from "playwright";
import { siteConfigSchema } from "@/lib/config-schema";
import { siteConfig } from "@/site.config";
import { portfolioItems } from "@/content/portfolio-items";
import { seo } from "@/content/seo";

const failures: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);
const allowVerify = process.env.PRELAUNCH_ALLOW_VERIFY === "1";

// ---------------------------------------------------------------- config
const parsed = siteConfigSchema.safeParse(siteConfig);
if (!parsed.success) {
  for (const issue of parsed.error.issues) fail(`site.config: ${issue.path.join(".")}: ${issue.message}`);
}
const promo = siteConfig.promo as {
  enabled: boolean;
  regularPrices: unknown;
  startDate: unknown;
  endDate: unknown;
  terms: unknown;
};
if (promo.enabled && [promo.regularPrices, promo.startDate, promo.endDate, promo.terms].some((v) => v == null)) {
  fail("Promo is enabled but regular prices, dates, or terms are missing.");
}
for (const item of portfolioItems as Array<{
  slug: string;
  status: string;
  permission?: { onFile?: boolean; clientName?: string; approvedAt?: string };
}>) {
  if (
    item.status === "client" &&
    !(item.permission?.onFile && item.permission.clientName && item.permission.approvedAt)
  ) {
    fail(`Portfolio item "${item.slug}" is client work without written permission on file.`);
  }
}

// ---------------------------------------------------------------- server
const port = Number(process.env.PRELAUNCH_PORT ?? 3210);
const base = process.env.BASE_URL ?? `http://localhost:${port}`;
let server: ReturnType<typeof spawn> | null = null;

async function waitFor(url: string, ms = 30_000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url);
      if (r.status < 500) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not start at ${url}`);
}

if (!process.env.BASE_URL) {
  // Refuse to test whatever else is listening (it would be a stale build).
  const busy = await fetch(base + "/").then(
    () => true,
    () => false,
  );
  if (busy) {
    console.error(`Port ${port} is already in use. Stop that server or set PRELAUNCH_PORT.`);
    process.exit(1);
  }
  // Run next directly in its own process group so the whole tree is stopped afterwards.
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
    stdio: "ignore",
    detached: true,
    env: { ...process.env, FORM_WEBHOOK_URL: process.env.FORM_WEBHOOK_URL ?? "dry-run" },
  });
  await waitFor(base + "/");
}

function stopServer() {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      /* already stopped */
    }
  }
}

// ---------------------------------------------------------------- pages
const routes = ["/", "/privacy/", "/terms/"];
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const context = await browser.newContext({ javaScriptEnabled: false });

const hype =
  /\b(revolutioni[sz]e\w*|unlock\w*|elevate\w*|supercharg\w*|game-changing|cutting-edge|seamless\w*|world-class|skyrocket\w*)\b/i;
const claims =
  /(\bguarantee[sd]?\b|\bviral\w*|#1\b|\bbest\b|\bcures?\b|\btreat(s|ed|ing|ment|ments)?\b|\bresults?\b|\bproven\b)/gi;
// Pictographs, excluding typographic symbols like © ® ™.
const emoji = /(?![©®™])\p{Extended_Pictographic}/u;
// The guide's own disclaimer sentences (guide §6, §10, §12).
const allowlist = [
  "We do not guarantee virality, reach, leads, appointments, sales, or other business outcomes.",
  "Do you guarantee virality or leads?",
  "No. We do not guarantee virality, reach, leads, appointments, sales, or other business outcomes.",
  "Results depend on many factors, including the offer, audience, distribution, and campaign strategy.",
  // Labels and outline items that restate the same disclaimer.
  "Limitations: no guaranteed outcomes",
  "No guarantees",
];

async function checkPage(page: Page, route: string) {
  const res = await page.goto(base + route, { waitUntil: "load" });
  if (!res || res.status() !== 200) {
    fail(`${route}: HTTP ${res?.status()}`);
    return;
  }

  const data = await page.evaluate(() => {
    // textContent, not innerText: chapters using content-visibility: auto are
    // skipped by innerText until rendered. Block boundaries become spaces.
    const clone = document.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, noscript").forEach((n) => n.remove());
    clone.querySelectorAll("p, li, h1, h2, h3, h4, dt, dd, div, a, button, label, span").forEach((n) => n.append(" "));
    const text = (clone.textContent ?? "").replace(/\s+/g, " ");
    const html = document.documentElement.outerHTML;
    const h1 = document.querySelectorAll("h1").length;
    const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.textContent ?? "");
    const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
    const chapters = [...document.querySelectorAll("[data-chapter]")].map((e) => e.id);
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")!);
    const slates = document.querySelectorAll("[data-phase-slate]").length;
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent ?? "");
    return { text, html, h1, headings, ids, chapters, links, slates, title, description, canonical, jsonld };
  });

  // [VERIFY]
  const verifies = [...new Set(data.text.match(/\[VERIFY[^\]]*\]/g) ?? [])];
  for (const v of verifies) (allowVerify ? warn : fail)(`${route}: ${v}`);

  // Headings and structure
  if (data.h1 !== 1) fail(`${route}: expected exactly one <h1>, found ${data.h1}.`);
  for (const h of data.headings) if (h.includes("!")) fail(`${route}: exclamation mark in heading "${h.trim()}".`);
  if (data.slates) fail(`${route}: ${data.slates} build slate(s) still on the page.`);

  // Copy guardrails
  const hypeHit = data.text.match(hype);
  if (hypeHit) fail(`${route}: banned hype word "${hypeHit[0]}".`);
  const emojiHit = data.text.match(emoji);
  if (emojiHit) fail(`${route}: emoji "${emojiHit[0]}" in copy.`);
  if (/\bweb(site)?\s+design\b/i.test(data.text))
    fail(`${route}: "web design" appears in copy (not a Panacea service).`);
  if (/web\s*design/i.test(data.jsonld.join(" "))) fail(`${route}: "web design" appears in structured data.`);

  // Claims linter (warnings)
  let scrubbed = data.text;
  for (const sentence of allowlist) scrubbed = scrubbed.split(sentence).join(" ");
  for (const m of scrubbed.matchAll(claims)) {
    const i = m.index ?? 0;
    const context = scrubbed
      .slice(Math.max(0, i - 50), i + 50)
      .replace(/\s+/g, " ")
      .trim();
    warn(`${route}: claims linter "${m[0]}": …${context}…`);
  }

  // In-page links resolve
  const ids = new Set(data.ids);
  for (const href of data.links) {
    const url = new URL(href, base + route);
    if (url.origin !== new URL(base).origin || !url.hash) continue;
    const target = decodeURIComponent(url.hash.slice(1));
    if (url.pathname === route || (route === "/" && url.pathname === "/")) {
      if (!ids.has(target)) fail(`${route}: link "${href}" points to #${target}, which doesn't exist.`);
    }
  }

  // Metadata
  if (route === "/") {
    if (data.title !== seo.title) fail(`/: title is "${data.title}", expected "${seo.title}".`);
    if (data.description !== seo.description) fail("/: meta description doesn't match the guide.");
    if (!data.canonical) fail("/: missing canonical link.");

    // Chapters: every config chapter once, in order
    const expected = siteConfig.chapters.map((c) => c.id);
    for (const id of expected) {
      const count = data.ids.filter((x) => x === id).length;
      if (count !== 1) fail(`/: chapter id "${id}" appears ${count} times.`);
    }
    if (data.chapters.join(",") !== expected.join(",")) {
      fail(`/: chapter order on the page (${data.chapters.join(", ")}) doesn't match site.config.ts.`);
    }

    // Structured data
    if (!data.jsonld.length) fail("/: no JSON-LD found.");
    for (const block of data.jsonld) {
      try {
        JSON.parse(block);
      } catch {
        fail("/: JSON-LD block is not valid JSON.");
      }
      for (const banned of ["Review", "AggregateRating", "LocalBusiness"]) {
        if (new RegExp(`"@type"\\s*:\\s*"${banned}"`).test(block)) fail(`/: structured data uses ${banned}.`);
      }
    }
  } else if (!data.canonical) {
    fail(`${route}: missing canonical link.`);
  }
}

try {
  const page = await context.newPage();
  for (const route of routes) await checkPage(page, route);

  // Robots and sitemap respond
  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    const r = await fetch(base + path);
    if (!r.ok) fail(`${path}: HTTP ${r.status}`);
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const route of routes) if (!sitemap.includes(`${route}</loc>`)) fail(`sitemap.xml doesn't list ${route}`);
  if (sitemap.includes("styleguide")) fail("sitemap.xml lists the style guide.");
} finally {
  await browser.close();
  stopServer();
}

// ---------------------------------------------------------------- report
const line = "─".repeat(60);
console.log(`\n${line}\nprelaunch · ${base}\n${line}`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length})`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (failures.length) {
  console.log(`\nFailures (${failures.length})`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  console.log(`\n✗ Not ready to launch.\n`);
  process.exit(1);
}
console.log(`\n✓ All hard checks passed.\n`);
