"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

export default function SessionLoader() {
  const { theme } = useTheme();
  // Defer theme read until after hydration to avoid SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  const isLight = mounted && theme === 'light';
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Lock scroll while loading
    document.documentElement.style.overflow = 'hidden';

    const MIN_DISPLAY_MS = 1200; // always show for at least 1.2s so the animation isn't jarring
    const MAX_DISPLAY_MS = 8000; // safety cap — never block longer than 8s
    const startTime = Date.now();

    let progressInterval: ReturnType<typeof setInterval>;
    let maxTimer: ReturnType<typeof setTimeout>;

    const dismiss = () => {
      clearInterval(progressInterval);
      clearTimeout(maxTimer);
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      // Animate to 100% then fade out
      setProgress(100);
      setTimeout(() => {
        setShowLoader(false);
        document.documentElement.style.overflow = '';
      }, remaining + 400); // +400ms for the fill animation to complete
    };

    // Simulate realistic progress ticking (fast at start, slow near end)
    let tick = 0;
    progressInterval = setInterval(() => {
      tick += 1;
      setProgress(prev => {
        // Exponential ease-out: fast at start, approaches 90% asymptotically
        const next = prev + (90 - prev) * 0.07;
        return Math.min(next, 90);
      });
    }, 120);

    // Safety max timer
    maxTimer = setTimeout(dismiss, MAX_DISPLAY_MS);

    // Track real page readiness
    const checkReady = () => {
      if (document.readyState === 'complete') {
        dismiss();
      }
    };

    if (document.readyState === 'complete') {
      // Page already loaded — still respect MIN_DISPLAY_MS
      dismiss();
    } else {
      document.addEventListener('readystatechange', checkReady);
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(maxTimer);
      document.removeEventListener('readystatechange', checkReady);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="session-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${isLight ? 'bg-white text-slate-900' : 'bg-[#02040a] text-white'} overflow-hidden`}
      >
        {/* Radial ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,212,255,0.08), transparent 70%), radial-gradient(ellipse 40% 60% at 50% 50%, rgba(124,58,237,0.1), transparent 70%)',
          }}
        />

        {/* Logo + brand */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          {/* Spinning Gear & Rings */}
          <div className="relative mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            >
              <Settings className={`w-14 h-14 ${isLight ? 'text-[#7c3aed]' : 'text-[#00d4ff]'} drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]`} strokeWidth={1.5} />
            </motion.div>
            
            {/* Pulsing Rings */}
            <motion.div 
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="absolute -inset-4 border border-[rgba(0,212,255,0.2)] rounded-full pointer-events-none" 
            />
            <motion.div 
              animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="absolute -inset-6 border border-[rgba(124,58,237,0.2)] rounded-full pointer-events-none" 
            />
          </div>

          {/* Logo below gear (smaller) */}
          <motion.img
            src="/assets/logo.png"
            alt="Red Shadow Designs"
            className="w-8 h-8 object-contain"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Brand name */}
          <div className="flex flex-col items-center gap-1 mt-2">
            <span
              className="text-sm font-bold uppercase tracking-[0.35em]"
              style={{ color: isLight ? '#1e1830' : '#ffffff' }}
            >
              Red Shadow Designs
            </span>
            <span
              className="text-[0.65rem] uppercase tracking-[0.25em]"
              style={{ color: isLight ? '#7c3aed' : '#00d4ff' }}
            >
              Loading assets…
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="w-48 h-[2px] rounded-full overflow-hidden"
            style={{ background: isLight ? 'rgba(124,58,237,0.15)' : 'rgba(0,212,255,0.15)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: isLight
                  ? 'linear-gradient(90deg, #7c3aed, #00d4ff)'
                  : 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                transition: 'width 0.12s linear',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
