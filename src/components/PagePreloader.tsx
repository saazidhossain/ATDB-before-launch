import { useEffect, useState } from "react";

/**
 * Lightweight page preloader. Hides as soon as window 'load' fires
 * (or after a 1.2s safety timeout, whichever comes first).
 * Fixed full-screen overlay → no layout shift on exit (CLS = 0).
 */
export default function PagePreloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setHidden(true);
      // Remove from DOM after fade-out so it can't intercept events
      window.setTimeout(() => setRemoved(true), 320);
    };
    const safety = window.setTimeout(finish, 1200);
    if (document.readyState === "complete") {
      window.setTimeout(finish, 200);
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background pointer-events-none"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 280ms ease" }}
    >
      <div className="w-10 h-10 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />
    </div>
  );
}
