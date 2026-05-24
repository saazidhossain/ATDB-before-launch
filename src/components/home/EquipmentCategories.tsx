import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function EquipmentCategories() {
  const { t, lang } = useLang();
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">{t("Our Equipment", "আমাদের ইকুইপমেন্ট")}</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">{t("A complete fleet for every job site.", "প্রতিটি প্রজেক্টের জন্য সম্পূর্ণ ফ্লিট।")}</h2>
          </div>
          <Link to="/equipment" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-orange-400 transition-colors">
            {t("View all", "সব দেখুন")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {equipmentCategories.map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/equipment/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl glass-card glass-hover aspect-[4/3] h-full flex"
            >
              <img src={cat.image} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full w-full flex flex-col justify-end p-6 min-w-0">
                <p lang={lang === "bn" ? "en" : "bn"} className="text-orange-300/80 text-xs font-medium mb-1 break-words [overflow-wrap:anywhere]">{lang === "bn" ? cat.label : cat.bangla}</p>
                <h3 lang={lang} className="text-xl font-bold text-white mb-1 font-display break-words [overflow-wrap:anywhere] leading-snug">{lang === "bn" ? cat.bangla : cat.label}</h3>
                <p className="text-white/50 text-sm break-words [overflow-wrap:anywhere]">
                  {cat.units} {cat.range && `· ${cat.range}`} · {cat.brands}
                </p>
                <div className="mt-4 flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-wider group-hover:gap-3 transition-all">
                  {t("EXPLORE", "দেখুন")} <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
