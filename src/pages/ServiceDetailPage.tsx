import { useMemo } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { getService, services } from "../data/services";
import { getProject } from "../data/projects";
import { Link } from "../lib/router";
import { breadcrumbSchema, organizationSchema, siteUrl, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

interface ServiceDetailPageProps {
  slug: string;
}

export function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const service = getService(slug);
  const other = services.filter((s) => s.id !== slug).slice(0, 4);
  const related = (service?.relatedProjects ?? [])
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service?.title ?? "Service" },
  ];

  useSeo({
    title: service
      ? `${service.title} Services | Solvit Labs`
      : "Service Not Found | Solvit Labs",
    description: service?.short ?? "The requested service could not be found.",
    keywords: service?.keywords,
    path: `/services/${slug}`,
    robots: service ? "index, follow" : "noindex, follow",
    jsonLd: useMemo(
      () =>
        service
          ? [
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: `${organizationSchema.name} — ${service.title}`,
                serviceType: service.title,
                description: service.short,
                url: `${siteUrl}/services/${service.id}`,
                provider: { "@type": "Organization", name: organizationSchema.name, url: organizationSchema.url },
                areaServed: "Worldwide",
              },
              breadcrumbSchema(crumbs),
            ]
          : [],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [slug]
    ),
  });

  if (!service) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-page text-center">
        <h1 className="display text-4xl font-medium">Service not found.</h1>
        <p className="mt-4 text-ink/55">The service you're looking for doesn't exist.</p>
        <div className="mt-8">
          <Button to="/services">Explore Solvit Labs services</Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow={`Service ${service.index}`}
        title={<>{service.title.split(" ").slice(0, -1).join(" ")}{service.title.includes(" ") ? " " : ""}<span className="text-ember">{service.title.split(" ").slice(-1)}</span></>}
        lede={service.tagline}
      />

      {/* Overview + capabilities */}
      <section className="px-page pb-20" aria-labelledby="service-overview">
        <div className="max-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="service-overview" className="eyebrow mb-8 flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Overview
            </h2>
            <p className="max-w-2xl text-xl leading-relaxed text-ink/80 md:text-2xl">
              {service.overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-ink/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal data-delay="0.1">
            <h2 className="eyebrow mb-8 flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              What we build
            </h2>
            <ul className="space-y-4">
              {service.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-4 border-b border-ink/12 pb-4">
                  <Plus className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={2} aria-hidden />
                  <span className="text-[1.02rem] leading-relaxed text-ink/85">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process note */}
      <section className="border-t border-ink/12 px-page py-16" aria-labelledby="service-process">
        <div className="max-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
          <div className="max-w-xl">
            <h2 id="service-process" className="display text-2xl font-medium md:text-3xl">
              Built through the Solvit process.
            </h2>
            <p className="mt-3 text-ink/55">
              Discover → Strategy → Design → Develop → Test → Launch — with weekly
              staging previews from week one.
            </p>
          </div>
          <Link
            to="/#process"
            className="u-link inline-flex items-center gap-2 font-display text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ink"
          >
            See the full process
            <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="border-t border-ink/12 px-page py-20" aria-labelledby="service-related">
          <div className="max-page">
            <h2 id="service-related" className="eyebrow mb-10 flex items-center gap-3 text-ink/50" data-reveal>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Related work
            </h2>
            <div className="grid gap-6 md:grid-cols-2" data-reveal>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  ariaLabel={`Read the ${p.name} case study`}
                  className="group relative block overflow-hidden border border-ink/12"
                >
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category}, a Solvit Labs ${service.title.toLowerCase()} project`}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/70">
                        {p.category}
                      </p>
                      <p className="display mt-2 text-2xl font-medium text-paper">{p.name}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-paper transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="border-t border-ink/12 px-page py-20" aria-labelledby="service-faqs">
        <div className="max-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h2 id="service-faqs" className="eyebrow flex items-center gap-3 text-ink/50">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Frequently asked
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-8" data-reveal data-delay="0.08">
            {service.faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/12 pb-6" open={false}>
                <summary className="display cursor-pointer list-none text-xl font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-6">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 text-ember transition-transform duration-300 group-open:rotate-45" aria-hidden />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services + CTA */}
      <section className="border-t border-ink/12 px-page py-20" aria-labelledby="service-more">
        <div className="max-page">
          <h2 id="service-more" className="eyebrow mb-8 flex items-center gap-3 text-ink/50" data-reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            More from Solvit Labs
          </h2>
          <div className="mb-12 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
            {other.map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                ariaLabel={`Explore Solvit Labs ${s.title} services`}
                className="u-link inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70"
              >
                {s.title}
                <ArrowUpRight className="h-3.5 w-3.5 text-ember" aria-hidden />
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-8 border border-ink/12 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12" data-reveal>
            <h2 className="display max-w-md text-2xl font-medium md:text-3xl">
              Ready to build with the {service.title} team?
            </h2>
            <Button to="/contact">Start a Project</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
