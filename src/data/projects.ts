/**
 * Selected Work — live SOLVIT builds, deployed and running in production.
 * Each entry includes its public URL so visitors can verify the craft.
 */

export interface CaseStudyBlock {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  type: string;
  url: string;
  description: string;
  stack: string[];
  image: string;
  accent: string;
  overview: string;
  blocks: CaseStudyBlock[];
  stackDetail: { label: string; items: string[] }[];
  outcomes: string[];
}

export const projects: Project[] = [
  {
    slug: "detox",
    index: "01",
    name: "DETOX",
    category: "Brand Experience Site",
    year: "2026",
    type: "Live production build",
    url: "https://detox-2trz.vercel.app/",
    description:
      "A monochrome, typography-first experience that strips digital noise down to pure signal.",
    stack: ["React 19", "TypeScript", "Tailwind CSS 4", "Vite"],
    image: "/images/work-detox.jpg",
    accent: "#C8102E",
    overview:
      "DETOX is a statement about restraint: a single-page premium experience where typography carries the entire visual weight. No color crutches, no decorative clutter — just scale, spacing, and rhythm. Built and shipped by Solvit Labs as a live production site.",
    blocks: [
      {
        heading: "The Challenge",
        body:
          "Most 'premium' sites borrow credibility from imagery and effects. DETOX set a harder constraint: build a memorable experience using only black, white, type, and motion — and make it feel expensive rather than empty.",
      },
      {
        heading: "Strategy",
        body:
          "Treat absence as a feature. We designed a strict typographic scale, wide-tracked micro-labels against oversized display type, and orchestrated every transition so movement itself becomes the brand's texture.",
      },
      {
        heading: "Design",
        body:
          "Pure monochrome with generous negative space. Hierarchy is established through extreme contrast — 8xl headlines against 10px uppercase labels — and softened with large-radius containers that keep the grid feeling human.",
      },
      {
        heading: "Development",
        body:
          "A lean React 19 single-page build with Tailwind CSS 4 design tokens. Attention went to the invisible details: scroll-reveal timing, selection styling, tabular numerals, and responsive type that never breaks the composition.",
      },
    ],
    stackDetail: [
      { label: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS 4"] },
      { label: "Platform", items: ["Vite", "Vercel edge deployment"] },
    ],
    outcomes: [
      "Zero-imagery hero that still reads as premium",
      "Token-driven theme — every value traceable to a system",
      "Deployed on Vercel's edge network for instant global delivery",
    ],
  },
  {
    slug: "nouman-science-academy",
    index: "02",
    name: "Nouman Science Academy",
    category: "Education Platform",
    year: "2025",
    type: "Live production build",
    url: "https://nouman-academy.vercel.app/",
    description:
      "A complete digital home for a science academy — with a dark/light theming system that never flashes.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: "/images/work-academy.jpg",
    accent: "#C8102E",
    overview:
      "Nouman Science Academy needed a web presence as disciplined as its teaching: clear information for students and parents, presented with institutional confidence. Solvit Labs delivered a fast, themeable platform with careful attention to first-paint correctness.",
    blocks: [
      {
        heading: "The Challenge",
        body:
          "Education sites live or die on trust and clarity. The academy needed to present courses, faculty, and admissions information without the visual chaos typical of the sector — and it had to respect every visitor's light or dark preference.",
      },
      {
        heading: "Strategy",
        body:
          "Information architecture first, theming second. Content is organized around the questions visitors actually arrive with, while a dual-theme system adapts the interface to stored or system-level preferences.",
      },
      {
        heading: "Design",
        body:
          "A calm, structured layout language that works identically in both themes. Contrast, spacing, and typographic hierarchy were tuned per-theme rather than inverted mechanically — dark mode is designed, not derived.",
      },
      {
        heading: "Development",
        body:
          "The theme is resolved before React mounts via an inline bootstrap script that reads localStorage and system preferences, eliminating any flash of the wrong theme. Persistence is handled client-side; the SPA deploys statically from Vercel.",
      },
    ],
    stackDetail: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { label: "Platform", items: ["Vite", "Pre-mount theme bootstrap", "Vercel"] },
    ],
    outcomes: [
      "Zero-flash dark/light theming with persisted preference",
      "Static, instantly-deliverable architecture with no server dependency",
      "A complete, maintainable digital identity for the academy",
    ],
  },
  {
    slug: "rizwan-portfolio",
    index: "03",
    name: "Rizwan Bhatti",
    category: "Developer Portfolio",
    year: "2025",
    type: "Live production build",
    url: "https://ali-rizwan-portfolio.vercel.app/",
    description:
      "A cinematic personal-brand site for a full-stack developer — glass, gradients, and a custom interaction layer over deep space.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: "/images/work-rizwan.jpg",
    accent: "#C8102E",
    overview:
      "For a developer who ships web, mobile, and AI-integrated products, a template portfolio would undersell the range. Solvit Labs built a cinematic personal brand: a deep-space visual system with violet/cyan energy, glass panels, and engineering details that prove the claims on the page.",
    blocks: [
      {
        heading: "The Challenge",
        body:
          "Full-stack portfolios tend toward two failure modes: résumé-pdf boredom or effects-heavy noise. This build needed to demonstrate craft across web, mobile, and DevOps work while remaining fast, readable, and genuinely personal.",
      },
      {
        heading: "Strategy",
        body:
          "Let the site itself be the portfolio's strongest exhibit. Every engineering detail — the custom cursor, the gradient-border system, the noise texture — was built to be inspected, because the audience is technical.",
      },
      {
        heading: "Design",
        body:
          "A void-dark base with controlled violet and cyan accents, Space Grotesk display type with JetBrains Mono data labels, glass panels with gradient hairline borders, and a masked grid that fades with depth. Three typefaces, two accents, zero clutter.",
      },
      {
        heading: "Development",
        body:
          "Complete technical SEO: descriptive meta, Open Graph, Twitter cards, theme-color, and a data-URI icon — all verified in production. The custom cursor disables itself on coarse pointers, and reduced-motion preferences disable smooth-scroll behavior.",
      },
    ],
    stackDetail: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { label: "Details", items: ["Custom cursor system", "Gradient-border glass", "Full OG/Twitter meta"] },
    ],
    outcomes: [
      "Complete social/SEO metadata verified live in production",
      "Pointer-aware interaction system with touch fallbacks",
      "A personal brand that demonstrates its claims instead of stating them",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
