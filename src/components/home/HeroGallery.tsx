import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { equipmentData, fleetVideos } from "@/data/equipment";
import { useLang } from "@/hooks/useLang";

interface Slide { kind: "image" | "video"; src: string; poster?: string; title: string; titleBn?: string; id?: string; category?: string; }

export default function HeroGallery() {
  const { t, lang } = useLang();

  const slides = useMemo<Slide[]>(() => {
    const real = equipmentData
      .filter(e => e.realPhotos && e.realPhotos.length > 0)
      .flatMap(e => e.realPhotos!.map(p => ({
        kind: "image" as const, src: p, title: e.name, titleBn: e.banglaLabel, id: e.id, category: e.category,
      })));
    const vids: Slide[] = fleetVideos.map(v => ({ kind: "video", src: v.src, poster: v.poster, title: v.label, titleBn: v.labelBn }));
    const merged: Slide[] = [];
    if (vids[0]) merged.push(vids[0]);
    merged.push(...real.slice(0, 3));
    if (vids[1]) merged.push(vids[1]);
    merged.push(...real.slice(3));
    return merged;
  }, []);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused || total === 0) return;
    const cur = slides[idx];
    const delay = cur?.kind === "video" ? 8000 : 4500;
    const t = setTimeout(() => setIdx(i => (i + 1) % total), delay);
    return () => clearTimeout(t);
  }, [idx, paused, slides, total]);

  if (!total) return null;
  const cur = slides[idx];

  return (
    <section className="section-padding pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase mb-2">
              {t("Live Showcase", "লাইভ শোকেস")}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {t("Auto-rotating fleet gallery", "স্বয়ংক্রিয় ফ্লিট গ্যালারি")}
            </h2>
          </div>
          <button
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? t("Play", "চালান") : t("Pause", "বিরতি")}
            className="hidden sm:flex w-10 h-10 rounded-full glass hover:bg-white/15 items-center justify-center text-white"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden glass-card group">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {s.kind === "video" && i === idx ? (
                <video
                  src={s.src}
                  poster={s.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={s.kind === "video" ? s.poster : s.src}
                  alt={s.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${cur.kind === "video" ? "bg-red-600/90 text-white" : "bg-green-600/90 text-white"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {cur.kind === "video" ? t("LIVE VIDEO", "লাইভ ভিডিও") : t("REAL PHOTO", "আসল ছবি")}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-2xl font-bold text-white line-clamp-2">{lang === "bn" && cur.titleBn ? cur.titleBn : cur.title}</h3>
              {cur.id && <p className="text-orange-300/80 text-xs font-mono mt-1">{cur.id}</p>}
            </div>
            {cur.id && cur.category && (
              <Link
                to={`/equipment/${cur.category}/${cur.id}`}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold transition-colors shadow-lg shadow-orange-500/30"
              >
                {t("View Details", "বিস্তারিত")}
              </Link>
            )}
          </div>

          <button
            onClick={() => setIdx((idx - 1 + total) % total)}
            aria-label={t("Previous", "পূর্ববর্তী")}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIdx((idx + 1) % total)}
            aria-label={t("Next", "পরবর্তী")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all ${i === idx ? "w-6 bg-orange-400" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
