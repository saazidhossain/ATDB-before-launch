import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for visual-regression on the homepage gallery.
 *
 * Runs against `vite preview` on port 4173 (Vite's default preview port).
 * Three viewports — mobile, tablet, desktop — to catch breakpoint reflows.
 *
 * Update baselines locally with:  npx playwright test --update-snapshots
 * Then commit the new pngs in tests/visual/__screenshots__/.
 */
export default defineConfig({
  testDir: "./tests/visual",
  // Snapshots committed to repo; CI compares against them.
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  expect: {
    // Allow tiny anti-aliasing differences (font hinting, GPU vs CPU rendering).
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled", caret: "hide" },
  },
  projects: [
    { name: "mobile",  use: { ...devices["iPhone 13"] } },
    { name: "tablet",  use: { ...devices["iPad (gen 7)"] } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
