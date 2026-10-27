import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function approach(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

test.describe("chapters 03–04", () => {
  test("islands stay static until approached", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-island="ad-anatomy"]')).not.toHaveAttribute("data-hydrated", /.*/);
    await expect(page.getByRole("slider")).toHaveCount(0);
    await approach(page, "ad-videos");
    await expect(page.getByRole("slider")).toHaveCount(1);
  });

  test("7E: the playhead is a keyboard slider naming the segment", async ({ page }) => {
    await page.goto("/");
    await approach(page, "ad-videos");
    const slider = page.getByRole("slider", { name: "Ad timeline playhead" });
    await expect(slider).toHaveAttribute("aria-valuetext", "00:00:01, Hook");
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuetext", "00:00:03, Message");
    await page.keyboard.press("End");
    await expect(slider).toHaveAttribute("aria-valuetext", "00:00:15, Call to action");
    await page.keyboard.press("PageDown");
    await expect(slider).toHaveAttribute("aria-valuetext", "00:00:12, Call to action");
    await page.keyboard.press("Home");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");
    await expect(page.getByText("The first seconds name the situation")).toBeVisible();
  });

  test("7E: dragging the track moves the playhead", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "Pointer drag on desktop");
    await page.goto("/");
    await approach(page, "ad-videos");
    const slider = page.getByRole("slider");
    const track = slider.locator("..");
    await track.scrollIntoViewIfNeeded();
    const box = (await track.boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.05, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
    await expect(slider).toHaveAttribute("aria-valuetext", /Call to action/);
  });

  test("7F: hotspots are buttons that open the matching note", async ({ page }) => {
    await page.goto("/");
    await approach(page, "infographics");
    const buttons = page.getByRole("button", { name: /^0[1-5]\. / });
    await expect(buttons).toHaveCount(5);
    await buttons.nth(2).focus();
    await expect(buttons.nth(2)).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Principle 03 / 05")).toBeVisible();
    await buttons.nth(4).click();
    await expect(page.getByText("Principle 05 / 05")).toBeVisible();
    await expect(page.locator('[data-island="infographic-anatomy"] polyline')).toHaveCount(1);
  });

  test("axe with both islands hydrated", async ({ page }) => {
    await page.goto("/");
    await approach(page, "ad-videos");
    await approach(page, "infographics");
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page })
      .include("#ad-videos")
      .include("#infographics")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });
});
