import { test, expect } from "@playwright/test";

/**
 * Pixel-diff regression tests for the homepage galleries across breakpoints.
 *
 * Each project (mobile / tablet / desktop) produces its own baseline image, so
 * a layout-shift, font-load, or styling regression at any breakpoint will fail CI.
 *
 * To update baselines after an intentional design change:
 *   npx playwright test --update-snapshots
 */

async function settle(page: import("@playwright/test").Page) {
  // Stop the auto-rotating gallery so screenshots are deterministic.
  await page.addInitScript(() => {
    // Pause CSS animations and transitions site-wide.
    const css = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}`;
    const style = document.createElement("style");
    style.textContent = css;
    document.documentElement.appendChild(style);
  });
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  // Pause the hero gallery rotator if a Pause button is exposed.
  const pause = page.getByRole("button", { name: /pause/i }).first();
  if (await pause.isVisible().catch(() => false)) {
    await pause.click();
  }
  // Force-load lazy images for stable screenshots.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

test.describe("Homepage gallery visual regression", () => {
  test("HeroGallery (auto-rotating fleet gallery)", async ({ page }) => {
    await settle(page);
    const hero = page.locator("section").filter({ hasText: "Auto-rotating fleet gallery" }).first();
    await expect(hero).toHaveScreenshot("hero-gallery.png");
  });

  test("LiveFleetPhotos (current-condition media stream)", async ({ page }) => {
    await settle(page);
    const live = page.locator("section").filter({ hasText: "Current-condition media stream" }).first();
    await live.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(live).toHaveScreenshot("live-fleet.png");
  });
});
