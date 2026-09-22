"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-primary/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
          <a
            href="#"
            className="font-serif text-xl tracking-wide text-ivory md:text-2xl"
          >
            SKIN STUDIO
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-body-muted transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:6072628566"
              className="hidden items-center gap-2 text-[13px] font-medium text-body-muted transition-colors duration-300 hover:text-ivory md:flex lg:hidden"
            >
              <Phone size={14} />
              607-262-8566
            </a>

            <a
              href="https://skinstudioithaca.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-rose px-6 py-2.5 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-hover md:inline-block"
            >
              Book Now
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="text-ivory lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-dark-primary/98 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col px-8 py-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl tracking-wide text-ivory">
                  SKIN STUDIO
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-ivory"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="mt-16 flex flex-1 flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-border-subtle py-5 font-serif text-3xl text-ivory transition-colors duration-300 hover:text-rose"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-4 pb-8">
                <a
                  href="https://skinstudioithaca.com/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-rose py-4 text-center font-sans text-[14px] font-semibold uppercase tracking-[0.12em] text-ivory"
                >
                  Book Now
                </a>
                <a
                  href="tel:6072628566"
                  className="flex items-center justify-center gap-2 py-2 font-sans text-[14px] text-body-muted"
                >
                  <Phone size={15} />
                  607-262-8566
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
