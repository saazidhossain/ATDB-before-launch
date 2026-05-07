import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipmentData, getWhatsAppRentUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function FeaturedEquipment() {
  const { t } = useLang();
  const featured = equipmentData.filter(e => e.featured);

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">{t("Featured Equipment", "ফিচার্ড ইকুইপমেন্ট")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">{t("Flagship machines from our certified fleet.", "আমাদের সার্টিফাইড ফ্লিটের ফ্ল্যাগশিপ মেশিন।")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(eq => (
            <div key={eq.id} className="group glass-card rounded-2xl overflow-hidden glass-hover flex flex-col">
              <Link to={`/equipment/${eq.category}/${eq.id}`} className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={eq.realPhotos?.[0] || eq.image}
                  alt={eq.name}
                  className="image-polish w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-orange-500/10" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-medium text-white/80">
                  {eq.brand}
                </div>
                {eq.realPhotos && eq.realPhotos.length > 0 && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green-600/80 backdrop-blur text-[10px] font-semibold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {t("REAL PHOTO", "আসল ছবি")}
                  </div>
                )}
              </Link>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-white/40">{eq.id}</span>
                  <span className="text-[10px] text-white/30">·</span>
                  <span className="text-[10px] text-orange-400/70">{eq.categoryLabel}</span>
                </div>
                <Link to={`/equipment/${eq.category}/${eq.id}`} className="text-lg font-semibold text-white hover:text-orange-400 transition-colors">
                  {eq.name}
                </Link>
                <p className="text-sm text-white/40 mt-1">{eq.capacity} · {eq.origin} · {eq.year}</p>

                <div className="mt-auto pt-4 flex items-center gap-3">
                  <a
                    href={getWhatsAppRentUrl(eq.name, eq.id, eq.capacity)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-green-900/20"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                    {t("Rent Now", "ভাড়া নিন")}
                  </a>
                  <Link
                    to={`/equipment/${eq.category}/${eq.id}`}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-white/70 text-xs font-medium transition-colors"
                  >
                    {t("Details", "বিস্তারিত")} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
