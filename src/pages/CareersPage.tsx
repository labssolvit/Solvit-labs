import { useMemo } from "react";
import { company } from "../data/company";
import { Link } from "../lib/router";
import { breadcrumbSchema, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

const crumbs = [{ label: "Home", href: "/" }, { label: "Careers" }];

const principles = [
  {
    title: "Craft over volume",
    body: "A small senior team shipping a few excellent things beats a large team shipping many average ones. Expect deep work, not meetings about meetings.",
  },
  {
    title: "Engineering is design",
    body: "Performance budgets, accessibility, and clean APIs are aesthetic decisions here. You'll care about the invisible 90% of the product.",
  },
  {
    title: "Write it down",
    body: "Decisions, scope, and tradeoffs are documented. Clear writing is how a remote-first studio stays fast without chaos.",
  },
  {
    title: "Ship, then measure",
    body: "Launch is the start of the feedback loop. We instrument what we ship and iterate on evidence, not opinions.",
  },
];

export function CareersPage() {
  useSeo({
    title: "Careers — Work With Solvit Labs",
    description:
      "Join Solvit Labs: a remote-first digital studio building premium websites, mobile apps, AI solutions, and 3D web experiences. See how we work and how to apply.",
    keywords: "solvit labs careers, web developer jobs remote, design engineering jobs",
    path: "/careers",
    jsonLd: useMemo(() => [breadcrumbSchema(crumbs)], []),
  });

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow="Careers"
        title={<>Do the best work of <span className="text-ember">your career.</span></>}
        lede="Solvit Labs is a small, remote-first studio for people who treat engineering as a craft and design as a discipline."
      />

      <section className="px-page pb-20" aria-labelledby="careers-principles">
        <div className="max-page">
          <h2 id="careers-principles" className="eyebrow mb-10 flex items-center gap-3 text-ink/50" data-reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            How we work
          </h2>
          <div className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2" data-reveal>
            {principles.map((p, i) => (
              <div key={p.title} className="bg-paper px-8 py-10">
                <p className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-[1.3rem] font-medium">{p.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink/60">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/12 px-page py-20" aria-labelledby="open-roles">
        <div className="max-page grid gap-10 lg:grid-cols-2" data-reveal>
          <div>
            <h2 id="open-roles" className="display text-3xl font-medium md:text-4xl">
              Open positions
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ink/65">
              There are no open roles right now. We hire slowly and deliberately —
              when a position opens, it's published here first.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink/65">
              Exceptional people are welcome to introduce themselves any time.
              Send work you're proud of — live links over decks — and a note on
              what you want to build next.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6 border border-ink/12 px-8 py-10">
            <p className="eyebrow text-ink/50">Speculative applications</p>
            <a
              href={`mailto:${company.email}?subject=Careers%20at%20Solvit%20Labs`}
              className="u-link display w-fit text-2xl font-medium"
              aria-label={`Email your application to ${company.email}`}
            >
              {company.email}
            </a>
            <p className="text-sm leading-relaxed text-ink/55">
              Engineering, design, and motion roles. Remote-first — {company.location.toLowerCase()}.
            </p>
          </div>
        </div>
      </section>

      <section className="px-page pb-28">
        <div className="max-page flex flex-wrap items-center justify-between gap-6 border-t border-ink/12 pt-8" data-reveal>
          <p className="text-sm text-ink/55">Curious what you'd be building?</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/projects" className="u-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
              View live projects
            </Link>
            <Link to="/about" className="u-link font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
              About the studio
            </Link>
          </div>
          <Button to="/contact">Talk to the team</Button>
        </div>
      </section>
    </main>
  );
}
