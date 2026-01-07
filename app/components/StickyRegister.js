"use client";

import { useState, useEffect } from "react";
import TrackedLink from "./TrackedLink";

export default function StickyRegister({ href = "/register", label = "Register Now" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-custom-black border-t border-black/10 dark:border-white/10 shadow-lg p-4 animate-in slide-in-from-bottom duration-300">
      <TrackedLink
        href={href}
        category="navigation"
        label={`${label} (Sticky Mobile)`}
        className="block w-full text-center bg-custom-black text-white dark:bg-beige dark:text-custom-black px-6 py-4 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta active:scale-95"
      >
        {label}
      </TrackedLink>
    </div>
  );
}

