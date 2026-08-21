import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { getProject, nextProject } from "../data/projects";
import { scrollToTop, Link } from "../lib/router";
import { breadcrumbSchema, organizationSchema, siteUrl, useSeo } from "../lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "./Button";

interface CaseStudyProps {
  slug: string;
}

export function CaseStudy({ slug }: CaseStudyProps) {
  const project = getProject(slug);
  const next = nextProject(slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: project?.name ?? "Project" },
  ];

  useSeo({
    title: project
      ? `${project.name} — ${project.category} Case Study | Solvit Labs`
      : "Case Study Not Found | Solvit Labs",
    description: project?.description ?? "The requested case study could not be found.",
    keywords: project ? `${project.name}, ${project.category}, solvit labs case study` : undefined,
    path: `/work/${slug}`,
    robots: project ? "index, follow" : "noindex, follow",
    jsonLd: useMemo(
      () =>
        project
          ? [
              {
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: project.name,
                description: project.description,
                url: `${siteUrl}/work/${project.slug}`,
                image: `${siteUrl}${project.image}`,
                dateCreated: project.year,
                creator: {
                  "@type": "Organization",
                  name: organizationSchema.name,
                  url: organizationSchema.url,
                },
              },
              breadcrumbSchema(crumbs),
            ]
          : [],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [slug]
    ),
  });

  useEffect(() => {
    scrollToTop(true);
  }, [slug]);

  if (!project) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-page text-center">
        <p className="eyebrow text-ink/50">404 — Not found</p>
        <h1 className="display mt-6 text-5xl font-medium">Project not found.</h1>
        <p className="mt-5 max-w-md text-ink/55">
          The case study you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10">
          <Button to="/#work">Back to Selected Work</Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="px-page pb-16 pt-36 md:pt-44">
        <div className="max-page">
          <Breadcrumbs items={crumbs} />
          <Link
            to="/case-studies"
            className="u-link inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-ink/55 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All Case Studies
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow flex items-center gap-3 text-ember" data-reveal>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
                Project {project.index}
              </p>
              <h1
                className="display mt-6 text-[clamp(3rem,9vw,7.5rem)] font-medium leading-none"
                data-reveal
                data-delay="0.06"
              >
                {project.name}
              </h1>
              <p
                className="mt-8 max-w-xl text-lg leading-relaxed text-ink/60"
                data-reveal
                data-delay="0.12"
              >
                {project.description}
              </p>
            </div>
            <div className="lg:col-span-4" data-reveal data-delay="0.18">
              <dl className="space-y-5 border-t border-ink/12 pt-6 lg:border-t-0 lg:pt-2">
                {[
                  ["Category", project.category],
                  ["Year", project.year],
                  ["Type", project.type],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 lg:border-b lg:border-ink/10 lg:pb-5">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ink/45">
                      {k}
                    </dt>
                    <dd className="text-right text-[0.9rem] text-ink/80">{v}</dd>
                  </div>
                ))}
                <div className="flex flex-wrap justify-end gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-ink/15 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end pt-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/visit inline-flex items-center gap-2 border border-ink/20 px-5 py-3 font-display text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ember hover:text-ember"
                  >
                    Visit Live Site
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="px-page">
        <div className="max-page" data-reveal>
          <div className="overflow-hidden border border-ink/12">
            <img
              src={project.image}
              alt={`${project.name} — ${project.category} hero visual`}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-page py-20 md:py-28">
        <div className="max-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Overview
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal data-delay="0.08">
            <p className="max-w-2xl text-xl leading-relaxed text-ink/90 md:text-2xl">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge → Development */}
      <section className="border-t border-ink/12 px-page py-20 md:py-28">
        <div className="max-page grid gap-px border border-ink/12 bg-ink/10 md:grid-cols-2" data-reveal>
          {project.blocks.map((b, i) => (
            <article key={b.heading} className="bg-paper px-8 py-12 md:px-12 md:py-14">
              <p className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-4 text-2xl font-medium md:text-3xl">{b.heading}</h2>
              <p className="mt-5 max-w-lg leading-relaxed text-ink/55">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Technology + Outcomes */}
      <section className="border-t border-ink/12 px-page py-20 md:py-28">
        <div className="max-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 className="eyebrow mb-8 flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Technology
            </h2>
            <div className="space-y-8">
              {project.stackDetail.map((group) => (
                <div key={group.label}>
                  <p className="display text-lg font-medium">{group.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/65"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal data-delay="0.1">
            <h2 className="eyebrow mb-8 flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Outcomes
            </h2>
            <ul className="space-y-5">
              {project.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-4 border-b border-ink/12 pb-5">
                  <Plus className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={2} aria-hidden />
                  <span className="text-[1.02rem] leading-relaxed text-ink/85">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-ink/12 px-page py-20 md:py-28">
        <div className="max-page">
          <h2 className="eyebrow mb-10 flex items-center gap-3 text-ink/50" data-reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            Gallery
          </h2>
          <div className="grid gap-6 md:grid-cols-2" data-reveal>
            <div className="overflow-hidden border border-ink/12">
              <img
                src={project.image}
                alt={`${project.name} interface detail — upper composition`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="overflow-hidden border border-ink/12">
              <img
                src={project.image}
                alt={`${project.name} interface detail — ambient composition`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-bottom transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-ink/12 px-page py-20 md:py-28">
        <div className="max-page" data-reveal>
          <p className="eyebrow text-ink/50">Next project</p>
          <div data-cursor="NEXT">
            <Link
              to={`/work/${next.slug}`}
              className="group mt-6 flex items-center justify-between gap-8"
              ariaLabel={`Next case study: ${next.name}`}
            >
              <h2 className="display text-[clamp(2.6rem,7vw,6rem)] font-medium transition-colors duration-400 group-hover:text-ember">
                {next.name}
              </h2>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-ink/15 transition-colors duration-400 group-hover:border-ember md:h-20 md:w-20">
                <ArrowRight className="h-6 w-6 transition-transform duration-400 group-hover:translate-x-1 group-hover:text-ember" aria-hidden />
              </span>
            </Link>
          </div>
          <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ink/45">
            {next.category} — {next.year}
          </p>
        </div>
      </section>
    </main>
  );
}
