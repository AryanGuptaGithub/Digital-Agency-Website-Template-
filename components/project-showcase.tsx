"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltedCard from "@/components/tilted-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  stats?: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Cinecms",
    category: "Media Managing Platform",
    year: "2024",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/cinecms_dl9wvb.png",
    stats: [
      { label: "TVL", value: "$1.2B" },
      { label: "Users", value: "250K+" },
    ],
  },
  {
    id: 2,
    title: "Movement Creation",
    category: "Media Managing Platform",
    year: "2024",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/movementcreation_t8zepe.png",
    stats: [
      { label: "Consultations", value: "1M+" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    id: 3,
    title: "Tradingwala",
    category: "Trading Stimulation",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152994/tradingwala_olswqn.png",
    stats: [
      { label: "Data Points", value: "5B+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    id: 4,
    title: "Link-n-Smile",
    category: "E-commerce Website",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/linkn-smile_xfvwm9.png",
    stats: [
      { label: "Artisans", value: "5K+" },
      { label: "Products", value: "50K+" },
    ],
  },
  
  {
    id: 6,
    title: "Quickscan",
    category: "Appointment Booking Platform",
    year: "2024",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/quickscan_epd5xc.png",
    stats: [
      { label: "TVL", value: "$1.2B" },
      { label: "Users", value: "250K+" },
    ],
  },
  {
    id: 7,
    title: "Instapeel",
    category: "Beauty E-commerce",
    year: "2024",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152992/instapeels_jorkvk.png",
    stats: [
      { label: "Consultations", value: "1M+" },
      { label: "Rating", value: "4.9" },
    ],
  },
  {
    id: 8,
    title: "Society CRM",
    category: "Trading Stimulation",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152991/admin_healthcare_asia_zme062.png",
    stats: [
      { label: "Data Points", value: "5B+" },
      { label: "Latency", value: "<50ms" },
    ],
  },
  {
    id: 9,
    title: "HealthcareCambodia CRM",
    category: "Fertilizers Website",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152991/Healthcare_Asia_d0o7dh.png",
    stats: [
      { label: "Bookings", value: "$45M" },
      { label: "Destinations", value: "80+" },
    ],
  },
  {
    id: 10,
    title: "Dev Associates",
    category: "Society Management Company",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/devaccounts_alsnvp.png",
    stats: [
      { label: "Energy Saved", value: "20GWh" },
      { label: "CO₂ Reduced", value: "8K tons" },
    ],
  },
  {
    id: 11,
    title: "Prevago",
    category: "Medicine",
    year: "2024",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152993/prevego_bsfhd2.png",
    stats: [
      { label: "TVL", value: "$800M" },
      { label: "APY", value: "12%" },
    ],
  },
  {
    id: 12,
    title: "Samsom Orgo",
    category: "Fertilizers Website",
    year: "2023",
    image: "https://res.cloudinary.com/dxwoomfzw/image/upload/v1776152994/samson-orgo_tq5iy1.png",
    stats: [
      { label: "Bookings", value: "$45M" },
      { label: "Destinations", value: "80+" },
    ],
  },
  
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Wait for all images inside the wrapper to load
  useEffect(() => {
    if (isMobile) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const images = Array.from(wrapper.querySelectorAll("img"));
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });

    // Fallback in case some images never fire load
    const timeout = setTimeout(() => setImagesLoaded(true), 3000);
    return () => clearTimeout(timeout);
  }, [isMobile]);

  // GSAP Horizontal Scroll – only runs when images are loaded
  useEffect(() => {
    if (isMobile || !imagesLoaded) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    // Clean up old ScrollTriggers on this section
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === section) st.kill();
    });

    // Reset transform
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
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(wrapper, {
      x: -scrollDistance,
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
      if (wrapper) wrapper.style.transform = "";
    };
  }, [isMobile, imagesLoaded]);

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <section className="relative bg-black py-16">
        <div className="px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
              Featured Work
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white">
              Projects we're proud of
            </h2>
          </div>
          <div className="flex flex-col space-y-6">
            {PROJECTS.map((project) => (
              <TiltedCard
                key={project.id}
                imageSrc={project.image}
                altText={project.title}
                captionText={`${project.category} · ${project.year}`}
                containerHeight="400px"
                containerWidth="100%"
                rotateAmplitude={4}
                scaleOnHover={1.02}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    {project.stats && (
                      <div className="flex gap-4 mt-2">
                        {project.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="text-lg font-bold text-white">
                              {stat.value}
                            </span>
                            <span className="text-xs text-white/50 ml-1">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Horizontal scroll
  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute left-0 right-0 top-12 z-10 px-6 md:px-12 lg:px-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
          Featured Work
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Projects we're proud of
        </h2>
      </div>

      <div className="h-screen w-full overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex h-full w-max flex-nowrap items-center"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="h-full w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] xl:w-[24vw] flex-shrink-0 px-2 first:pl-4 last:pr-4"
            >
              <div className="h-full flex items-center">
                <TiltedCard
                  imageSrc={project.image}
                  altText={project.title}
                  captionText={`${project.category} · ${project.year}`}
                  containerHeight="55vh"
                  containerWidth="100%"
                  rotateAmplitude={6}
                  scaleOnHover={1.02}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 border-2 p-4 flex justify-center align-center rounded-xl backdrop-blur-md">
                        {project.title}
                      </h3>
                      {project.stats && (
                        <div className="flex flex-wrap gap-3 md:gap-4 mt-2">
                          {project.stats.map((stat) => (
                            <div key={stat.label}>
                              <span className="text-lg md:text-xl font-bold text-white">
                                {stat.value}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider text-white/50 ml-1">
                                {stat.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}