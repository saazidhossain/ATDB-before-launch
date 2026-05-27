import { useState, useCallback } from "react";
import { Download, ShoppingCart } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useCart } from "@/hooks/useCart";
import { generateEquipmentPDF } from "@/lib/generatePDF";
import { getWhatsAppRentUrl, Equipment } from "@/data/equipment";

export default function EquipmentActions({ equipment }: { equipment: Equipment }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const { t, lang } = useLang();
  const { add, setOpen: setCartOpen } = useCart();

  const handlePDF = useCallback(async () => {
    if (!equipment || pdfLoading) return;
    setPdfLoading(true);
    try {
      await generateEquipmentPDF(equipment, lang);
    } finally {
      setPdfLoading(false);
    }
  }, [equipment, pdfLoading, lang]);

  return (
    <div className="space-y-3">
      {/* Prominent: Download Spec Sheet */}
      <button
        onClick={handlePDF}
        disabled={pdfLoading}
        className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base sm:text-lg transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-400/30 disabled:opacity-60 text-center leading-snug"
      >
        <Download className={`w-5 h-5 flex-shrink-0 ${pdfLoading ? "animate-bounce" : ""}`} />
        <span className="min-w-0">
          {pdfLoading
            ? t("Generating PDF…", "PDF তৈরি হচ্ছে…")
            : t("Download Spec Sheet (PDF)", "স্পেক শীট ডাউনলোড করুন (PDF)")
          }
        </span>
      </button>

      {/* Add to cart → opens summary drawer before WhatsApp */}
      <button
        onClick={() => {
          add({ id: equipment.id, name: equipment.name, brand: equipment.brand, capacity: equipment.capacity, image: equipment.realPhotos?.[0] || equipment.image });
          setCartOpen(true);
        }}
        className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base sm:text-lg transition-all border border-orange-500/40 text-center leading-snug"
      >
        <ShoppingCart className="w-5 h-5 text-orange-300 flex-shrink-0" />
        <span className="min-w-0">
          {t("Add to Rental Cart — review before WhatsApp", "ভাড়ার কার্টে যোগ করুন — WhatsApp-এর আগে রিভিউ")}
        </span>
      </button>

      {/* Direct quote (for single item, skips cart) */}
      <a
        href={getWhatsAppRentUrl(equipment.name, equipment.id, equipment.capacity)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl glass hover:bg-white/10 text-white/80 font-medium text-sm transition-all border border-white/10 text-center leading-snug"
      >
        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
        <span className="min-w-0">{t("Quick WhatsApp quote (single unit)", "দ্রুত WhatsApp কোটেশন (একক ইউনিট)")}</span>
      </a>
    </div>
  );
}
