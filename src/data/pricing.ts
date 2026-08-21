/** Solvit Labs pricing — packages, add-on services, and comparison data. */

export type Currency = "USD" | "PKR";

export interface PricePoint {
  usd: string;
  pkr: string;
  plus?: boolean;
}

export interface PricingTier {
  id: string;
  index: string;
  name: string;
  forWhom: string;
  price: PricePoint;
  cta: string;
  featured?: boolean;
  features: string[];
}

export const tiers: PricingTier[] = [
  {
    id: "launch",
    index: "01",
    name: "Launch",
    forWhom: "For startups and small businesses making their first serious move online.",
    price: { usd: "$199", pkr: "Rs. 55,000" },
    cta: "Start Your Project",
    features: [
      "Modern responsive website",
      "Up to 5 pages",
      "Mobile optimization",
      "Contact form",
      "Basic SEO",
      "Social media integration",
      "Website deployment",
      "14 days support",
    ],
  },
  {
    id: "growth",
    index: "02",
    name: "Growth",
    forWhom: "For growing businesses that need a professional online presence.",
    price: { usd: "$499", pkr: "Rs. 140,000" },
    cta: "Choose Growth",
    featured: true,
    features: [
      "Up to 10 pages",
      "Custom UI/UX",
      "Advanced animations",
      "Advanced SEO",
      "CMS integration",
      "Database integration when required",
      "Analytics",
      "Performance optimization",
      "Deployment",
      "30 days support",
    ],
  },
  {
    id: "premium",
    index: "03",
    name: "Premium",
    forWhom: "For companies that require advanced digital experiences.",
    price: { usd: "$999", pkr: "Rs. 280,000", plus: true },
    cta: "Build Something Extraordinary",
    features: [
      "Custom 3D / interactive website",
      "Advanced animations",
      "Custom backend",
      "Authentication",
      "Database",
      "Admin dashboard",
      "Advanced SEO",
      "Performance optimization",
      "Custom integrations",
      "60–90 days support",
    ],
  },
];

export interface AddOnService {
  id: string;
  title: string;
  description: string;
  price: PricePoint;
  monthly?: boolean;
  href: string;
  icon: "boxes" | "shopping" | "app" | "mobile" | "seo" | "wrench";
}

export const addOnServices: AddOnService[] = [
  {
    id: "3d-interactive",
    title: "3D & Interactive Experiences",
    description: "WebGL scenes, product viewers, and scroll-driven storytelling built inside real performance budgets.",
    price: { usd: "$350", pkr: "Rs. 98,000" },
    href: "/services/3d-web-experiences",
    icon: "boxes",
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    description: "High-converting storefronts with clean checkout flows and headless commerce architecture.",
    price: { usd: "$300", pkr: "Rs. 84,000" },
    href: "/contact",
    icon: "shopping",
  },
  {
    id: "web-apps",
    title: "Custom Web Applications",
    description: "Dashboards, portals, and internal tools engineered around your exact business workflows.",
    price: { usd: "$400", pkr: "Rs. 112,000" },
    href: "/services/web-development",
    icon: "app",
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description: "Cross-platform iOS and Android apps with native feel from a shared TypeScript codebase.",
    price: { usd: "$500", pkr: "Rs. 140,000" },
    href: "/services/mobile-development",
    icon: "mobile",
  },
  {
    id: "seo",
    title: "SEO",
    description: "Technical SEO, structured data, and Core Web Vitals optimization that compounds over time.",
    price: { usd: "$75", pkr: "Rs. 21,000" },
    href: "/contact",
    icon: "seo",
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    description: "Updates, monitoring, backups, and small improvements — handled before they become problems.",
    price: { usd: "$30", pkr: "Rs. 8,500" },
    monthly: true,
    href: "/contact",
    icon: "wrench",
  },
];

export type CompareCell = true | false | string;

export interface CompareRow {
  label: string;
  launch: CompareCell;
  growth: CompareCell;
  premium: CompareCell;
}

export const comparisonRows: CompareRow[] = [
  { label: "Responsive Design", launch: true, growth: true, premium: true },
  { label: "Custom UI/UX", launch: false, growth: true, premium: true },
  { label: "Animations", launch: false, growth: "Advanced", premium: "Advanced +" },
  { label: "SEO", launch: "Basic", growth: "Advanced", premium: "Advanced" },
  { label: "CMS", launch: false, growth: true, premium: true },
  { label: "Database", launch: false, growth: "When required", premium: true },
  { label: "Authentication", launch: false, growth: false, premium: true },
  { label: "Admin Dashboard", launch: false, growth: false, premium: true },
  { label: "Analytics", launch: false, growth: true, premium: true },
  { label: "Performance Optimization", launch: false, growth: true, premium: true },
  { label: "Custom Integrations", launch: false, growth: false, premium: true },
  { label: "Support", launch: "14 days", growth: "30 days", premium: "60–90 days" },
];
