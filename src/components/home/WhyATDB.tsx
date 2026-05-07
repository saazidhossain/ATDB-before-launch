import { Shield, Zap, Phone, DollarSign } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export default function WhyATDB() {
  const { t } = useLang();
  const reasons = [
    { icon: Shield, title: t("Reliable Fleet", "নির্ভরযোগ্য ফ্লিট"), desc: t("26 years of mission-critical maintenance and operator training keep every unit job-ready.", "২৬ বছরের মেইনটেন্যান্স ও অপারেটর ট্রেনিং — প্রতিটি ইউনিট সবসময় জব-রেডি।") },
    { icon: Zap, title: t("Safety First", "সেফটি ফার্স্ট"), desc: t("City Inspection Services certified equipment. ISO-aligned operating protocols on every site.", "City Inspection Services সার্টিফাইড। প্রতিটি সাইটে ISO-সমন্বিত প্রটোকল।") },
    { icon: Phone, title: t("Instant WhatsApp Service", "ইন্সট্যান্ট হোয়াটসঅ্যাপ সার্ভিস"), desc: t("Direct line to leadership. Quotations and confirmations in minutes, not days.", "নেতৃত্বের সাথে সরাসরি লাইন। কোটেশন ও কনফার্মেশন মিনিটে।") },
    { icon: DollarSign, title: t("Transparent Pricing", "স্বচ্ছ মূল্য"), desc: t("Simple per-day & per-project rates. No hidden mobilisation or fuel surprises.", "সহজ পার-ডে ও পার-প্রজেক্ট রেট। কোনো হিডেন চার্জ নেই।") },
  ];
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3">{t("Why ATDB", "কেন ATDB")}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">{t("A partner contractors return to, project after project.", "যে পার্টনারের কাছে কন্ট্রাক্টররা বারবার ফিরে আসে।")}</h2>
          <p className="text-white/50 leading-relaxed">
            {t("We've spent 25+ years earning the trust of Bangladesh's largest road, bridge, pharma and industrial developers — through certified equipment, disciplined operations, and zero-friction WhatsApp service.", "২৫+ বছর ধরে বাংলাদেশের শীর্ষ রোড, ব্রিজ, ফার্মা ও ইন্ডাস্ট্রিয়াল ডেভেলপারদের আস্থা অর্জন — সার্টিফাইড ইকুইপমেন্ট, ডিসিপ্লিনড অপারেশন ও দ্রুত হোয়াটসঅ্যাপ সার্ভিসের মাধ্যমে।")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div key={r.title} className="glass-card rounded-2xl p-6 glass-hover card-tilt group">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <r.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
