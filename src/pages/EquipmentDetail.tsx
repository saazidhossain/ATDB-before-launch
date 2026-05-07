import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Fuel, Wrench, Download, Play, Pause, Volume2, VolumeX, ShoppingCart, Maximize2 } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { equipmentData, getWhatsAppRentUrl } from "@/data/equipment";
import { generateEquipmentPDF } from "@/lib/generatePDF";
import { useLang } from "@/hooks/useLang";
import { useCart } from "@/hooks/useCart";

export default function EquipmentDetail() {
  const { id } = useParams();
  const equipment = equipmentData.find(e => e.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const { t, lang } = useLang();
  const { add } = useCart();

  useEffect(() => {
    const el = videoWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [equipment]);

  const toggleFullscreen = useCallback(() => {
    const v = videoRef.current as any;
    if (!v) return;
    const req = v.requestFullscreen || v.webkitEnterFullscreen || v.webkitRequestFullscreen;
    if (req) req.call(v);
  }, []);

  const handlePDF = useCallback(async () => {
    if (!equipment || pdfLoading) return;
    setPdfLoading(true);
    try {
      await generateEquipmentPDF(equipment, lang);
    } finally {
      setPdfLoading(false);
    }
  }, [equipment, pdfLoading, lang]);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Equipment not found", "যন্ত্রপাতি পাওয়া যায়নি")}</h1>
          <Link to="/equipment" className="text-orange-400 hover:underline">{t("Back to Equipment", "যন্ত্রপাতিতে ফিরুন")}</Link>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(equipment.realPhotos || []),
    equipment.image,
  ];

  const hasVideos = equipment.videos && equipment.videos.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link to="/equipment" className="hover:text-white transition-colors flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> {t("Equipment", "যন্ত্রপাতি")}</Link>
            <span>/</span>
            <Link to={`/equipment/${equipment.category}`} className="hover:text-white transition-colors">{equipment.categoryLabel}</Link>
            <span>/</span>
            <span className="text-white/70">{equipment.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card mb-4">
                <img src={allImages[activeImage]} alt={equipment.name} className="image-polish w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                {equipment.realPhotos && activeImage < equipment.realPhotos.length && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-green-600/90 backdrop-blur text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> {t("Current Condition", "বর্তমান অবস্থা")}
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-orange-500 shadow-lg shadow-orange-500/20" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} alt="" className="image-polish w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Video Section */}
              {hasVideos && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-500" />
                    {t("Action Video", "অ্যাকশন ভিডিও")}
                  </h3>
                  {equipment.videos!.map((vid, i) => (
                    <div key={i} ref={videoWrapRef} className="relative rounded-2xl overflow-hidden glass-card">
                      {videoVisible ? (
                        <video
                          ref={videoRef}
                          src={vid.src}
                          poster={vid.poster}
                          muted={videoMuted}
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full aspect-video object-cover bg-black"
                          onPlay={() => setVideoPlaying(true)}
                          onPause={() => setVideoPlaying(false)}
                        />
                      ) : (
                        <img src={vid.poster} alt={vid.label} loading="lazy" className="w-full aspect-video object-cover bg-black" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      {!videoPlaying && (
                        <button
                          onClick={() => { setVideoVisible(true); setTimeout(() => videoRef.current?.play(), 50); }}
                          className="absolute inset-0 flex items-center justify-center z-10"
                          aria-label={t("Play video", "ভিডিও চালান")}
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/90 backdrop-blur flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5" fill="white" />
                          </div>
                        </button>
                      )}
                      <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                        {videoPlaying && (
                          <button onClick={() => videoRef.current?.pause()} aria-label={t("Pause", "বিরতি")} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white active:scale-95">
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => setVideoMuted(!videoMuted)} aria-label={videoMuted ? t("Unmute", "শব্দ চালু") : t("Mute", "শব্দ বন্ধ")} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white active:scale-95">
                          {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button onClick={toggleFullscreen} aria-label={t("Fullscreen", "ফুলস্ক্রিন")} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white active:scale-95">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2 py-1 rounded-full bg-red-600/80 text-[10px] font-bold text-white flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t("LIVE VIDEO", "লাইভ ভিডিও")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full glass text-xs font-mono text-white/60">{equipment.id}</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">{equipment.categoryLabel}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{equipment.name}</h1>
              <p className="text-white/50 text-lg mb-8">{equipment.brand} · {equipment.model}</p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Wrench, label: t("Capacity", "ক্ষমতা"), value: equipment.capacity },
                  { icon: MapPin, label: t("Origin", "উৎপত্তি"), value: equipment.origin },
                  { icon: Calendar, label: t("Year", "সাল"), value: String(equipment.year) },
                  { icon: Fuel, label: t("Fuel", "জ্বালানি"), value: equipment.fuel },
                ].map(spec => (
                  <div key={spec.label} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                      <spec.icon className="w-3.5 h-3.5" />
                      {spec.label}
                    </div>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-xl p-4 mb-8">
                <p className="text-xs text-white/40 mb-1">{t("Quantity Available", "উপলব্ধ পরিমাণ")}</p>
                <p className="font-semibold">{equipment.quantity} {t("Unit(s)", "ইউনিট")}</p>
                {equipment.notes && <p className="text-sm text-white/50 mt-1">{t("Note", "নোট")}: {equipment.notes}</p>}
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppRentUrl(equipment.name, equipment.id, equipment.capacity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-semibold text-lg transition-all shadow-xl shadow-green-600/20 hover:shadow-green-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  {t("Rent This Equipment via WhatsApp", "হোয়াটসঅ্যাপে এই যন্ত্রপাতি ভাড়া নিন")}
                </a>

                <button
                  onClick={handlePDF}
                  disabled={pdfLoading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold text-lg transition-all border border-white/10 hover:border-orange-500/30 disabled:opacity-50"
                >
                  <Download className={`w-5 h-5 ${pdfLoading ? "animate-bounce" : ""}`} />
                  {pdfLoading
                    ? t("Generating PDF…", "PDF তৈরি হচ্ছে…")
                    : t("Download Spec Sheet (PDF)", "স্পেক শীট ডাউনলোড করুন (PDF)")
                  }
                </button>

                <button
                  onClick={() => equipment && add({ id: equipment.id, name: equipment.name, brand: equipment.brand, capacity: equipment.capacity, image: equipment.realPhotos?.[0] || equipment.image })}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 font-semibold text-lg transition-all border border-orange-500/30"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t("Add to Rental Cart", "ভাড়ার কার্টে যোগ করুন")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
