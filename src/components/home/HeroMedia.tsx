import { useEffect, useRef, useState } from "react";

/**
 * HeroMedia — auto-rotating cinematic background for the hero.
 *
 * Performance:
 * - Lite path for small screens / Save-Data / 2g–3g → single optimized poster.
 * - Stills use srcSet (768/1280/1920) so phones download ~80 KB instead of ~400 KB.
 * - Videos ship a 720p variant via <source media="(max-width: 768px)"> alongside 1080p.
 * - IntersectionObserver gates playback: videos only play while the hero is on screen.
 * - Adjacent-only mount window + dynamic preload (active = "metadata", neighbor = "none").
 * - Respects prefers-reduced-motion.
 */

type Slide =
  | { kind: "video"; webm: string; mp4: string; webmSm: string; mp4Sm: string; poster: string }
  | { kind: "image"; base: string }; // base path (no extension) inside /assets/hero

const SLIDES: Slide[] = [
  { kind: "image", base: "atdb-hero-monument-C3bd27q6" },
  {
    kind: "video",
    webm: "/videos/cat-320bu-action.webm",
    mp4: "/videos/cat-320bu-action.mp4",
    webmSm: "/videos/cat-320bu-action-720.webm",
    mp4Sm: "/videos/cat-320bu-action-720.mp4",
    poster: "/videos/cat-320bu-poster.jpg",
  },
  { kind: "image", base: "crane-action-BZ-xESxE" },
  {
    kind: "video",
    webm: "/videos/honda-rammer-action.webm",
    mp4: "/videos/honda-rammer-action.mp4",
    webmSm: "/videos/honda-rammer-action-720.webm",
    mp4Sm: "/videos/honda-rammer-action-720.mp4",
    poster: "/videos/honda-rammer-poster.jpg",
  },
  { kind: "image", base: "roller-action-Cnt_eXHu" },
  { kind: "image", base: "excavator-action-IVss7I8n" },
];

const POSTER_ONLY_BASE = "atdb-hero-monument-C3bd27q6";

const IMAGE_MS = 9000;
const VIDEO_MS = 10000;

function imgSrcSet(base: string) {
  return [768, 1280, 1920]
    .map(w => `/assets/hero/${base}-${w}.webp ${w}w`)
    .join(", ");
}
function imgFallback(base: string) {
  return `/assets/hero/${base}-1280.webp`;
}

function detectLitePath(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 768px)").matches) return true;
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  if (conn.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return true;
  return false;
}

export default function HeroMedia() {
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [lite, setLite] = useState(true);
  const [inView, setInView] = useState(true);
  const total = SLIDES.length;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setLite(detectLitePath());
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mw = window.matchMedia("(max-width: 768px)");
    setReduced(m.matches);
    const onMotion = () => setReduced(m.matches);
    const onWidth = () => setLite(detectLitePath());
    m.addEventListener?.("change", onMotion);
    mw.addEventListener?.("change", onWidth);
    return () => {
      m.removeEventListener?.("change", onMotion);
      mw.removeEventListener?.("change", onWidth);
    };
  }, []);

  // Viewport gate — pause work when the hero scrolls off screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      entries => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rotation + active video play/pause
  useEffect(() => {
    if (reduced || lite || !inView) {
      videoRefs.current.forEach(v => v && !v.paused && v.pause());
      return;
    }
    const cur = SLIDES[idx];
    const delay = cur.kind === "video" ? VIDEO_MS : IMAGE_MS;
    const t = setTimeout(() => setIdx(i => (i + 1) % total), delay);
    const v = videoRefs.current[idx];
    if (v && cur.kind === "video") {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
      } catch {/* noop */}
    }
    return () => clearTimeout(t);
  }, [idx, reduced, lite, inView, total]);

  if (lite || reduced) {
    return (
      <div ref={rootRef} className="absolute inset-0 overflow-hidden">
        <img
          src={imgFallback(POSTER_ONLY_BASE)}
          srcSet={imgSrcSet(POSTER_ONLY_BASE)}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover image-polish"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {SLIDES.map((s, i) => {
        const dist = Math.min(Math.abs(i - idx), total - Math.abs(i - idx));
        const mount = dist <= 1;
        const active = i === idx;
        // Active video gets metadata preload; the on-deck neighbor stays at "none"
        // until it becomes active, eliminating wasted metadata fetches per cycle.
        const preload = active ? "metadata" : "none";
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            {mount && s.kind === "video" ? (
              <video
                ref={el => (videoRefs.current[i] = el)}
                poster={s.poster}
                autoPlay={active && inView}
                muted
                loop
                playsInline
                preload={preload}
                onLoadedMetadata={e => {
                  if (active && inView) (e.currentTarget as HTMLVideoElement).play().catch(() => {});
                }}
                className="w-full h-full object-cover image-polish"
              >
                <source src={s.webmSm} type="video/webm" media="(max-width: 768px)" />
                <source src={s.mp4Sm} type="video/mp4" media="(max-width: 768px)" />
                <source src={s.webm} type="video/webm" />
                <source src={s.mp4} type="video/mp4" />
              </video>
            ) : mount && s.kind === "image" ? (
              <img
                src={imgFallback(s.base)}
                srcSet={imgSrcSet(s.base)}
                sizes="100vw"
                alt=""
                width={1920}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
                className="w-full h-full object-cover image-polish animate-hero-kenburns"
              />
            ) : null}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`h-1 rounded-full transition-all duration-700 ${
              i === idx ? "w-8 bg-orange-400" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
