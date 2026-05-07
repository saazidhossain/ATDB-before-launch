import { useEffect, useRef, useState } from "react";

/**
 * HeroMedia — auto-rotating cinematic background for the hero.
 *
 * Performance strategy:
 * - Mobile / small screens / Save-Data / 2g–3g networks → single optimized
 *   poster image, no videos, no rotation. Keeps LCP fast and bandwidth low.
 * - Desktop / good network → cross-fades between short clips + fleet stills
 *   with a very slow Ken-Burns zoom. Videos use <source> webm + mp4 with
 *   preload="metadata" so only headers + first frame load up front.
 * - Lazy mounts: only the active slide ± 1 ever exists in the DOM.
 * - Respects prefers-reduced-motion (single still, no zoom, no rotation).
 *
 * Tunings (kept long & gentle so transitions never compete with the headline):
 *   IMAGE_MS = 9000   crossfade window for stills
 *   VIDEO_MS = 10000  crossfade window for clips
 *   FADE     = 2000ms opacity transition
 *   Ken-Burns runs at 22s — barely perceptible drift, no zoom “whoosh”.
 */

type Slide =
  | { kind: "video"; webm: string; mp4: string; poster: string }
  | { kind: "image"; src: string };

const SLIDES: Slide[] = [
  { kind: "image", src: "/assets/atdb-hero-monument-C3bd27q6.webp" },
  {
    kind: "video",
    webm: "/videos/cat-320bu-action.webm",
    mp4: "/videos/cat-320bu-action.mp4",
    poster: "/videos/cat-320bu-poster.jpg",
  },
  { kind: "image", src: "/assets/crane-action-BZ-xESxE.webp" },
  {
    kind: "video",
    webm: "/videos/honda-rammer-action.webm",
    mp4: "/videos/honda-rammer-action.mp4",
    poster: "/videos/honda-rammer-poster.jpg",
  },
  { kind: "image", src: "/assets/roller-action-Cnt_eXHu.webp" },
  { kind: "image", src: "/assets/excavator-action-IVss7I8n.webp" },
];

const POSTER_ONLY: string = "/assets/atdb-hero-monument-C3bd27q6.webp";

const IMAGE_MS = 9000;
const VIDEO_MS = 10000;

/** Decide if we should serve only the lightweight poster image. */
function detectLitePath(): boolean {
  if (typeof window === "undefined") return false;
  // Small screens always get the lite path
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
  const [lite, setLite] = useState(true); // assume lite on first paint to keep LCP fast
  const total = SLIDES.length;
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

  useEffect(() => {
    if (reduced || lite) return;
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
  }, [idx, reduced, lite, total]);

  // Lite path: single optimized poster, no JS-driven animation, fastest LCP.
  if (lite || reduced) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={POSTER_ONLY}
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
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((s, i) => {
        const dist = Math.min(Math.abs(i - idx), total - Math.abs(i - idx));
        const mount = dist <= 1;
        const active = i === idx;
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
                autoPlay={active}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover image-polish"
              >
                <source src={s.webm} type="video/webm" />
                <source src={s.mp4} type="video/mp4" />
              </video>
            ) : mount && s.kind === "image" ? (
              <img
                src={s.src}
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

      {/* Layered overlays for legibility — kept identical across slides so text never shifts */}
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
