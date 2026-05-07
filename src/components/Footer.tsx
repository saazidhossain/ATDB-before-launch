import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Footer() {
  const { t } = useLang();
  const exploreLinks = [
    { to: "/equipment", label: t("Equipment", "ইকুইপমেন্ট") },
    { to: "/projects", label: t("Projects", "প্রজেক্ট") },
    { to: "/about", label: t("About", "পরিচিতি") },
    { to: "/contact", label: t("Contact", "যোগাযোগ") },
  ];
  const offices = [
    { name: t("Corporate Office", "কর্পোরেট অফিস"), addr: t("House #319 (8F), Lane #8, East Kazi Para, Kafrul, Dhaka-1216", "বাড়ি #৩১৯ (৮ম তলা), লেন #৮, পূর্ব কাজীপাড়া, কাফরুল, ঢাকা-১২১৬") },
    { name: t("Branch Office", "শাখা অফিস"), addr: t("House #311 (2F), Boro Kalibari Road, Tangail-1900", "বাড়ি #৩১১ (২য় তলা), বড় কালীবাড়ি রোড, টাঙ্গাইল-১৯০০") },
  ];
  return (
    <footer className="relative border-t border-white/5 bg-[hsl(220,22%,7%)] overflow-hidden">
      {/* Subtle ambient glow accents */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 w-[24rem] h-[24rem] rounded-full bg-orange-400/[0.04] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_1.15fr_0.95fr] gap-10 md:gap-12 lg:gap-14">
          {/* Brand */}
          <div>
            <AnimatedLogo className="md:!w-11 md:!h-11" size={88} />
            <p className="mt-5 max-w-[19rem] text-white/60 text-sm leading-relaxed">
              {t("Bangladesh's premier heavy equipment rental partner. Since 2000.", "বাংলাদেশের সেরা হেভি ইকুইপমেন্ট রেন্টাল পার্টনার। ২০০০ সাল থেকে।")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-white/90 mb-5 uppercase">{t("Explore", "অন্বেষণ")}</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/55 hover:text-orange-300 transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-white/90 mb-5 uppercase">{t("Offices", "অফিস")}</h3>
            <ul className="space-y-5">
              {offices.map(o => (
                <li key={o.name} className="flex gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white/90">{o.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{o.addr}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-white/90 mb-5 uppercase">{t("Contact", "যোগাযোগ")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+8801712106242" className="group flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors">
                  <span className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                  </span>
                  +8801712106242
                </a>
              </li>
              <li>
                <a href="mailto:saifulaapi@gmail.com" className="group flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors break-all">
                  <span className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-orange-500/20 flex items-center justify-center transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-orange-400" />
                  </span>
                  saifulaapi@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-600/20" aria-label="Chat on WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.542-.68-6.402-1.852l-.447-.291-3.09 1.036 1.036-3.09-.291-.447A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1HzpUFqjko/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:bg-[#1877F2]/85 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20" aria-label="Visit ATDB on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 pb-20 sm:pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pr-20 sm:pr-6 lg:pr-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <a
            href="https://behance.net/saazidhossain"
            target="_blank"
            rel="noopener noreferrer author"
            title="Sazid Hossain — Architect & Designer · Award-Winning Portfolio"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-white/55 hover:text-orange-300 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(245,130,32,0.8)] group-hover:scale-150 transition-transform" />
            <span className="link-underline">{t("A SAZID HOSSAIN ARCHITECTURE", "একটি সাজিদ হোসেন স্থাপত্য")}</span>
          </a>
          <p className="text-white/40 text-xs">
            © 2026 <span className="text-white/70">M/S ATDB Trade International</span>. {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
        </div>
      </div>
    </footer>
  );
}
