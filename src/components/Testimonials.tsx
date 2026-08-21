import { Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-ink/10 bg-paper px-page py-28 text-ink md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Testimonials">What Partners Say</SectionHeading>

        <div className="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3" data-reveal>
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col justify-between bg-paper px-8 py-10">
              <div>
                <Quote className="h-6 w-6 text-ember" strokeWidth={1.5} aria-hidden />
                <blockquote className="mt-6 text-[1.02rem] leading-relaxed text-ink/80">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="mt-10 border-t border-ink/12 pt-5">
                <p className="display text-[0.95rem] font-medium">{t.role}</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink/50">
                  {t.industry}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/40" data-reveal>
          Client names withheld for confidentiality — references available on request.
        </p>
      </div>
    </section>
  );
}
