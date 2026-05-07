import { MapPin, Phone, Mail, Facebook } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

export default function Contact() {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">{t("Contact", "যোগাযোগ")}</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display">{t("Get in touch.", "যোগাযোগ করুন।")}</h1>
          <p className="text-white/50 mt-4 max-w-2xl">{t("Reach us on WhatsApp for the fastest response, or contact our offices directly.", "দ্রুততম রেসপন্সের জন্য হোয়াটসঅ্যাপে যোগাযোগ করুন, অথবা সরাসরি আমাদের অফিসে কল করুন।")}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl p-8 glass-hover card-tilt group text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-600/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/30 transition-colors">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 font-display">{t("WhatsApp", "হোয়াটসঅ্যাপ")}</h3>
            <p className="text-white/50 text-sm">{t("Fastest response — direct to leadership", "দ্রুততম রেসপন্স — সরাসরি নেতৃত্বের সাথে")}</p>
          </a>

          <a href="tel:+8801712106242" className="glass-card rounded-2xl p-8 glass-hover card-tilt group text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
              <Phone className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-display">{t("Phone", "ফোন")}</h3>
            <p className="text-white/70 text-sm">+8801712106242 <span className="text-white/40">· {t("Proprietor", "মালিক")}</span></p>
            <p className="text-white/70 text-sm mt-1">+8801816666067 <span className="text-white/40">· {t("CEO", "সিইও")}</span></p>
          </a>

          <a href="mailto:saifulaapi@gmail.com" className="glass-card rounded-2xl p-8 glass-hover card-tilt group text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-display">{t("Email", "ইমেইল")}</h3>
            <p className="text-white/50 text-sm">saifulaapi@gmail.com</p>
          </a>

          <a href="https://www.facebook.com/atdbtrade" target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl p-8 glass-hover card-tilt group text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors">
              <Facebook className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-display">{t("Facebook", "ফেসবুক")}</h3>
            <p className="text-white/50 text-sm">@ATDBTRADE</p>
          </a>
        </div>

        {/* Offices */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { name: t("Corporate Office", "কর্পোরেট অফিস"), address: t("House #319 (8F), Lane #8, East Kazi Para, Kafrul, Dhaka-1216", "বাড়ি #৩১৯ (৮ম তলা), লেন #৮, পূর্ব কাজীপাড়া, কাফরুল, ঢাকা-১২১৬") },
            { name: t("Branch Office", "শাখা অফিস"), address: t("House #311 (2F), Boro Kalibari Road, Tangail-1900", "বাড়ি #৩১১ (২য় তলা), বড় কালীবাড়ি রোড, টাঙ্গাইল-১৯০০") },
          ].map(office => (
            <div key={office.name} className="glass-card rounded-2xl p-6 glass-hover card-tilt flex gap-4">
              <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 font-display">{office.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{office.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
