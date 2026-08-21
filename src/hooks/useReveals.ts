import { useEffect } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "./useReducedMotion";

/**
 * Animate all [data-reveal] elements into view on scroll.
 * Re-runs when `deps` change (e.g., route change).
 */
export function useReveals(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: parseFloat(el.dataset.delay ?? "0"),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
