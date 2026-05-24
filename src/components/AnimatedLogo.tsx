import logoMark from "@/assets/atdb-logo-light.webp";
import { Link } from "react-router-dom";

interface AnimatedLogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  asLink?: boolean;
}

/**
 * Minimal brand mark — clean uploaded ATDB logo with a soft hover glow.
 * No heavy gradient ring; logo speaks for itself.
 */
export default function AnimatedLogo({ size = 44, withWordmark = false, className = "", asLink = false }: AnimatedLogoProps) {
  const inner = (
    <span
      className="relative inline-flex items-center justify-center logo-enter logo-sweep transition-transform duration-500 group-hover:scale-[1.04]"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/10 blur-md transition-all duration-500"
      />
      <img
        src={logoMark}
        alt="ATDB Trade International"
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        loading="eager"
        decoding="async"
        width={size}
        height={size}
      />
    </span>
  );

  const wordmark = withWordmark ? (
    <span className="leading-none hidden sm:block logo-enter">
      <span className="block font-display font-bold text-base tracking-tight text-white">ATDB</span>
      <span className="block text-[9px] tracking-[0.22em] text-orange-400/80 mt-0.5 font-mono">TRADE INTERNATIONAL</span>
    </span>
  ) : null;

  const content = (
    <span className={`inline-flex items-center gap-3 group text-left mx-[3px] my-0 px-px py-[2px] ${className}`}>
      {inner}
      {wordmark}
    </span>
  );

  if (asLink) {
    return <Link to="/" aria-label="ATDB Trade International — Home" className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-lg">{content}</Link>;
  }
  return content;
}
