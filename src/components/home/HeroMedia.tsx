import { useEffect, useRef, useState } from "react";

/**
 * HeroMedia — single looping ATDB hero video background.
 *
 * - Desktop: autoplay muted looping video (z-0).
 * - Mobile (≤768px): video paused, static WebP fallback as background.
 * - Dark gradient overlay sits above video (z-1) but below UI (z-10+).
 */

const VIDEO_SRC = "/videos/atdb-hero-animated.mp4";
const FALLBACK_IMG = "/assets/hero/atdb-hero-monument-C3bd27q6-1280.webp";
const FALLBACK_IMG_SM = "/assets/hero/atdb-hero-monument-C3bd27q6-768.webp";

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => {
      setIsMobile(mq.matches);
      const v = videoRef.current;
      if (v) {
        if (mq.matches) v.pause();
        else v.play().catch(() => {});
      }
    };
    mq.addEventListener?.("change", onChange);
    // initial enforcement
    if (mq.matches) videoRef.current?.pause();
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div
      className="hero-bg absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        backgroundImage: `url(${isMobile ? FALLBACK_IMG_SM : FALLBACK_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center center", zIndex: 0 }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay — above video, below UI */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `linear-gradient(to right, rgba(7,11,15,0.92) 0%, rgba(7,11,15,0.70) 45%, rgba(7,11,15,0.30) 75%, rgba(7,11,15,0.10) 100%), linear-gradient(to top, rgba(7,11,15,1.00) 0%, rgba(7,11,15,0.50) 18%, transparent 40%)`,
        }}
      />
    </div>
  );
}
