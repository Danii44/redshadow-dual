"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";

export default function SessionLoader() {
  const [showLoader, setShowLoader] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    // Hide scrollbar while loader is visible
    document.documentElement.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsFading(true);

      setTimeout(() => {
        setShowLoader(false);
        // Restore scrollbar after loader fully disappears
        document.documentElement.style.overflow = '';
      }, 800);

    }, 3000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = '';
    };
  }, []);

  // If it's not the first load, return null immediately so it doesn't block the screen
  if (!showLoader) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Loader Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Spinning Gear */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          >
            <Settings className="w-16 h-16 text-[#00d4ff] drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]" strokeWidth={1.5} />
          </motion.div>
          
          {/* Pulsing Rings */}
          <motion.div 
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="absolute -inset-4 border border-[rgba(0,212,255,0.2)] rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="absolute -inset-6 border border-[rgba(124,58,237,0.2)] rounded-full" 
          />
        </div>
      </motion.div>
    </div>
  );
}
