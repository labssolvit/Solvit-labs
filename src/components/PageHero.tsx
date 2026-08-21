import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "../lib/seo";

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}

/** Shared inner-page hero: breadcrumbs + single H1 + lede. */
export function PageHero({ crumbs, eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="px-page pb-16 pt-36 md:pt-44">
      <div className="max-page">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow flex items-center gap-3 text-ink/50" data-reveal>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
          {eyebrow}
        </p>
        <h1
          className="display mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6.5vw,5.2rem)] font-medium"
          data-reveal
          data-delay="0.06"
        >
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/60" data-reveal data-delay="0.12">
          {lede}
        </p>
        {children}
      </div>
    </section>
  );
}
