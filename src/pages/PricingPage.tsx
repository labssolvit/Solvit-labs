import { useMemo, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  Gem,
  LayoutDashboard,
  Minus,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  addOnServices,
  comparisonRows,
  tiers,
  type CompareCell,
  type Currency,
  type PricingTier,
} from "../data/pricing";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL } from "../lib/webgl";
import { Link } from "../lib/router";
import { breadcrumbSchema, useSeo } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Button } from "../components/Button";
import { PricingScene } from "../components/3d/PricingScene";
import { cn } from "../utils/cn";

const crumbs = [{ label: "Home", href: "/" }, { label: "Pricing" }];

const ADDON_ICONS = {
  boxes: Boxes,
  shopping: ShoppingBag,
  app: LayoutDashboard,
  mobile: Smartphone,
  seo: TrendingUp,
  wrench: Wrench,
} as const;

const TIER_ICONS = { launch: Rocket, growth: BarChart3, premium: Gem } as const;

/* ------------------------------ currency toggle ----------------------------- */

function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        role="group"
        aria-label="Select currency"
        className="relative flex border border-white/15 bg-white/[0.04] p-1 backdrop-blur-sm"
      >
        {(["USD", "PKR"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={currency === c}
            onClick={() => onChange(c)}
            className={cn(
              "relative z-10 w-20 px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] transition-colors duration-300",
              currency === c ? "text-ink" : "text-paper/60 hover:text-paper"
            )}
          >
            {c}
          </button>
        ))}
        <span
          aria-hidden
          className="absolute bottom-1 left-1 top-1 w-20 bg-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: currency === "PKR" ? "translateX(100%)" : "translateX(0)" }}
        />
      </div>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
        {currency === "PKR"
          ? "PKR prices are approximate starting rates"
          : "USD prices are starting rates"}
      </p>
    </div>
  );
}

/* --------------------------------- tier card -------------------------------- */

function TierCard({
  tier,
  currency,
  reduced,
  index,
}: {
  tier: PricingTier;
  currency: Currency;
  reduced: boolean;
  index: number;
}) {
  const Icon = TIER_ICONS[tier.id as keyof typeof TIER_ICONS];
  const tiltRef = useRef<HTMLElement>(null);

  const onTilt = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = tiltRef.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1100px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
  };
  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "";
  };

  const price = currency === "USD" ? tier.price.usd : tier.price.pkr;

  return (
    <article
      ref={tiltRef}
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      style={{ animationDelay: `-${(index * 1.5).toFixed(1)}s` }}
      aria-label={`${tier.name} package, ${price}${tier.price.plus ? " and up" : ""}`}
      className={cn(
        "group relative flex flex-col border bg-white/[0.03] p-8 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1.5 md:p-9",
        tier.featured
          ? "border-ember/50 shadow-[0_0_80px_-28px_rgba(200,16,46,0.55)] lg:-my-3 lg:py-12"
          : "border-white/10 hover:border-ember/40 hover:shadow-[0_24px_70px_-30px_rgba(200,16,46,0.35)]",
        !reduced && "animate-[tier-float_7s_ease-in-out_infinite]"
      )}
      data-reveal
    >
      {tier.featured && (
        <p className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap bg-ember px-4 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white">
          <Sparkles className="h-3 w-3" aria-hidden />
          Most Popular
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.05]">
          <Icon className="h-5 w-5 text-ember" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="font-mono text-xs text-paper/35">{tier.index}</span>
      </div>

      <h2 className="display mt-6 text-2xl font-medium">{tier.name}</h2>
      <p className="mt-2 min-h-[3.2rem] text-[0.88rem] leading-relaxed text-paper/55">
        {tier.forWhom}
      </p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="display text-5xl font-medium transition-transform duration-500 group-hover:scale-[1.04] group-hover:origin-left">
          {price}
        </span>
        {tier.price.plus && <sup className="display text-2xl text-ember">+</sup>}
      </p>
      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
        One-time · starting price
      </p>

      <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-8">
        {tier.features.map((f, i) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[0.9rem] text-paper/65 transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper/90"
            style={{ transitionDelay: `${i * 28}ms` }}
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={2} aria-hidden />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-9">
        <Link
          to="/contact"
          ariaLabel={`${tier.cta} — ${tier.name} package (${price}${tier.price.plus ? "+" : ""})`}
          className={cn(
            "flex w-full items-center justify-center gap-3 py-4 font-display text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-400",
            tier.featured
              ? "bg-ember text-white hover:bg-paper hover:text-ink"
              : "border border-white/20 text-paper hover:border-ember hover:text-ember"
          )}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------ comparison cell ----------------------------- */

function Cell({ value }: { value: CompareCell }) {
  if (value === true)
    return <Check className="mx-auto h-4 w-4 text-ember" strokeWidth={2} aria-label="Included" />;
  if (value === false)
    return <Minus className="mx-auto h-4 w-4 text-paper/20" aria-label="Not included" />;
  return <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-paper/70">{value}</span>;
}

/* ----------------------------------- page ----------------------------------- */

export function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const reduced = useReducedMotion();
  const show3D = !reduced && canUseWebGL();

  useSeo({
    title: "Pricing — Website & Digital Product Packages | Solvit Labs",
    description:
      "Transparent Solvit Labs pricing: Launch $199, Growth $499, Premium $999+. Website development, 3D experiences, e-commerce, mobile apps, SEO and maintenance.",
    keywords:
      "solvit labs pricing, website development cost, web design packages, 3d website pricing, ecommerce development price",
    path: "/pricing",
    jsonLd: useMemo(() => [breadcrumbSchema(crumbs)], []),
  });

  return (
    <main className="bg-ink text-paper">
      {/* Hero */}
      <section className="relative overflow-hidden px-page pb-16 pt-36 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_0%,#221014_0%,#160a0d_60%)]"
        />
        {show3D && (
          <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[46%] opacity-80 lg:block">
            <PricingScene />
          </div>
        )}
        <div className="relative max-page">
          <Breadcrumbs items={crumbs} dark />
          <p className="eyebrow flex items-center gap-3 text-paper/50" data-reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
            Services & Pricing
          </p>
          <h1 className="display mt-6 max-w-3xl text-balance text-[clamp(2.6rem,6.5vw,5.2rem)] font-medium" data-reveal data-delay="0.06">
            Premium digital products. <span className="text-ember">Transparent prices.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/60" data-reveal data-delay="0.12">
            Clear starting packages, no hidden costs. Final pricing depends on
            scope — every project starts with a free consultation.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="packages" className="px-page pb-24">
        <div className="max-page">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="packages" className="display text-3xl font-medium md:text-4xl" data-reveal>
              Choose your <span className="text-ember">package</span>
            </h2>
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>

          <div className="grid gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {tiers.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} currency={currency} reduced={reduced} index={i} />
            ))}
          </div>
          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/35" data-reveal>
            Premium final pricing follows project complexity after scoping.
          </p>
        </div>
      </section>

      {/* Founding client offer */}
      <section aria-labelledby="founding" className="px-page pb-24">
        <div
          className="max-page relative overflow-hidden border border-ember/25 bg-gradient-to-br from-ink-2 to-ink px-8 py-12 md:px-14 md:py-16"
          data-reveal
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-ember/10 blur-[90px]"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow flex items-center gap-3 text-ember">
                <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-ember" aria-hidden />
                Limited founding cohort
              </p>
              <h2 id="founding" className="display mt-5 text-3xl font-medium md:text-5xl">
                Become a Solvit <span className="text-ember">Founding Client</span>
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-paper/60">
                Be among the first businesses to build with Solvit and receive
                exclusive founding-client pricing on selected first projects.
              </p>
            </div>
            <div className="lg:text-right">
              <p className="display text-5xl font-medium text-ember md:text-7xl">20–30%</p>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-paper/50">
                Off selected first projects
              </p>
              {/* Subtle availability indicator — no fabricated counters */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10 lg:ml-auto lg:max-w-xs" aria-hidden>
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-ember to-ember-soft animate-[offer-sweep_3.2s_ease-in-out_infinite]" />
              </div>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/35">
                Limited availability — reviewed per project
              </p>
              <div className="mt-7 lg:flex lg:justify-end">
                <Link
                  to="/contact"
                  ariaLabel="Claim the founding client offer"
                  className="inline-flex items-center gap-3 bg-ember px-8 py-4 font-display text-[0.8rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-400 hover:bg-paper hover:text-ink"
                >
                  Claim Founding Offer
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Than Just Websites */}
      <section aria-labelledby="addons" className="px-page pb-24">
        <div className="max-page">
          <h2 id="addons" className="display text-3xl font-medium md:text-4xl" data-reveal>
            More Than Just <span className="text-ember">Websites</span>
          </h2>
          <p className="mt-3 max-w-xl text-paper/55" data-reveal>
            Specialist builds, extensions, and ongoing care — priced as clear
            starting points.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {addOnServices.map((s) => {
              const Icon = ADDON_ICONS[s.icon];
              const price = currency === "USD" ? s.price.usd : s.price.pkr;
              return (
                <Link
                  key={s.id}
                  to={s.href}
                  ariaLabel={`Explore ${s.title} — starting from ${price}${s.monthly ? " per month" : ""}`}
                  className="group relative border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-[0_20px_60px_-24px_rgba(200,16,46,0.3)]"
                  data-reveal
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.05] transition-colors duration-400 group-hover:border-ember/40">
                      <Icon className="h-5 w-5 text-paper/80 transition-colors duration-400 group-hover:text-ember" strokeWidth={1.6} aria-hidden />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-paper/30 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" aria-hidden />
                  </div>
                  <h3 className="display mt-5 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 min-h-[3.4rem] text-[0.85rem] leading-relaxed text-paper/50">
                    {s.description}
                  </p>
                  <p className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/40">
                      Starting from
                    </span>
                    <span className="display text-lg font-medium text-ember">
                      {price}
                      {s.monthly && <span className="text-sm text-paper/50">/mo</span>}
                    </span>
                  </p>
                  <span className="mt-1 block text-right font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/0 transition-colors duration-500 group-hover:text-paper/50">
                    Explore Service →
                  </span>
                </Link>
              );
            })}
          </div>
          {currency === "PKR" && (
            <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/35">
              All PKR figures are approximate starting rates.
            </p>
          )}
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="compare" className="px-page pb-24">
        <div className="max-page">
          <h2 id="compare" className="display text-3xl font-medium md:text-4xl" data-reveal>
            Compare <span className="text-ember">packages</span>
          </h2>
          <div className="mt-10 overflow-x-auto border border-white/10" data-reveal>
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison of Launch, Growth and Premium packages
              </caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th scope="col" className="px-6 py-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/45">
                    Feature
                  </th>
                  {tiers.map((t) => (
                    <th key={t.id} scope="col" className={cn("px-6 py-5 text-center", t.featured && "bg-ember/[0.06]")}>
                      <span className="display block text-base font-medium">{t.name}</span>
                      <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ember">
                        {currency === "USD" ? t.price.usd : t.price.pkr}
                        {t.price.plus ? "+" : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-white/[0.06] transition-colors hover:bg-white/[0.03]",
                      i % 2 === 1 && "bg-white/[0.015]"
                    )}
                  >
                    <th scope="row" className="px-6 py-4 text-[0.88rem] font-normal text-paper/70">
                      {row.label}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.launch} />
                    </td>
                    <td className={cn("px-6 py-4 text-center", "bg-ember/[0.04]")}>
                      <Cell value={row.growth} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell value={row.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom project CTA */}
      <section aria-labelledby="custom-cta" className="relative overflow-hidden border-t border-white/10">
        {show3D && (
          <div aria-hidden className="absolute inset-0 opacity-60">
            <PricingScene subdued />
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_50%,transparent_0%,rgba(10,10,11,0.85)_100%)]"
        />
        <div className="relative px-page py-28 text-center md:py-40">
          <h2 id="custom-cta" className="display mx-auto max-w-3xl text-balance text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium" data-reveal>
            Have Something Bigger <span className="text-ember">in Mind?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/60" data-reveal data-delay="0.08">
            Tell us what you're building. We'll design the right digital
            solution around your goals.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-reveal data-delay="0.16">
            <Link
              to="/contact"
              ariaLabel="Talk to Solvit — start your project"
              className="group inline-flex items-center gap-3 bg-paper px-8 py-4 font-display text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-400 hover:bg-ember hover:text-white"
            >
              Talk to Solvit
              <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Button to="/projects" variant="outline-invert">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes tier-float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }
        @keyframes offer-sweep {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(200%); }
        }
      `}</style>
    </main>
  );
}
