// process-scroll.tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ==================== CONFIGURATION ====================
const FRAME_START = 1;
const FRAME_END = 379;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1;

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const FOLDER = "armorray/frames-2";
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

interface Phase {
  name: string;
  heading: string;
  subtext: string;
  startFrame: number;
  endFrame: number;
}

const PHASES: Phase[] = [
  {
    name: "Think",
    heading: "We Think",
    subtext: "Deep research and strategy — understanding your users and business goals.",
    startFrame: 1,
    endFrame: 95,
  },
  {
    name: "Design",
    heading: "We Design",
    subtext: "From wireframes to pixel‑perfect interfaces — crafting intuitive experiences.",
    startFrame: 96,
    endFrame: 190,
  },
  {
    name: "Build",
    heading: "We Build",
    subtext: "Modern stack, scalable architecture, and clean code that performs.",
    startFrame: 191,
    endFrame: 285,
  },
  {
    name: "Launch",
    heading: "We Launch",
    subtext: "Seamless deployment, continuous monitoring, and ongoing evolution.",
    startFrame: 286,
    endFrame: 379,
  },
];

function getPhaseOpacity(progress: number, phase: Phase): number {
  const phaseStart = (phase.startFrame - 1) / (TOTAL_FRAMES - 1);
  const phaseEnd = (phase.endFrame - 1) / (TOTAL_FRAMES - 1);
  const fadeInDuration = 0.06;
  const fadeOutDuration = 0.06;

  const inStart = phaseStart;
  const inEnd = Math.min(phaseStart + fadeInDuration, phaseEnd);
  const outStart = Math.max(phaseEnd - fadeOutDuration, phaseStart);
  const outEnd = phaseEnd;

  if (progress < inStart) return 0;
  if (progress >= inStart && progress <= inEnd) {
    return (progress - inStart) / (inEnd - inStart);
  }
  if (progress > inEnd && progress < outStart) return 1;
  if (progress >= outStart && progress <= outEnd) {
    return (outEnd - progress) / (outEnd - outStart);
  }
  return 0;
}

export default function ProcessScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [loadPercent, setLoadPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);

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
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Canvas DPR
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

    const idx = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
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

    // Subtle darkening for text readability
    const maxOpacity = Math.max(...PHASES.map(p => getPhaseOpacity(progress, p)));
    if (maxOpacity > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${0.25 * maxOpacity})`;
      ctx.fillRect(0, 0, dw, dh);

      const grad = ctx.createLinearGradient(0, dh * 0.6, 0, dh);
      grad.addColorStop(0, `rgba(5,5,5,0)`);
      grad.addColorStop(1, `rgba(5,5,5,${0.8 * maxOpacity})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, dw, dh);
    }
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

  return (
    <section ref={containerRef} className="relative h-[500vh]" id="process">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ width: dimensions.w, height: dimensions.h }}
        />

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

        {PHASES.map((phase) => {
          const opacity = getPhaseOpacity(progress, phase);
          if (opacity <= 0) return null;

          return (
            <div
              key={phase.name}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              style={{
                opacity,
                transform: `translateY(${(1 - opacity) * 20}px)`,
              }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60 mb-4">
                {phase.name}
              </span>
              <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[1.1] tracking-tight text-white">
                {phase.heading}
              </h2>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/70">
                {phase.subtext}
              </p>
            </div>
          );
        })}

        {progress < 0.02 && ready && (
          <div className="absolute inset-x-0 bottom-12 z-10 flex flex-col items-center">
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
      </div>
    </section>
  );
}