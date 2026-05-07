## Visual regression baselines

This directory holds Playwright pixel-diff tests for the homepage galleries.

Baseline screenshots live in `__screenshots__/` and are committed to the repo.
On every PR, GitHub Actions runs `playwright test` against three viewports
(`mobile`, `tablet`, `desktop`) and fails the build if any pixel diff exceeds
the tolerance set in `playwright.config.ts`.

### Updating baselines after an intentional design change

```bash
npm run test:visual:update
git add tests/visual/__screenshots__
```

### Running locally

```bash
npm run build
npm run test:visual
```

The first run on a fresh checkout will generate baselines, so commit them
before opening a PR.
