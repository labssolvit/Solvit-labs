import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { heroScroll } from "../lib/sceneState";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { canUseWebGL, initPointerListener } from "../lib/webgl";
import { Button } from "./Button";
import { Scramble } from "./Scramble";
import { HeroScene } from "./3d/HeroScene";

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

/** Elegant 2D fallback when WebGL is unavailable or reduced motion is on. */
function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,#ffffff_0%,#fcfbf9_55%)]" />
      <div
        className="absolute right-[-12%] top-[8%] h-[54vmin] w-[54vmin] rounded-full border border-ink/12"
        style={{ boxShadow: "inset 0 0 120px rgba(10,10,11,0.05)" }}
      />
      <div className="absolute right-[2%] top-[22%] h-[26vmin] w-[26vmin] rounded-full border border-ember/35" />
      <div className="absolute right-[9%] top-[30%] h-2 w-2 rounded-full bg-ember" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5dbde 1px, transparent 1px), linear-gradient(to top, #e5dbde 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to top, black 20%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 85%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const webgl = useMemo(() => canUseWebGL(), []);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const use3D = webgl && !reduced;

  useEffect(() => {
    if (use3D) initPointerListener();
  }, [use3D]);

  // Intro timeline once the loader completes.
  useEffect(() => {
    if (!ready) return;
    const q = gsap.utils.selector(contentRef);
    if (reduced) {
      gsap.set(q(".hero-el"), { opacity: 1, y: 0 });
      gsap.set(q(".hero-line-inner"), { yPercent: 0 });
    } else {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        q(".hero-line-inner"),
        { yPercent: 112 },
        { yPercent: 0, duration: 1.25, ease: "expo.out", stagger: 0.1 }
      ).fromTo(
        q(".hero-el"),
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 },
        "-=0.85"
      );
    }
  }, [ready, reduced]);

  // Scroll-driven cinematic exit.
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          heroScroll.progress = self.progress;
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -16,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "78% top",
          scrub: true,
        },
      });
      gsap.to(".hero-cue", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "20% top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Reset progress when unmounting (route change).
  useEffect(() => () => {
    heroScroll.progress = 0;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D stage (or fallback) — decorative */}
      <div className="absolute inset-0" aria-hidden>
        {use3D ? <HeroScene mobile={mobile} /> : <HeroFallback />}
      </div>
      {/* Readability scrim */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(241,240,236,0.88)_0%,rgba(241,240,236,0.45)_52%,transparent_78%)] md:bg-[linear-gradient(90deg,rgba(241,240,236,0.75)_0%,rgba(241,240,236,0.25)_48%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper to-transparent" />

      {/* HUD micro-details */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <p className="absolute right-[4vw] top-32 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink/45">
          EST. 2026 — Portfolio
        </p>
        <p className="absolute right-[4vw] top-1/2 origin-right -rotate-90 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink/35">
          Systems / Surfaces / Motion
        </p>
        <p className="absolute bottom-28 right-[4vw] font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink/45">
          N 51.5072° — W 0.1276°
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center px-page pt-28 pb-20">
        <div ref={contentRef} className="max-page w-full">
          <div className="max-w-3xl">
            <p className="hero-el eyebrow mb-8 flex items-center gap-3 text-ink/55 opacity-0">
              <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-ember" aria-hidden />
              <Scramble text="Now booking projects" playOnView onHover duration={700} />
            </p>

            <h1 className="display text-[clamp(2.7rem,7.2vw,6rem)] font-medium">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">We build digital</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">experiences that solve</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-line-inner block">
                  <span className="text-ember">what's next.</span>
                </span>
              </span>
            </h1>

            <p className="hero-el mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/60 md:text-lg opacity-0">
              Solvit Labs combines precision engineering, immersive design, and modern
              technology to create digital products built for ambitious businesses.
            </p>

            <div className="hero-el mt-11 flex flex-wrap items-center gap-4 opacity-0">
              <Button to="/contact">Start a Project</Button>
              <Button to="/projects" variant="outline">
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom meta strip */}
      <div className="hero-cue relative z-10 px-page pb-8">
        <div className="max-page flex items-end justify-between border-t border-ink/15 pt-6">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ink/50">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-ember" aria-hidden />
            Scroll to explore
          </div>
          <p className="hidden font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ink/50 md:block">
            Design · Engineering · Experience
          </p>
        </div>
      </div>
    </section>
  );
}
