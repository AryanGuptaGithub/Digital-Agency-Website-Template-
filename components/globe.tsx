"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const DESTINATIONS = [
  { label: "Startups" },
  { label: "Enterprises" },
  { label: "E-commerce" },
  { label: "SaaS Products" },
  { label: "FinTech" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function Globe() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("canplay", onCanPlay);
    video.play().catch(() => {});
    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section id="destinations" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/Globe Animation Prompt.mp4"
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-[#0D1318]/70" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0D1318] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          {...fadeUp}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4 inline-block text-[11px] font-medium tracking-[0.5em] uppercase text-white/30"
        >
          Global Reach
        </motion.span>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
          style={{ textShadow: "0 0 50px rgba(255,255,255,0.08)" }}
        >
          We Build for
          <br />
          <span className="font-light text-white/40"> Modern Businesses.</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mb-12 max-w-lg text-base font-light leading-relaxed text-white/40 md:text-lg"
        >
         We collaborate with startups, growing businesses, and enterprises worldwide 
to build scalable digital products. From idea to launch, we deliver solutions 
that perform at scale.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
          whileHover={{ scale: 1.03 }}
        >
          {DESTINATIONS.map((dest, i) => (
            <motion.span
              key={dest.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="border border-white/10 px-4 py-1.5 text-[10px] font-medium tracking-[0.25em] uppercase text-white/45 backdrop-blur-md bg-white/[0.02] transition-all duration-500 hover:border-white/30 hover:text-white hover:bg-white/[0.05]"
            >
              {dest.label}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          {...fadeUp}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block border border-white/15 px-10 py-3.5 text-[10px] font-medium tracking-[0.35em] uppercase text-white/70 backdrop-blur-md bg-white/[0.02] transition-all duration-500 hover:border-white/40 hover:text-white hover:bg-white/[0.08]"
        >
          Start Your Project
        </motion.a>
      </div>
    </section>
  );
}
