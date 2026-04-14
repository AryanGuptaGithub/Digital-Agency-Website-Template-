"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  stats?: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aether Finance",
    category: "Web3 Platform",
    year: "2024",
    image: "/images/project-1.jpg",
    stats: [
      { label: "TVL", value: "$1.2B" },
      { label: "Users", value: "250K+" },
    ],
  },
  {
    id: 2,
    title: "Nova Health",
    category: "Telemedicine",
    year: "2024",
    image: "/images/project-2.jpg",
    stats: [
      { label: "Consultations", value: "1M+" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    id: 3,
    title: "Voyager AI",
    category: "Analytics Suite",
    year: "2023",
    image: "/images/project-3.jpg",
    stats: [
      { label: "Data Points", value: "5B+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    id: 4,
    title: "Luxe Escapes",
    category: "Travel Platform",
    year: "2023",
    image: "/images/project-4.jpg",
    stats: [
      { label: "Bookings", value: "$45M" },
      { label: "Destinations", value: "80+" },
    ],
  },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check mobile and wait for images to load
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Wait for next tick to ensure DOM is fully rendered
    const timer = setTimeout(() => setIsReady(true), 100);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isMobile || !isReady) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    // Kill any existing ScrollTriggers on this element
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === section) st.kill();
    });

    // Force a reflow to get accurate measurements
    wrapper.style.transform = "translateX(0)";

    // Calculate scroll distance
    const scrollWidth = wrapper.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = scrollWidth - windowWidth;

    // If no scroll distance (content fits), don't create animation
    if (scrollDistance <= 0) return;

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
        // Ensure pinning works with Lenis
        anticipatePin: 1,
      },
    });

    tl.to(wrapper, {
      x: -scrollDistance,
      ease: "none",
    });

    // Refresh ScrollTrigger after everything is set
    ScrollTrigger.refresh();

    // Sync with Lenis (or native scroll) via RAF
    let rafId: number;
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
      rafId = requestAnimationFrame(updateScrollTrigger);
    };
    rafId = requestAnimationFrame(updateScrollTrigger);

    // Also listen to window resize to recalculate
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, isReady]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-black"
    >
      {/* Section header */}
      <div className="pointer-events-none absolute left-0 right-0 top-12 z-10 px-6 md:px-12 lg:px-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
          Featured Work
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Projects we're proud of
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex h-full w-max flex-nowrap"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative h-full w-screen max-w-[90vw] flex-shrink-0 md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw]"
            >
              <div className="absolute inset-0 overflow-hidden">
                {project.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 85vw, 80vw"
                    priority={project.id === 1}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-sm font-medium uppercase tracking-wider text-white/60">
                      {project.category} · {project.year}
                    </span>
                    <h3 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>
                  </div>
                  <button className="relative hidden h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:flex">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {project.stats && (
                  <div className="mt-8 flex gap-8">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col">
                        <span className="text-2xl font-bold tabular-nums text-white">
                          {stat.value}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile fallback */}
      {isMobile && (
        <div className="flex flex-col space-y-8 px-6 py-16 md:hidden">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-white/60">
                  {project.category} · {project.year}
                </span>
                <h3 className="mt-2 text-3xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}