import { ArrowUp } from "lucide-react";
import { company, navLinks } from "../data/company";
import { services } from "../data/services";
import { scrollToTop, Link } from "../lib/router";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink px-page text-paper">
      <div className="max-page py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="display flex items-center gap-2 text-2xl font-semibold tracking-[0.06em]">
              <span className="inline-block h-2.5 w-2.5 bg-ember" aria-hidden />
              {company.name}
            </p>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-smoke">
              {company.tagline}
            </p>
          </div>

          <nav aria-label="Footer pages">
            <p className="eyebrow mb-6 text-paper/40">Pages</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="u-link text-[0.95rem] text-paper/75 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <p className="eyebrow mb-6 text-paper/40">Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="u-link text-[0.95rem] text-paper/75 transition-colors hover:text-paper"
                    ariaLabel={`Solvit Labs ${s.title} services`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-6 text-paper/40">Contact</p>
            <a
              href={`mailto:${company.email}`}
              className="u-link text-[0.95rem] text-paper/75 transition-colors hover:text-paper"
            >
              {company.email}
            </a>
            <p className="mt-3 text-[0.95rem] text-smoke">{company.location}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {company.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="u-link font-mono text-[0.66rem] uppercase tracking-[0.2em] text-paper/55 transition-colors hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <div aria-hidden className="pointer-events-none mt-20 select-none overflow-hidden">
          <p className="outline-word display -mb-[0.14em] whitespace-nowrap text-center text-[clamp(2.9rem,12.4vw,13rem)] font-bold leading-[0.8]">
            SOLVIT LABS
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-paper/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/40">
            © {year} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-7">
            {/* Legal pages are placeholders until published. */}
            <a href="#" className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/40 transition-colors hover:text-paper">
              Privacy
            </a>
            <a href="#" className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/40 transition-colors hover:text-paper">
              Terms
            </a>
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center border border-paper/15 text-paper/60 transition-colors hover:border-ember hover:text-ember"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
