import { expect, test, type Page } from "@playwright/test";
import { siteConfig } from "../../site.config";

/*
 * Phase 8 QA: every in-page link and rail tick, scrollspy for every chapter,
 * a keyboard-only journey from the top of the page to a sent inquiry, and a
 * reduced-motion snapshot.
 */

const chapters = siteConfig.chapters;

/** Native scrollIntoView, repeated until stable: deferred chapters resize as they render. */
async function scrollToChapter(page: Page, id: string) {
  for (let i = 0; i < 4; i++) {
    await page.evaluate((target) => document.getElementById(target)!.scrollIntoView({ behavior: "instant" }), id);
    await page.waitForTimeout(150);
  }
}

/** Distance between an element's top and where its scroll-margin says it should land. */
async function landingOffset(page: Page, id: string) {
  return page.evaluate((target) => {
    const el = document.getElementById(target)!;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return Math.round(el.getBoundingClientRect().top - margin);
  }, id);
}

async function expectLanded(page: Page, id: string) {
  await expect.poll(async () => Math.abs(await landingOffset(page, id)), { timeout: 6000 }).toBeLessThanOrEqual(4);
}

test.describe("Phase 8 QA", () => {
  test("every rail tick lands on its chapter, focuses the heading, and marks itself current", async ({
    page,
  }, info) => {
    test.skip(info.project.name !== "desktop", "Rail is desktop-only");
    await page.goto("/");
    const rail = page.getByRole("navigation", { name: "Page chapters" });
    await expect(rail.getByRole("link")).toHaveCount(chapters.length);
    // Back and forth, so every tick is used in both directions.
    const order = [...chapters.map((c) => c.id).reverse(), ...chapters.map((c) => c.id)];
    for (const id of order) {
      const tick = rail.locator(`a[href="/#${id}"]`);
      await tick.click();
      await expectLanded(page, id);
      await expect(page.locator(`#${id} [data-chapter-heading]`)).toBeFocused();
      await expect(tick).toHaveAttribute("aria-current", "location");
    }
  });

  test("every in-page link lands on its target and focuses the heading", async ({ page }, info) => {
    test.setTimeout(180_000);
    await page.goto("/");
    // Render every deferred chapter so all links exist.
    for (const c of chapters) await scrollToChapter(page, c.id);
    const links = page.locator('a[href*="#"]');
    const total = await links.count();
    expect(total).toBeGreaterThan(chapters.length);

    let clicked = 0;
    for (let i = 0; i < total; i++) {
      const link = links.nth(i);
      const href = (await link.getAttribute("href"))!;
      const url = new URL(href, "http://x/");
      if (url.pathname !== "/" || !url.hash) continue;
      if (!(await link.isVisible())) continue; // e.g. the desktop nav on mobile; the other project covers it
      const id = decodeURIComponent(url.hash.slice(1));
      await expect(page.locator(`[id="${id}"]`), `${href} has a target`).toHaveCount(1);
      // Activate through the DOM: a pointer click scrolls sticky elements first.
      await link.evaluate((a: HTMLAnchorElement) => a.click());
      await expectLanded(page, id);
      await expect(page.locator(`[id="${id}"] [data-chapter-heading]`).first(), `${href} focus`).toBeFocused();
      if (url.search) {
        await expect(page).toHaveURL((u) => u.search === url.search && u.hash === url.hash);
      }
      clicked++;
    }
    expect(clicked, `${info.project.name}: visible in-page links exercised`).toBeGreaterThan(20);
  });

  test("scrollspy names the right chapter for every chapter", async ({ page }, info) => {
    await page.goto("/");
    const desktop = info.project.name === "desktop";
    const rail = page.getByRole("navigation", { name: "Page chapters" });
    const label = page.getByRole("banner").locator("p.text-mono");
    for (const c of [...chapters, ...[...chapters].reverse()]) {
      await scrollToChapter(page, c.id);
      if (desktop) {
        await expect(rail.locator('a[aria-current="location"]')).toHaveCount(1);
        await expect(rail.locator(`a[href="/#${c.id}"]`), `rail at #${c.id}`).toHaveAttribute(
          "aria-current",
          "location",
        );
        if ("nav" in c && c.nav) {
          await expect(
            page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: c.nav }),
          ).toHaveAttribute("aria-current", "location");
        }
      } else if (c.id === "top") {
        // The opening chapter needs no label: the hero says where you are.
        await expect(label).toHaveText("");
      } else {
        await expect(label, `header label at #${c.id}`).toContainText(`CH ${c.number} · ${c.label}`);
      }
    }
  });

  test("keyboard only: skip link to the form", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /Skip to the inquiry form/ });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expectLanded(page, "contact");
    await expect(page.locator("#contact [data-chapter-heading]")).toBeFocused();
  });

  test("keyboard only: from the header CTA to a sent inquiry", async ({ page }, info) => {
    test.skip(
      info.project.name !== "desktop",
      "Header CTA is hidden below 640px; the mobile CTA bar is covered elsewhere",
    );
    await page.goto("/");
    const cta = page.getByRole("banner").getByRole("link", { name: "Get Started" });
    // Tab forward until the header CTA has focus, never touching the mouse.
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press("Tab");
      if (await cta.evaluate((el) => el === document.activeElement)) break;
    }
    await expect(cta).toBeFocused();
    await page.keyboard.press("Enter");
    await expectLanded(page, "contact");
    await expect(page.locator("#contact [data-chapter-heading]")).toBeFocused();

    const form = page.locator("#contact form");
    const tabTo = async (name: string | RegExp) => {
      const target = form.getByLabel(name).or(form.getByRole("button", { name }));
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press("Tab");
        if (
          await target
            .first()
            .evaluate((el) => el === document.activeElement)
            .catch(() => false)
        )
          return;
      }
      throw new Error(`Tab never reached ${name}`);
    };

    await tabTo("Name");
    await page.keyboard.type("Alex Rivera");
    await tabTo("Business email");
    await page.keyboard.type("alex@example.com");
    await tabTo("Continue");
    await page.keyboard.press("Enter");
    await expect(form.getByRole("heading", { level: 3 })).toBeFocused();

    await tabTo("Healthcare business name");
    await page.keyboard.type("Example Home Care");
    await tabTo("Healthcare specialty or service type");
    await page.keyboard.type("Home care");
    await tabTo("Continue");
    await page.keyboard.press("Enter");
    await expect(form.getByRole("heading", { level: 3 })).toBeFocused();

    await tabTo("What services or message do you want to promote?");
    await page.keyboard.type("Short videos introducing our visit scheduling.");
    // The minimum time-to-submit check needs a few seconds on the form.
    await page.waitForTimeout(3100);
    await tabTo("Send Inquiry");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "Thank you. Your inquiry is on its way." })).toBeFocused();
  });

  test("reduced motion: nothing animates and the hero settles on its final frame", async ({ browser }, info) => {
    const context = await browser.newContext({ ...info.project.use, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(info.project.use.baseURL + "/");
    await page.waitForTimeout(2500);
    const running = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((a) => a.playState === "running" && a.effect?.getTiming().iterations === Infinity).length,
    );
    expect(running).toBe(0);
    await expect(page.locator("#top")).toHaveScreenshot(`reduced-motion-top-${info.project.name}.png`, {
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
    await context.close();
  });
});
