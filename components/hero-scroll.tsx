"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// ==================== CONFIGURATION ====================
const FRAME_START = 1;
const FRAME_END = 96;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1;

function formatFrameNumber(num: number): string {
  return num.toString().padStart(4, "0");
}

function frameSrc(index: number): string {
  const frameNum = FRAME_START + index;
  return `/frames-1/frame_${formatFrameNumber(frameNum)}.png`;
}
// ======================================================

// Text overlay definition for GSAP timeline
interface TextItem {
  id: string;
  heading: string;
  subtext?: string;
  inStart: number;   // scroll progress (0–1) when fade-in begins
  inEnd: number;     // scroll progress when fully visible
  outStart: number;  // when fade-out begins
  outEnd: number;    // when fully hidden
}

const TEXT_ITEMS: TextItem[] = [
  {
    id: "text-1",
    heading: "From Idea to Reality",
    subtext: "We turn vision into digital products",
    inStart: 0.1,
    inEnd: 0.2,
    outStart: 0.35,
    outEnd: 0.45,
  },
  {
    id: "text-2",
    heading: "We Build Digital Experiences",
    subtext: "Crafting interfaces that feel alive",
    inStart: 0.5,
    inEnd: 0.6,
    outStart: 0.75,
    outEnd: 0.85,
  },
  {
    id: "text-3",
    heading: "Web. Mobile. AI.",
    subtext: "The future is hybrid",
    inStart: 0.85,
    inEnd: 0.92,
    outStart: 0.96,
    outEnd: 1.0,
  },
];

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const loadedCountRef = useRef(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Preload all frames (unchanged)
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let mounted = true;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        if (!mounted) return;
        loadedCountRef.current++;
        const percent = Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100);
        setLoadPercent(percent);
        if (loadedCountRef.current >= TOTAL_FRAMES) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      mounted = false;
    };
  }, []);

  // Scroll progress (linear scrub) — used only for canvas drawing
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

  // Window dimensions (unchanged)
  useEffect(() => {
    const update = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Canvas scaling (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, [dimensions]);

  // Draw current frame (unchanged)
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const dw = canvas.width / dpr;
    const dh = canvas.height / dpr;

    const idx = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    const img = imagesRef.current[idx];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, dw, dh);
      const scale = Math.max(dw / img.naturalWidth, dh / img.naturalHeight);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      ctx.drawImage(img, (dw - sw) / 2, (dh - sh) / 2, sw, sh);
    }

    // Optional subtle vignette (unchanged)
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, dw, dh);
  }, [progress]);

  // Render loop (unchanged)
  useEffect(() => {
    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawFrame]);

  // ==================== GSAP ScrollTrigger Timeline for Text Overlays ====================
  useEffect(() => {
    // Wait for container and text elements to be ready
    if (!containerRef.current || !textContainerRef.current || !ready) return;

    // Kill old ScrollTriggers and timeline to avoid duplicates
    ScrollTrigger.getAll().forEach((st) => st.kill());
    if (timelineRef.current) timelineRef.current.kill();

    // Create a master timeline that will be scrubbed by ScrollTrigger
    const tl = gsap.timeline({
      paused: true,
    });

    // For each text item, build its animation sequence
    TEXT_ITEMS.forEach((item) => {
      const element = textRefs.current.get(item.id);
      if (!element) return;

      // Set initial state (hidden, slightly down)
      gsap.set(element, { opacity: 0, y: 30, filter: "blur(8px)" });

      // Fade in + move up + unblur
      tl.to(
        element,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: item.inEnd - item.inStart,
          ease: "power2.out",
        },
        item.inStart
      );

      // Hold visible (do nothing between inEnd and outStart)
      // Fade out + slight upward movement (optional)
      tl.to(
        element,
        {
          opacity: 0,
          y: -15,
          filter: "blur(4px)",
          duration: item.outEnd - item.outStart,
          ease: "power2.in",
        },
        item.outStart
      );
    });

    timelineRef.current = tl;

    // Create ScrollTrigger to scrub the timeline based on scroll progress
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2, // smooth scrubbing with slight lag for cinematic feel
      onUpdate: (self) => {
        // self.progress is 0–1 based on scroll position
        tl.progress(self.progress);
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [ready, dimensions]); // re-run if dimensions change (text positioning remains centered)

  // Helper to set ref for text elements
  const setTextRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) textRefs.current.set(id, el);
    else textRefs.current.delete(id);
  };

  return (
    <section ref={containerRef} className="relative h-[500vh]" id="hero">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ width: dimensions.w, height: dimensions.h }}
        />

        {/* Text overlays layer (z-index above canvas) */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none"
        >
          {TEXT_ITEMS.map((item) => (
            <div
              key={item.id}
              ref={setTextRef(item.id)}
              className="absolute text-center max-w-4xl"
              style={{ willChange: "transform, opacity, filter" }}
            >
              <h2
                className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[1.1] tracking-tight text-white"
                style={{ textShadow: "0 4px 60px rgba(0,0,0,0.7)" }}
              >
                {item.heading}
              </h2>
              {item.subtext && (
                <p
                  className="mt-4 text-xl md:text-2xl font-medium text-white/80"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
                >
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Loading indicator (unchanged) */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505]">
            <div className="relative h-px w-40 overflow-hidden bg-white/[0.06]">
              <div
                className="absolute inset-y-0 left-0 bg-white/40 transition-all duration-300"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <span className="mt-5 text-[10px] font-medium tabular-nums tracking-[0.5em] text-white/25">
              {loadPercent}%
            </span>
          </div>
        )}

        {/* Scroll hint (unchanged) */}
        {progress < 0.04 && ready && (
          <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-white/40">
                Scroll
              </span>
              <div className="h-7 w-px bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}