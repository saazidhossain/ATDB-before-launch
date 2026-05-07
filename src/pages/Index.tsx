import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import HeroSection from "@/components/home/HeroSection";
import HeroGallery from "@/components/home/HeroGallery";
import BrandMarquee from "@/components/home/BrandMarquee";
import EquipmentCategories from "@/components/home/EquipmentCategories";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import LiveFleetPhotos from "@/components/home/LiveFleetPhotos";
import WhyATDB from "@/components/home/WhyATDB";
import ProjectHighlights from "@/components/home/ProjectHighlights";
import CTASection from "@/components/home/CTASection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <BrandMarquee />
      <HeroGallery />
      <EquipmentCategories />
      <FeaturedEquipment />
      <LiveFleetPhotos />
      <WhyATDB />
      <ProjectHighlights />
      <CTASection />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
