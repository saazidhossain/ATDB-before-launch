import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { projectsData } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function ProjectHighlights() {
  const { t, lang } = useLang();
  const featured = projectsData.slice(0, 6);
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">{t("Project Highlights", "প্রজেক্ট হাইলাইটস")}</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">{t("Powering Bangladesh's biggest builds.", "বাংলাদেশের সবচেয়ে বড় নির্মাণে শক্তি যোগাচ্ছি।")}</h2>
            <p className="text-white/50 mt-3">{t("Six representative builds across mega-infrastructure, industrial, roadways and specialised civil works.", "ছয়টি প্রতিনিধিত্বমূলক প্রজেক্ট — মেগা ইনফ্রাস্ট্রাকচার, শিল্প, সড়ক ও বিশেষ সিভিল ওয়ার্কস জুড়ে।")}</p>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-orange-400 transition-colors">
            {t("View all projects", "সব প্রজেক্ট দেখুন")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <div key={i} className="group glass-card rounded-2xl overflow-hidden glass-hover">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={project.image} alt={lang === "bn" ? project.titleBn : project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-[10px] font-semibold text-orange-400 tracking-wider uppercase">{lang === "bn" ? project.typeBn : project.type}</div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/60 text-xs">
                  <MapPin className="w-3 h-3" />
                  {lang === "bn" ? project.locationBn : project.location}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">{lang === "bn" ? project.titleBn : project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
