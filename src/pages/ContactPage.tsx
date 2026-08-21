import { useMemo } from "react";
import { company } from "../data/company";
import { breadcrumbSchema, organizationSchema, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Contact } from "../components/Contact";

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

export function ContactPage() {
  useSeo({
    title: "Contact Solvit Labs — Start a Project",
    description:
      "Contact Solvit Labs to start your project. Tell us what you're building and receive a clear point of view on approach, timeline, and budget within 1–2 business days.",
    keywords: "contact solvit labs, start a web project, hire web development studio",
    path: "/contact",
    jsonLd: useMemo(
      () => [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Solvit Labs",
          url: `${organizationSchema.url.replace(/\/$/, "")}/contact`,
          about: { "@type": "Organization", name: organizationSchema.name, email: company.email },
        },
        breadcrumbSchema(crumbs),
      ],
      []
    ),
  });

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title={<>Let's build something <span className="text-ember">worth launching.</span></>}
        lede="Tell us what you're building — you'll get a clear point of view on approach, timeline, and budget, not a sales script."
      />
      <Contact />
    </main>
  );
}
