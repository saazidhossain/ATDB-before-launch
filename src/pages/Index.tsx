import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import HeroGallery from "@/components/home/HeroGallery";
import EquipmentCategories from "@/components/home/EquipmentCategories";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";
import ProjectHighlights from "@/components/home/ProjectHighlights";
import StandardsStrip from "@/components/home/StandardsStrip";

/**
 * SAFE-LAZY POLICY
 * ----------------
 * We only lazy-load components that do NOT consume Router context (no Link,
 * useNavigate, useLocation, etc.). Lazy-loading a Router consumer can race the
 * Vite dependency pre-bundle and produce a "useContext is null" crash because
 * the chunk reads a stale React context.
 *
 * Eager (must stay imported at top): anything that uses react-router-dom.
 * Lazy-safe: BrandMarquee, WhyATDB, CTASection, WhatsAppFAB.
 *
 * If you add a new home section, audit it for `react-router-dom` imports
 * before lazy-loading it. The vitest suite `src/test/safe-lazy.test.ts`
 * enforces this rule automatically.
 */
const BrandMarquee = lazy(() => import("@/components/home/BrandMarquee"));
const WhyATDB = lazy(() => import("@/components/home/WhyATDB"));
const CTASection = lazy(() => import("@/components/home/CTASection"));
const WhatsAppFAB = lazy(() => import("@/components/WhatsAppFAB"));

const Reserve = ({ minHeight }: { minHeight: number }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<Reserve minHeight={120} />}>
        <BrandMarquee />
      </Suspense>
      <HeroGallery />
      <EquipmentCategories />
      <FeaturedEquipment />
      <LiveFleetPhotos />
      <Suspense fallback={<Reserve minHeight={400} />}>
        <WhyATDB />
      </Suspense>
      <ProjectHighlights />
      <StandardsStrip />
      <Suspense fallback={<Reserve minHeight={300} />}>
        <CTASection />
      </Suspense>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppFAB />
      </Suspense>
    </div>
  );
}
