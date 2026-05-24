import { Link } from "react-router-dom";
import { ShieldCheck, BadgeCheck, Award } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export default function StandardsStrip() {
  const { t } = useLang();
  const items = [
    {
      icon: ShieldCheck,
      code: "ISO 9001",
      label: t("Quality Management", "কোয়ালিটি ম্যানেজমেন্ট"),
      tone: "text-blue-300 bg-slate-800",
      ring: "ring-orange-400/30",
    },
    {
      icon: BadgeCheck,
      code: "CIS",
      label: t("City Inspection Services · Bangladesh", "সিটি ইন্সপেকশন সার্ভিসেস · বাংলাদেশ"),
      tone: "text-emerald-300",
      ring: "ring-orange-400/30",
    },
    {
      icon: Award,
      code: t("1st Class Contractor", "১ম শ্রেণির ঠিকাদার"),
      label: t("Govt. of Bangladesh classification", "বাংলাদেশ সরকার শ্রেণিভুক্ত"),
      tone: "text-orange-300",
      ring: "ring-orange-400/30",
    },
  ];

  return (
    <section className="relative w-full max-w-full py-14 md:py-20 border-t border-white/5 overflow-hidden [contain:layout_paint] [transform:translateZ(0)] text-justify">
      <div className="relative w-full max-w-7xl sm:px-6 lg:px-8 box-border text-justify py-0 mx-[2px] px-[20px]">
        <div className="mb-10">
          <p className="eyebrow mb-3">
            {t("International Standards & Compliance", "আন্তর্জাতিক মান ও কমপ্লায়েন্স")}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-display max-w-2xl mx-auto">
            {t(
              "Audited, classed and tender-ready credentials.",
              "অডিটেড, শ্রেণিভুক্ত ও টেন্ডার-প্রস্তুত ক্রেডেনশিয়াল।"
            )}
          </h2>
        </div>

        <ul className="list-none grid grid-cols-1 sm:grid-cols-3 gap-4 p-0 m-0 w-full max-w-full box-border [&>li]:list-none [&>li]:!ml-0 [&>li]:!pl-0 [&>li]:before:content-none [&>li]:marker:content-[''] font-bold border-2 border-none text-xs text-left mx-[5px] px-[5px] rounded-none">
          {items.map((it) => (
            <li key={it.code as string} className="list-none w-full max-w-full box-border text-justify">
              <Link
                to="/about"
                aria-label={`${it.code} — ${it.label}`}
                className={`group block w-full max-w-full h-full box-border glass-card glass-hover p-5 ring-1 ${it.ring} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background mx-0 border-none border-0 shadow text-justify py-[16px] rounded-3xl`}
              >
                <div className="flex items-start gap-4 w-full text-justify mx-[2px] px-[2px] py-[2px]">
                  <span className="w-12 h-12 rounded-full bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 group-focus-visible:scale-105 mx-[5px] my-[5px] py-[3px]">
                    <it.icon className={`w-6 h-6 ${it.tone}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col justify-center py-[3px]">
                    <span className="block text-[11px] tracking-[0.22em] text-white/50 mb-1 break-words text-center">
                      {it.code}
                    </span>
                    <span className="block text-sm font-semibold text-white/85 leading-snug break-words text-center">
                      {it.label}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
