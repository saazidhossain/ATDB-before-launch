import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import HeroGallery from "@/components/home/HeroGallery";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";

const BREAKPOINTS = [
  { name: "mobile",  width: 390 },
  { name: "tablet",  width: 768 },
  { name: "desktop", width: 1440 },
];

function setViewport(w: number) {
  globalThis.__VIEWPORT_WIDTH__ = w;
  Object.defineProperty(window, "innerWidth", { configurable: true, value: w });
  window.dispatchEvent(new Event("resize"));
}

function renderGallery(node: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LangProvider>{node}</LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => { window.localStorage.clear(); });
afterEach(() => { globalThis.__VIEWPORT_WIDTH__ = undefined; });

describe("Gallery visual regression — cropping & aspect-ratio guarantees", () => {
  for (const bp of BREAKPOINTS) {
    it(`HeroGallery preserves aspect-ratio + object-cover on ${bp.name} (${bp.width}px)`, () => {
      setViewport(bp.width);
      const { container } = renderGallery(<HeroGallery />);

      // Stage element must declare an aspect-ratio so cropping is deterministic.
      const stage = container.querySelector("section .relative.rounded-3xl");
      expect(stage, "HeroGallery stage element must exist").toBeTruthy();
      expect(stage!.className).toMatch(/aspect-\[/);

      // Every <img> and <video> inside the gallery must use object-cover and fill the stage.
      const media = stage!.querySelectorAll("img, video");
      expect(media.length).toBeGreaterThan(0);
      media.forEach(el => {
        expect(el.className, `${el.tagName} missing object-cover`).toMatch(/object-cover/);
        expect(el.className).toMatch(/w-full/);
        expect(el.className).toMatch(/h-full/);
      });
    });

    it(`LiveFleetPhotos enforces square thumbs + 16:9 video tiles on ${bp.name}`, () => {
      setViewport(bp.width);
      const { container } = renderGallery(<LiveFleetPhotos />);

      // Photo tiles: aspect-square + object-cover
      const tiles = container.querySelectorAll("a.group.relative");
      expect(tiles.length).toBeGreaterThan(0);
      tiles.forEach(tile => {
        expect(tile.className).toMatch(/aspect-square/);
        const img = tile.querySelector("img");
        expect(img).toBeTruthy();
        expect(img!.className).toMatch(/object-cover/);
        expect(img!.className).toMatch(/w-full/);
        expect(img!.className).toMatch(/h-full/);
      });

      // Video tiles: aspect-video + object-cover
      const videoTiles = container.querySelectorAll("div.group.aspect-video, div.aspect-video");
      expect(videoTiles.length).toBeGreaterThan(0);
      videoTiles.forEach(vt => {
        const media = vt.querySelector("img, video");
        if (media) {
          expect(media.className).toMatch(/object-cover/);
          expect(media.className).toMatch(/w-full/);
          expect(media.className).toMatch(/h-full/);
        }
      });
    });
  }
});
