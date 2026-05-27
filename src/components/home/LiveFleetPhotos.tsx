import { useState, useRef, useEffect } from "react";
import { equipmentData, equipmentCategories, fleetVideos } from "@/data/equipment";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Link } from "react-router-dom";

function VideoCard({ video }: { video: typeof fleetVideos[0] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const { t, lang } = useLang();
  const label = lang === "bn" && video.labelBn ? video.labelBn : video.label;

  // Lazy-mount the <video> only when scrolled near viewport;
  // auto-pause when scrolled out to keep the page light.
  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (ref.current && !ref.current.paused) {
          ref.current.pause();
          setPlaying(false);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); } else { ref.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div
      ref={wrapRef}
      className="group relative aspect-video rounded-2xl overflow-hidden glass-card glass-hover col-span-2 sm:col-span-2"
    >
      {inView ? (
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <img
          src={video.poster}
          alt={label}
          width="800"
          height="450"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Play overlay */}
      {!playing && (
        <button
          onClick={toggle}
          aria-label={t("Play video", "ভিডিও চালান")}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-16 h-16 rounded-full bg-orange-500/90 backdrop-blur flex items-center justify-center shadow-2xl shadow-orange-500/30 transition-transform hover:scale-110">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-[10px] font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t("VIDEO", "ভিডিও")}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white line-clamp-1">{label}</h4>
        </div>
        <div className="flex items-center gap-1.5 touch-manipulation">
          {playing && (
            <button onClick={toggle} aria-label={t("Pause", "বিরতি")} className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors">
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={() => setMuted(!muted)} aria-label={muted ? t("Unmute", "আনমিউট") : t("Mute", "মিউট")} className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => ref.current?.requestFullscreen?.()}
            aria-label={t("Fullscreen", "পূর্ণস্ক্রীন")}
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const realItems = equipmentData
  .filter(e => e.realPhotos && e.realPhotos.length > 0)
  .flatMap(e =>
    (e.realPhotos || []).map((photo, idx) => ({
      src: photo,
      id: e.id,
      name: e.name,
      nameBn: e.banglaLabel,
      category: e.category,
      categoryLabel: e.categoryLabel,
      index: idx,
      source: "real" as const,
    }))
  );

const aiItems = equipmentData
  .filter(e => e.image && (!e.realPhotos || e.realPhotos.length === 0))
  .slice(0, 8)
  .map((e, idx) => ({
    src: e.image,
    id: e.id,
    name: e.name,
    nameBn: e.banglaLabel,
    category: e.category,
    categoryLabel: e.categoryLabel,
    index: idx,
    source: "ai" as const,
  }));

const photoItems = [...realItems, ...aiItems];

export default function LiveFleetPhotos() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { t, lang } = useLang();

  const filters = [
    { key: "all", label: t("All", "সবগুলো") },
    ...equipmentCategories.map(c => ({ key: c.slug, label: lang === "bn" ? c.bangla : c.label })),
  ];

  const filtered = activeFilter === "all" ? photoItems : photoItems.filter(p => p.category === activeFilter);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 gap-4">
          <div>
            <p className="text-xs font-mono tracking-[0.3em] text-orange-400 uppercase mb-3">
              {t("Live Fleet Photos & Videos", "লাইভ ফ্লিট ফটো ও ভিডিও")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              {t("Current-condition media stream", "বর্তমান অবস্থার মিডিয়া স্ট্রিম")}
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-2xl">
              {t(
                "Real, on-site photos and short action clips from our active fleet — auto-paced for browsing on mobile, tablet and desktop.",
                "আমাদের সক্রিয় ফ্লিটের আসল সাইট ফটো ও সংক্ষিপ্ত অ্যাকশন ক্লিপ — মোবাইল, ট্যাবলেট ও ডেস্কটপের জন্য রেসপন্সিভ।"
              )}
            </p>
          </div>
        </div>

        {/* Video showcase */}
        {activeFilter === "all" && fleetVideos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {fleetVideos.map((vid, i) => (
              <VideoCard key={i} video={vid} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeFilter === f.key ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "glass text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo) => (
              <Link
                to={`/equipment/${photo.category}/${photo.id}`}
                key={`${photo.source}-${photo.id}-${photo.index}`}
                className="group relative aspect-square rounded-2xl overflow-hidden glass-card glass-hover block"
              >
                <img
                  src={photo.src}
                  alt={`${photo.name} ${photo.source === "real" ? "real current condition" : "equipment visual"}`}
                  width="600"
                  height="600"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${photo.source === "real" ? "image-polish" : "image-polish-strong"}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                     <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${photo.source === "real" ? "bg-green-600/80 text-white" : "bg-white/15 text-white/80 backdrop-blur"}`}>
                       {photo.source === "real" ? t("REAL", "আসল") : t("AI", "এআই")}
                     </span>
                    <span className="text-[10px] font-mono text-orange-400">{photo.id}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mt-0.5 line-clamp-2">{lang === "bn" && photo.nameBn ? photo.nameBn : photo.name}</h4>
                </div>
                <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${photo.source === "real" ? "bg-green-500 shadow-green-500/50" : "bg-orange-400 shadow-orange-400/40"} animate-pulse shadow-lg`} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-2xl">
            <p className="text-white/40 text-sm">{t("No photos in this category yet.", "এই ক্যাটাগরিতে এখনও কোনো ফটো নেই।")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
