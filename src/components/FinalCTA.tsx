import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { company } from "../data/company";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL } from "../lib/webgl";
import { Button } from "./Button";
import { MorphParticles } from "./3d/MorphParticles";

/**
 * The finale — an interactive particle simulation that morphs
 * between engineered forms as you explore the calls to action.
 */
export function FinalCTA() {
  const reduced = useReducedMotion();
  const webgl = useMemo(() => canUseWebGL(), []);
  const [shape, setShape] = useState(0);
  const showParticles = webgl && !reduced;

  return (
    <section
      aria-label="Start a project"
      className="relative overflow-hidden border-t border-ink/10 bg-ink py-32 text-paper md:py-48"
    >
      {/* Subtle spatial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_110%,#261318_0%,#160a0d_60%)]"
      />

      {/* Morphing particle simulation */}
      {showParticles && (
        <div aria-hidden className="absolute inset-0 opacity-70">
          <MorphParticles shape={shape} mobile={false} />
        </div>
      )}

      <div className="relative px-page">
        <div className="max-page text-center">
          <p className="eyebrow mb-8 flex items-center justify-center gap-3 text-smoke" data-reveal>
            <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-ember" aria-hidden />
            Next step
          </p>
          <h2
            className="display text-balance text-[clamp(2.8rem,7vw,6.2rem)] font-medium"
            data-reveal
            data-delay="0.08"
          >
            Have an ambitious <span className="text-ember">idea?</span>
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fog/85"
            data-reveal
            data-delay="0.16"
          >
            Let's turn it into a digital experience people remember.
          </p>
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
            data-reveal
            data-delay="0.24"
          >
            <span
              onMouseEnter={() => setShape(2)}
              onMouseLeave={() => setShape(0)}
              onFocus={() => setShape(2)}
              onBlur={() => setShape(0)}
            >
              <Button to="/contact" variant="invert">Start a Project</Button>
            </span>
            <span
              onMouseEnter={() => setShape(4)}
              onMouseLeave={() => setShape(0)}
              onFocus={() => setShape(4)}
              onBlur={() => setShape(0)}
            >
              <a
                href={`mailto:${company.email}`}
                className="group inline-flex items-center gap-3 border border-paper/20 px-7 py-4 font-display text-[0.82rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-400 hover:border-ember hover:text-ember"
              >
                Talk to Solvit Labs
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </span>
          </div>

          {showParticles && (
            <p
              className="mt-14 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-graphite"
              data-reveal
            >
              Hover the actions — the field responds
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
