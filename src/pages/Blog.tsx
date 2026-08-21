import { useMemo } from "react";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { getPost, posts } from "../data/posts";
import { Link } from "../lib/router";
import { breadcrumbSchema, defaultOgImage, organizationSchema, siteUrl, useSeo } from "../lib/seo";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/Button";

const blogCrumbs = [{ label: "Home", href: "/" }, { label: "Blog" }];

export function BlogPage() {
  useSeo({
    title: "Journal — Engineering & Design Notes | Solvit Labs",
    description:
      "Notes from the Solvit Labs team on React, TypeScript, 3D web performance, UI/UX design systems, and how we ship premium digital products.",
    keywords: "solvit labs blog, web development journal, design engineering articles",
    path: "/blog",
    jsonLd: useMemo(
      () => [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Solvit Labs Journal",
          url: `${siteUrl}/blog`,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${siteUrl}/blog/${p.slug}`,
            datePublished: p.dateISO,
          })),
        },
        breadcrumbSchema(blogCrumbs),
      ],
      []
    ),
  });

  return (
    <main>
      <PageHero
        crumbs={blogCrumbs}
        eyebrow="Journal"
        title={<>Notes on <span className="text-ember">craft.</span></>}
        lede="Short, honest writing on how we engineer and design at Solvit Labs — stack decisions, 3D performance, and interface systems."
      />

      <section className="px-page pb-28">
        <div className="max-page border-t border-ink/12">
          {posts.map((p) => (
            <article key={p.slug} className="border-b border-ink/12 py-10" data-reveal>
              <Link
                to={`/blog/${p.slug}`}
                ariaLabel={`Read: ${p.title}`}
                className="group grid gap-5 md:grid-cols-12 md:items-center"
              >
                <div className="md:col-span-7">
                  <p className="flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/45">
                    <span>{p.date}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" aria-hidden /> {p.readTime}
                    </span>
                  </p>
                  <h2 className="display mt-3 text-2xl font-medium transition-colors group-hover:text-ember md:text-3xl">
                    {p.title}
                  </h2>
                </div>
                <p className="text-[0.95rem] leading-relaxed text-ink/55 md:col-span-4">
                  {p.excerpt}
                </p>
                <div className="md:col-span-1 md:flex md:justify-end">
                  <ArrowRight className="h-5 w-5 text-ember transition-transform duration-400 group-hover:translate-x-1" aria-hidden />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const post = getPost(slug);
  const next = posts.filter((p) => p.slug !== slug)[0];

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post?.title ?? "Article" },
  ];

  useSeo({
    title: post ? `${post.title} | Solvit Labs Journal` : "Article Not Found | Solvit Labs",
    description: post?.excerpt ?? "The requested article could not be found.",
    keywords: post?.keywords,
    path: `/blog/${slug}`,
    type: "article",
    robots: post ? "index, follow" : "noindex, follow",
    jsonLd: useMemo(
      () =>
        post
          ? [
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                image: defaultOgImage,
                datePublished: post.dateISO,
                author: { "@type": "Organization", name: organizationSchema.name, url: organizationSchema.url },
                publisher: {
                  "@type": "Organization",
                  name: organizationSchema.name,
                  url: organizationSchema.url,
                  logo: { "@type": "ImageObject", url: organizationSchema.logo },
                },
                mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
              },
              breadcrumbSchema(crumbs),
            ]
          : [],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [slug]
    ),
  });

  if (!post) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center px-page text-center">
        <h1 className="display text-4xl font-medium">Article not found.</h1>
        <div className="mt-8">
          <Button to="/blog">Back to the journal</Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        crumbs={crumbs}
        eyebrow={`${post.date} · ${post.readTime}`}
        title={post.title}
        lede={post.excerpt}
      />

      <article className="px-page pb-20">
        <div className="max-page max-w-3xl space-y-7">
          {post.body.map((block, i) => (
            <p key={i} className="text-[1.06rem] leading-relaxed text-ink/75" data-reveal>
              {block.text}{" "}
              {block.link && (
                <Link
                  to={block.link.href}
                  className="u-link font-medium text-ember"
                  ariaLabel={block.link.label}
                >
                  {block.link.label} →
                </Link>
              )}
            </p>
          ))}
        </div>
      </article>

      {/* Internal links: related service + case study + more articles */}
      <section className="border-t border-ink/12 px-page py-16" aria-labelledby="article-related">
        <div className="max-page grid gap-6 md:grid-cols-3" data-reveal>
          <h2 id="article-related" className="sr-only">
            Related Solvit Labs pages
          </h2>
          <Link
            to={post.relatedService.href}
            ariaLabel={`Explore Solvit Labs ${post.relatedService.label} services`}
            className="group border border-ink/12 px-7 py-7 transition-colors hover:border-ember/50"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/45">Service</p>
            <p className="display mt-3 flex items-center gap-2 text-xl font-medium group-hover:text-ember">
              {post.relatedService.label}
              <ArrowUpRight className="h-4 w-4 text-ember" aria-hidden />
            </p>
          </Link>
          <Link
            to={post.relatedCase.href}
            ariaLabel={`Read ${post.relatedCase.label}`}
            className="group border border-ink/12 px-7 py-7 transition-colors hover:border-ember/50"
          >
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/45">Case study</p>
            <p className="display mt-3 flex items-center gap-2 text-xl font-medium group-hover:text-ember">
              {post.relatedCase.label}
              <ArrowUpRight className="h-4 w-4 text-ember" aria-hidden />
            </p>
          </Link>
          {next && (
            <Link
              to={`/blog/${next.slug}`}
              ariaLabel={`Next article: ${next.title}`}
              className="group border border-ink/12 px-7 py-7 transition-colors hover:border-ember/50"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/45">Next article</p>
              <p className="display mt-3 flex items-center gap-2 text-xl font-medium group-hover:text-ember">
                {next.title}
                <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
              </p>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
