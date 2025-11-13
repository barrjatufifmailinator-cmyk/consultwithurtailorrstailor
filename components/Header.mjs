"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don’t render anything until mounted — prevents hydration flicker/double text
  if (!isMounted) return null;

  // Move these inside the “mounted” phase
  const { scrollY } = useScroll();
  const blurAmount = useTransform(scrollY, [0, 300], ["blur(0px)", "blur(12px)"]);
  const opacity = useTransform(scrollY, [0, 300], [0.4, 0.9]);

  return (
    <motion.header
      style={{
        backdropFilter: blurAmount,
        WebkitBackdropFilter: blurAmount,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        opacity,
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <motion.h1
          className="text-xl md:text-2xl font-semibold tracking-wide text-[#800020]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          URTAILORSTAILOR
        </motion.h1>

        {/* Nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {["about", "services", "booking", "contact"].map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className={`transition-colors duration-300 ${
                isScrolled ? "text-[#800020]" : "text-white"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
