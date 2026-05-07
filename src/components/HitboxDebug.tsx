import { useEffect, useState } from "react";

/**
 * Mobile-only debug overlay that highlights interactive elements whose
 * hit-box is below 44×44 CSS pixels (WCAG 2.5.5 / Apple HIG).
 *
 * Activate by:
 *   - URL: append `?debug=hitbox` (persists for the session)
 *   - Console: `localStorage.setItem('atdb:hitbox', '1')` then reload
 *   - Disable: `localStorage.removeItem('atdb:hitbox')` or `?debug=off`
 *
 * Only renders on coarse-pointer / ≤768px viewports. No-op otherwise.
 */
type Box = { x: number; y: number; w: number; h: number; tag: string };

const SELECTOR =
  'a[href], button:not(:disabled), [role="button"], input[type="button"], input[type="submit"], label[for], summary';

export default function HitboxDebug() {
  const [enabled, setEnabled] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("debug");
    if (flag === "hitbox") localStorage.setItem("atdb:hitbox", "1");
    if (flag === "off") localStorage.removeItem("atdb:hitbox");
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isMobile) return;
    if (localStorage.getItem("atdb:hitbox") !== "1") return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const scan = () => {
      const found: Box[] = [];
      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      els.forEach((el) => {
        // Skip overlay-internal nodes
        if (el.closest("[data-hitbox-overlay]")) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.width < 44 || r.height < 44) {
          found.push({
            x: r.left,
            y: r.top,
            w: r.width,
            h: r.height,
            tag: el.tagName.toLowerCase(),
          });
        }
      });
      setBoxes(found);
    };
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };
    scan();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const mo = new MutationObserver(tick);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true });
    const interval = window.setInterval(scan, 1500);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      mo.disconnect();
      window.clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      data-hitbox-overlay
      aria-hidden
      className="fixed inset-0 z-[300] pointer-events-none"
    >
      {boxes.map((b, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            outline: "2px solid hsl(0 90% 55%)",
            outlineOffset: "0px",
            background: "hsl(0 90% 55% / 0.18)",
            boxShadow: "0 0 0 1px hsl(0 0% 100% / 0.4) inset",
          }}
        />
      ))}
      <div
        className="fixed bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-mono"
        style={{
          background: "hsl(0 0% 0% / 0.85)",
          color: "white",
          border: "1px solid hsl(0 90% 55% / 0.6)",
        }}
      >
        hitbox debug · {boxes.length} under 44px
      </div>
    </div>
  );
}
