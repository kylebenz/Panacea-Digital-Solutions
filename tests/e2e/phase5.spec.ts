import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function approach(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

test.describe("chapters 07 and 09", () => {
  test("7G: filters narrow the grid in place", async ({ page }) => {
    await page.goto("/");
    await approach(page, "portfolio");
    const section = page.locator("#portfolio");
    await expect(section.getByText("Showing 7 of 7 samples")).toBeVisible();
    await section.getByRole("radio", { name: "Videos" }).click();
    await expect(section.getByText("Showing 4 of 7 samples")).toBeVisible();
    await section.getByRole("radio", { name: "Process explainers" }).click();
    await expect(section.getByText("Showing 1 of 7 samples")).toBeVisible();
    await section.getByRole("radio", { name: "Infographics" }).click();
    await expect(section.getByText("Showing 1 of 7 samples")).toBeVisible();
    await section.getByRole("radio", { name: "All", exact: true }).click();
    await section.getByRole("radio", { name: "All topics" }).click();
    await expect(section.getByText("Showing 7 of 7 samples")).toBeVisible();
    // Every card carries the Concept Sample badge.
    await expect(section.getByText("Concept Sample", { exact: true })).toHaveCount(7);
  });

  test("7G: lightbox loads a captioned player and returns focus to the card", async ({ page }) => {
    await page.goto("/");
    await approach(page, "portfolio");
    await expect(page.locator("#portfolio video")).toHaveCount(0); // facade: no player before intent
    const trigger = page.getByRole("button", { name: "Play Introducing a home care service" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Introducing a home care service" });
    await expect(dialog).toBeVisible();
    const track = dialog.locator("video track[kind=captions]");
    await expect(track).toHaveAttribute("src", "/media/portfolio/introducing-a-home-care-service.vtt");
    const vtt = await page.request.get("/media/portfolio/introducing-a-home-care-service.vtt");
    expect(vtt.ok()).toBe(true);
    expect(await vtt.text()).toContain("WEBVTT");
    await expect(dialog.getByText("Planning home care for someone you love?")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("7G: Request Similar Content closes the lightbox and lands on the form", async ({ page }) => {
    await page.goto("/");
    await approach(page, "portfolio");
    await page.getByRole("button", { name: "View What to bring to your first appointment" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Request Similar Content" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.locator("#contact [data-chapter-heading]")).toBeFocused({ timeout: 4000 });
  });

  test("7H: prices, tiles, and per-item cost come from config", async ({ page }) => {
    await page.goto("/");
    await approach(page, "pricing");
    const section = page.locator("#pricing");
    for (const [name, price, perItem, n] of [
      ["Starter", "$99", "≈ $12.38 per content item", 4],
      ["Growth", "$199", "≈ $9.95 per content item", 10],
      ["Scale", "$549", "≈ $9.15 per content item", 30],
    ] as const) {
      const card = section.getByRole("article", { name });
      await expect(card).toContainText(price);
      await expect(card).toContainText(perItem);
      await expect(card).toContainText(`${n} AI advertisement videos`);
      await expect(card).toContainText(`${n} infographic images`);
      await expect(card.getByRole("link", { name: `Choose ${name}` })).toHaveAttribute(
        "href",
        `/?package=${name.toLowerCase()}#contact`,
      );
    }
    await expect(section).not.toContainText(/most popular|% off/i);
  });

  test("7H: revision explainer toggles between its two states", async ({ page }) => {
    await page.goto("/");
    await approach(page, "pricing");
    const section = page.locator("#pricing");
    await page.locator('[data-island="revision-explainer"]').scrollIntoViewIfNeeded();
    await expect(section.getByRole("radio", { name: "Needs a separate quote" })).toBeVisible();
    await expect(section.getByText("Tightening captions")).toBeVisible();
    await section.getByRole("radio", { name: "Needs a separate quote" }).click();
    await expect(section.locator("li", { hasText: "Additional versions" })).toBeVisible();
    await expect(section.getByText("Tightening captions")).toHaveCount(0);
  });

  test("axe with Phase 5 islands hydrated", async ({ page }) => {
    await page.goto("/");
    for (const id of ["portfolio", "pricing"]) await approach(page, id);
    await page.locator('[data-island="revision-explainer"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page })
      .include("#portfolio")
      .include("#pricing")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });

  test("axe on the open lightbox", async ({ page }) => {
    await page.goto("/");
    await approach(page, "portfolio");
    await page.getByRole("button", { name: "Play Introducing a home care service" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page })
      .include("[role=dialog]")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });
});
