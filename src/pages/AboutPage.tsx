import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { company } from "../data/company";
import { whySolvex } from "../data/process";
import { Link } from "../lib/router";
import { breadcrumbSchema, organizationSchema, useSeo, websiteSchema } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

const crumbs = [{ label: "Home", href: "/" }, { label: "About" }];

export function AboutPage() {
  useSeo({
    title: "About Solvit Labs | Premium Digital Solutions Studio",
    description:
      "Learn about Solvit Labs — a premium digital solutions company engineering high-performance websites, mobile apps, AI solutions, and immersive 3D web experiences.",
    keywords: "about solvit labs, digital solutions company, web studio",
    path: "/about",
    jsonLd: useMemo(
      () => [organizationSchema, websiteSchema, breadcrumbSchema(crumbs)],
      []
    ),
  });

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow="About"
        title={<>A studio built on <span className="text-ember">engineering discipline.</span></>}
        lede={company.description}
      />

      <section className="px-page pb-24">
        <div className="max-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="display text-3xl font-medium md:text-4xl">
              Design + Engineering + Business, held to one standard.
            </h2>
          </div>
          <div className="space-y-6 text-[1.02rem] leading-relaxed text-ink/65" data-reveal data-delay="0.1">
            <p>
              Solvit Labs exists for a simple reason: most digital products are
              either beautiful and fragile, or robust and forgettable. We build
              the third kind — experiences that look exceptional and hold up
              under real users, real devices, and real business pressure.
            </p>
            <p>
              Every engagement runs through the same loop: discover, strategy,
              design, develop, test, launch. Measured at every stage, documented
              at every decision. The website you're reading is built to the
              same standard we ship to clients — it's our strongest case study.
            </p>
          </div>
        </div>
      </section>

      <section className="px-page pb-24" aria-labelledby="about-principles">
        <div className="max-page">
          <h2 id="about-principles" className="eyebrow mb-10 flex items-center gap-3 text-ink/50" data-reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            How we work
          </h2>
          <div className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {whySolvex.slice(0, 3).map((item, i) => (
              <div key={item.title} className="bg-paper px-8 py-10">
                <p className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-5 text-[1.35rem] font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-page pb-28" aria-labelledby="about-next">
        <div className="max-page flex flex-col gap-8 border border-ink/12 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12" data-reveal>
          <div>
            <h2 id="about-next" className="display text-2xl font-medium md:text-3xl">
              See what we build, or start something.
            </h2>
            <div className="mt-4 flex flex-wrap gap-5 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
              <Link to="/services" className="u-link inline-flex items-center gap-1.5 text-ember">
                Explore Solvit Labs services <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link to="/projects" className="u-link inline-flex items-center gap-1.5 text-ink/70">
                View live projects <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link to="/careers" className="u-link inline-flex items-center gap-1.5 text-ink/70">
                Careers <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <Button to="/contact">Start a Project</Button>
        </div>
      </section>
    </main>
  );
}
