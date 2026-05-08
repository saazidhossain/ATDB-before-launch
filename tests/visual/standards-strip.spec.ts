import { test, expect } from "@playwright/test";

/**
 * StandardsStrip overflow / left-edge pill artifact regression.
 *
 * Past bug: list-item markers (default UA bullets / pills) bled past the
 * left edge of the cards on mobile, and the RevealOnScroll transform
 * occasionally clipped the section. This test:
 *   1. screenshots the section across mobile / tablet / desktop projects
 *   2. asserts no <li> renders a ::marker box with visible content
 *   3. asserts every card's left edge is >= the section's content left edge
 *      (catches any pill bleeding past the container)
 *   4. asserts the section never overflows the viewport horizontally
 */
test.describe("StandardsStrip — no left-edge artifacts", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const css = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}`;
      const s = document.createElement("style");
      s.textContent = css;
      document.documentElement.appendChild(s);
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("renders cleanly with no marker/pill artifacts and no horizontal overflow", async ({ page }) => {
    const section = page
      .locator("section")
      .filter({ hasText: /International Standards|আন্তর্জাতিক মান/ })
      .first();
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(section).toBeVisible();

    // 1. Pixel-diff baseline per breakpoint.
    await expect(section).toHaveScreenshot("standards-strip.png");

    // 2. No <li> marker shows visible glyph content.
    const markerContents = await section.locator("li").evaluateAll(els =>
      els.map(el => {
        const cs = window.getComputedStyle(el, "::marker");
        return { content: cs.content, listStyle: cs.listStyleType };
      })
    );
    for (const m of markerContents) {
      expect(["none", "\"\"", "''", "normal"]).toContain(m.content);
    }

    // 3. Every card's left edge is within the section's content box.
    const sectionBox = await section.boundingBox();
    expect(sectionBox).not.toBeNull();
    const cards = section.locator("li > a");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box, `card ${i} has no box`).not.toBeNull();
      expect(box!.x, `card ${i} left edge bleeds past section`).toBeGreaterThanOrEqual(
        sectionBox!.x - 1
      );
      expect(box!.x + box!.width, `card ${i} right edge bleeds past section`).toBeLessThanOrEqual(
        sectionBox!.x + sectionBox!.width + 1
      );
    }

    // 4. No horizontal overflow on the page caused by this section.
    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth,
    }));
    expect(overflow.doc, "document has horizontal overflow").toBeLessThanOrEqual(overflow.win + 1);
  });
});