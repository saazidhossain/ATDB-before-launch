import { useEffect, useRef, useState } from "react";

/**
 * HeroMedia — auto-rotating cinematic background for the hero.
 * - Cross-fades between short video clips + key fleet stills
 * - Slow Ken-Burns zoom on stills for life without distraction
 * - Lazy-mounts only current ± 1 slide; videos preload metadata only
 * - Respects prefers-reduced-motion (single still, no zoom)
 */

type Slide =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string };

const SLIDES: Slide[] = [
  { kind: "image", src: "/assets/atdb-hero-monument-C3bd27q6.webp" },
  { kind: "video", src: "/videos/cat-320bu-action.mp4", poster: "/videos/cat-320bu-poster.jpg" },
  { kind: "image", src: "/assets/crane-action-BZ-xESxE.webp" },
  { kind: "video", src: "/videos/honda-rammer-action.mp4", poster: "/videos/honda-rammer-poster.jpg" },
  { kind: "image", src: "/assets/roller-action-Cnt_eXHu.webp" },
  { kind: "image", src: "/assets/excavator-action-IVss7I8n.webp" },
];

const IMAGE_MS = 6000;
const VIDEO_MS = 7500;

export default function HeroMedia() {
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const total = SLIDES.length;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = () => setReduced(m.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const cur = SLIDES[idx];
    const delay = cur.kind === "video" ? VIDEO_MS : IMAGE_MS;
    const t = setTimeout(() => setIdx(i => (i + 1) % total), delay);
    // restart current video for clean playback
    const v = videoRefs.current[idx];
    if (v && cur.kind === "video") {
      try { v.currentTime = 0; v.play().catch(() => {}); } catch {/* noop */}
    }
    return () => clearTimeout(t);
  }, [idx, reduced, total]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((s, i) => {
        const dist = Math.min(Math.abs(i - idx), total - Math.abs(i - idx));
        const mount = reduced ? i === 0 : dist <= 1;
        const active = i === idx || (reduced && i === 0);
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            {mount && s.kind === "video" ? (
              <video
                ref={el => (videoRefs.current[i] = el)}
                src={s.src}
                poster={s.poster}
                autoPlay={active}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover image-polish"
              />
            ) : mount ? (
              <img
                src={s.src}
                alt=""
                width={1920}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
                className={`w-full h-full object-cover image-polish ${
                  reduced ? "" : "animate-hero-kenburns"
                }`}
              />
            ) : null}
          </div>
        );
      })}

      {/* Layered overlays for legibility — kept identical across slides so text never shifts */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Slide progress pips */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`h-1 rounded-full transition-all duration-500 ${
              i === idx ? "w-8 bg-orange-400" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
