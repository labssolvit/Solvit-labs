export interface ProcessStep {
  index: string;
  title: string;
  stage: string;
  body: string;
}

/** The SOLVIT build process. */
export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    stage: "Idea",
    body: "We map the business problem, the audience, and the constraints before a single screen is designed.",
  },
  {
    index: "02",
    title: "Strategy",
    stage: "Blueprint",
    body: "Architecture, content, and technical direction with clear scope — decisions documented, not implied.",
  },
  {
    index: "03",
    title: "Design",
    stage: "Interface",
    body: "Iterative interface design in high fidelity. You review the real thing, not a promise.",
  },
  {
    index: "04",
    title: "Develop",
    stage: "Code",
    body: "Typed, tested, review-driven engineering with staging previews from week one.",
  },
  {
    index: "05",
    title: "Test",
    stage: "Product",
    body: "Performance budgets, accessibility checks, and device testing before anything ships.",
  },
  {
    index: "06",
    title: "Launch",
    stage: "Launch",
    body: "Instrumented release, measured against the goals we set in discovery — then iterated.",
  },
];

export const whySolvex = [
  {
    title: "Precision",
    body: "Clean engineering and thoughtful implementation — nothing shipped 'almost right'.",
  },
  {
    title: "Performance",
    body: "Fast experiences built for real users on real devices and real connections.",
  },
  {
    title: "Design",
    body: "Interfaces designed to feel modern, intuitive, and quietly confident.",
  },
  {
    title: "Scalability",
    body: "Systems architected to grow with the business, not around it.",
  },
  {
    title: "Technology",
    body: "Modern tooling chosen with purpose — never for novelty.",
  },
  {
    title: "Collaboration",
    body: "Clear, direct communication at every stage of the project.",
  },
];
