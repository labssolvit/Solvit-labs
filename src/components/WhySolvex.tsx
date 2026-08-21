import { whySolvex } from "../data/process";
import { SectionHeading } from "./SectionHeading";

export function WhySolvex() {
  return (
    <section id="why" className="border-t border-ink/10 bg-paper-2 px-page py-28 text-ink md:py-40">
      <div className="max-page">
        <SectionHeading eyebrow="Why Solvit Labs">
          Why <span className="text-ember">Solvit Labs?</span>
        </SectionHeading>

        <div className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {whySolvex.map((item, i) => (
            <div key={item.title} className="group bg-paper-2 px-8 py-10 transition-colors duration-400 hover:bg-paper">
              <p className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display mt-5 text-[1.35rem] font-medium">{item.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
