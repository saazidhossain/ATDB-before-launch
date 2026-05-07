import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider, useLang } from "@/hooks/useLang";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";
import HeroGallery from "@/components/home/HeroGallery";
import { equipmentCategories, equipmentData } from "@/data/equipment";

/**
 * In-test "language toggle" — the real toggle lives in <Navbar>, but the
 * gallery components consume the same context, so flipping the context
 * mirrors what the user does when they hit the EN|BN button.
 */
function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <button data-testid="switch-lang" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
      switch
    </button>
  );
}

function renderHome(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LangProvider>
        <LangSwitcher />
        {ui}
      </LangProvider>
    </MemoryRouter>
  );
}

describe("EN <-> BN switch with filters applied", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("every filter pill, REAL/AI badge, and card label updates when language flips", () => {
    renderHome(<LiveFleetPhotos />);

    // Apply a category filter so we are testing the filtered state, not just "All".
    const ranersCat = equipmentCategories.find(c => c.slug === "rollers")!;
    fireEvent.click(screen.getByText(ranersCat.label));

    // English baseline: filter pill, REAL badge, AI badge.
    expect(screen.getAllByText("REAL").length).toBeGreaterThan(0);
    expect(screen.getByText(ranersCat.label)).toBeInTheDocument();

    // Flip to Bengali.
    fireEvent.click(screen.getByTestId("switch-lang"));

    // Filter pill should now be Bengali.
    expect(screen.getByText(ranersCat.bangla)).toBeInTheDocument();
    expect(screen.queryByText(ranersCat.label)).not.toBeInTheDocument();

    // REAL/AI badges in Bengali.
    expect(screen.getAllByText("আসল").length).toBeGreaterThan(0);
    expect(screen.queryByText("REAL")).not.toBeInTheDocument();

    // At least one card with a banglaLabel should now show that label, not its English name.
    const rollerWithBn = equipmentData.find(
      e => e.category === "rollers" && e.realPhotos?.length && e.banglaLabel
    );
    if (rollerWithBn) {
      expect(screen.getAllByText(rollerWithBn.banglaLabel!).length).toBeGreaterThan(0);
      expect(screen.queryByText(rollerWithBn.name)).not.toBeInTheDocument();
    }
  });

  it("HeroGallery video LIVE/REAL badge translates", () => {
    renderHome(<HeroGallery />);

    // Either LIVE VIDEO or REAL PHOTO is on screen depending on first slide; both have BN copies.
    const enBadge = screen.queryByText("LIVE VIDEO") || screen.queryByText("REAL PHOTO");
    expect(enBadge).not.toBeNull();

    fireEvent.click(screen.getByTestId("switch-lang"));

    const bnBadge = screen.queryByText("লাইভ ভিডিও") || screen.queryByText("আসল ছবি");
    expect(bnBadge).not.toBeNull();
  });

  it("section heading updates when language flips while a filter is active", () => {
    renderHome(<LiveFleetPhotos />);
    fireEvent.click(screen.getByText("Mobile Cranes"));
    expect(screen.getByText("Current-condition media stream")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("switch-lang"));
    expect(screen.getByText("বর্তমান অবস্থার মিডিয়া স্ট্রিম")).toBeInTheDocument();
  });
});
