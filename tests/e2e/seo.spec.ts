import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("home metadata, canonical, and share images", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("AI Healthcare Ad Videos & Infographics | Panacea Digital");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Create awareness for your healthcare business with AI-assisted promotional videos and healthcare infographics. Explore affordable monthly content packages.",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/$/);
    for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const url = await page.locator(sel).getAttribute("content");
      const res = await page.request.get(new URL(url!).pathname + new URL(url!).search, { maxRedirects: 0 });
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });

  test("structured data is accurate", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw!);
    const types = data["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(["Organization", "WebSite", "Service", "Service", "OfferCatalog", "FAQPage"]);
    expect(raw).not.toMatch(/"Review"|"AggregateRating"|"LocalBusiness"|web design/i);
    const services = data["@graph"].filter((n: { "@type": string }) => n["@type"] === "Service");
    for (const s of services) expect(s.areaServed.name).toBe("US");
    const offers = data["@graph"].find((n: { "@type": string }) => n["@type"] === "OfferCatalog").itemListElement;
    expect(offers.map((o: { price: string }) => o.price)).toEqual(["99.00", "199.00", "549.00"]);
    expect(offers.every((o: { priceCurrency: string }) => o.priceCurrency === "USD")).toBe(true);
    const faq = data["@graph"].find((n: { "@type": string }) => n["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(10);
    // No contact details until verified.
    expect(data["@graph"][0].email).toBeUndefined();
  });

  test("robots blocks crawling outside production; sitemap lists the three routes", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Disallow: \/\s*$/m);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/</loc>", "/privacy/</loc>", "/terms/</loc>"]) expect(sitemap).toContain(path);
    expect(sitemap).not.toContain("styleguide");
  });

  test("style guide is noindex", async ({ page }) => {
    await page.goto("/styleguide/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
