import { ArrowRight } from "lucide-react";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function CTASection() {
  const { t } = useLang();
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-orange-950/30 via-background to-background border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10 text-justify">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4 font-display text-center">{t("Ready to mobilise? Get a quote in minutes.", "মোবিলাইজ করতে প্রস্তুত?  \n মিনিটে কোটেশন নিন।")}</h2>
          <p className="text-white/50 leading-relaxed text-center">
            {t("Tell us your equipment, location and dates on WhatsApp — we'll respond with availability and pricing.", "হোয়াটসঅ্যাপে আমাদের ইকুইপমেন্ট, লোকেশন ও তারিখ জানান — আমরা অ্যাভেইলেবিলিটি ও প্রাইস জানিয়ে দেব।")}
          </p>
        </div>
        <a
          href={getWhatsAppQuoteUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 rounded-full tracking-wide transition-all shadow-2xl shadow-green-600/20 hover:shadow-green-500/30 text-slate-100 bg-[#2d9a55] font-normal text-justify"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          {t("START ON WHATSAPP", "হোয়াটসঅ্যাপে শুরু করুন")}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
