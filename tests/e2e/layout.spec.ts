import { expect, test } from "@playwright/test";
import { siteConfig } from "../../site.config";

/* The AI video drama layout: video placeholders, honest labels, pricing from config. */

async function approach(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 3; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(120);
  }
}

test.describe("layout", () => {
  test("infographics are gone from the page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).not.toContainText(/infographic/i);
  });

  test("every empty video slot is a labelled Concept Sample placeholder", async ({ page }) => {
    await page.goto("/");
    await approach(page, "work");
    const work = page.locator("#work");
    await expect(work.locator("figure")).toHaveCount(8);
    await expect(work.getByText("Concept Sample")).toHaveCount(8);
    await expect(work.getByText("Video coming soon")).toHaveCount(8);
    await expect(page.locator("video")).toHaveCount(0);
  });

  test("breakdowns show the script and four episode slots each", async ({ page }) => {
    await page.goto("/");
    await approach(page, "breakdowns");
    const articles = page.locator("#breakdowns article");
    await expect(articles).toHaveCount(2);
    for (const article of await articles.all()) {
      await expect(article.getByText("Concept Sample").first()).toBeVisible();
      await expect(article.locator("ul li figure")).toHaveCount(4);
    }
  });

  test("pricing comes from config with the 50% offer and regular prices", async ({ page }) => {
    await page.goto("/");
    await approach(page, "pricing");
    const pricing = page.locator("#pricing");
    for (const plan of siteConfig.plans) {
      const card = pricing.locator("article", { has: page.getByRole("heading", { name: plan.name }) });
      await expect(card).toContainText(`$${plan.priceMonthly}`);
      await expect(card).toContainText(`${plan.videos} AI video dramas a month`);
      await expect(card).toContainText("50% off");
      const regular = siteConfig.promo.regularPrices[plan.id].toLocaleString("en-US");
      await expect(card).toContainText(`Regular price $${regular}/mo`);
      await expect(card).toContainText("1 revision per video");
    }
    await expect(pricing.locator("s, del")).toHaveCount(0);
  });
});
