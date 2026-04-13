"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const menuItems = [
  { name: "About", href: "#about" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "#contact" },
  { name: "More", href: "#more" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to change header color
  useEffect(() => {
    const handleScroll = () => {
      // If we scroll past 100px (entering the Intro section), switch to light header
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const headerTextColor = isScrolled ? "text-black" : "text-white";
  const headerBarBg = isScrolled ? "bg-black" : "bg-white";
  const logoInvert = isScrolled ? "" : "invert";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[9999] p-6 md:p-10 flex justify-between items-center transition-all duration-500`}>
        {/* Logo */}
        <Link href="/" className="block">
          <img 
            src="/main-logo-bk.png" 
            alt="tdtt" 
            className={`h-7 md:h-9 lg:h-12 w-auto transition-all duration-500 ${logoInvert}`}
          />
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <span className={`text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 ${headerTextColor}`}>
            Menu
          </span>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className={`w-6 h-[2px] transition-all group-hover:w-4 duration-500 ${headerBarBg}`} />
            <div className={`w-6 h-[2px] transition-all duration-500 ${headerBarBg}`} />
          </div>
        </button>
      </header>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
          >
            {/* Header in overlay */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center">
              <Link href="/" className="block" onClick={() => setIsOpen(false)}>
                <img 
                  src="/main-logo-bk.png" 
                  alt="tdtt" 
                  className="h-7 md:h-9 lg:h-12 w-auto invert"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                  Menu
                </span>
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                  <X className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col items-center gap-6 md:gap-10">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1] as any,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-8xl font-bold text-white hover:text-gray-400 transition-colors tracking-tight"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
