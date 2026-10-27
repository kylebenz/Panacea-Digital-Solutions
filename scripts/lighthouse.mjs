// Median-of-N Lighthouse against a running server (mobile, simulated slow 4G,
// by default; LH_PRESET=desktop for the desktop preset).
//   node scripts/lighthouse.mjs [url] [runs]
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const url = process.argv[2] ?? "http://localhost:3100/";
const runs = Number(process.argv[3] ?? 3);
const desktop = process.env.LH_PRESET === "desktop";
mkdirSync(".lighthouse", { recursive: true });
const results = [];
for (let i = 0; i < runs; i++) {
  const out = `.lighthouse/run-${i}.json`;
  execFileSync(
    "npx",
    [
      "lighthouse",
      url,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox",
      "--output=json",
      `--output-path=${out}`,
      "--throttling-method=simulate",
      ...(desktop ? ["--preset=desktop"] : ["--form-factor=mobile"]),
    ],
    { stdio: "ignore", env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium" } },
  );
  const r = JSON.parse(readFileSync(out, "utf8"));
  results.push({
    inp: r.audits["interaction-to-next-paint"]?.numericValue,
    perf: r.categories.performance.score * 100,
    a11y: r.categories.accessibility.score * 100,
    bp: r.categories["best-practices"].score * 100,
    seo: r.categories.seo.score * 100,
    lcp: r.audits["largest-contentful-paint"].numericValue,
    cls: r.audits["cumulative-layout-shift"].numericValue,
    tbt: r.audits["total-blocking-time"].numericValue,
    fcp: r.audits["first-contentful-paint"].numericValue,
    failing: Object.entries(r.audits)
      .filter(
        ([, a]) =>
          a.score !== null && a.score < 0.9 && !["informative", "notApplicable", "manual"].includes(a.scoreDisplayMode),
      )
      .map(([id]) => id),
  });
}
results.sort((a, b) => a.perf - b.perf);
const m = results[Math.floor(results.length / 2)];
console.log(`${url} — ${desktop ? "desktop" : "mobile"}, median of ${runs}`);
console.log(
  `Performance ${Math.round(m.perf)} · Accessibility ${Math.round(m.a11y)} · Best Practices ${Math.round(m.bp)} · SEO ${Math.round(m.seo)}`,
);
console.log(
  `LCP ${(m.lcp / 1000).toFixed(2)}s · CLS ${m.cls.toFixed(3)} · TBT ${Math.round(m.tbt)}ms · FCP ${(m.fcp / 1000).toFixed(2)}s`,
);
console.log("perf scores:", results.map((r) => Math.round(r.perf)).join(", "));
console.log("below 0.9:", m.failing.join(", ") || "none");
