import { ChevronRight } from "lucide-react";
import { Link } from "../lib/router";
import type { Crumb } from "../lib/seo";

/** Visual breadcrumbs — JSON-LD BreadcrumbList is injected via useSeo on each page. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const link = dark
    ? "text-paper/50 hover:text-paper"
    : "text-ink/50 hover:text-ink";
  const active = dark ? "text-paper" : "text-ink";
  const inactive = dark ? "text-paper/50" : "text-ink/50";
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <ChevronRight className="h-3 w-3 text-ember" strokeWidth={2} aria-hidden />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={`u-link font-mono text-[0.66rem] uppercase tracking-[0.22em] transition-colors ${link}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`font-mono text-[0.66rem] uppercase tracking-[0.22em] ${
                    isLast ? active : inactive
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
