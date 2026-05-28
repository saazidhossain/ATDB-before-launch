import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { equipmentData } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

import EquipmentGallery from "@/components/EquipmentGallery";
import EquipmentSpecs from "@/components/EquipmentSpecs";
import EquipmentActions from "@/components/EquipmentActions";

export default function EquipmentDetail() {
  const { id } = useParams();
  const equipment = equipmentData.find(e => e.id === id);
  const { t } = useLang();

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Equipment not found", "যন্ত্রপাতি পাওয়া যায়নি")}</h1>
          <Link to="/equipment" className="text-orange-400 hover:underline">{t("Back to Equipment", "যন্ত্রপাতিতে ফিরুন")}</Link>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(equipment.realPhotos || []),
    equipment.image,
  ];

  const hasVideos = equipment.videos && equipment.videos.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link to="/equipment" className="hover:text-white transition-colors flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> {t("Equipment", "যন্ত্রপাতি")}</Link>
            <span>/</span>
            <Link to={`/equipment/${equipment.category}`} className="hover:text-white transition-colors">{equipment.categoryLabel}</Link>
            <span>/</span>
            <span className="text-white/70">{equipment.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <EquipmentGallery equipment={equipment} allImages={allImages} hasVideos={hasVideos} />

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full glass text-xs font-mono text-white/60">{equipment.id}</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">{equipment.categoryLabel}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{equipment.name}</h1>
              <p className="text-white/50 text-lg mb-8">{equipment.brand} · {equipment.model}</p>

              {/* Specs grid */}
              <EquipmentSpecs equipment={equipment} />

              {/* CTAs */}
              <EquipmentActions equipment={equipment} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
