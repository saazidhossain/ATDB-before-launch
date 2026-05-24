import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { projectsData, getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

const groupOrder = [
  { en: "Mega Infrastructure & Highway Projects", bn: "মেগা ইনফ্রাস্ট্রাকচার ও হাইওয়ে প্রজেক্ট", subEn: "National corridors, bridges and highway works.", subBn: "জাতীয় করিডোর, সেতু ও হাইওয়ে কাজ।", type: "Infrastructure" },
  { en: "Industrial & Factory Building Construction", bn: "শিল্প ও কারখানা ভবন নির্মাণ", subEn: "Pharma plants, factory shells and supporting structures.", subBn: "ফার্মা প্ল্যান্ট, ফ্যাক্টরি বিল্ডিং ও সহায়ক কাঠামো।", type: "Industrial" },
  { en: "Roadways & Pavement Construction", bn: "অভ্যন্তরীণ সড়ক ও পেভমেন্ট নির্মাণ", subEn: "Internal bituminous and RCC paved roads.", subBn: "অভ্যন্তরীণ বিটুমিনাস ও আর.সি.সি পেভড সড়ক।", type: "Roadways" },
  { en: "Drainage, Reservoirs & Specialised Civil Works", bn: "ড্রেনেজ, রিজার্ভার ও বিশেষ সিভিল ওয়ার্কস", subEn: "Underground tanks, ETP, drainage networks and retaining walls.", subBn: "ভূগর্ভস্থ ট্যাংক, ETP, ড্রেনেজ নেটওয়ার্ক ও রিটেইনিং ওয়াল।", type: "Civil Works" },
];

export default function Projects() {
  const { t, lang } = useLang();
  const groups = groupOrder.map(g => ({ ...g, items: projectsData.filter(p => p.type === g.type) }));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.07] bg-[url('/assets/jamuna-bridge-DWAJN5oY.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-justify">
          <p className="eyebrow mb-3">{t("Project Portfolio", "প্রজেক্ট পোর্টফোলিও")}</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display max-w-3xl">{t("Powering national infrastructure & industrial development.", "জাতীয় অবকাঠামো ও ইন্ডাস্ট্রিয়াল উন্নয়নে শক্তি যোগাচ্ছি।")}</h1>
          <p className="text-white/55 mt-5 max-w-2xl leading-relaxed">{t("M/S ATDB Trade International has successfully delivered a wide spectrum of heavy engineering, civil construction and infrastructure works across Bangladesh. Below is a categorised view of our major executed projects.", "মেসার্স ATDB ট্রেড ইন্টারন্যাশনাল সারা বাংলাদেশে বিভিন্ন ভারী প্রকৌশল, সিভিল কন্সট্রাকশন ও অবকাঠামোগত কাজ সফলভাবে সম্পন্ন করেছে। আমাদের উল্লেখযোগ্য সম্পন্নকৃত প্রজেক্টসমূহ ক্যাটাগরি অনুযায়ী নিচে দেওয়া হলো।")}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {groups.map((g, i) => (
              <a key={g.type} href={`#group-${i}`} className="px-4 py-2 rounded-full glass text-xs font-medium text-white/80 hover:text-orange-300 hover:bg-white/10 transition-colors border border-white/10">
                {i + 1}. {lang === "bn" ? g.bn : g.en}
              </a>
            ))}
          </div>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section key={g.type} id={`group-${gi}`} className={`pb-16 pt-4 ${gi % 2 === 1 ? "bg-[hsl(220_22%_7%)]/40" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow mb-3">{String(gi + 1).padStart(2, "0")} · {g.items.length} {t("PROJECTS", "প্রজেক্ট")}</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">{lang === "bn" ? g.bn : g.en}</h2>
            <p className="text-white/50 text-sm mt-1.5">{lang === "bn" ? g.subBn : g.subEn}</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {g.items.map((p, i) => (
                <article key={i} className="group glass-card rounded-2xl overflow-hidden glass-hover card-tilt flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={lang === "bn" ? p.titleBn : p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-orange-400 text-[11px] font-semibold uppercase tracking-wider"><MapPin className="w-3 h-3" />{lang === "bn" ? p.locationBn : p.location}</div>
                    <h3 className="mt-2 font-semibold text-white font-display group-hover:text-orange-400 transition-colors leading-snug">{lang === "bn" ? p.titleBn : p.title}</h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">{lang === "bn" ? p.descriptionBn : p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA strip */}
      <section className="relative text-justify px-[5px] py-[5px]">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white">{t("Have a new project?", "নতুন প্রজেক্ট আছে?")}</h3>
              <p className="text-white/85 mt-1.5 max-w-2xl text-sm">{t("From mega-bridge approaches to factory drainage — tell ATDB about your scope, timeline and equipment needs.", "মেগা-ব্রিজ অ্যাপ্রোচ থেকে শুরু করে ফ্যাক্টরি ড্রেনেজ — আপনার স্কোপ, টাইমলাইন ও ইকুইপমেন্ট প্রয়োজনের কথা ATDB-কে জানান।")}</p>
            </div>
            <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[hsl(220_22%_7%)] hover:bg-black text-white font-semibold text-sm shadow-xl transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"/></svg>
              {t("Start on WhatsApp", "হোয়াটসঅ্যাপে শুরু করুন")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
