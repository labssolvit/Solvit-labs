/**
 * SOLVIT company information.
 *
 * NOTE: contact details marked with "PLACEHOLDER" must be replaced
 * with verified company information before public launch.
 */
export const company = {
  name: "Solvit Labs",
  tagline: "Digital Experiences, Engineered to Perform.",
  statement: "We build digital experiences that solve what's next.",
  description:
    "Solvit Labs combines precision engineering, immersive design, and modern technology to create digital experiences built for ambitious businesses.",

  // Official Solvit Labs inbox.
  email: "labssolvit@gmail.com",
  // PLACEHOLDER — replace with the verified Solvit Labs location before launch.
  location: "Remote-first · Worldwide",
  url: "https://solvitlabs.com",

  // PLACEHOLDER — replace with verified SOLVIT social profiles before launch.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;
