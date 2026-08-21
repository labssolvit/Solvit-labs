import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Precision cursor for fine-pointer devices.
 * Small dot + trailing ring; expands on interactive elements,
 * shows a label over elements marked [data-cursor].
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let mode: "default" | "hover" | "view" = "default";
    let pressed = false;
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement).closest(
        "[data-cursor], a, button, [role='button'], input, textarea, select, label"
      );
      if (target) {
        const labelled = (target as HTMLElement).closest("[data-cursor]");
        mode = labelled ? "view" : "hover";
        if (mode === "view")
          label.textContent = (labelled as HTMLElement).dataset.cursor || "VIEW";
      } else {
        mode = "default";
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      let scale = mode === "view" ? 2.6 : mode === "hover" ? 1.7 : 1;
      if (pressed) scale *= 0.82;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${scale})`;
      ring.style.backgroundColor =
        mode === "view" ? "rgba(200,16,46,0.94)" : "transparent";
      ring.style.borderColor =
        mode === "view" ? "transparent" : "rgba(10,10,11,0.45)";
      label.style.opacity = mode === "view" ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150] hidden [@media(pointer:fine)]:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border transition-[background-color,border-color] duration-200 will-change-transform"
      >
        <span
          ref={labelRef}
          className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-200"
        >
          VIEW
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-ember mix-blend-difference will-change-transform"
      />
    </div>
  );
}
