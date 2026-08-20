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
      <div className="model-container" aria-hidden="true">
        <GLBModelViewer />
      </div>

      <div className="hero-content-shell">
        <div className="hero-eyebrow"><span className="hero-status-dot" /> Available for select projects</div>
        <h1>Engineering ideas into <em>real</em> products.</h1>
        <p>Precision CAD, product visualization, and industrial design for teams building what comes next.</p>
        <div className="hero-actions">
          <a className="hero-primary-action" href="#contact">Start a project <span aria-hidden="true">↗</span></a>
          <a className="hero-secondary-action" href="#portfolio">View selected work <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-proof-row" aria-label="Studio capabilities">
          <span>CAD &amp; DFM</span><span>3D visualization</span><span>Worldwide delivery</span>
        </div>
      </div>

      <motion.button
        type="button"
        className="scroll-indicator-hero"
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Scroll to explore</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </section>
  );
}

export default HeroModelSection;
