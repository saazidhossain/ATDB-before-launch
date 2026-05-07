import { Shield, Zap, Phone, DollarSign, Milestone } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export default function WhyATDB() {
  const { t } = useLang();

  const reasons = [
    { icon: Shield, title: t("Reliable Fleet", "নির্ভরযোগ্য ফ্লিট"), desc: t("26 years of mission-critical maintenance and operator training keep every unit job-ready.", "২৬ বছরের মেইনটেন্যান্স ও অপারেটর ট্রেনিং — প্রতিটি ইউনিট সবসময় জব-রেডি।") },
    { icon: Zap, title: t("Safety First", "সেফটি ফার্স্ট"), desc: t("City Inspection Services certified equipment. ISO-aligned operating protocols on every site.", "City Inspection Services সার্টিফাইড। প্রতিটি সাইটে ISO-সমন্বিত প্রটোকল।") },
    { icon: Phone, title: t("Instant WhatsApp Service", "ইন্সট্যান্ট হোয়াটসঅ্যাপ সার্ভিস"), desc: t("Direct line to leadership. Quotations and confirmations in minutes, not days.", "নেতৃত্বের সাথে সরাসরি লাইন। কোটেশন ও কনফার্মেশন মিনিটে।") },
    { icon: DollarSign, title: t("Transparent Pricing", "স্বচ্ছ মূল্য"), desc: t("Simple per-day & per-project rates. No hidden mobilisation or fuel surprises.", "সহজ পার-ডে ও পার-প্রজেক্ট রেট। কোনো হিডেন চার্জ নেই।") },
  ];

  const milestones = [
    { year: "2000", title: t("Founded in Dhaka", "ঢাকায় প্রতিষ্ঠা"), desc: t("ATDB Trade International begins heavy-equipment rental operations.", "ATDB Trade International হেভি ইকুইপমেন্ট রেন্টাল অপারেশন শুরু।") },
    { year: "2008", title: t("Tangail Branch Opens", "টাঙ্গাইল শাখা চালু"), desc: t("Regional yard expands fleet reach to north-central infrastructure projects.", "আঞ্চলিক ইয়ার্ড — উত্তর-কেন্দ্রীয় ইনফ্রাস্ট্রাকচার প্রজেক্টে ফ্লিট সম্প্রসারণ।") },
    { year: "2014", title: t("Cranes & Rollers Modernised", "ক্রেন ও রোলার আধুনিকায়ন"), desc: t("Sakai, Liebherr & Kato units added; fleet crosses 25 machines.", "সাকাই, লিবহার ও কাটো ইউনিট যুক্ত; ফ্লিট ২৫ মেশিন অতিক্রম।") },
    { year: "2018", title: t("CIS Certification", "CIS সার্টিফিকেশন"), desc: t("All lifting equipment independently inspected — CIS/077/2018.", "সব লিফটিং ইকুইপমেন্ট স্বাধীনভাবে পরিদর্শিত — CIS/077/2018।") },
    { year: "2022", title: t("1st Class Contractor", "১ম শ্রেণির ঠিকাদার"), desc: t("Government classification; eligible for top-tier tenders nationwide.", "সরকার-শ্রেণিভুক্ত; দেশজুড়ে শীর্ষ-স্তরের টেন্ডারের জন্য যোগ্য।") },
    { year: "2026", title: t("26 Years Strong", "২৬ বছর শক্তিশালী"), desc: t("30+ certified machines, 25 staff, two offices, one trusted partner.", "৩০+ সার্টিফাইড মেশিন, ২৫ কর্মী, দুই অফিস — একটি বিশ্বস্ত পার্টনার।") },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-3">{t("Why ATDB", "কেন ATDB")}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">{t("26 years of certified, on-site delivery — and counting.", "২৬ বছরের সার্টিফাইড, অন-সাইট ডেলিভারি — এবং চলছে।")}</h2>
          <p className="text-white/50 leading-relaxed">
            {t("Bangladesh's largest road, bridge, pharma and industrial developers come back to ATDB because every machine is certified, every operator is trained, and every quotation arrives on WhatsApp within minutes.", "বাংলাদেশের শীর্ষ রোড, ব্রিজ, ফার্মা ও ইন্ডাস্ট্রিয়াল ডেভেলপাররা ATDB-তে ফিরে আসেন — প্রতিটি মেশিন সার্টিফাইড, প্রতিটি অপারেটর প্রশিক্ষিত এবং প্রতিটি কোটেশন মিনিটেই WhatsApp-এ।")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
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

        {/* 26-year professional timeline */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <Milestone className="w-5 h-5 text-orange-400" />
            <p className="text-[11px] tracking-[0.28em] text-orange-300 uppercase font-semibold">{t("Our 26-Year Journey", "আমাদের ২৬ বছরের যাত্রা")}</p>
          </div>

          <ol className="relative border-l border-orange-500/30 pl-6 sm:pl-8 space-y-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[33px] sm:-left-[41px] top-1 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-orange-500/15"
                />
                <div className="glass-card rounded-2xl p-5 glass-hover">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-display text-2xl font-bold text-orange-400">{m.year}</span>
                    <span className="text-base font-semibold text-white">{m.title}</span>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
