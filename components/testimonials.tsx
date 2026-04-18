"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import DarkVeil from "./DarkVeil"; // Adjust path as needed

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "ArmorRay's hybrid architecture transformed our diagnostic workflow. We cut image loading times by 60% while maintaining full DICOM compliance.",
    author: "Dr. Sarah Chen",
    role: "Chief Radiologist",
    company: "Pacific Medical Group",
    rating: 5,
  },
  {
    id: 2,
    quote: "Finally, a vendor-neutral solution that actually works. We migrated from three different PACS systems seamlessly.",
    author: "Marcus Thorne",
    role: "IT Director",
    company: "Global Health Systems",
    rating: 5,
  },
  {
    id: 3,
    quote: "The 24/7 alerting and real-time diagnostics saved us twice during critical patient cases. Indispensable.",
    author: "Elena Vasquez",
    role: "Emergency Medicine Lead",
    company: "City General Hospital",
    rating: 5,
  },
  {
    id: 4,
    quote: "Deployment across 105+ regions with zero downtime. ArmorRay sets the new standard for medical imaging infrastructure.",
    author: "James Okafor",
    role: "VP of Engineering",
    company: "MedTech Solutions",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
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

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === section) st.kill();
    });

    wrapper.style.transform = "translateX(0)";

    const scrollWidth = wrapper.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = scrollWidth - windowWidth;

    if (scrollDistance <= 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    tl.to(wrapper, {
      x: -scrollDistance,
      ease: "none",
    });

    ScrollTrigger.refresh();

    let rafId: number;
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
      rafId = requestAnimationFrame(updateScrollTrigger);
    };
    rafId = requestAnimationFrame(updateScrollTrigger);

    const handleResize = () => ScrollTrigger.refresh();
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

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-white/20"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden p-5"
    >
      {/* DarkVeil Background */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Optional overlay to maintain readability (semi-transparent black) */}
      <div className="absolute inset-0 bg-black/40 " />

      <div className="absolute top-0 left-0 right-0 h-22 md:h-7 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md pointer-events-none z-20" />

      {/* Section header */}
      <div className="pointer-events-none relative z-10 px-6 pt-24 md:px-12 md:pt-32 lg:px-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
          Testimonials
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Trusted by industry leaders
        </h2>
        <p className="mt-4 max-w-2xl text-white/50">
          See what healthcare professionals and technology partners say about ArmorRay.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative z-10 mt-16 h-[500px] w-full overflow-hidden md:mt-24">
        <div
          ref={wrapperRef}
          className="flex h-full w-max flex-nowrap gap-6 px-6 pl-5 md:gap-8 md:px-12 lg:gap-10 lg:px-16"
          style={{ willChange: "transform" }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] max-w-[500px] flex-shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10 md:p-8 lg:p-10"
            >
              <div className="mb-6 text-6xl text-white/10">“</div>
              <p className="text-base leading-relaxed text-white/80 md:text-small">
                {item.quote}
              </p>
              <div className="mt-6">{renderStars(item.rating)}</div>
              <div className="mt-8 flex items-center gap-4">
                {item.avatar ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-sm text-white">{item.author}</div>
                  <div className="text-sm text-white/50 text-xs">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile fallback (vertical stack) */}
      {isMobile && (
        <div className="relative z-10 mt-12 flex flex-col gap-6 px-6 pb-24">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 text-4xl text-white/10">“</div>
              <p className="text-white/80">{item.quote}</p>
              <div className="mt-6">{renderStars(item.rating)}</div>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{item.author}</div>
                  <div className="text-xs text-white/50">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}