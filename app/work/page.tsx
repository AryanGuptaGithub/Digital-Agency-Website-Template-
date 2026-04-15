// app/work/page.tsx
import type { Metadata } from "next";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WorkPage from "./WorkPage";

export const metadata: Metadata = {
  title: "Our Work | Zap Solutionz",
  description:
    "Explore the web apps, mobile products, and CRM systems we've built for clients worldwide.",
};

export default function Work() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-[#050505]">
        <WorkPage />
      </main>
      <Footer />
    </SmoothScroll>
  );
}