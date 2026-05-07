import "@testing-library/jest-dom";

// matchMedia mock that respects a global override so tests can simulate breakpoints.
declare global {
  // eslint-disable-next-line no-var
  var __VIEWPORT_WIDTH__: number | undefined;
}

function mediaMatches(query: string): boolean {
  const w = globalThis.__VIEWPORT_WIDTH__ ?? 1280;
  // Support common Tailwind queries: (min-width: 640px), (max-width: 1023px)
  const min = /\(min-width:\s*(\d+)px\)/.exec(query);
  const max = /\(max-width:\s*(\d+)px\)/.exec(query);
  let ok = true;
  if (min) ok = ok && w >= parseInt(min[1], 10);
  if (max) ok = ok && w <= parseInt(max[1], 10);
  return ok;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: mediaMatches(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// IntersectionObserver mock (used by LiveFleetPhotos VideoCard).
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "";
  thresholds = [];
}
// @ts-expect-error jsdom polyfill
globalThis.IntersectionObserver = IO;

// HTMLMediaElement stubs
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: () => Promise.resolve(),
});
Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: () => {},
});
