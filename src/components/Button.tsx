import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../lib/router";
import { cn } from "../utils/cn";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "invert" | "ghost" | "outline" | "outline-invert";
  arrow?: "right" | "up-right";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 font-display text-[0.82rem] font-medium uppercase tracking-[0.18em] transition-colors duration-400 select-none";

const variants = {
  /** Red pill — primary brand action */
  primary: "bg-ember text-white hover:bg-ink hover:text-paper",
  /** Light pill — for dark surfaces */
  invert: "bg-paper text-ink hover:bg-ember hover:text-white",
  ghost: "text-ink/70 hover:text-ink",
  /** Hairline — for light surfaces */
  outline:
    "border border-ink/25 text-ink hover:border-ember hover:text-ember",
  /** Hairline — for dark surfaces */
  "outline-invert":
    "border border-paper/25 text-paper hover:border-ember hover:text-ember",
};

export function Button({
  children,
  to,
  onClick,
  variant = "primary",
  arrow = "right",
  className,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const Arrow = arrow === "right" ? ArrowRight : ArrowUpRight;
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <Arrow
        className="relative z-10 h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
        strokeWidth={1.75}
        aria-hidden
      />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        ariaLabel={ariaLabel}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        base,
        variants[variant],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {content}
    </button>
  );
}
