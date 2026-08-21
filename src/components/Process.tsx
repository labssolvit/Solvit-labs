import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Code2,
  DraftingCompass,
  LayoutGrid,
  Lightbulb,
  PackageCheck,
  Rocket,
} from "lucide-react";
import { processSteps } from "../data/process";
import { ScrollTrigger } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

const STAGE_ICONS = [Lightbulb, DraftingCompass, LayoutGrid, Code2, PackageCheck, Rocket];

/** Shape language per stage: Idea → Blueprint → Interface → Code → Product → Launch */
const STAGE_STYLES: CSSProperties[] = [
  { borderRadius: "50%", transform: "rotate(0deg) scale(0.92)", background: "transparent" },
  { borderRadius: "4px", transform: "rotate(45deg) scale(0.82)", background: "transparent" },
  { borderRadius: "12px", transform: "rotate(0deg) scale(1)", background: "#1c0f12" },
  { borderRadius: "12px", transform: "rotate(0deg) scale(0.86)", background: "#1c0f12" },
  { borderRadius: "24px", transform: "rotate(0deg) scale(1)", background: "#C8102E" },
  { borderRadius: "50% 50% 4px 4px", transform: "rotate(0deg) scale(0.95)", background: "#C8102E" },
];

export function Process() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapRef.current) return;
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top 55%",
      end: "bottom 55%",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
        setActive(
          Math.min(processSteps.length - 1, Math.floor(self.progress * processSteps.length))
        );
      },
    });
    return () => st.kill();
  }, [reduced]);

  const Icon = STAGE_ICONS[active];

  return (
    <section id="process" className="bg-paper px-page py-28 text-ink md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Process">How We Build</SectionHeading>

        <div ref={wrapRef} className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Sticky evolving stage */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 flex flex-col items-start gap-10">
              <div className="relative flex h-[300px] w-[300px] items-center justify-center">
                {/* Orbit ring */}
                <div
                  className="absolute inset-0 rounded-full border border-ink/15"
                  aria-hidden
                />
                <div
                  className="absolute inset-6 rounded-full border border-dashed border-ink/20"
                  style={{ transform: `rotate(${progress * 180}deg)` }}
                  aria-hidden
                />
                {/* Morphing artifact */}
                <div
                  className="flex h-28 w-28 items-center justify-center border-2 border-ink transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={STAGE_STYLES[active]}
                >
                  <Icon
                    className={cn(
                      "h-9 w-9 transition-colors duration-500",
                      active >= 2 ? "text-paper" : "text-ink"
                    )}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                </div>
                {/* Stage label */}
                <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.28em] text-ink/55">
                  {processSteps[active].stage}
                </p>
              </div>

              {/* Progress rail */}
              <div className="w-[300px]">
                <div className="flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/45">
                  <span>Idea</span>
                  <span>Launch</span>
                </div>
                <div className="mt-2 h-px w-full bg-ink/15">
                  <div
                    className="h-px bg-ember transition-[width] duration-200"
                    style={{ width: `${Math.max(4, progress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="border-t border-ink/12">
            {processSteps.map((step, i) => (
              <li
                key={step.index}
                className={cn(
                  "border-b border-ink/12 py-9 transition-opacity duration-500 md:py-11",
                  active === i || reduced ? "opacity-100" : "opacity-45"
                )}
                data-reveal
              >
                <div className="flex items-baseline gap-6">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      active === i ? "text-ember" : "text-ink/45"
                    )}
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3 className="display text-2xl font-medium md:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/60">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
