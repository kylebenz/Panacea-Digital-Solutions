/*
 * Lighthouse CI — the Phase 8 budgets (brief §11). Mobile, simulated slow 4G.
 *   SITE_ENV=production NEXT_PUBLIC_SITE_URL=http://localhost:3200 npm run build && npm run lhci
 * (Outside production every page is noindex by design, which fails SEO.)
 * LHCI_PRESET=desktop runs the desktop preset instead.
 */
const desktop = process.env.LHCI_PRESET === "desktop";

module.exports = {
  ci: {
    collect: {
      startServerCommand: "FORM_WEBHOOK_URL=dry-run npx next start -p 3200",
      startServerReadyPattern: "Ready",
      url: ["http://localhost:3200/", "http://localhost:3200/privacy/", "http://localhost:3200/terms/"],
      numberOfRuns: 3,
      chromePath: process.env.CHROME_PATH,
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
        throttlingMethod: "simulate",
        ...(desktop ? { preset: "desktop" } : { formFactor: "mobile" }),
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95, aggregationMethod: "median-run" }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2000, aggregationMethod: "median-run" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.05, aggregationMethod: "median-run" }],
        // INP needs a real interaction; TBT is its lab proxy.
        "total-blocking-time": ["warn", { maxNumericValue: 200, aggregationMethod: "median-run" }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci/reports" },
  },
};
