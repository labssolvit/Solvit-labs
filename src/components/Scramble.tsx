import { useEffect, useRef } from "react";
import { scrambleText } from "../lib/scramble";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ScrambleProps {
  text: string;
  className?: string;
  /** Scramble every time the pointer enters. */
  onHover?: boolean;
  /** Scramble once when scrolled into view. */
  playOnView?: boolean;
  duration?: number;
}

/** Text that decodes from glyphs — igloo-grade micro-interaction, DOM-safe. */
export function Scramble({
  text,
  className,
  onHover = false,
  playOnView = false,
  duration = 650,
}: ScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !playOnView || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrambleText(el, text, duration + 250);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, playOnView, duration, reduced]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={() => {
        if (onHover && !reduced && ref.current) scrambleText(ref.current, text, duration);
      }}
    >
      {text}
    </span>
  );
}
