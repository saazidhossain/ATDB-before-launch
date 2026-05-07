import { test, expect } from "@playwright/test";

/**
 * Smoke test: catches the Router-context regression class.
 *
 * Symptom of a duplicate react-router-dom or an unsafe lazy()-wrapped
 * Router consumer is a blank page + console error
 * "Cannot read properties of null (reading 'useContext')".
 *
 * This test fails fast if either happens — and verifies that <Link>s
 * actually navigate (they don't render at all if Router context is broken).
 */
test.describe("Router context smoke test", () => {
  test("homepage renders without context errors and navigation works", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", err => errors.push(err.message));
    page.on("console", msg => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 1. Page is not blank.
    const root = page.locator("#root");
    const rootText = (await root.textContent()) ?? "";
    expect(rootText.length, "homepage rendered as a blank screen").toBeGreaterThan(50);

    // 2. The Navbar renders Links — proves Router context is wired up.
    const equipmentLink = page.getByRole("link", { name: /equipment|যন্ত্রপাতি/i }).first();
    await expect(equipmentLink).toBeVisible();

    // 3. Navigation actually works (not just visible).
    await equipmentLink.click();
    await page.waitForURL(/\/equipment/);
    expect(page.url()).toContain("/equipment");

    // 4. No useContext-null or related router errors fired.
    const router = errors.filter(e =>
      /useContext|useState.*null|reading 'use[A-Z]'/.test(e)
    );
    expect(router, `Router/React context errors:\n${router.join("\n")}`).toHaveLength(0);
  });
});
