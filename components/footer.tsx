"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {label: "About", href: "/about"},
  { label: "Services", href: "/services/cloud" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
{ label: "LinkedIn", href: "https://linkedin.com" },
{ label: "Twitter", href: "https://twitter.com" },
{ label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] px-6 py-20 md:px-12 md:py-28">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Top: brand + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between"
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className="mb-3 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
style={{ textShadow: "0 0 40px rgba(255,255,255,0.08)" }}>
              Zap Solutions
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              We build modern web and mobile applications for startups and businesses worldwide. 
From idea to launch — we turn vision into reality.
            </p>
          </div>

          <a
            href="#contact"
            className="w-fit border border-white/20 px-8 py-3 text-[10px] font-bold tracking-[0.4em] uppercase text-white/70 transition-all duration-500 hover:border-white/60 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:text-[#111111]"
          >
            Start Your Project
          </a>
        </motion.div>

        {/* Links grid */}
        <div className="mb-16 grid gap-10 border-t border-white/[0.08] pt-12 md:grid-cols-4 md:gap-8">
          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/25">
              Navigate
            </h3>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/45 transition-colors duration-400 hover:text-white transition-all duration-500 hover:tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/25">
              Social
            </h3>
            <div className="flex flex-col gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/45 transition-colors duration-400 hover:text-white/80"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/25">
              Contact
            </h3>
            <p className="mb-2 text-sm font-medium text-white/45">
              info@zapwms.com
            </p>
            <p className="text-sm font-medium text-white/45">
              24/7 Support Available
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/25">
              Services
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              Web Development · Mobile Apps · UI/UX
              <br />
              Full Stack · SaaS · AI Solutions · CRM 
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] font-medium tracking-wider text-white/20 transition-colors duration-400 hover:text-white/50"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-[10px] font-medium tracking-[0.15em] text-white/20">
            &copy; {new Date().getFullYear()} ZapSolutions. All rights reserved. Powered by ZAPWMS.
          </p>
        </div>
      </div>
    </footer>
  );
}
