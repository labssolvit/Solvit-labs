import { useMemo } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { Link } from "../lib/router";
import { breadcrumbSchema, siteUrl, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

const projectCrumbs = [{ label: "Home", href: "/" }, { label: "Projects" }];
const caseCrumbs = [{ label: "Home", href: "/" }, { label: "Case Studies" }];

export function ProjectsPage() {
  useSeo({
    title: "Projects & Live Builds | Solvit Labs",
    description:
      "Browse live Solvit Labs projects — production websites, platforms, and portfolios designed, engineered, and running in production right now.",
    keywords: "solvit labs projects, web development portfolio, live websites",
    path: "/projects",
    jsonLd: useMemo(
      () => [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Solvit Labs Projects",
          url: `${siteUrl}/projects`,
          hasPart: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: `${siteUrl}/work/${p.slug}`,
          })),
        },
        breadcrumbSchema(projectCrumbs),
      ],
      []
    ),
  });

  return (
    <main>
      <PageHero
        crumbs={projectCrumbs}
        eyebrow="Projects"
        title={<>Live builds, <span className="text-ember">not mockups.</span></>}
        lede="Every project below is designed, engineered, and running in production. Open them, inspect them, break them — they hold."
      />

      <section className="px-page pb-24">
        <div className="max-page grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              ariaLabel={`Read the ${p.name} case study`}
              className="group block overflow-hidden border border-ink/12"
              data-reveal
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.category} by Solvit Labs`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ember">
                    {p.category}
                  </p>
                  <h2 className="display mt-2 text-xl font-medium">{p.name}</h2>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-all duration-300 group-hover:text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
        <div className="max-page mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink/12 pt-8" data-reveal>
          <p className="text-sm text-ink/55">
            Looking for the engineering story behind each build?
          </p>
          <Link
            to="/case-studies"
            className="u-link inline-flex items-center gap-2 font-display text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink"
          >
            Read Solvit Labs case studies
            <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}

export function CaseStudiesPage() {
  useSeo({
    title: "Case Studies — Engineering Stories | Solvit Labs",
    description:
      "Read Solvit Labs case studies: the strategy, design, and engineering decisions behind live production builds like DETOX and Nouman Science Academy.",
    keywords: "solvit labs case studies, web development case study, design engineering",
    path: "/case-studies",
    jsonLd: useMemo(() => [breadcrumbSchema(caseCrumbs)], []),
  });

  return (
    <main>
      <PageHero
        crumbs={caseCrumbs}
        eyebrow="Case Studies"
        title={<>The thinking behind <span className="text-ember">the builds.</span></>}
        lede="Challenge, strategy, design, and development — documented honestly for every live project."
      />

      <section className="px-page pb-24">
        <div className="max-page border-t border-ink/12">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              ariaLabel={`Read the ${p.name} case study`}
              className="group grid gap-5 border-b border-ink/12 py-10 md:grid-cols-12 md:items-center"
              data-reveal
            >
              <div className="flex items-baseline gap-5 md:col-span-5">
                <span className="font-mono text-xs text-ember">{p.index}</span>
                <h2 className="display text-3xl font-medium transition-colors group-hover:text-ember md:text-4xl">
                  {p.name}
                </h2>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-ink/55 md:col-span-5">
                {p.description}
              </p>
              <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink md:col-span-2 md:justify-end">
                <span className="u-link">Read case study</span>
                <ArrowRight className="h-4 w-4 text-ember transition-transform duration-400 group-hover:translate-x-1" aria-hidden />
              </div>
            </Link>
          ))}
        </div>

        <div className="max-page mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink/12 pt-8" data-reveal>
          <p className="text-sm text-ink/55">Want to add yours to this list?</p>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </main>
  );
}
