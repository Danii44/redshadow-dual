"use client";

/**
 * HeroModelSection.tsx - Full-Screen Hero with GLB Model
 * 
 * Features:
 * - Full-screen immersive 3D model display
 * - Interactive scroll indicator
 * - Mobile responsive
 */

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import './HeroModelSection.css';

const GLBModelViewer = dynamic(() => import('@/components/GLBModelViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[500px]" />,
});

export function HeroModelSection() {
  return (
    <section id="home" className="hero-model-section">
      <div className="hero-overlay-top" />
      <div className="hero-background-glow" />

      {/* Floating 3D Model Display */}
      <div className="model-container">
        <GLBModelViewer />
      </div>

      <motion.div
        className="scroll-indicator-hero"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => {
          const el = document.getElementById('about');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14m0 0l-7-7m7 7l7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}

export default HeroModelSection;
