import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const chapterIds = [
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

/** Native scrollIntoView, repeated until stable: deferred chapters resize as they render. */
async function scrollToChapter(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

async function headingOffset(page: import("@playwright/test").Page, id: string) {
  return page.evaluate((target) => {
    const el = document.getElementById(target)!;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return Math.round(el.getBoundingClientRect().top - margin);
  }, id);
}

test.describe("foundation", () => {
  test("exactly one H1 and every chapter id exists once", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    for (const id of chapterIds) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  });

  test("rail ticks jump to their chapter and move focus to its heading", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "Rail is desktop-only");
    await page.goto("/");
    const rail = page.getByRole("navigation", { name: "Page chapters" });
    await expect(rail.getByRole("link")).toHaveCount(chapterIds.length);
    for (const id of ["pricing", "ad-videos", "contact", "why"]) {
      await rail.locator(`a[href="/#${id}"]`).click();
      await expect.poll(async () => Math.abs(await headingOffset(page, id)), { timeout: 5000 }).toBeLessThanOrEqual(4);
      await expect(page.locator(`#${id} [data-chapter-heading]`)).toBeFocused();
      await expect(rail.locator(`a[href="/#${id}"]`)).toHaveAttribute("aria-current", "location");
    }
  });

  test("header scrollspy follows scroll", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "Desktop nav");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await scrollToChapter(page, "pricing");
    await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "location");
    await expect(page.locator("header[data-condensed]")).toHaveCount(1);
  });

  test("mobile menu traps focus, closes on link, lands on chapter", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "Mobile menu");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Chapters" });
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 20; i++) await page.keyboard.press("Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await dialog.getByRole("link", { name: /FAQ/ }).click();
    await expect(dialog).toBeHidden();
    await expect.poll(async () => Math.abs(await headingOffset(page, "faq")), { timeout: 5000 }).toBeLessThanOrEqual(4);
    await expect(page.locator("#faq [data-chapter-heading]")).toBeFocused();
    await expect(page.getByRole("banner").locator("p.text-mono")).toContainText("FAQ");
  });

  test("mobile CTA bar appears after the hero and hides at #contact", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "Mobile CTA");
    await page.goto("/");
    const bar = page.locator("[data-mobile-cta]");
    await expect(bar).toHaveAttribute("inert", "");
    await scrollToChapter(page, "services");
    await expect(bar).not.toHaveAttribute("inert", "");
    await scrollToChapter(page, "contact");
    await expect(bar).toHaveAttribute("inert", "");
  });

  for (const path of ["/", "/styleguide/"]) {
    test(`axe: ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }

  test("reduced motion disables smooth scrolling", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("http://localhost:3100/");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    await context.close();
  });
});
