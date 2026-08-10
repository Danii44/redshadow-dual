"use client";

/**
 * HeroModelSection.tsx - Full-Screen Hero with GLB Model
 * 
 * Features:
 * - Full-screen immersive 3D model display
 * - Modal prompt for the hero experience
 * - Glassmorphism info panel with action buttons
 * - Mobile responsive
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import GLBModelViewer from '@/components/GLBModelViewer';
import { ManusDialog } from '@/components/ManusDialog';
import './HeroModelSection.css';


export function HeroModelSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="home" className="hero-model-section">
      <div className="hero-overlay-top" />
      <div className="hero-background-glow" />

      {/* Floating 3D Model Display ONLY */}
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

      <ManusDialog
        title="Launch the Red Shadow demo"
        logo="/assets/logo.png"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onLogin={() => setIsDialogOpen(false)}
      />
    </section>
  );
}

export default HeroModelSection;
