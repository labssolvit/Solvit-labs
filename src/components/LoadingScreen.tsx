import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onDone: () => void;
  reducedMotion: boolean;
}

export function LoadingScreen({ onDone, reducedMotion }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const duration = reducedMotion ? 350 : 1350;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease into 100 so the bar never feels linear/mechanical.
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(() => {
          setGone(true);
          onDone();
        }, reducedMotion ? 60 : 620);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reducedMotion]);

  if (gone) return null;

  const letters = "SOLVIT LABS".split("");

  return (
    <div
      role="status"
      aria-label="Loading Solvit Labs"
      aria-live="polite"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        leaving ? "pointer-events-none -translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <div className="display flex overflow-hidden text-[clamp(2rem,6.4vw,4.2rem)] font-semibold tracking-[-0.02em]">
        {letters.map((l, i) =>
          l === " " ? (
            <span key={i} className="inline-block w-[0.45em]" aria-hidden />
          ) : (
            <span
              key={i}
              className={`inline-block animate-[load-letter_0.7s_cubic-bezier(0.16,1,0.3,1)_both] ${i > 6 ? "text-ember" : ""}`}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {l}
            </span>
          )
        )}
      </div>

      <p className="eyebrow mt-6 text-ink/50" style={{ animationDelay: "0.4s" }}>
        Initializing digital experience
      </p>

      <div className="mt-8 h-px w-48 overflow-hidden bg-ink/12" aria-hidden>
        <div
          className="h-full bg-ember transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-xs tabular-nums text-ink/50" aria-hidden>
        {String(progress).padStart(3, "0")}%
      </p>

      <style>{`
        @keyframes load-letter {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
