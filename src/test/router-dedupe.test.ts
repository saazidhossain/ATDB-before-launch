import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

/**
 * Two-pronged guard:
 *
 *  1. Single react-router-dom instance — duplicates cause useContext-null
 *     crashes (the React context is keyed by module identity, so two copies
 *     of the package = two different contexts).
 *
 *  2. Safe-lazy policy — anything imported via React.lazy() in src/pages/Index
 *     must NOT import from "react-router-dom", or the lazy chunk will
 *     deserialize a stale Router context on first paint.
 */

function findReactRouterDomInstances(root = "node_modules", depth = 4): string[] {
  const hits: string[] = [];
  const walk = (dir: string, d: number) => {
    if (d > depth || !existsSync(dir)) return;
    let entries: string[] = [];
    try { entries = readdirSync(dir); } catch { return; }
    for (const name of entries) {
      const p = join(dir, name);
      if (name === "react-router-dom") {
        // Confirm it's a package (has package.json) not a stray file.
        if (existsSync(join(p, "package.json"))) hits.push(p);
        continue;
      }
      // Recurse only into nested node_modules to find hoisted duplicates.
      if (name === "node_modules" || (d === 0 && name.startsWith("@"))) {
        walk(p, d + 1);
      } else if (d < 2 && existsSync(join(p, "node_modules"))) {
        walk(join(p, "node_modules"), d + 1);
      }
    }
  };
  walk(root, 0);
  return hits;
}

describe("react-router-dom dedupe guard", () => {
  it("only one copy of react-router-dom is installed", () => {
    const instances = findReactRouterDomInstances();
    expect(
      instances,
      `Found multiple react-router-dom installs:\n${instances.join("\n")}\n` +
        `Add the package to vite.config.ts > resolve.dedupe and reinstall.`
    ).toHaveLength(1);
  });

  it("vite.config.ts dedupes react-router-dom", () => {
    const cfg = readFileSync("vite.config.ts", "utf8");
    expect(cfg, "vite.config.ts must list react-router-dom in resolve.dedupe").toMatch(
      /dedupe[^]*react-router-dom/
    );
  });
});

describe("Safe-lazy policy on src/pages/Index.tsx", () => {
  const indexSrc = readFileSync("src/pages/Index.tsx", "utf8");

  // Extract every "@/..." path that appears inside a lazy(() => import("..."))
  const lazyPaths = Array.from(
    indexSrc.matchAll(/lazy\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)\s*\)/g)
  ).map(m => m[1]);

  it("at least one lazy import is declared (sanity check)", () => {
    expect(lazyPaths.length).toBeGreaterThan(0);
  });

  it.each(lazyPaths)(
    "lazy import %s does not consume react-router-dom (would break Router context)",
    (p) => {
      const file = p.replace(/^@\//, "src/");
      // Try .tsx then .ts
      const candidates = [`${file}.tsx`, `${file}.ts`, `${file}/index.tsx`];
      const found = candidates.find(c => existsSync(c));
      expect(found, `Could not resolve lazy import path: ${p}`).toBeTruthy();
      const src = readFileSync(found!, "utf8");
      expect(
        /from\s+["']react-router-dom["']/.test(src),
        `${found} is lazy-loaded but imports react-router-dom — move it back to an eager import in Index.tsx.`
      ).toBe(false);
    }
  );
});
