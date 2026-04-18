"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/#features",
    dropdown: [
      { label: "Cloud Support Services", href: "/services/cloud" },
      { label: "Mobile App Development", href: "/services/mobile" },
      { label: "Web App Development", href: "/services/web" },
      { label: "CRM Development", href: "/services/crm" },
      { label: "Responsive Design", href: "/services/design" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Fix hover flicker
  let timeout: NodeJS.Timeout;

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
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-black/20 backdrop-blur-md"
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dxwoomfzw/image/upload/v1776238986/Zap-Solutionz_2_ypw7bt.png"
              alt="Zap Logo"
              className="h-15 w-auto"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  clearTimeout(timeout);
                  setActiveDropdown(link.label);
                }}
                onMouseLeave={() => {
                  timeout = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 150);
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="group relative px-6 py-2 text-[11px] font-bold tracking-[0.25em] uppercase text-white transition-all duration-500 hover:text-white/80 hover:tracking-[0.3em]"
                >
                  {link.label}
                  {link.dropdown && <span className="ml-2 text-xs">▾</span>}

                  <span className="absolute bottom-1 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </Link>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 top-full mt-4 w-64 rounded-xl border border-white/10 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-xl shadow-xl"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => handleLinkClick(item.href)}
                          className="block px-6 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 0.5 }}
              className="block h-px w-6 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="py-4 text-3xl text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}