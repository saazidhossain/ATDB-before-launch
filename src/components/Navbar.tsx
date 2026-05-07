import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Globe } from "lucide-react";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";
import AnimatedLogo from "@/components/AnimatedLogo";
import { CartButton } from "@/components/CartDrawer";

const navLinks = [
  { to: "/", en: "Home", bn: "হোম" },
  { to: "/equipment", en: "Equipment", bn: "যন্ত্রপাতি" },
  { to: "/projects", en: "Projects", bn: "প্রকল্প" },
  { to: "/about", en: "About", bn: "সম্পর্কে" },
  { to: "/contact", en: "Contact", bn: "যোগাযোগ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <AnimatedLogo size={42} withWordmark asLink />


          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${location.pathname === link.to ? "text-orange-400" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              >
                {lang === "bn" ? link.bn : link.en}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <CartButton />
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full glass text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className={lang === "en" ? "text-orange-400" : "text-white/60"}>EN</span>
              <span className="text-white/30">|</span>
              <span className={lang === "bn" ? "text-orange-400" : "text-white/60"}>বাং</span>
            </button>

            <a href="https://www.facebook.com/atdbtrade" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="tel:+8801712106242" className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-500 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:saifulaapi@gmail.com" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="ml-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-all shadow-lg hover:shadow-green-500/25">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t("Get Quote", "কোটেশন নিন")}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton />
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass text-[10px] font-semibold text-white/80"
            >
              <Globe className="w-3 h-3" />
              {lang === "en" ? "বাং" : "EN"}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 flex items-center justify-center text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden glass-strong rounded-2xl p-4 mb-4 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${location.pathname === link.to ? "text-orange-400 bg-orange-500/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              >
                {lang === "bn" ? link.bn : link.en}
              </Link>
            ))}
            <a href={getWhatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t("Get Quote on WhatsApp", "হোয়াটসঅ্যাপে কোটেশন নিন")}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
