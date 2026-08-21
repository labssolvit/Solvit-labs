import { useCallback, useEffect, useState } from "react";
import { destroyLenis, initLenis } from "./lib/lenis";
import { ScrollTrigger } from "./lib/gsap";
import { RouterProvider, scrollToTop, useRouter } from "./lib/router";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useReveals } from "./hooks/useReveals";
import { initPointerListener } from "./lib/webgl";
import {
  injectSearchVerification,
  organizationSchema,
  useSeo,
  websiteSchema,
} from "./lib/seo";

import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Technology } from "./components/Technology";
import { Process } from "./components/Process";
import { WhySolvex } from "./components/WhySolvex";
import { Testimonials } from "./components/Testimonials";
import { FinalCTA } from "./components/FinalCTA";
import { Contact } from "./components/Contact";
import { CaseStudy } from "./components/CaseStudy";
import { Footer } from "./components/Footer";

import { AboutPage } from "./pages/AboutPage";
import { PricingPage } from "./pages/PricingPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ProjectsPage, CaseStudiesPage } from "./pages/WorkIndexes";
import { BlogPage, BlogArticlePage } from "./pages/Blog";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

function Home({ loaded }: { loaded: boolean }) {
  useSeo({
    title: "Solvit Labs — Modern Digital Solutions & 3D Web Experiences",
    description:
      "Solvit Labs creates high-performance websites, mobile applications, AI solutions, UI/UX experiences and immersive 3D digital products.",
    keywords:
      "solvit labs, digital solutions, web development, mobile apps, ai solutions, ui ux design, 3d web experiences",
    path: "/",
    jsonLd: [organizationSchema, websiteSchema],
  });

  return (
    <main>
      <Hero ready={loaded} />
      <About />
      <Services />
      <Work />
      <Technology />
      <Process />
      <WhySolvex />
      <Testimonials />
      <FinalCTA />
      <Contact />
    </main>
  );
}

function Routes({ loaded }: { loaded: boolean }) {
  const { path } = useRouter();

  if (path === "/") return <Home loaded={loaded} />;
  if (path === "/about") return <AboutPage />;
  if (path === "/services") return <ServicesPage />;
    if (path.startsWith("/services/")) return <ServiceDetailPage slug={path.replace("/services/", "")} />;
    if (path === "/pricing") return <PricingPage />;
    if (path === "/projects") return <ProjectsPage />;
  if (path === "/case-studies") return <CaseStudiesPage />;
  if (path === "/blog") return <BlogPage />;
  if (path.startsWith("/blog/")) return <BlogArticlePage slug={path.replace("/blog/", "")} />;
  if (path === "/careers") return <CareersPage />;
  if (path === "/contact") return <ContactPage />;
  if (path.startsWith("/work/")) return <CaseStudy slug={path.replace("/work/", "")} />;
  return <NotFound />;
}

function Shell() {
  const reduced = useReducedMotion();
  const { path } = useRouter();
  const [loaded, setLoaded] = useState(false);

  // Smooth scrolling + search verification (one-time).
  useEffect(() => {
    initLenis(!reduced);
    initPointerListener();
    injectSearchVerification();
    return () => destroyLenis();
  }, [reduced]);

  // Return to top on route change (hash navigation handles itself).
  useEffect(() => {
    if (!window.location.hash) scrollToTop(true);
  }, [path]);

  // Re-measure scroll triggers on route change & after load.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [path, loaded]);

  useReveals([path, loaded]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <div className="grain min-h-svh bg-paper text-ink">
      <CustomCursor />
      {!loaded && <LoadingScreen onDone={handleLoaded} reducedMotion={reduced} />}
      <Navbar />
      <Routes key={path} loaded={loaded} />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
