import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Equipment } from "@/data/equipment";

export default function EquipmentGallery({ equipment, allImages, hasVideos }: { equipment: Equipment, allImages: string[], hasVideos: boolean }) {
  const [activeImage, setActiveImage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const { t } = useLang();

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
    const v = videoRef.current as HTMLVideoElement & { requestFullscreen?: () => Promise<void>; webkitEnterFullscreen?: () => void; webkitRequestFullscreen?: () => Promise<void> };
    if (!v) return;
    const req = v.requestFullscreen || v.webkitEnterFullscreen || v.webkitRequestFullscreen;
    if (req) req.call(v);
  }, []);

  return (
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

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`relative w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden transition-all ${activeImage === i ? "ring-2 ring-orange-500 scale-105" : "opacity-50 hover:opacity-100"}`}
          >
            <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {hasVideos && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Play className="w-4 h-4 text-orange-400" /> {t("Equipment Videos", "যন্ত্রপাতির ভিডিও")}</h3>
          {equipment.videos!.map((vid, i: number) => (
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
  );
}
