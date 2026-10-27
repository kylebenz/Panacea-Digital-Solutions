import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function approach(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

test.describe("chapters 05, 06, 08", () => {
  test("7C: toggle groups switch among the 12 concepts", async ({ page }) => {
    await page.goto("/");
    await approach(page, "demo");
    const demo = page.locator("#demo");
    await expect(demo.getByText("Looking for help at home for someone you care about?")).toBeVisible();
    await demo.getByRole("radio", { name: "Healthcare startup" }).click();
    await demo.getByRole("radio", { name: "Invite an inquiry" }).click();
    await expect(demo.getByText("Working on care coordination at your organization?")).toBeVisible();
    await expect(demo.getByText(/Concept · Healthcare startup · Invite an inquiry/)).toBeVisible();
    // Clicking the selected item again must not clear the selection.
    await demo.getByRole("radio", { name: "Invite an inquiry" }).click();
    await expect(demo.getByRole("radio", { name: "Invite an inquiry" })).toHaveAttribute("aria-checked", "true");
    await expect(demo.getByRole("link", { name: "Discuss Your Content" })).toHaveAttribute("href", "/#contact");
  });

  test("7D: desktop tabs follow scroll and keyboard", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "Sticky timeline is desktop-only");
    await page.goto("/");
    await approach(page, "process");
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(4);
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true", { timeout: 4000 });
    await expect(page.getByRole("tabpanel")).toContainText("we develop content ideas and scripts");
  });

  test("7D: mobile shows the vertical stepper with all four steps", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile", "Mobile stepper");
    await page.goto("/");
    await approach(page, "process");
    await expect(page.getByRole("tab")).toHaveCount(0);
    for (const t of ["Plan the content:", "Write and create:", "Review and revise:", "Deliver the files:"]) {
      await expect(page.locator("#process").getByRole("heading", { name: t })).toBeVisible();
    }
  });

  test("7D: reduced motion uses the static list on desktop too", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(test.info().project.use.baseURL + "/");
    await approach(page, "process");
    await expect(page.getByRole("tab")).toHaveCount(0);
    await context.close();
  });

  test("Who we help: chips reveal the matching line", async ({ page }) => {
    await page.goto("/");
    await approach(page, "who-we-help");
    const section = page.locator("#who-we-help");
    await section.getByRole("radio", { name: "Healthcare marketing managers" }).click();
    await expect(section.getByText(/Review the workflow, deliverables, revision terms/)).toBeVisible();
    await expect(section.getByRole("link", { name: "Follow the four-step process" })).toHaveAttribute(
      "href",
      "/#process",
    );
  });

  test("axe with Phase 4 islands hydrated", async ({ page }) => {
    await page.goto("/");
    for (const id of ["demo", "process", "who-we-help"]) await approach(page, id);
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page })
      .include("#demo")
      .include("#process")
      .include("#who-we-help")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });
});
