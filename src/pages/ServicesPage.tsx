import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "../data/services";
import { Link } from "../lib/router";
import { breadcrumbSchema, siteUrl, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

const crumbs = [{ label: "Home", href: "/" }, { label: "Services" }];

export function ServicesPage() {
  useSeo({
    title: "Digital Development Services | Solvit Labs",
    description:
      "Explore Solvit Labs services including web development, mobile apps, UI/UX design, AI solutions and immersive 3D web experiences.",
    keywords: "web development, mobile development, ui ux design, 3d web experiences, ai solutions",
    path: "/services",
    jsonLd: useMemo(
      () => [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Solvit Labs Services",
          url: `${siteUrl}/services`,
          hasPart: services.map((s) => ({
            "@type": "Service",
            name: s.title,
            url: `${siteUrl}/services/${s.id}`,
          })),
        },
        breadcrumbSchema(crumbs),
      ],
      []
    ),
  });

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title={<>What <span className="text-ember">Solvit Labs</span> builds</>}
        lede="Five disciplines, one engineering culture. Every service ships with semantic foundations, accessible interactions, and performance budgets agreed before a pixel is placed."
      />

      <section className="px-page pb-24">
        <div className="max-page border-t border-ink/12">
          {services.map((s, i) => (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              ariaLabel={`Explore Solvit Labs ${s.title} services`}
              className="group grid gap-4 border-b border-ink/12 py-9 transition-colors md:grid-cols-12 md:items-center md:py-11"
              data-reveal
            >
              <div className="flex items-baseline gap-5 md:col-span-5">
                <span className="font-mono text-xs text-ember">{s.index}</span>
                <h2 className="display text-3xl font-medium transition-colors group-hover:text-ember md:text-4xl">
                  {s.title}
                </h2>
              </div>
              <p className="max-w-md text-[0.95rem] leading-relaxed text-ink/55 md:col-span-5">
                {s.short}
              </p>
              <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink md:col-span-2 md:justify-end">
                <span className="u-link">Explore</span>
                <ArrowRight className="h-4 w-4 text-ember transition-transform duration-400 group-hover:translate-x-1" aria-hidden />
                <span className="sr-only">{` — learn more about ${s.title}`}</span>
              </div>
              <span className="sr-only">{s.stack.join(", ")} (Service {i + 1} of {services.length})</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-page pb-28" aria-labelledby="services-cta">
        <div className="max-page flex flex-col gap-8 border border-ink/12 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12" data-reveal>
          <div>
            <h2 id="services-cta" className="display text-2xl font-medium md:text-3xl">
              Not sure which service fits?
            </h2>
            <p className="mt-2 text-ink/55">
              Tell us the outcome you need — we'll map it to an approach.
            </p>
            <Link
              to="/pricing"
              ariaLabel="View Solvit Labs services and pricing"
              className="u-link mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink/70"
            >
              See transparent pricing
              <ArrowRight className="h-3.5 w-3.5 text-ember" aria-hidden />
            </Link>
          </div>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </main>
  );
}
