import Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

let lenis: Lenis | null = null;

/**
 * Global Lenis smooth-scroll instance.
 * Uses Lenis' own autoRaf loop (independent of other systems, so it can
 * never be silently killed) and syncs ScrollTrigger on every scroll tick.
 */
export function initLenis(enabled: boolean): Lenis | null {
  if (!enabled || lenis) return lenis;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.4,
    // Keep touch scrolling native for physical feel on mobile.
    syncTouch: false,
  });
  lenis.on("scroll", ScrollTrigger.update);
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export const getLenis = () => lenis;
