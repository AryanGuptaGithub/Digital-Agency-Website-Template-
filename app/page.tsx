// app/page.tsx
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import HeroScroll from "@/components/hero-scroll";
import BrandStatement from "@/components/brand-statement";
// import YachtMorph from "@/components/yacht-morph";
import HorizontalShowcase from "@/components/horizontal-showcase";
import Experience from "@/components/experience";
import Globe from "@/components/globe";
import Charter from "@/components/charter";
import Footer from "@/components/footer";
import ProcessScroll from "@/components/process-scroll";
import LogoLoop from "@/components/LogoLoop";
import { techLogos } from "@/lib/logos";
import MagicBento from '@/components/MagicBento'




export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroScroll />
        <section className="bg-black py-20">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/40">
              Technologies We Work With
            </span>
          </div>
          <LogoLoop
  logos={techLogos}
  speed={70}
  direction="left"
  logoHeight={64}        // larger icons
  gap={80}               // comfortable spacing
  pauseOnHover
  scaleOnHover
  fadeOut
  fadeOutColor="#000000"
/>
        </section>

        <BrandStatement />
        <ProcessScroll />
       


         <HorizontalShowcase /> 
         <MagicBento 
  textAutoHide={true}
  enableStars
  enableSpotlight
  enableBorderGlow={true}
  enableTilt={false}
  enableMagnetism={false}
  clickEffect
  spotlightRadius={400}
  particleCount={12}
  glowColor="132, 0, 255"
  disableAnimations={false}
/>
           
        {/* <YachtMorph /> */}
        <Experience />
        <Globe />
        <Charter />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
