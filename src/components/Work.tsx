import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Link } from "../lib/router";
import { SectionHeading } from "./SectionHeading";
import { cn } from "../utils/cn";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      // Cinematic clip-path reveals for each project visual.
      gsap.utils.toArray<HTMLElement>(".work-clip").forEach((clip) => {
        gsap.fromTo(
          clip,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            ease: "power4.inOut",
            scrollTrigger: { trigger: clip, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" ref={sectionRef} className="border-t border-ink/12 px-page py-28 md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Selected Work">
          Selected <span className="text-ember">Work</span>
        </SectionHeading>
        <p className="-mt-8 mb-16 max-w-xl text-sm text-ink/55" data-reveal>
          Live Solvit Labs builds — designed, engineered, and running in production
          right now. Every link opens the real thing.
        </p>

        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="grid items-center gap-8 md:gap-12 lg:grid-cols-12"
              data-reveal
            >
              {/* Visual */}
              <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <div data-cursor="VIEW">
                  <Link
                    to={`/work/${p.slug}`}
                    ariaLabel={`View case study: ${p.name}`}
                    className="work-clip group relative block overflow-hidden border border-ink/12 bg-paper-2"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.category}`}
                        loading="lazy"
                        className="work-img h-[112%] w-full scale-[1.01] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-25" />
                    </div>
                    <div className="absolute left-5 top-5 flex items-center gap-3">
                      <span className="bg-ink/75 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
                        Project {p.index}
                      </span>
                      <span className="flex items-center gap-1.5 bg-ember px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
                        Live
                      </span>
                    </div>
                    <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-2 items-center justify-center bg-ember opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="h-5 w-5 text-white" aria-hidden />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Meta */}
              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-1")}>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.26em] text-ember">
                  {p.category} — {p.year}
                </p>
                <h3 className="display mt-4 text-4xl font-medium md:text-5xl">
                  <Link to={`/work/${p.slug}`} className="transition-colors hover:text-ember">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink/55">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/work/${p.slug}`}
                  className="u-link mt-8 inline-flex items-center gap-2 font-display text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-ink/12 pt-6" data-reveal>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/40">
            More builds in progress — full archive available on request.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/projects" className="u-link inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/70" ariaLabel="Browse all Solvit Labs projects">
              All projects <ArrowRight className="h-3.5 w-3.5 text-ember" aria-hidden />
            </Link>
            <Link to="/case-studies" className="u-link inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/70" ariaLabel="Read Solvit Labs case studies">
              Case studies <ArrowRight className="h-3.5 w-3.5 text-ember" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
