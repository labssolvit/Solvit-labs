import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { metrics } from "../data/technologies";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../hooks/useReducedMotion";
import { Link } from "../lib/router";
import { SectionHeading } from "./SectionHeading";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const state = { v: 0 };
          gsap.to(state, {
            v: value,
            duration: 1.9,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = String(Math.round(state.v));
            },
          });
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="bg-ink px-page py-28 text-paper md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="About Solvit Labs">
          We don't just build websites.
          <br />
          We build <span className="text-ember">digital experiences.</span>
        </SectionHeading>

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal>
            <p className="max-w-2xl text-xl leading-relaxed text-paper/75 md:text-2xl">
              Solvit Labs combines thoughtful design, modern engineering, and
              business-focused strategy to create digital products that look
              exceptional — and perform in the real world.
            </p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/55">
              Every build is measured against the same standard we hold this
              website to: speed, precision, accessibility, and craft. If it
              carries the Solvit Labs name, it is engineered to perform.
            </p>
            <Link
              to="/about"
              className="u-link mt-8 inline-flex items-center gap-2 font-display text-[0.8rem] font-medium uppercase tracking-[0.2em] text-paper"
              ariaLabel="Learn more about Solvit Labs"
            >
              More about Solvit Labs
              <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
            </Link>
          </div>
          <div className="md:col-span-5" data-reveal data-delay="0.15">
            <div className="border-l-2 border-ember pl-6">
              <p className="display text-2xl font-medium leading-snug md:text-[1.7rem]">
                "The website itself is our strongest case study."
              </p>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-paper/45">
                The Solvit Labs Standard
              </p>
            </div>
          </div>
        </div>

        {/* Metrics — placeholder values, replace with verified data */}
        <div className="mt-24 grid grid-cols-2 border border-paper/15 md:grid-cols-4" data-reveal>
          {metrics.map((m, i) => (
            <div
              key={m.id}
              className={`px-7 py-9 ${i !== 0 ? "border-l border-paper/15" : ""} ${
                i >= 2 ? "border-t border-paper/15 md:border-t-0" : ""
              } ${i === 2 ? "border-l-0 md:border-l" : ""}`}
            >
              <p className="display text-4xl font-medium md:text-5xl">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-paper/50">
                {m.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/35">
          * Placeholder metrics — updated with verified Solvit Labs delivery data.
        </p>
      </div>
    </section>
  );
}
