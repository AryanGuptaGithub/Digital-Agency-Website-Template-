"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColorBends from "@/components/ColorBends";

// ==================== SECTIONS ====================
interface Section {
  label: string;
  heading: string;
  body: string | string[];
}

const SECTIONS: Section[] = [
  {
    label: "Our Story",
    heading: "Founded in 1999",
    body: "ZAP is a team of forward-thinking professionals with over 25 years of international experience in business support and services. From our very first year, we've been committed to raising industry standards — continuously evolving alongside the businesses we serve.",
  },
  {
    label: "Evolution",
    heading: "Evolving with\nthe Digital Age",
    body: "As the digital landscape transformed, so did we. Today, ZAP seamlessly integrates cutting-edge digital strategies with next-generation social engagement, delivering solutions that are not just relevant but ahead of the curve.",
  },
  {
    label: "Why ZAP",
    heading: "Why Choose ZAP",
    body: [
      "25+ years international experience",
      "End-to-end B2B & B2C solutions",
      "Custom digital & web ecosystems",
      "Innovation-driven growth strategy",
      "Cloud support (AWS, Azure, GCP)",
      "Mobile & web app development",
      "Custom CRM & enterprise solutions",
      "24/7 support & monitoring",
    ],
  },
  {
    label: "Philosophy",
    heading: "People First,\nTechnology Second",
    body: "No technology, however advanced, is meaningful without the people it serves. We are a customer-first organization — your priority is our purpose.",
  },
  {
    label: "Integrity",
    heading: "Professional\nIntegrity",
    body: "Integrity isn't a policy on paper — it's a culture we live by. Honesty combined with smart work creates exceptional customer experiences.",
  },
  {
    label: "Together",
    heading: "Success in\nTogetherness",
    body: "Your success is the foundation of ours. When you win, we win. Together we create a dynamic ecosystem where your business leads.",
  },
];

const TOTAL_SECTIONS = SECTIONS.length;
// Each section gets equal scroll real-estate
const SECTION_HEIGHT = 100; // vh units per section
const TOTAL_HEIGHT = TOTAL_SECTIONS * SECTION_HEIGHT;

// ==================== HELPERS ====================
function getSectionOpacity(progress: number, index: number): number {
  const segmentSize = 1 / TOTAL_SECTIONS;
  const center = (index + 0.5) * segmentSize;
  const fadeZone = segmentSize * 0.3;

  const dist = Math.abs(progress - center);
  if (dist > segmentSize * 0.6) return 0;
  if (dist < fadeZone) return 1;
  return Math.max(0, 1 - (dist - fadeZone) / (segmentSize * 0.3));
}

// ==================== COMPONENT ====================
export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.scrollHeight - window.innerHeight;
      setProgress(Math.min(Math.max(-rect.top / scrollable, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section index for ColorBends color shifting
  const activeIndex = Math.min(
    Math.floor(progress * TOTAL_SECTIONS),
    TOTAL_SECTIONS - 1
  );

  const colorSets = [
    ["#ff5c7a", "#8a5cff", "#00ffd1"],
    ["#ff6b35", "#f7c59f", "#efefd0"],
    ["#7b2d8b", "#00b4d8", "#90e0ef"],
    ["#ff9a3c", "#ff6392", "#b5179e"],
    ["#06d6a0", "#118ab2", "#073b4c"],
    ["#ef476f", "#ffd166", "#06d6a0"],
  ];

  return (
    <main
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${TOTAL_HEIGHT}vh` }}
    >
      {/* Sticky fullscreen container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ColorBends Background */}
        <ColorBends
          className="absolute inset-0 z-0"
          colors={colorSets[activeIndex]}
          rotation={90}
          speed={0.2}
          scale={1.2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.5}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
          autoRotate={0.3}
          color="#A855F7"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-black/55" />

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3">
          {SECTIONS.map((s, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.2)",
                transform: i === activeIndex ? "scale(1.6)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => {
          const opacity = getSectionOpacity(progress, i);
          if (opacity <= 0.01) return null;

          return (
            <div
              key={i}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity,
                transform: `translateY(${(1 - opacity) * 24}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              {/* Label */}
              <span className="mb-4 text-[11px] font-semibold uppercase tracking-[0.5em] text-white/50">
                {section.label}
              </span>

              {/* Heading */}
              <h2
                className="text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-white"
                style={{ whiteSpace: "pre-line" }}
              >
                {section.heading}
              </h2>

              {/* Body — list or paragraph */}
              {Array.isArray(section.body) ? (
                <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-3 text-left">
                  {section.body.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="text-white/40">→</span>
                      <span className="text-base text-white/75">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                  {section.body}
                </p>
              )}
            </div>
          );
        })}

        {/* Scroll hint — only at start */}
        {progress < 0.04 && (
          <div className="absolute inset-x-0 bottom-12 z-30 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-white/40">
                Scroll
              </span>
              <div className="h-7 w-px bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </div>
        )}

        {/* CTA — only at end */}
        {progress > 0.92 && (
          <div
            className="absolute inset-x-0 bottom-16 z-30 flex justify-center"
            style={{ opacity: Math.min((progress - 0.92) / 0.08, 1) }}
          >
            <a
              href="/#contact"
              className="inline-block border border-white/20 px-8 py-4 text-[11px] font-bold tracking-[0.4em] uppercase text-white transition-all duration-500 hover:border-white/60 hover:bg-white hover:text-black"
            >
              Let's Build Together
            </a>
          </div>
        )}
      </div>
    </main>
  );
}