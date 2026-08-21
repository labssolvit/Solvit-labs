import { cn } from "../utils/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Infinite editorial band — a rhythm breaker between acts. */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "marquee-mask select-none overflow-hidden border-y border-ink/10 py-6 md:py-8",
        className
      )}
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={i} className="flex shrink-0 items-center">
                <span className="display px-8 text-2xl font-medium tracking-tight text-ink/85 md:px-10 md:text-4xl">
                  {item}
                </span>
                <span className="h-2 w-2 shrink-0 bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
