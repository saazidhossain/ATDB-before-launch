import { Link } from "react-router-dom";
import { getWhatsAppQuoteUrl } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  );

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="atdb-hero">
      <video
        className="atdb-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/atdb-hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/atdb-hero.mp4" type="video/mp4" />
      </video>

      <div className="atdb-hero__overlay-gradient" aria-hidden="true" />
      <div className="atdb-hero__overlay-amber" aria-hidden="true" />
      <div
        className="atdb-hero__overlay-noise"
        aria-hidden="true"
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
      />

      <div className="atdb-hero__content">
        <div className="atdb-hero__eyebrow atdb-anim-fadeup" style={{ animationDelay: "0.5s" }}>
          <span className="atdb-hero__eyebrow-line" />
          <span className="atdb-hero__eyebrow-text">
            {t("Heavy Equipment Rental", "হেভি ইকুইপমেন্ট রেন্টাল")}
          </span>
          <span className="atdb-hero__badge">{t("Nationwide", "সারাদেশ")}</span>
        </div>

        <h1 className="atdb-hero__headline">
          <span className="atdb-hero__line">
            <span className="atdb-anim-linereveal" style={{ animationDelay: "0.65s" }}>
              {t("Bangladesh's", "বাংলাদেশের")}
            </span>
          </span>
          <span className="atdb-hero__line">
            <span className="atdb-anim-linereveal" style={{ animationDelay: "0.80s" }}>
              {t("Premier ", "সেরা ")}
              <span className="atdb-hero__amber">{t("HEAVY", "হেভি")}</span>
            </span>
          </span>
          <span className="atdb-hero__line">
            <span className="atdb-anim-linereveal" style={{ animationDelay: "0.95s" }}>
              {t("Equipment Partner", "ইকুইপমেন্ট পার্টনার")}
            </span>
          </span>
        </h1>

        <p className="atdb-hero__subtext atdb-anim-fadeup" style={{ animationDelay: "1.1s" }}>
          {t(
            "From towering cranes to precision excavators — ATDB delivers industry-grade machinery, on time, on site. Powering infrastructure across Bangladesh since 2008.",
            "টাওয়ার ক্রেন থেকে নির্ভুল এক্সকাভেটর — এটিডিবি সময়মতো সাইটে ইন্ডাস্ট্রি-গ্রেড মেশিনারি সরবরাহ করে। ২০০৮ সাল থেকে বাংলাদেশের অবকাঠামোতে শক্তি যোগাচ্ছে।"
          )}
        </p>

        <div className="atdb-hero__cta atdb-anim-fadeup" style={{ animationDelay: "1.25s" }}>
          <Link to="/equipment" className="atdb-btn atdb-btn--primary">
            {t("Explore Fleet", "ফ্লিট দেখুন")}
          </Link>
          <a
            href={getWhatsAppQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="atdb-btn atdb-btn--secondary"
          >
            ▶ {t("Watch in Action", "অ্যাকশনে দেখুন")}
          </a>
        </div>
      </div>

      <div className="atdb-hero__stats atdb-anim-fadeup" style={{ animationDelay: "1.45s" }}>
        {[
          { n: "200", plus: true, label: t("Equipment Units", "ইকুইপমেন্ট ইউনিট") },
          { n: "15", plus: true, label: t("Years Experience", "বছরের অভিজ্ঞতা") },
          { n: "500", plus: true, label: t("Projects Completed", "প্রজেক্ট সম্পন্ন") },
          { n: "64", plus: false, label: t("Districts Served", "জেলায় সেবা") },
        ].map(s => (
          <div key={s.label} className="atdb-stat">
            <div className="atdb-stat__num">
              {s.n}
              {s.plus && <span className="atdb-hero__amber">+</span>}
            </div>
            <div className="atdb-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
