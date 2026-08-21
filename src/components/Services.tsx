import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL } from "../lib/webgl";
import { Link } from "../lib/router";
import { SectionHeading } from "./SectionHeading";
import { ServiceScene } from "./3d/ServiceScene";
import { cn } from "../utils/cn";

function ServiceFallback({ active }: { active: number }) {
  const service = services[active];
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(100%_100%_at_50%_0%,#1d1215_0%,#140a0d_70%)]">
      <div className="h-56 w-56 rounded-full border border-paper/15" />
      <div className="absolute h-28 w-28 rounded-full border border-ember/40" />
      <p className="display absolute bottom-6 left-6 text-xl font-medium text-paper">{service.title}</p>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const show3D = !reduced && canUseWebGL();

  const onRowKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = e.key === "ArrowDown" ? (i + 1) % services.length : (i - 1 + services.length) % services.length;
      setActive(next);
      document.getElementById(`service-tab-${next}`)?.focus();
    }
  };

  return (
    <section id="services" className="px-page py-28 md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Services">What We Build</SectionHeading>
        <div className="-mt-8 mb-14" data-reveal>
          <Link
            to="/pricing"
            ariaLabel="View Solvit Labs services and pricing"
            className="u-link inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink/70"
          >
            View services & pricing
            <ArrowUpRight className="h-3.5 w-3.5 text-ember" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Interactive service rows */}
          <div role="tablist" aria-label="Solvit Labs services" className="border-t border-ink/12">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  id={`service-tab-${i}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="service-panel"
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onRowKey(e, i)}
                  className={cn(
                    "group relative block w-full border-b border-ink/12 px-1 py-7 text-left transition-colors duration-300 md:py-8",
                    isActive ? "text-ink" : "text-ink/50 hover:text-ink"
                  )}
                  data-reveal
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-full w-[3px] origin-top bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )}
                    aria-hidden
                  />
                  <span className="flex items-baseline justify-between gap-6 pl-5">
                    <span className="flex items-baseline gap-5">
                      <span className={cn("font-mono text-xs", isActive ? "text-ember" : "text-ink/35")}>
                        {s.index}
                      </span>
                      <span className="display text-2xl font-medium md:text-[2rem]">{s.title}</span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-all duration-400",
                        isActive ? "translate-x-0 text-ember opacity-100" : "-translate-x-2 opacity-0"
                      )}
                      aria-hidden
                    />
                  </span>
                  <span
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <span className="overflow-hidden pl-5 md:pl-[3.35rem]">
                      <span className="block max-w-lg text-[0.95rem] leading-relaxed text-ink/55">
                        {s.short}
                      </span>
                      <span className="mt-4 flex flex-wrap items-center gap-2">
                        {s.deliverables.map((d) => (
                          <span
                            key={d}
                            className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/60"
                          >
                            {d}
                          </span>
                        ))}
                        <Link
                          to={`/services/${s.id}`}
                          className="u-link ml-1 inline-flex items-center gap-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ember"
                        >
                          Explore {s.title}
                          <ArrowUpRight className="h-3 w-3" aria-hidden />
                        </Link>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sticky 3D stage — dark "hardware tile" on the light page */}
          <div className="relative hidden lg:block">
            <div className="sticky top-24 overflow-hidden border border-ink/12 bg-ink-2" data-reveal>
              <div
                id="service-panel"
                role="tabpanel"
                aria-label={`${services[active].title} visualization`}
                className="h-[520px]"
              >
                {show3D ? (
                <ServiceScene active={services[active].sceneIndex} />
              ) : (
                <ServiceFallback active={active} />
              )}
              </div>
              <div className="flex items-center justify-between border-t border-paper/12 bg-ink px-6 py-4">
                <p className="display text-lg font-medium text-paper">{services[active].title}</p>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-paper/50">
                  {services[active].index} / 06
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
