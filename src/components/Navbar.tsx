import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company, navLinks } from "../data/company";
import { services } from "../data/services";
import { getLenis } from "../lib/lenis";
import { Link, useRouter } from "../lib/router";
import { Scramble } from "./Scramble";
import { cn } from "../utils/cn";

function ServicesDropdown({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { path } = useRouter();
  const isActive = path.startsWith("/services");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-menu"
        onClick={() => setOpen(!open)}
        onFocus={() => setOpen(true)}
        className={cn(
          "u-link inline-flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors",
          isActive ? "text-paper" : "text-paper/60 hover:text-paper"
        )}
      >
        Services
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <div
        id="services-menu"
        role="menu"
        aria-label="Services"
        className={cn(
          "absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 border border-paper/10 bg-ink-3 shadow-[0_24px_60px_-24px_rgba(10,10,11,0.28)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="border-b border-paper/10 px-5 py-3">
          <Link
            to="/services"
            onNavigate={onNavigate}
            className="u-link font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ember"
          >
            All Services
          </Link>
        </div>
        {services.map((s) => (
          <Link
            key={s.id}
            to={`/services/${s.id}`}
            onNavigate={() => {
              setOpen(false);
              onNavigate();
            }}
            className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-paper/10"
            role="menuitem"
          >
            <span className="text-[0.85rem] font-medium text-paper/80 transition-colors group-hover:text-paper">
              {s.title}
            </span>
            <span className="font-mono text-[0.6rem] text-paper/40">{s.index}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Collapse the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[120] px-page">
        <div
          className={cn(
            "max-page mt-4 flex h-16 items-center justify-between border bg-ink-2/85 px-5 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-7",
            scrolled
              ? "border-paper/10 shadow-[0_16px_44px_-22px_rgba(10,10,11,0.45)]"
              : "border-paper/10"
          )}
        >
          <Link
            to="/"
            ariaLabel="Solvit Labs — home"
            className="display flex items-center"
          >
            <img
              src="/og/solvit-logo.png"
              alt="Solvit Labs"
              className="h-8 w-auto brightness-0 invert object-contain"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
            {navLinks
              .filter((l) => l.label !== "Contact")
              .map((l) =>
                l.label === "Services" ? (
                  <ServicesDropdown key={l.label} onNavigate={() => undefined} />
                ) : (
                  <Link
                    key={l.label}
                    to={l.href}
                    className={cn(
                      "u-link font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-colors",
                      isActive(l.href) ? "text-paper" : "text-paper/60 hover:text-paper"
                    )}
                    ariaLabel={isActive(l.href) ? `${l.label} (current page)` : undefined}
                  >
                    <Scramble text={l.label} onHover duration={420} />
                  </Link>
                )
              )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="group hidden items-center gap-2 bg-ember px-5 py-2.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-paper hover:text-ink lg:inline-flex"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center border border-paper/15 text-paper xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[110] flex flex-col justify-between overflow-y-auto bg-ink-2 px-page pb-10 pt-32 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden",
          open
            ? "pointer-events-auto opacity-100 [clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"
        )}
        aria-hidden={!open}
        data-lenis-prevent
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((l, i) => (
            <div key={l.label}>
              <Link
                to={l.href}
                onNavigate={() => setOpen(false)}
                className={cn(
                  "display flex items-baseline gap-4 border-b border-paper/10 py-4 text-3xl font-medium text-paper transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
                <span className="font-mono text-xs text-ember">0{i + 1}</span>
                {l.label}
              </Link>
              {l.label === "Services" && (
                <div className="flex flex-col gap-2 border-b border-paper/10 py-4 pl-10">
                  {services.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      onNavigate={() => setOpen(false)}
                      className="text-sm text-paper/60 transition-colors hover:text-paper"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div
          className={cn(
            "mt-8 transition-all delay-300 duration-500",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <a
            href={`mailto:${company.email}`}
            className="font-mono text-xs uppercase tracking-[0.22em] text-paper/50"
          >
            {company.email}
          </a>
        </div>
      </div>
    </>
  );
}
