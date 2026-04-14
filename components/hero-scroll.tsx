// hero-scroll.tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==================== CONFIGURATION ====================
const FRAME_START = 1;
const FRAME_END = 192;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1;

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const FOLDER = "armorray/frames-1";
const PRELOAD_AHEAD = 40;

function formatFrameNumber(num: number): string {
  return num.toString().padStart(4, "0");
}

function frameSrc(index: number): string {
  const frameNum = FRAME_START + index;
  const publicId = `${FOLDER}/frame_${formatFrameNumber(frameNum)}`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_1280,q_auto,f_auto/${publicId}.jpg`;
}
// ======================================================

interface TextItem {
  id: string;
  heading: string;
  subtext?: string;
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
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
  const [loadPercent, setLoadPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize image array + preload first batch only
  useEffect(() => {
    let mounted = true;
    const imgs: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, () => new Image());
    imagesRef.current = imgs;

    const initialBatch = Math.min(PRELOAD_AHEAD, TOTAL_FRAMES);
    let initialLoaded = 0;

    for (let i = 0; i < initialBatch; i++) {
      const img = imgs[i];
      img.crossOrigin = "anonymous";
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        if (!mounted) return;
        initialLoaded++;
        setLoadPercent(Math.round((initialLoaded / initialBatch) * 100));
        if (initialLoaded >= initialBatch) setReady(true);
      };
    }

    return () => { mounted = false; };
  }, []);

  // Sliding window — preload ahead + behind as user scrolls
  useEffect(() => {
    if (!ready) return;
    const currentIdx = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    // Preload ahead
    const end = Math.min(currentIdx + PRELOAD_AHEAD, TOTAL_FRAMES - 1);
    for (let i = currentIdx; i <= end; i++) {
      const img = imagesRef.current[i];
      if (!img.src) {
        img.crossOrigin = "anonymous";
        img.src = frameSrc(i);
      }
    }

    // Preload behind (for scroll-back)
    const behind = Math.max(currentIdx - 10, 0);
    for (let i = behind; i < currentIdx; i++) {
      const img = imagesRef.current[i];
      if (!img.src) {
        img.crossOrigin = "anonymous";
        img.src = frameSrc(i);
      }
    }
  }, [progress, ready]);

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

  // Window dimensions
  useEffect(() => {
    const update = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Canvas scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, [dimensions]);

  // Draw current frame — falls back to last loaded frame to prevent black flash
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

    // If current frame isn't ready, walk backwards to find the last loaded one
    let drawImg = img;
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = idx - 1; i >= 0; i--) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          drawImg = candidate;
          break;
        }
      }
    }

    if (drawImg && drawImg.complete && drawImg.naturalWidth > 0) {
      ctx.clearRect(0, 0, dw, dh);
      const scale = Math.max(dw / drawImg.naturalWidth, dh / drawImg.naturalHeight);
      const sw = drawImg.naturalWidth * scale;
      const sh = drawImg.naturalHeight * scale;
      ctx.drawImage(drawImg, (dw - sw) / 2, (dh - sh) / 2, sw, sh);
    }

    // Subtle vignette
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, dw, dh);
  }, [progress]);

  // Render loop
  useEffect(() => {
    const loop = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawFrame]);

  // GSAP ScrollTrigger Timeline for Text Overlays
  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current || !ready) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({ paused: true });

    TEXT_ITEMS.forEach((item) => {
      const element = textRefs.current.get(item.id);
      if (!element) return;

      gsap.set(element, { opacity: 0, y: 30, filter: "blur(8px)" });

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

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        tl.progress(self.progress);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [ready, dimensions]);

  const setTextRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) textRefs.current.set(id, el);
    else textRefs.current.delete(id);
  };

  return (
    <section ref={containerRef} className="relative h-[800vh]" id="hero">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ width: dimensions.w, height: dimensions.h }}
        />

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