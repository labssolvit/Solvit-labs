import { useState } from "react";
import { technologies } from "../data/technologies";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL } from "../lib/webgl";
import { SectionHeading } from "./SectionHeading";
import { TechScene } from "./3d/TechScene";
import { cn } from "../utils/cn";

function TechFallback() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(100%_100%_at_50%_0%,#1a1013_0%,#140a0d_70%)]">
      <div className="h-40 w-40 rounded-full border border-paper/15" />
      <div className="absolute h-64 w-64 rounded-full border border-paper/8" />
      <div className="absolute h-2 w-2 rounded-full bg-ember" />
    </div>
  );
}

export function Technology() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const show3D = !reduced && canUseWebGL();
  const activeTech = technologies.find((t) => t.id === active);

  return (
    <section id="technology" className="border-t border-ink/12 px-page py-28 md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Technology">
          Built With <span className="text-ember">Modern Technology</span>
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* 3D orbital network — dark tile */}
          <div className="relative order-2 lg:order-1" data-reveal>
            <div className="h-[380px] overflow-hidden border border-ink/12 bg-ink-2 md:h-[520px]">
              {show3D ? <TechScene active={active} onHover={setActive} /> : <TechFallback />}
            </div>
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-paper/60">
                {activeTech ? activeTech.name : "Hover a node"}
              </p>
            </div>
          </div>

          {/* Stack list */}
          <div className="order-1 lg:order-2">
            <p className="mb-10 max-w-xl text-[0.98rem] leading-relaxed text-ink/55" data-reveal>
              A deliberate, production-proven stack. Every technology here is one
              we run in real client builds — chosen for longevity, performance,
              and developer clarity.
            </p>
            <div className="grid grid-cols-2 gap-px border border-ink/12 bg-ink/10 sm:grid-cols-3" data-reveal>
              {technologies.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onMouseEnter={() => setActive(t.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(t.id)}
                  onBlur={() => setActive(null)}
                  aria-pressed={active === t.id}
                  className={cn(
                    "bg-paper px-5 py-6 text-left transition-colors duration-300",
                    active === t.id && "bg-paper-2"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full transition-colors",
                        active === t.id ? "bg-ember" : "bg-ink/25"
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "display text-[0.95rem] font-medium transition-colors",
                        active === t.id ? "text-ink" : "text-ink/65"
                      )}
                    >
                      {t.name}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div
              aria-live="polite"
              className="mt-4 min-h-[4.5rem] border border-ink/12 px-5 py-4"
              data-reveal
            >
              {activeTech ? (
                <>
                  <p className="display text-base font-medium text-ink">{activeTech.name}</p>
                  <p className="mt-1 text-sm text-ink/55">{activeTech.note}</p>
                </>
              ) : (
                <p className="text-sm text-ink/40">
                  Select a technology to see how Solvit Labs uses it in production.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
