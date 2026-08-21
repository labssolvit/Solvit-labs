import type { ReactNode } from "react";
import { Scramble } from "./Scramble";
import { cn } from "../utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  children,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 md:mb-20", align === "center" && "text-center", className)}>
      <p
        className={cn("eyebrow mb-6 flex items-center gap-3", align === "center" && "justify-center")}
        data-reveal
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
        <Scramble text={eyebrow} playOnView onHover duration={520} className="opacity-60" />
      </p>
      <h2
        className="display text-balance text-[clamp(2.3rem,5.2vw,4.4rem)] font-medium"
        data-reveal
        data-delay="0.08"
      >
        {children}
      </h2>
    </div>
  );
}
