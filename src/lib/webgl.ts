/** Detect WebGL availability without throwing. */
export function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** Shared normalized pointer position, updated by one listener. */
export const pointerState = { x: 0, y: 0 };

let pointerInitialized = false;
export function initPointerListener() {
  if (pointerInitialized || typeof window === "undefined") return;
  pointerInitialized = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    { passive: true }
  );
}
