import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is inside (or near) the viewport.
 * Used to pause offscreen WebGL canvases — the single biggest
 * scroll-smoothness win on a multi-canvas page.
 */
export function useInViewport<T extends HTMLElement>(rootMargin = "240px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
