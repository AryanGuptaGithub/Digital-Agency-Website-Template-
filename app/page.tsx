// app/page.tsx
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import HeroScroll from "@/components/hero-scroll";
import BrandStatement from "@/components/brand-statement";
// import YachtMorph from "@/components/yacht-morph";
import Experience from "@/components/experience";
import Globe from "@/components/globe";
import Charter from "@/components/charter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroScroll />
        <BrandStatement />
        {/* <YachtMorph /> */}
        <Experience />
        <Globe />
        <Charter />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
