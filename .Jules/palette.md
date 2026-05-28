## PALETTE'S JOURNAL - CRITICAL LEARNINGS ONLY\n
## 2024-05-28 - Avoid undefined 't' function when fixing Navbar
**Learning:** For localization outside of components that call `useLang`, or in places where I hallucinated the `t()` function based on other files, a `ReferenceError` occurs causing the application to crash. Also, package-lock files should not be generated or modified when fixing simple React files, as it introduces instability in package resolution.
**Action:** Always use the existing localization patterns (e.g., `lang === "en" ? "EN text" : "BN text"`) within the file, avoid hallucinating `t` when it's not destructured correctly or if it isn't defined, and never run `npm install` if the boundaries say use `pnpm` (and even then, only install if absolutely necessary).
