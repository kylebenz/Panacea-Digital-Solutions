import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function approach(page: import("@playwright/test").Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

async function fillAll(page: import("@playwright/test").Page) {
  const form = page.locator("#contact form");
  await form.getByLabel("Name").fill("Alex Rivera");
  await form.getByLabel("Business email").fill("alex@example.com");
  await form.getByRole("button", { name: "Continue" }).click();
  await form.getByLabel("Healthcare business name").fill("Example Home Care");
  await form.getByLabel("Healthcare specialty or service type").fill("Home care");
  await form.getByRole("button", { name: "Continue" }).click();
  await form
    .getByLabel("What services or message do you want to promote?")
    .fill("Short videos introducing our visit scheduling.");
  // The minimum time-to-submit check needs a few seconds on the form.
  await page.waitForTimeout(3100);
}

test.describe("chapters 10–12, legal pages, 404", () => {
  test("7I: step validation shows inline errors and moves focus", async ({ page }) => {
    await page.goto("/");
    await approach(page, "contact");
    const form = page.locator("#contact form");
    await expect(form.getByText("Step 01 / 03", { exact: false }).first()).toBeVisible();
    await form.getByRole("button", { name: "Continue" }).click();
    await expect(form.getByText("Enter your name.")).toBeVisible();
    await expect(form.getByLabel("Name")).toBeFocused();
    await expect(form.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
    await expect(form.getByText("2 fields need attention.")).toBeVisible();
    // Phone becomes required only when chosen.
    await form.getByLabel("Phone call").check();
    await expect(form.getByLabel("Phone number")).toBeVisible();
  });

  test("7I: success path replaces the form in place", async ({ page }) => {
    await page.goto("/");
    await approach(page, "contact");
    await fillAll(page);
    await page.locator("#contact form").getByRole("button", { name: "Send Inquiry" }).click();
    await expect(page.getByRole("heading", { name: "Thank you. Your inquiry is on its way." })).toBeFocused();
    await expect(page.locator("#contact form")).toHaveCount(0);
  });

  test("7I: error path keeps answers and offers a retry", async ({ page }) => {
    await page.route("**/api/inquiry", (route) => route.fulfill({ status: 502, body: '{"ok":false}' }));
    await page.goto("/");
    await approach(page, "contact");
    await fillAll(page);
    await page.locator("#contact form").getByRole("button", { name: "Send Inquiry" }).click();
    await expect(page.getByRole("heading", { name: "Your inquiry wasn’t sent." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
    await expect(page.getByLabel("What services or message do you want to promote?")).toHaveValue(/visit scheduling/);
  });

  test("7I: plan buttons and ?package= pre-select the package", async ({ page }) => {
    await page.goto("/?package=growth#contact");
    await approach(page, "contact");
    await expect(page.locator("#contact").getByText("Package: Growth")).toBeVisible();
    await approach(page, "pricing");
    await page.locator("#pricing").getByRole("link", { name: "Choose Scale" }).click();
    await expect(page).toHaveURL(/\?package=scale#contact$/);
    await expect(page.locator("#contact").getByText("Package: Scale")).toBeVisible();
  });

  test("7I: the route handler validates and rejects bad input", async ({ request }) => {
    const bad = await request.post("/api/inquiry", { data: { name: "" } });
    expect(bad.status()).toBe(422);
    const honeypot = await request.post("/api/inquiry", { data: { company_url: "spam" } });
    expect(honeypot.status()).toBe(200);
  });

  test("7I: without JavaScript the form is a single step that posts", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(test.info().project.use.baseURL + "/#contact");
    const form = page.locator("#contact form");
    for (const label of [
      "Name",
      "Business email",
      "Healthcare business name",
      "What services or message do you want to promote?",
    ]) {
      await expect(form.getByLabel(label, { exact: true })).toBeVisible();
    }
    await expect(form.getByText("Please do not submit patient names")).toHaveCount(2);
    await context.close();
  });

  test("FAQ: filter, accordion, and per-question anchors", async ({ page }) => {
    await page.goto("/");
    await approach(page, "faq");
    const section = page.locator("#faq");
    await section.getByLabel("Filter questions").fill("revision");
    await expect(section.getByText(/Showing \d+ of 10 questions/)).not.toHaveText("Showing 10 of 10 questions");
    await section.getByRole("button", { name: /^\d+ What does one revision mean\?$/ }).click();
    await expect(section.getByText(/consolidated set of reasonable changes/)).toBeVisible();
    // Closed answers stay in the DOM for indexing.
    await section.getByLabel("Filter questions").fill("");
    await expect(page.locator("#faq-how-do-you-use-ai")).toContainText("AI-assisted tools may be used");
    await page.goto("/#faq-patient-stories-or-images");
    await approach(page, "faq");
    await expect(page.getByText(/appropriate authority and permissions/)).toBeVisible();
  });

  test("legal shells and 404", async ({ page }) => {
    for (const [path, title] of [
      ["/privacy/", "Privacy Policy"],
      ["/terms/", "Terms of Service"],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
      await expect(page.getByText(/\[VERIFY: requires qualified review/)).toBeVisible();
    }
    const response = await page.goto("/no-such-page/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("isn’t on the reel");
  });

  for (const path of ["/privacy/", "/terms/", "/no-such-page/"]) {
    test(`axe: ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }

  test("axe with Phase 6 islands hydrated", async ({ page }) => {
    await page.goto("/");
    for (const id of ["about", "faq", "contact"]) await approach(page, id);
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page })
      .include("#about")
      .include("#faq")
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });
});
