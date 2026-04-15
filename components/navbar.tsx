"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#features" },
  { label: "Work", href: "/#destinations" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setVisible(true);
      return;
    }

    const heroEl = document.getElementById("hero");
    const onScroll = () => {
      if (!heroEl) {
        setVisible(true);
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      const scrollable = heroEl.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setVisible(progress >= 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (!isHomePage && href.startsWith("/#")) {
      // If we're not on homepage, navigate to homepage first, then scroll
      window.location.href = href;
      return;
    }
    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Otherwise, let Next.js Link handle it
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-black/20 backdrop-blur-md"
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex items-center">
            <img
              // src="https://www.zapsolutionz.com/ZAP%20WMS%20R.png"
              src="https://res.cloudinary.com/dxwoomfzw/image/upload/v1776238306/Zap-Solutionz_new_zowejc.png"
              alt="Zap Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="group relative px-6 py-2 text-[11px] font-bold tracking-[0.25em] uppercase text-white transition-colors duration-500 hover:text-white/80 hover:tracking-[0.3em]"
              >
                {link.label}
                <span className="absolute bottom-1 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 9, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={
                menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 0.5, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -9, width: 24 }
                  : { rotate: 0, y: 0, width: 16 }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="block h-px bg-white self-end"
              style={{ width: menuOpen ? 24 : 16 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="py-4 text-3xl font-light tracking-[0.25em] uppercase text-white/80 transition-colors duration-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="mt-10 h-px w-12 bg-white/15"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}