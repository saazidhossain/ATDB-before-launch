import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider, useLang } from "@/hooks/useLang";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";

/**
 * Layout-shift sanity check.
 *
 * jsdom can't measure real CLS, but it CAN tell us:
 *  1. every image in the gallery has explicit width/height (browser can reserve space)
 *  2. every gallery cell uses an aspect-ratio class (the slot dimensions don't depend on
 *     image load or label length)
 *  3. switching the language doesn't change the count, ordering, or aspect ratio of
 *     gallery slots — i.e. the grid does not reflow.
 */

function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <button data-testid="switch-lang" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
      switch
    </button>
  );
}

function renderHome() {
  return render(
    <MemoryRouter>
      <LangProvider>
        <LangSwitcher />
        <LiveFleetPhotos />
      </LangProvider>
    </MemoryRouter>
  );
}

function snapshotGrid(container: HTMLElement) {
  const cards = Array.from(container.querySelectorAll("a.glass-card, div.glass-card"));
  return cards.map(card => ({
    aspect: Array.from(card.classList).find(c => c.startsWith("aspect-")) || "",
    rect: (card as HTMLElement).getAttribute("class"),
  }));
}

describe("Media gallery layout stability", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("every gallery image declares explicit width and height", () => {
    const { container } = renderHome();
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs.length).toBeGreaterThan(0);
    for (const img of imgs) {
      // In jsdom these are reflected as numbers when the attr is set.
      expect(img.getAttribute("width"), `missing width on ${img.getAttribute("src")}`).not.toBeNull();
      expect(img.getAttribute("height"), `missing height on ${img.getAttribute("src")}`).not.toBeNull();
    }
  });

  it("every gallery card uses an aspect-ratio utility (reserves space before load)", () => {
    const { container } = renderHome();
    const cards = container.querySelectorAll(".glass-card");
    expect(cards.length).toBeGreaterThan(0);
    for (const c of Array.from(cards)) {
      const hasAspect = Array.from(c.classList).some(cls => cls.startsWith("aspect-"));
      expect(hasAspect, `card missing aspect-* class: ${c.className}`).toBe(true);
    }
  });

  it("EN -> BN does NOT change the number of grid cells or their aspect ratios", () => {
    const { container } = renderHome();
    const before = snapshotGrid(container);

    act(() => {
      fireEvent.click(screen.getByTestId("switch-lang"));
    });

    const after = snapshotGrid(container);
    expect(after.length).toBe(before.length);
    for (let i = 0; i < before.length; i++) {
      expect(after[i].aspect).toBe(before[i].aspect);
    }
  });

  it("changing filters preserves the photo grid container layout class", () => {
    const { container } = renderHome();
    // Target the photo grid specifically (it has lg:grid-cols-4; video grid does not).
    const grid = container.querySelector(".grid.lg\\:grid-cols-4");
    expect(grid).not.toBeNull();
    const beforeCls = grid!.className;

    fireEvent.click(screen.getByText("Mobile Cranes"));

    const gridAfter = container.querySelector(".grid.lg\\:grid-cols-4");
    expect(gridAfter).not.toBeNull();
    expect(gridAfter!.className).toBe(beforeCls);
  });
});
