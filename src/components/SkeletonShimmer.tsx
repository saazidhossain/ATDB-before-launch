import { useEffect, useState } from "react";

/**
 * Initial-load skeleton shimmer. Sits above page content but below the
 * preloader. Auto-removes shortly after window 'load' (or after a 1.4s
 * safety timeout) and fades out cleanly so there's no layout shift.
 *
 * Renders only once per session — skips on subsequent client-side navigation.
 */
export default function SkeletonShimmer() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("atdb:skeleton-done") === "1") {
      setRemoved(true);
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem("atdb:skeleton-done", "1");
      setHidden(true);
      window.setTimeout(() => setRemoved(true), 360);
    };
    const safety = window.setTimeout(finish, 1400);
    if (document.readyState === "complete") {
      window.setTimeout(finish, 250);
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
      style={{
        opacity: hidden ? 0 : 1,
        transition: "opacity 320ms ease",
        background: "hsl(var(--background))",
      }}
    >
      <style>{`
        @keyframes atdb-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .atdb-skel {
          position: relative;
          overflow: hidden;
          background: hsl(0 0% 100% / 0.04);
          border-radius: 12px;
        }
        .atdb-skel::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            hsl(0 0% 100% / 0.06) 40%,
            hsl(25 95% 55% / 0.10) 50%,
            hsl(0 0% 100% / 0.06) 60%,
            transparent 100%
          );
          animation: atdb-shimmer 1.6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .atdb-skel::after { animation: none; }
        }
      `}</style>

      {/* Nav skeleton */}
      <div className="w-full h-[60px] md:h-[72px] flex items-center justify-between px-4 md:px-8 border-b border-white/5">
        <div className="atdb-skel h-9 w-32" />
        <div className="hidden md:flex gap-3">
          <div className="atdb-skel h-6 w-16" />
          <div className="atdb-skel h-6 w-16" />
          <div className="atdb-skel h-6 w-16" />
        </div>
        <div className="atdb-skel h-9 w-24 md:w-32" />
      </div>

      {/* Hero skeleton */}
      <div className="px-6 md:px-16 pt-16 md:pt-24 max-w-5xl">
        <div className="atdb-skel h-4 w-32 mb-6" />
        <div className="atdb-skel h-12 md:h-20 w-[90%] mb-4" />
        <div className="atdb-skel h-12 md:h-20 w-[70%] mb-8" />
        <div className="atdb-skel h-5 w-[80%] max-w-xl mb-3" />
        <div className="atdb-skel h-5 w-[60%] max-w-md mb-10" />
        <div className="flex gap-3">
          <div className="atdb-skel h-12 w-40" />
          <div className="atdb-skel h-12 w-40" />
        </div>
      </div>
    </div>
  );
}
