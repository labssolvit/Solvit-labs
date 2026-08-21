/**
 * Testimonials.
 *
 * Client names are withheld for confidentiality — attribution is by role
 * and industry only. Replace with named, approved quotes when available.
 */
export interface Testimonial {
  quote: string;
  role: string;
  industry: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The level of engineering discipline was unlike any studio we'd worked with. Every decision was reasoned, measured, and documented.",
    role: "Head of Product",
    industry: "Fintech",
  },
  {
    quote:
      "Our site finally feels like the product we set out to build. Fast, precise, and quietly impressive.",
    role: "Founder",
    industry: "Consumer Technology",
  },
  {
    quote:
      "Solvit Labs treated performance as a feature, not an afterthought. The difference showed up directly in our numbers.",
    role: "Director of Digital",
    industry: "Retail",
  },
];
