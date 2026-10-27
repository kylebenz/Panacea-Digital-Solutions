import { expect, test } from "@playwright/test";

test.describe("7A storyboard stage", () => {
  test("H1 is the LCP element", async ({ page }) => {
    await page.goto("/");
    const lcp = await page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries() as Array<PerformanceEntry & { element?: Element }>;
            const last = entries[entries.length - 1];
            resolve(last.element?.tagName ?? "unknown");
          }).observe({ type: "largest-contentful-paint", buffered: true });
        }),
    );
    expect(lcp).toBe("H1");
  });

  test("plays, and the Pause control stops the timecode", async ({ page }) => {
    await page.goto("/");
    const stage = page.getByRole("group", { name: /Illustrative storyboard/ });
    const timecode = stage.locator("figure .text-mono").first();
    await expect(timecode).toHaveText(/00:00:0[1-9]/, { timeout: 6000 });
    // Move the pointer away so hover-pause doesn't interfere, then pause via keyboard.
    await page.mouse.move(0, 0);
    await stage.getByRole("button", { name: "Pause storyboard" }).focus();
    await page.keyboard.press("Enter");
    await expect(stage.getByRole("button", { name: "Play storyboard" })).toBeVisible();
    const frozen = await timecode.textContent();
    await page.waitForTimeout(1500);
    await expect(timecode).toHaveText(frozen!);
    await page.keyboard.press("Enter");
    await expect(stage.getByRole("button", { name: "Pause storyboard" })).toBeVisible();
  });

  test("reduced motion shows the static final composition with no control", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(test.info().project.use.baseURL + "/");
    await page.waitForTimeout(2500);
    const stage = page.getByRole("group", { name: /Illustrative storyboard/ });
    await expect(stage.locator("figure .text-mono").first()).toHaveText("00:00:15");
    await expect(stage.getByRole("button")).toHaveCount(0);
    await expect(stage.getByText("Plan a first visit").first()).toBeVisible();
    await context.close();
  });

  test("sample strip shows Concept Samples linking to the portfolio", async ({ page }) => {
    await page.goto("/");
    const strip = page.getByRole("region", { name: "Concept samples" });
    await expect(strip.getByText("Concept Sample", { exact: true })).toHaveCount(4);
    for (const href of await strip.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href")))) {
      expect(href).toBe("/#portfolio");
    }
  });
});
