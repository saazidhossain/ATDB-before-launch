import { useEffect, useRef, useState } from "react";

/**
 * Smooth animated divider between sections.
 * - Renders an inert hairline by default (no animation on initial load).
 * - When scrolled into view, the gradient line draws across from center
 *   outwards and a faint glow fades in.
 * - Honors prefers-reduced-motion (renders the static state).
 */
export default function SectionDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full flex items-center justify-center py-6 md:py-10 ${className}`}
    >
      <div
        className="relative h-px w-full max-w-5xl mx-auto overflow-hidden"
        style={{ paddingInline: "1.5rem" }}
      >
        <div
          style={{
            height: "1px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, hsl(25 95% 55% / 0.0) 10%, hsl(25 95% 55% / 0.6) 50%, hsl(25 95% 55% / 0.0) 90%, transparent 100%)",
            transform: shown ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition:
              "transform 900ms cubic-bezier(0.2,0.7,0.2,1), opacity 600ms ease",
            opacity: shown ? 1 : 0.0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "8px",
            borderRadius: "9999px",
            background:
              "radial-gradient(closest-side, hsl(25 95% 60% / 0.35), transparent)",
            opacity: shown ? 1 : 0,
            transition: "opacity 700ms ease 200ms",
            pointerEvents: "none",
            filter: "blur(6px)",
          }}
        />
      </div>
    </div>
  );
}
