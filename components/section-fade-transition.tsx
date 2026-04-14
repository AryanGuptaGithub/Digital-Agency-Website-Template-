"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionFadeTransitionProps {
  fromSection: string; // CSS selector of the first section (e.g. "#testimonials")
  toSection: string;   // CSS selector of the next section (e.g. "#contact")
}

export default function SectionFadeTransition({ fromSection, toSection }: SectionFadeTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    const from = document.querySelector(fromSection);
    const to = document.querySelector(toSection);
    if (!from || !to) return;

    // Create a ScrollTrigger that fades the overlay when transitioning between sections
    ScrollTrigger.create({
      trigger: from,
      start: "bottom bottom",
      end: "top top",
      onUpdate: (self) => {
        // self.progress goes from 0 (at start) to 1 (at end)
        // Invert so overlay fades in as we leave 'from' and out as we enter 'to'
        const progress = self.progress;
        let opacity = 0;
        if (progress < 0.5) {
          // fading in
          opacity = progress * 2; // 0 → 1
        } else {
          // fading out
          opacity = 2 - progress * 2; // 1 → 0
        }
        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(opacity);
        }
      },
      scrub: true, // smooth scrubbing
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [fromSection, toSection]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[100] bg-black transition-opacity duration-300"
      style={{ opacity: 0 }}
    />
  );
}