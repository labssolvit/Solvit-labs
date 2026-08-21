/** Core SOLVIT technology stack. */
export interface Technology {
  id: string;
  name: string;
  note: string;
}

export const technologies: Technology[] = [
  { id: "react", name: "React", note: "Interface architecture and component systems" },
  { id: "typescript", name: "TypeScript", note: "Type-safe application code" },
  { id: "three", name: "Three.js", note: "Real-time 3D and WebGL experiences" },
  { id: "next", name: "Next.js", note: "Server-rendered React applications" },
  { id: "node", name: "Node.js", note: "APIs and application backends" },
  { id: "postgres", name: "PostgreSQL", note: "Relational data, modeled properly" },
  { id: "firebase", name: "Firebase", note: "Realtime sync and managed auth" },
  { id: "aws", name: "AWS", note: "Cloud infrastructure and edge delivery" },
  { id: "docker", name: "Docker", note: "Reproducible builds and deployments" },
];

/** Placeholder capability metrics — replace with verified SOLVIT data. */
export interface Metric {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const metrics: Metric[] = [
  { id: "projects", value: 40, suffix: "+", label: "Projects Delivered" },
  { id: "technologies", value: 18, suffix: "", label: "Core Technologies" },
  { id: "industries", value: 12, suffix: "", label: "Industries Served" },
  { id: "satisfaction", value: 98, suffix: "%", label: "Client Satisfaction" },
];
