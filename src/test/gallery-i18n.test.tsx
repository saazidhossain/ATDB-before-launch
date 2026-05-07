import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider, useLang } from "@/hooks/useLang";
import HeroGallery from "@/components/home/HeroGallery";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";
import { equipmentCategories, fleetVideos } from "@/data/equipment";

function ToggleHarness() {
  const { lang, setLang } = useLang();
  return (
    <button data-testid="lang-toggle" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
      {lang}
    </button>
  );
}

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LangProvider>
        <ToggleHarness />
        {ui}
      </LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("Homepage gallery i18n toggle", () => {
  it("HeroGallery section heading switches EN ↔ BN", () => {
    renderWithProviders(<HeroGallery />);
    expect(screen.getByText("Auto-rotating fleet gallery")).toBeInTheDocument();
    act(() => { screen.getByTestId("lang-toggle").click(); });
    expect(screen.getByText("স্বয়ংক্রিয় ফ্লিট গ্যালারি")).toBeInTheDocument();
    expect(screen.queryByText("Auto-rotating fleet gallery")).not.toBeInTheDocument();
    act(() => { screen.getByTestId("lang-toggle").click(); });
    expect(screen.getByText("Auto-rotating fleet gallery")).toBeInTheDocument();
  });

  it("LiveFleetPhotos heading, description, and All filter switch EN ↔ BN", () => {
    renderWithProviders(<LiveFleetPhotos />);
    expect(screen.getByText("Current-condition media stream")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();

    act(() => { screen.getByTestId("lang-toggle").click(); });

    expect(screen.getByText("বর্তমান অবস্থার মিডিয়া স্ট্রিম")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "সবগুলো" })).toBeInTheDocument();
    // Category filter pills should be in Bengali
    for (const c of equipmentCategories) {
      expect(screen.getByRole("button", { name: c.bangla })).toBeInTheDocument();
    }
  });

  it("Video card label switches to its Bengali translation", () => {
    renderWithProviders(<LiveFleetPhotos />);
    const enLabel = fleetVideos[0].label;
    const bnLabel = fleetVideos[0].labelBn!;
    expect(screen.getAllByText(enLabel).length).toBeGreaterThan(0);
    act(() => { screen.getByTestId("lang-toggle").click(); });
    expect(screen.getAllByText(bnLabel).length).toBeGreaterThan(0);
    expect(screen.queryByText(enLabel)).not.toBeInTheDocument();
  });

  it("REAL/AI photo source badges localize", () => {
    const { container } = renderWithProviders(<LiveFleetPhotos />);
    expect(within(container).getAllByText("REAL").length).toBeGreaterThan(0);
    act(() => { screen.getByTestId("lang-toggle").click(); });
    expect(within(container).getAllByText("আসল").length).toBeGreaterThan(0);
    expect(within(container).queryByText("REAL")).not.toBeInTheDocument();
  });
});
