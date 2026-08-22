import { useRef } from "react";

/**
 * Continuous scene time (seconds) that survives frameloop toggles.
 *
 * Why this exists:
 * R3F sets `state.clock.elapsedTime = 0` every time a canvas' `frameloop`
 * prop changes between "always" and "never" (see setFrameloop in
 * @react-three/fiber). Scenes pause their canvas off-screen via
 * `useInViewport`, so every scroll-away and scroll-back resets the clock.
 * Any spinner that derives its rotation from `elapsedTime` (e.g.
 * `damp(rotation, t * speed, …)`) would then find itself several radians
 * "ahead" of the reset time and would whip back very fast for a few seconds
 * until the damp settles.
 *
 * Instead of reading `clock.elapsedTime`, scenes read this clock: it accrues
 * the (clamped) per-frame delta, so it is continuous across pause/resume,
 * idles at a constant rate, and never jumps backwards. Spinners built on it
 * therefore spin at exactly the same speed and acceleration before, during
 * and after scrolling.
 */
export interface SceneClock {
  /** Advance by this frame's delta (clamped to a sane 0…0.1 s) and return
   *  the new continuous scene time. */
  advance: (rawDelta: number) => number;
}

export function useSceneClock(): SceneClock {
  const value = useRef(0);
  return {
    advance: (rawDelta: number) => {
      const dt = Math.min(Math.max(rawDelta, 0), 0.1);
      value.current += dt;
      return value.current;
    },
  };
}