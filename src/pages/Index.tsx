import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import BrandMarquee from "@/components/home/BrandMarquee";
import HeroGallery from "@/components/home/HeroGallery";

// Below-fold sections are lazy-loaded so they don't block FCP/LCP
const EquipmentCategories = lazy(() => import("@/components/home/EquipmentCategories"));
const FeaturedEquipment = lazy(() => import("@/components/home/FeaturedEquipment"));
const LiveFleetPhotos = lazy(() => import("@/components/home/LiveFleetPhotos"));
const WhyATDB = lazy(() => import("@/components/home/WhyATDB"));
const ProjectHighlights = lazy(() => import("@/components/home/ProjectHighlights"));
const CTASection = lazy(() => import("@/components/home/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppFAB = lazy(() => import("@/components/WhatsAppFAB"));

// Reserves visual space so a deferred section doesn't pop and shift the page.
const SectionSkeleton = ({ minHeight = 400 }: { minHeight?: number }) => (
  <div style={{ minHeight }} aria-hidden="true" />
);

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <BrandMarquee />
      <HeroGallery />
      <Suspense fallback={<SectionSkeleton minHeight={500} />}>
        <EquipmentCategories />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={600} />}>
        <FeaturedEquipment />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={700} />}>
        <LiveFleetPhotos />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={400} />}>
        <WhyATDB />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={400} />}>
        <ProjectHighlights />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={300} />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppFAB />
      </Suspense>
    </div>
  );
}
