import { useSeo } from "../lib/seo";
import { Button } from "../components/Button";
import { Link } from "../lib/router";

export function NotFound() {
  useSeo({
    title: "Page Not Found | Solvit Labs",
    description: "The page you're looking for doesn't exist or has been moved.",
    path: "/404",
    robots: "noindex, follow",
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-page text-center">
      <p className="eyebrow text-ink/50">404 — Not found</p>
      <h1 className="display mt-6 text-5xl font-medium md:text-6xl">This page went missing.</h1>
      <p className="mt-5 max-w-md text-ink/55">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button to="/">Back to home</Button>
        <Link
          to="/projects"
          className="u-link font-display text-[0.82rem] font-medium uppercase tracking-[0.18em] text-ink/70"
        >
          View projects
        </Link>
      </div>
    </main>
  );
}
