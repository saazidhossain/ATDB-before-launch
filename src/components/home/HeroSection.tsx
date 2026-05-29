import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";
import HeroMedia from "./HeroMedia";

export default function HeroSection() {
  const { t } = useLang();
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Cinematic looping hero video background */}
      <HeroMedia />

      {/* Single subtle ambient glow — replaces noisy floating dots */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-orange-500/[0.07] blur-3xl" style={{ zIndex: 2 }} />

      <div
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{
          paddingBottom: "clamp(5rem, 12vh, 9rem)",
          paddingLeft: "clamp(1.5rem, 7vw, 6rem)",
          paddingRight: "clamp(1.5rem, 7vw, 6rem)",
        }}
      >
        <p className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase mb-6">
          {t("​", "​")}
        </p>

        <h1 className="display-hero max-w-4xl font-display text-4xl py-[23px] text-left">
          {t("Bangladesh's premier ", "বাংলাদেশের সেরা ")}
          <span className="text-shimmer mx-0 rounded-lg font-serif text-5xl">{t("HeavY Equipment", "হেভি ইকুইপমেন্ট")}</span>
          {t(" rental partner.", " রেন্টাল পার্টনার।")}
        </h1>

        <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed">
          {t(
            "Professional heavy equipment rental and infrastructure support services for national-scale projects.",
            "জাতীয় পর্যায়ের প্রকল্পের জন্য পেশাদার হেভি ইকুইপমেন্ট রেন্টাল ও অবকাঠামো সাপোর্ট সার্ভিস।"
          )}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/equipment" className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-400/30">
            {t("BROWSE EQUIPMENT", "ইকুইপমেন্ট দেখুন")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-7 py-3.5 rounded-full glass hover:bg-white/10 text-white font-semibold text-sm tracking-wide transition-all">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {t("WHATSAPP A QUOTE", "হোয়াটসঅ্যাপে কোটেশন")}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl">
          {[
            { value: "26+", label: t("Years Experience", "বছরের অভিজ্ঞতা") },
            { value: "30+", label: t("Equipment Units", "ইকুইপমেন্ট ইউনিট") },
            { value: "25", label: t("Skilled Staff", "দক্ষ কর্মী") },
            { value: "2", label: t("Office Locations", "অফিস") },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 hover:bg-white/[0.08] hover:border-orange-500/30 hover:shadow-[0_10px_30px_-10px_rgba(245,130,32,0.15)] hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-black tracking-tight text-gradient mb-1.5">{stat.value}</div>
              <div className="text-[10px] sm:text-xs font-semibold text-white/60 tracking-[0.1em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
