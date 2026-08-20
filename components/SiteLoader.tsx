"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

export default function SiteLoader() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      setIsLoading(false);
    };

    window.addEventListener('glb:ready', finish, { once: true });
    const fallbackTimer = window.setTimeout(finish, 1600);

    return () => {
      window.removeEventListener('glb:ready', finish);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${isLight ? 'bg-white text-slate-900' : 'bg-[#02040a] text-white'} overflow-hidden`}
        >
          {/* Radial Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent_25%),radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_40%)]" />

          {/* Loader Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col items-center gap-6 p-10 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl ${isLight ? 'border border-slate-200 bg-white/95' : 'border border-[rgba(0,212,255,0.25)] bg-[rgba(4,8,16,0.7)]'}`}
          >
            {/* Spinning Gear */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              >
                <Settings className={`w-16 h-16 ${isLight ? 'text-[#7c3aed]' : 'text-[#00d4ff]'} drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]`} strokeWidth={1.5} />
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

            {/* Loading Text */}
            <div className="flex flex-col items-center mt-4">
              <p className={`${isLight ? 'text-slate-600' : 'text-white/80'} text-xs font-mono uppercase tracking-[0.3em]`}>
                Initializing
              </p>
              <div className="mt-3 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
