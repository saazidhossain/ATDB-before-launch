import { Shield, Award, Users, Clock, UserCircle2, Briefcase, Globe2, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { useLang } from "@/hooks/useLang";
import certIso from "@/assets/cert-iso-9001.png";
import certCis from "@/assets/cert-cis.png";
import cert1stClass from "@/assets/cert-1st-class.png";

export default function About() {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("About ATDB", "ATDB সম্পর্কে")}</p>
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl font-display">{t("Built in 2000. Trusted by Bangladesh's biggest builders.", "২০০০ সালে প্রতিষ্ঠিত। বাংলাদেশের শীর্ষ নির্মাতাদের আস্থা।")}</h1>
          <p className="text-white/50 mt-6 max-w-2xl leading-relaxed">{t("M/S ATDB Trade International is a 1st Class Contractor and Heavy Equipment Service Provider headquartered in Dhaka with a branch in Tangail. 25+ years of certified fleet operations, 25 permanent staff, and a portfolio that spans national infrastructure, pharma and industrial development.", "M/S ATDB Trade International ঢাকায় সদর দপ্তর ও টাঙ্গাইলে শাখা সহ একটি ১ম শ্রেণির ঠিকাদার ও হেভি ইকুইপমেন্ট সার্ভিস প্রোভাইডার। ২৫+ বছরের সার্টিফাইড ফ্লিট অপারেশন, ২৫ জন স্থায়ী কর্মী এবং জাতীয় অবকাঠামো, ফার্মা ও ইন্ডাস্ট্রিয়াল উন্নয়নের পোর্টফোলিও।")}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Clock, title: t("Since 2000", "২০০০ সাল থেকে"), desc: t("Over 26 years of continuous heavy equipment rental operations.", "২৬+ বছরের নিরবিচ্ছিন্ন হেভি ইকুইপমেন্ট রেন্টাল অপারেশন।") },
            { icon: Shield, title: t("Certified Fleet", "সার্টিফাইড ফ্লিট"), desc: t("All equipment inspected by City Inspection Services, Bangladesh.", "সব ইকুইপমেন্ট City Inspection Services, বাংলাদেশ দ্বারা পরিদর্শিত।") },
            { icon: Users, title: t("Expert Operators", "দক্ষ অপারেটর"), desc: t("25+ skilled operators and mechanics keeping the fleet job-ready.", "২৫+ দক্ষ অপারেটর ও মেকানিক — ফ্লিট সবসময় জব-রেডি।") },
            { icon: Award, title: t("Government Compliant", "সরকার-সম্মত"), desc: t("Full regulatory compliance for infrastructure and public works projects.", "ইনফ্রাস্ট্রাকচার ও পাবলিক ওয়ার্কস প্রজেক্টের জন্য সম্পূর্ণ রেগুলেটরি কমপ্লায়েন্স।") },
          ].map(item => (
            <div key={item.title} className="glass-card rounded-2xl p-6 glass-hover card-tilt">
              <item.icon className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 font-display">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("Leadership", "নেতৃত্ব")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display max-w-3xl">{t("A family-owned operation, professionally run.", "পারিবারিক মালিকানাধীন প্রতিষ্ঠান, পেশাদারভাবে পরিচালিত।")}</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { role: t("PROPRIETOR", "মালিক"), name: t("Md. Saiful Alam (Milon)", "মো. সাইফুল আলম (মিলন)"), phone: "+8801712106242" },
              { role: t("CHIEF EXECUTIVE OFFICER", "প্রধান নির্বাহী কর্মকর্তা"), name: t("Md. Rezaur Rahman Khan (Baboo)", "মো. রেজাউর রহমান খান (বাবু)"), phone: "+8801816666067" },
              { role: t("DIRECTOR", "পরিচালক"), name: t("Fayyaz Alam", "​ফাইয়াজ আলম"), phone: "+8801717221930" },
            ].map(p => (
              <div key={p.role} className="glass-card rounded-2xl p-6 glass-hover card-tilt flex items-start gap-4 py-[24px]">
                <UserCircle2 className="lucide lucide-circle-user-round w-10 h-10 text-orange-400 flex-shrink-0 my-[26px]" />
                <div className="min-w-0">
                  <p className="text-[11px] tracking-[0.22em] text-white/50 mb-1">{p.role}</p>
                  <h3 className="text-xl font-semibold font-display break-words">{p.name}</h3>
                  <a href={`tel:${p.phone}`} className="text-sm text-orange-300 hover:text-orange-200 mt-1 inline-block break-all">{p.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("Credentials", "ক্রেডেনশিয়াল")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display">{t("Certified, compliant, audit-ready.", "সার্টিফাইড, কমপ্লায়েন্ট, অডিট-প্রস্তুত।")}</h2>
          <p className="text-white/50 mt-3 max-w-2xl">{t("Independently inspected, government-classed and fully documented for tender submissions.", "স্বাধীন পরিদর্শিত, সরকার-শ্রেণিভুক্ত এবং টেন্ডারের জন্য সম্পূর্ণ ডকুমেন্টেড।")}</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
            {[
              {
                code: "ISO 9001",
                title: t("Quality Management", "কোয়ালিটি ম্যানেজমেন্ট"),
                ref: t("Aligned process & maintenance standards", "প্রসেস ও মেইনটেন্যান্স মান অনুসরণ"),
                ring: "from-blue-500/25 to-blue-500/0",
                img: certIso,
                alt: t("ISO 9001 Quality Management certification seal", "ISO 9001 কোয়ালিটি ম্যানেজমেন্ট সিল"),
              },
              {
                code: "CIS",
                title: t("City Inspection Services", "সিটি ইন্সপেকশন সার্ভিসেস"),
                ref: "CIS/077/2018",
                ring: "from-emerald-500/25 to-emerald-500/0",
                img: certCis,
                alt: t("City Inspection Services Bangladesh seal", "সিটি ইন্সপেকশন সার্ভিসেস বাংলাদেশ সিল"),
              },
              {
                code: t("1st Class", "১ম শ্রেণি"),
                title: t("Contractor & Supplier", "ঠিকাদার ও সরবরাহকারী"),
                ref: t("Govt. of Bangladesh classification", "বাংলাদেশ সরকার শ্রেণিভুক্ত"),
                ring: "from-orange-500/30 to-orange-500/0",
                img: cert1stClass,
                alt: t("1st Class Contractor & Supplier seal — Govt. of Bangladesh", "১ম শ্রেণির ঠিকাদার সিল — বাংলাদেশ সরকার"),
              },
            ].map(c => (
              <div
                key={c.title as string}
                tabIndex={0}
                role="group"
                aria-label={`${c.code} — ${c.title}`}
                className="group glass-card glass-hover card-tilt rounded-2xl p-5 sm:p-6 relative overflow-hidden text-center w-full max-w-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:-translate-y-0.5 focus-visible:-translate-y-0.5 transition-transform"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${c.ring} blur-3xl opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm flex items-center justify-center p-2 shadow-lg shadow-black/30 transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105">
                    <img
                      src={c.img}
                      alt={c.alt as string}
                      width={224}
                      height={224}
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                  <p className="text-[11px] tracking-[0.22em] text-white/50 mt-5">{c.code}</p>
                  <p className="font-semibold font-display mt-1">{c.title}</p>
                  <p className="text-sm text-white/50 mt-1 break-words">{c.ref}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 glass-card rounded-2xl p-5 text-sm text-white/60">
            {t("TIN, VAT and Trade License documentation available on request for tender pre-qualification.", "TIN, VAT ও ট্রেড লাইসেন্স ডকুমেন্টেশন টেন্ডার প্রি-কোয়ালিফিকেশনের জন্য অনুরোধে সরবরাহ করা হয়।")}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("Our Values", "আমাদের মূল্যবোধ")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display max-w-3xl">{t("How we earn the call-back, every project.", "প্রতি প্রজেক্টে কীভাবে আমরা পরবর্তী কলটি অর্জন করি।")}</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: t("Safety First", "নিরাপত্তা সর্বাগ্রে"), desc: t("CIS-certified equipment. Operator training and PPE compliance on every site.", "CIS-সার্টিফাইড ইকুইপমেন্ট। প্রতিটি সাইটে অপারেটর ট্রেনিং ও PPE কমপ্লায়েন্স।") },
              { icon: Award, title: t("Compliance", "কমপ্লায়েন্স"), desc: t("TIN, VAT, Trade License and 1st Class status — full documentation for tenders.", "TIN, VAT, ট্রেড লাইসেন্স ও ১ম শ্রেণির স্ট্যাটাস — টেন্ডারের জন্য সম্পূর্ণ ডকুমেন্টেশন।") },
              { icon: Clock, title: t("Reliability", "নির্ভরযোগ্যতা"), desc: t("26 years uninterrupted across roads, bridges, pharma and industrial projects.", "২৬ বছর নিরবিচ্ছিন্ন — সড়ক, সেতু, ফার্মা ও ইন্ডাস্ট্রিয়াল প্রজেক্ট জুড়ে।") },
              { icon: Leaf, title: t("Responsibility", "দায়িত্ব"), desc: t("Environmental and safety policies aligned with national and donor-agency standards.", "পরিবেশ ও নিরাপত্তা নীতি — জাতীয় ও ডোনার-এজেন্সি মানের সাথে সামঞ্জস্যপূর্ণ।") },
            ].map(v => (
              <div key={v.title} className="glass-card rounded-2xl p-6 glass-hover card-tilt">
                <v.icon className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2 font-display">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Associate Expertise */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("Associate Expertise", "সহযোগী দক্ষতা")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display max-w-3xl">{t("An MBA-led associate team with global project depth.", "MBA-নেতৃত্বাধীন সহযোগী টিম — বৈশ্বিক প্রজেক্টের গভীর অভিজ্ঞতা।")}</h2>
          <p className="text-white/50 mt-4 max-w-3xl leading-relaxed">{t("Our Associate MBA Provision carries vast experience in Human Resources, civil engineering, supplies, consultancy and business development on international projects — Jamuna Bridge, MRT Line-6, BRT, Digital Telecommunications, Hydrocarbon and more — partnering with global firms from Japan, South Korea, China, Europe, USA and the Middle East.", "আমাদের অ্যাসোসিয়েট MBA প্রভিশন — হিউম্যান রিসোর্স, সিভিল ইঞ্জিনিয়ারিং, সরবরাহ, কনসালট্যান্সি ও ব্যবসা উন্নয়নে বিস্তৃত অভিজ্ঞতা। যমুনা সেতু, MRT লাইন-৬, BRT, ডিজিটাল টেলিকমিউনিকেশনস, হাইড্রোকার্বন প্রজেক্টসহ — জাপান, দক্ষিণ কোরিয়া, চীন, ইউরোপ, USA ও মধ্যপ্রাচ্যের আন্তর্জাতিক প্রতিষ্ঠানের সাথে অংশীদারিত্ব।")}</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: t("Human Resources", "হিউম্যান রিসোর্স") },
              { icon: Briefcase, label: t("Civil Engineering", "সিভিল ইঞ্জিনিয়ারিং") },
              { icon: Award, label: t("Consultancy", "কনসালট্যান্সি") },
              { icon: Globe2, label: t("Business Development", "ব্যবসা উন্নয়ন") },
            ].map(s => (
              <div key={s.label} className="glass-card rounded-2xl p-5 glass-hover text-center">
                <s.icon className="w-7 h-7 text-orange-400 mx-auto mb-3" />
                <p className="text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 glass-card rounded-2xl p-5">
            <p className="text-[11px] tracking-[0.22em] text-white/50 mb-2">{t("PARTNER REGIONS", "অংশীদার অঞ্চল")}</p>
            <p className="text-white/70 text-sm">{t("Japan · South Korea · China · Europe · USA · Middle East", "জাপান · দক্ষিণ কোরিয়া · চীন · ইউরোপ · USA · মধ্যপ্রাচ্য")}</p>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
