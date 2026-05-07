import { brands } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function BrandMarquee() {
  const { t } = useLang();
  const allBrands = [...brands, ...brands];
  return (
    <section className="py-10 border-y border-white/5 overflow-hidden bg-background/50">
      <p className="text-center text-xs font-mono tracking-[0.3em] text-white/30 uppercase mb-6">{t("Trusted brands in our fleet", "আমাদের ফ্লিটের ব্র্যান্ডসমূহ")}</p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {allBrands.map((brand, i) => (
            <span key={i} className="mx-8 text-white/40 font-semibold text-lg tracking-wide flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
