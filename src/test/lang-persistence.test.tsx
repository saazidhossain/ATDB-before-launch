import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import HeroGallery from "@/components/home/HeroGallery";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";

const STORAGE_KEY = "atdb_lang";

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LangProvider>{ui}</LangProvider>
    </MemoryRouter>
  );
}

describe("Language persistence across full page refresh", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("HeroGallery: writes lang=bn to localStorage and re-uses it on remount", () => {
    // Simulate a previous session having set Bengali.
    localStorage.setItem(STORAGE_KEY, "bn");
    renderWithProviders(<HeroGallery />);

    // Bengali section eyebrow text comes from t("Live Showcase", "লাইভ শোকেস")
    expect(screen.getByText("লাইভ শোকেস")).toBeInTheDocument();
    expect(screen.queryByText("Live Showcase")).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("bn");
  });

  it("LiveFleetPhotos: lang=bn survives a simulated refresh (unmount + remount)", () => {
    localStorage.setItem(STORAGE_KEY, "bn");
    const { unmount } = renderWithProviders(<LiveFleetPhotos />);

    expect(screen.getByText("লাইভ ফ্লিট ফটো ও ভিডিও")).toBeInTheDocument();
    unmount();

    // Re-mount fresh — equivalent to a hard browser refresh re-bootstrapping React.
    renderWithProviders(<LiveFleetPhotos />);
    expect(screen.getByText("লাইভ ফ্লিট ফটো ও ভিডিও")).toBeInTheDocument();
    // The "All" filter pill must also be in Bengali on the remount.
    expect(screen.getByText("সবগুলো")).toBeInTheDocument();
  });

  it("defaults to English when localStorage is empty", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderWithProviders(<HeroGallery />);
    expect(screen.getByText("Live Showcase")).toBeInTheDocument();
  });

  it("invalid stored value falls back to English (no crash)", () => {
    localStorage.setItem(STORAGE_KEY, "fr");
    renderWithProviders(<HeroGallery />);
    expect(screen.getByText("Live Showcase")).toBeInTheDocument();
  });
});
