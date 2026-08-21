/** Solvit Labs services — powers the services section, index page,
 *  individual service pages, and the navigation dropdown. */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  id: string; // route slug
  index: string;
  title: string;
  short: string;
  tagline: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  stack: string[];
  sceneIndex: number;
  keywords: string;
  faqs: ServiceFaq[];
  relatedProjects: string[];
}

export const services: Service[] = [
  {
    id: "web-development",
    index: "01",
    title: "Web Development",
    short: "High-performance websites and web applications engineered for real business needs.",
    tagline: "Websites and web applications engineered to perform.",
    overview:
      "Solvit Labs builds modern websites and web applications with React, TypeScript, and a performance-first engineering culture. Every build ships with semantic HTML, accessible interactions, and Core Web Vitals treated as a feature — not an afterthought.",
    capabilities: [
      "Marketing & brand websites",
      "Web applications & dashboards",
      "Design systems & component libraries",
      "Headless CMS architectures",
    ],
    deliverables: ["Marketing sites", "Web apps", "Design systems", "CMS builds"],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js"],
    sceneIndex: 0,
    keywords:
      "web development company, react development, typescript websites, high performance websites",
    faqs: [
      {
        q: "What stack does Solvit Labs use for web development?",
        a: "We primarily build with React, TypeScript, and Tailwind CSS, deployed to edge platforms like Vercel. The stack is chosen for longevity, performance, and developer clarity.",
      },
      {
        q: "How long does a typical website build take?",
        a: "A focused marketing site typically ships in 3–6 weeks; larger web applications are scoped in discovery and delivered in weekly staging increments.",
      },
      {
        q: "Do you optimize for Core Web Vitals?",
        a: "Yes — performance budgets are agreed up front and verified before launch: images, fonts, JavaScript, and animation cost are all measured.",
      },
    ],
    relatedProjects: ["detox", "nouman-science-academy"],
  },
  {
    id: "mobile-development",
    index: "02",
    title: "Mobile Development",
    short: "Cross-platform mobile applications with native feel from a shared codebase.",
    tagline: "Mobile applications with a native feel, shipped from one codebase.",
    overview:
      "We design and build cross-platform mobile apps with React Native and shared TypeScript logic, so products reach iOS and Android faster without sacrificing the native feel users expect. State, offline behavior, and app-store readiness are handled end to end.",
    capabilities: [
      "React Native applications",
      "Cross-platform design systems",
      "Offline-first data sync",
      "App Store & Play deployment",
    ],
    deliverables: ["iOS apps", "Android apps", "Shared backends", "Store releases"],
    stack: ["React Native", "TypeScript", "Expo", "Node.js"],
    sceneIndex: 3,
    keywords:
      "mobile development, react native apps, cross platform mobile applications, ios android development",
    faqs: [
      {
        q: "Native or cross-platform — which do you recommend?",
        a: "For most products, React Native delivers 90–100% shared code with native-feeling interactions. When a feature truly needs platform code, we write native modules for it.",
      },
      {
        q: "Do you handle app store submission?",
        a: "Yes — we manage signing, screenshots, metadata, and review submissions for both the App Store and Google Play.",
      },
    ],
    relatedProjects: ["rizwan-portfolio"],
  },
  {
    id: "ui-ux-design",
    index: "03",
    title: "UI/UX Design",
    short: "Modern interfaces designed around usability, clarity, and conversion.",
    tagline: "Interfaces designed around clarity, usability, and conversion.",
    overview:
      "Solvit Labs designs interfaces that feel inevitable: clear hierarchy, honest interactions, and systems that scale. We design in high fidelity, prototype the real behavior, and hand off token-driven systems engineers can build without guessing.",
    capabilities: [
      "Product & interface design",
      "UX research & flows",
      "High-fidelity prototyping",
      "Design systems & tokens",
    ],
    deliverables: ["Product design", "Prototyping", "UX research", "Interface systems"],
    stack: ["Figma", "Design Tokens", "Prototyping", "Accessibility"],
    sceneIndex: 1,
    keywords:
      "ui ux design agency, product design, interface design, ux research, design systems",
    faqs: [
      {
        q: "Do you design in Figma or in code?",
        a: "Both — exploration happens in Figma, but interactive behavior is validated in real browser prototypes before handoff.",
      },
      {
        q: "Can you redesign an existing product?",
        a: "Yes — we start with a UX audit of the current product, then redesign in phases so migration never blocks your roadmap.",
      },
    ],
    relatedProjects: ["nouman-science-academy", "detox"],
  },
  {
    id: "3d-web-experiences",
    index: "04",
    title: "3D Web Experiences",
    short: "Immersive WebGL and interactive 3D experiences that run in the browser.",
    tagline: "Immersive WebGL experiences that run everywhere — gracefully.",
    overview:
      "This website is the demo. Solvit Labs builds real-time 3D product viewers, configurators, and narrative WebGL scenes with physically based materials and studio lighting — engineered inside strict performance budgets, with complete 2D fallbacks when WebGL is unavailable.",
    capabilities: [
      "WebGL & Three.js scenes",
      "3D product configurators",
      "Scroll-driven storytelling",
      "Performance-budgeted 3D",
    ],
    deliverables: ["WebGL scenes", "Product viewers", "Interactive storytelling"],
    stack: ["Three.js", "React Three Fiber", "WebGL", "GSAP"],
    sceneIndex: 2,
    keywords:
      "3d web experiences, webgl development, three.js websites, interactive 3d product configurator",
    faqs: [
      {
        q: "Will 3D hurt my site's performance or SEO?",
        a: "Not the way we build it. 3D is progressively enhanced on top of semantic HTML — content, navigation, and text are always available without it, and scenes pause when offscreen.",
      },
      {
        q: "What devices can run your 3D scenes?",
        a: "Scenes are budgeted for mid-range mobile GPUs at 60fps, with adaptive quality and full 2D fallbacks for the rest.",
      },
    ],
    relatedProjects: ["detox", "rizwan-portfolio"],
  },
  {
    id: "ai-solutions",
    index: "05",
    title: "AI Solutions",
    short: "Practical AI integrations — assistants, search, and workflow automation.",
    tagline: "Practical AI, integrated where it actually helps.",
    overview:
      "We integrate AI where it creates measurable value: conversational assistants grounded in your data, semantic search, document workflows, and product copilots. Every AI feature ships with guardrails, clear UX for uncertainty, and instrumentation so quality is measured — not assumed.",
    capabilities: [
      "LLM-powered product features",
      "Retrieval-augmented search (RAG)",
      "Workflow & document automation",
      "AI UX design & evaluation",
    ],
    deliverables: ["AI assistants", "Semantic search", "Automations", "Evaluations"],
    stack: ["TypeScript", "LLM APIs", "Vector Search", "Node.js"],
    sceneIndex: 4,
    keywords:
      "ai solutions, ai integration company, llm applications, rag search, ai automation",
    faqs: [
      {
        q: "Can AI features work with our private data?",
        a: "Yes — retrieval pipelines are designed around your data with access controls, and no customer data is used to train external models.",
      },
      {
        q: "How do you keep AI answers accurate?",
        a: "Grounded retrieval, constrained prompts, explicit uncertainty UI, and an evaluation harness that scores quality before and after launch.",
      },
    ],
    relatedProjects: ["rizwan-portfolio"],
  },
];

export const getService = (slug: string) => services.find((s) => s.id === slug);
