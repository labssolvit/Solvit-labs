/**
 * Lightweight DOM text-scramble ("decode") effect.
 * Best used on short mono/label strings — cheap and layout-stable.
 */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

const active = new WeakMap<HTMLElement, number>();

export function scrambleText(el: HTMLElement, finalText: string, duration = 650) {
  const token = (active.get(el) ?? 0) + 1;
  active.set(el, token);
  const start = performance.now();
  const total = finalText.length;

  const tick = (now: number) => {
    if (active.get(el) !== token) return; // superseded
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * p * total); // ease: resolve accelerates at the end
    let out = "";
    for (let i = 0; i < total; i++) {
      const ch = finalText[i];
      out += i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
    else {
      el.textContent = finalText;
      active.delete(el);
    }
  };
  requestAnimationFrame(tick);
}
