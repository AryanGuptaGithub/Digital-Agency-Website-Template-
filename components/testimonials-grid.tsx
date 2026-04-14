"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}


gsap.registerPlugin(ScrollTrigger);

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

export default function TestimonialsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: false,
            once: true,
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 ">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Trusted by industry leaders
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="testimonial-card rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20"
            >
              <div className="mb-4 text-4xl text-white/10">“</div>
              <p className="text-white/80">{item.quote}</p>
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
      </div>
    </section>
  );
}