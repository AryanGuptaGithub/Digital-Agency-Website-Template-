"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
type Category = "All" | "Web" | "Mobile" | "CRM" | "E-commerce";

interface Project {
  title: string;
  category: Category | string;
  tags: string[];
  year: string;
  image: string;
  featured?: boolean;
  description?: string;
  stats?: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    title: "Cinecms",
    category: "Web",
    tags: ["Web", "CRM"],
    year: "2024",
    featured: true,
    description:
      "A full-featured media management platform powering film & production workflows at scale.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/cinecms_dl9wvb.png",
    stats: [
      { label: "Users", value: "250K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    title: "Movement Creation",
    category: "Web",
    tags: ["Web"],
    year: "2024",
    description: "Digital presence for a creative studio redefining motion arts.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/movementcreation_t8zepe.png",
    stats: [
      { label: "Consultations", value: "1M+" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    title: "Tradingwala",
    category: "Web",
    tags: ["Web", "Mobile"],
    year: "2023",
    description: "Real-time trading simulation with sub-50ms data feeds.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152994/tradingwala_olswqn.png",
    stats: [
      { label: "Data Points", value: "5B+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    title: "Link-n-Smile",
    category: "E-commerce",
    tags: ["E-commerce", "Web"],
    year: "2023",
    description: "Artisan marketplace connecting 5K+ craftspeople to global buyers.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/linkn-smile_xfvwm9.png",
    stats: [
      { label: "Artisans", value: "5K+" },
      { label: "Products", value: "50K+" },
    ],
  },
  {
    title: "Quickscan",
    category: "Mobile",
    tags: ["Mobile", "Web"],
    year: "2024",
    featured: true,
    description:
      "Appointment booking platform that slashes scheduling friction for healthcare providers.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/quickscan_epd5xc.png",
    stats: [
      { label: "Bookings", value: "1M+" },
      { label: "Users", value: "250K+" },
    ],
  },
  {
    title: "Instapeel",
    category: "E-commerce",
    tags: ["E-commerce", "Mobile"],
    year: "2024",
    description: "Beauty e-commerce with AR try-on and subscription flows.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/instapeels_jorkvk.png",
    stats: [
      { label: "Consultations", value: "1M+" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    title: "Society CRM",
    category: "CRM",
    tags: ["CRM", "Web"],
    year: "2023",
    description: "End-to-end society management suite: billing, complaints, gates.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152991/admin_healthcare_asia_zme062.png",
    stats: [
      { label: "Data Points", value: "5B+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    title: "HealthcareCambodia CRM",
    category: "CRM",
    tags: ["CRM", "Web"],
    year: "2023",
    description: "Patient management CRM tailored for Southeast Asian healthcare.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152991/Healthcare_Asia_d0o7dh.png",
    stats: [
      { label: "Patients Tracked", value: "200K+" },
      { label: "Clinics", value: "80+" },
    ],
  },
  {
    title: "Dev Associates",
    category: "Web",
    tags: ["Web", "CRM"],
    year: "2023",
    description: "Society management portal with resident accounting & compliance.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/devaccounts_alsnvp.png",
    stats: [
      { label: "Energy Saved", value: "20GWh" },
      { label: "CO₂ Reduced", value: "8K tons" },
    ],
  },
  {
    title: "Prevago",
    category: "Mobile",
    tags: ["Mobile", "Web"],
    year: "2024",
    description: "Preventive medicine platform bridging patients and practitioners.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/prevego_bsfhd2.png",
    stats: [
      { label: "TVL", value: "$800M" },
      { label: "APY", value: "12%" },
    ],
  },
  {
    title: "Samsom Orgo",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description: "Premium organic fertilizer brand with a conversion-focused storefront.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152994/samson-orgo_tq5iy1.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Heckyl",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description: "Analytical Platform for Investors",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248465/heckyl_pefpxf.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Highbrow Healthcare",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Highbrow healthcare group’s latest state of the art manufacturing facility",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248499/Highbrow_healthcare_ugrbz8.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Triofit Nutracare",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Triofit Nutracare Private Limited is a leading nutraceutical manufacturing company",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248608/triofit_nutracare_tvg71x.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Nezal Herbocare",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Nezal herbocare is a cosmetics firebrand venture of Healthcare Medical Centre",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248608/nazal_herbocare_tnxruk.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Lavex",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Tissue Paper Manufacturers in Maharashtra - ISO Certified, Eco-Friendly Products",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248605/Lavex_Premium_iksa9v.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "USIKSA",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Ultimate Solution Trading Est.( USI ) in Al Jubail, Saudi Arabia has been offering its services to the Oil, Gas, Petrochemicals and Marine industries for years.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248607/USI_inductrial_Solution_u2a2zt.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
  {
    title: "Mannequin’s",
    category: "Web",
    tags: ["Web"],
    year: "2023",
    description:
      "Mannequin’s Cosmetic India pampering since 1976. Mannequin’s Cosmetic India is an Indian company headquartered in Mumbai, Maharashtra, India.",
    image:
      "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776248606/Mannequins_ubgdsn.png",
    stats: [
      { label: "Revenue Growth", value: "3×" },
      { label: "SKUs", value: "80+" },
    ],
  },
];

const CATEGORIES: Category[] = ["All", "Web", "Mobile", "CRM", "E-commerce"];

const AGENCY_STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "30+", label: "Happy Clients" },
  { value: "4", label: "Years of Craft" },
  { value: "12", label: "Core Team" },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function useCountUp(target: number, duration = 1.8, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Animated stat counter */
function StatItem({
  raw,
  label,
  delay,
  inView,
}: {
  raw: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  // parse numeric part
  const numeric = parseInt(raw.replace(/\D/g, ""), 10) || 0;
  const suffix = raw.replace(/[0-9]/g, "");
  const count = useCountUp(numeric, 1.6, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start"
    >
      <span
        className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums tracking-tight text-white"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </span>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/35">
        {label}
      </span>
    </motion.div>
  );
}

/** Single project card */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/[0.05] cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Year badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/10">
          <span className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
            {project.year}
          </span>
        </div>

        {/* Arrow button — reveals on hover */}
        <div className="absolute top-4 left-4 h-9 w-9 flex items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/35">
          {project.category}
        </span>
        <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Stats */}
        {project.stats && (
          <div className="mt-4 flex gap-5 border-t border-white/[0.06] pt-4">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-base font-bold tabular-nums text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

/** Featured full-width project */
function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.06] cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white text-black">
              Featured
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
              {project.category} · {project.year}
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-4 text-base md:text-lg text-white/55 leading-relaxed max-w-lg">
              {project.description}
            </p>
          )}
          {project.stats && (
            <div className="mt-6 flex gap-8">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold tabular-nums text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-white/35 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 h-12 w-12 flex items-center justify-center rounded-full border border-white/20 transition-all duration-400 group-hover:border-white group-hover:bg-white group-hover:text-black">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white transition-colors duration-300 group-hover:text-black"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // GSAP parallax for hero
  useEffect(() => {
    setMounted(true);
    const hero = heroRef.current;
    if (!hero) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    tl.to(".work-hero-heading", { y: -60, opacity: 0.2, ease: "none" });
    tl.to(".work-hero-sub", { y: -30, opacity: 0, ease: "none" }, "<");

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const featured = PROJECTS.filter((p) => p.featured);
  const filtered =
    activeCategory === "All"
      ? PROJECTS.filter((p) => !p.featured)
      : PROJECTS.filter(
          (p) => !p.featured && p.tags.includes(activeCategory)
        );

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Counter top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-28 right-6 md:right-12 lg:right-16 text-right"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/20">
            {PROJECTS.length} Projects
          </span>
        </motion.div>

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="work-hero-sub mb-6"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/35">
            Our Work
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="work-hero-heading text-[clamp(3.5rem,10vw,8.5rem)] font-bold tracking-tight text-white leading-[0.95] max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Products built
          <br />
          <span className="text-white/25">to last.</span>
        </motion.h1>

        {/* Divider + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="work-hero-sub mt-8 flex items-center gap-6"
        >
          <div className="h-px w-12 bg-white/20" />
          <p className="text-sm md:text-base text-white/40 max-w-sm leading-relaxed">
            Web apps, mobile experiences, and CRM systems that move the needle
            for real businesses.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-6 w-px bg-gradient-to-b from-white/30 to-transparent" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-white/25">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── AGENCY STATS ── */}
      <section
        ref={statsRef}
        className="bg-[#050505] border-y border-white/[0.05] py-12 md:py-16 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/[0.06]">
          {AGENCY_STATS.map((stat, i) => (
            <div key={stat.label} className="md:px-10 first:pl-0 last:pr-0">
              <StatItem
                raw={stat.value}
                label={stat.label}
                delay={i * 0.1}
                inView={statsInView}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {featured.length > 0 && (
        <section className="bg-[#050505] pt-20 md:pt-28 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/35">
                Featured
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {featured.map((p) => (
                <FeaturedProject key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL PROJECTS ── */}
      <section className="bg-[#050505] pt-20 md:pt-28 pb-24 md:pb-36 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header + filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/35">
                All Projects
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
                Every project, every detail.
              </h2>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.35em] border transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))
              ) : (
                <div className="col-span-full py-24 text-center">
                  <p className="text-white/25 text-sm uppercase tracking-widest">
                    No projects in this category yet.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] border-t border-white/[0.05] py-24 md:py-36 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/35">
              Ready to build?
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Let's make your project next.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.35em] text-black transition-all duration-300 hover:bg-white/85"
            >
              Start a Project
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 transition-all duration-300 hover:border-white/25 hover:text-white"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}