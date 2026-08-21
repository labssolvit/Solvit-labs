/** Solvit Labs journal — engineering and design writing. */

export interface PostBlock {
  text: string;
  link?: { label: string; href: string };
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readTime: string;
  keywords: string;
  body: PostBlock[];
  relatedService: { label: string; href: string };
  relatedCase: { label: string; href: string };
}

export const posts: Post[] = [
  {
    slug: "why-we-build-with-react-and-typescript",
    title: "Why We Build With React and TypeScript",
    excerpt:
      "The stack behind every Solvit Labs build — and the specific reasons it keeps shipping fast years later.",
    date: "January 22, 2026",
    dateISO: "2026-01-22",
    readTime: "4 min read",
    keywords: "react typescript web development, solvit labs engineering",
    body: [
      {
        text: "Every Solvit Labs production build — from the monochrome minimalism of DETOX to the themed platform behind Nouman Science Academy — runs on the same foundation: React with strict TypeScript. That consistency is a deliberate business decision, not a habit.",
      },
      {
        text: "TypeScript changes who can be wrong. Component contracts are explicit, refactors are mechanical instead of scary, and the bugs TypeScript catches are the ones that would otherwise reach a client review. Across a multi-week engagement, that compounds into visibly faster, calmer delivery.",
      },
      {
        text: "React's ecosystem is the second half of the argument. Three.js for 3D, GSAP for motion, Lenis for scroll — everything we need exists, is maintained, and hires well. When a project outgrows a marketing site into an application, the same component model scales with it.",
      },
      {
        text: "If you're evaluating stacks for a new product, our web development service page covers how we structure these builds in practice.",
        link: { label: "Explore Solvit Labs web development services", href: "/services/web-development" },
      },
    ],
    relatedService: { label: "Web Development", href: "/services/web-development" },
    relatedCase: { label: "DETOX — Case Study", href: "/work/detox" },
  },
  {
    slug: "designing-3d-web-experiences-that-stay-fast",
    title: "Designing 3D Web Experiences That Still Feel Fast",
    excerpt:
      "Physically based materials and 60fps on mid-range phones are not a contradiction — they're a budget.",
    date: "February 18, 2026",
    dateISO: "2026-02-18",
    readTime: "5 min read",
    keywords: "3d web experiences performance, webgl optimization, three.js",
    body: [
      {
        text: "The first rule of our 3D work: realism comes from light, not polygons. Most 'heavy' WebGL scenes are heavy because of unbounded geometry and unmeasured textures — not because 3D itself is expensive. A brushed-metal material with a good environment map will out-impress a million-triangle model every time.",
      },
      {
        text: "The second rule: 3D is an enhancement, never a dependency. Every Solvit Labs scene renders on top of semantic HTML, pauses when it leaves the viewport, and collapses to a designed 2D fallback when WebGL is unavailable or the visitor prefers reduced motion. Crawlers, screen readers, and old phones all get a complete page.",
      },
      {
        text: "This very site runs the pattern — multiple canvases, each gated by intersection observers so at most one or two render at a time. The result is scroll that stays at 60fps even with a particle field, an orbital network, and a full-service formation scene on one page.",
      },
      {
        text: "Want the short version of what this looks like as an engagement? The 3D web experiences service page lays out the process, and the Rizwan Bhatti portfolio case study shows it in production.",
        link: { label: "Explore Solvit Labs 3D web experiences", href: "/services/3d-web-experiences" },
      },
    ],
    relatedService: { label: "3D Web Experiences", href: "/services/3d-web-experiences" },
    relatedCase: { label: "Rizwan Bhatti — Case Study", href: "/work/rizwan-portfolio" },
  },
  {
    slug: "dark-mode-done-properly",
    title: "Dark Mode, Done Properly: Lessons From Nouman Science Academy",
    excerpt:
      "A theme system that never flashes, never inverts blindly, and respects the visitor before React even mounts.",
    date: "November 14, 2025",
    dateISO: "2025-11-14",
    readTime: "3 min read",
    keywords: "dark mode design, ui ux design theming, web design",
    body: [
      {
        text: "Most dark modes fail in two places: a flash of the wrong theme on load, and 'designed by inversion' palettes where dark is just light with a sign flip. Both are choices, not technical constraints.",
      },
      {
        text: "For Nouman Science Academy we resolve the theme before React mounts — an inline bootstrap reads the stored preference, falls back to the system preference, and sets the correct class on the document element. The first paint is already correct. No flash, no layout shift, no apology.",
      },
      {
        text: "And dark mode is designed, not derived: contrast, elevation, and accent weight are tuned per theme. It's the same discipline we apply to every interface engagement.",
      },
      {
        text: "More of that thinking lives on the UI/UX design service page — and the full build is documented in the Nouman Science Academy case study.",
        link: { label: "Explore Solvit Labs UI/UX design services", href: "/services/ui-ux-design" },
      },
    ],
    relatedService: { label: "UI/UX Design", href: "/services/ui-ux-design" },
    relatedCase: { label: "Nouman Science Academy — Case Study", href: "/work/nouman-science-academy" },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
