/**
 * Centralized SEO architecture for Solvit Labs.
 *
 * Configuration:
 *  - VITE_SITE_URL           → production domain (canonical/OG/sitemap base)
 *  - VITE_GSC_VERIFICATION   → Google Search Console meta token
 *  - VITE_BING_VERIFICATION  → Bing Webmaster Tools meta token
 *  - VITE_GA4_ID             → Google Analytics 4 measurement ID (optional)
 */
import { useEffect } from "react";
import { company } from "../data/company";

export const siteUrl = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://solvitlabs.com"
).replace(/\/+$/, "");

export const defaultOgImage = `${siteUrl}/og/solvit-logo.png`;

export interface SeoInput {
  title: string;
  description: string;
  keywords?: string;
  /** Canonical path, e.g. "/services/web-development" */
  path: string;
  robots?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>[];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(input: SeoInput) {
  const { title, description, keywords, path, robots, image, type, jsonLd } = input;
  useEffect(() => {
    const url = `${siteUrl}${path}`;
    const prevTitle = document.title;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots ?? "index, follow");
    if (keywords) upsertMeta("name", "keywords", keywords);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const ogImage = image ?? defaultOgImage;
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type ?? "website");
    upsertMeta("property", "og:site_name", company.name);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    const scripts = (jsonLd ?? []).map((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-route-schema", "");
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });

    return () => {
      document.title = prevTitle;
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, keywords, path, robots, image, type, jsonLd]);
}

/** Organization schema reused everywhere. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/og/solvit-logo.png`,
  description: company.description,
  email: company.email,
  sameAs: company.socials.map((s) => s.href),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: `${siteUrl}/`,
  publisher: { "@type": "Organization", name: company.name, url: `${siteUrl}/` },
};

export interface Crumb {
  label: string;
  href?: string;
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}

/**
 * One-time injection of search-engine verification + analytics,
 * only when the corresponding env values are configured.
 */
export function injectSearchVerification() {
  const env = import.meta.env as Record<string, string | undefined>;
  if (env.VITE_GSC_VERIFICATION)
    upsertMeta("name", "google-site-verification", env.VITE_GSC_VERIFICATION);
  if (env.VITE_BING_VERIFICATION)
    upsertMeta("name", "msvalidate.01", env.VITE_BING_VERIFICATION);

  const ga = env.VITE_GA4_ID;
  if (ga && !document.querySelector(`script[data-ga4]`)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    s.setAttribute("data-ga4", "");
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.setAttribute("data-ga4", "");
    inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`;
    document.head.appendChild(inline);
  }
}
