"use client";

import { motion } from 'framer-motion';
import './AboutSection.css';
import { useTheme } from '@/contexts/ThemeContext';
import CTA from './ui/CTA';

export function AboutSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <section className="about-section" id="about">
      <div className="about-background-glow" />

      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* ORBAI Spherical Tech Drone 3D Exploded MP4 Video Container */}
          <div className={`about-video-card relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden group shadow-[0_0_40px_rgba(0,212,255,0.25)] border`} style={{ background: isLight ? '#f7f5fb' : '#020509' }}>

            {/* High-Fidelity 3D Exploded Video Loop */}
            <video
              src="/assets/images/about-3d-exploded.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-95"
            />

            {/* Subtle Gradient Overlay (theme-aware via CSS) */}
            <div className="about-video-overlay absolute inset-0 pointer-events-none z-10" />
          </div>

          <div className="about-image-glow" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
          viewport={{ once: true }}
        >
          <span className="section-label">About Red Shadow Designs</span>
          <h2>Where engineering precision meets cinematic excellence</h2>
          <p>
            Red Shadow Designs is a top-rated engineering studio specializing in precision 3D CAD modeling, photorealistic rendering, and DFM-optimized industrial design. We bridge the gap between initial concept and final production—delivering manufacturing-ready files and cinematic visuals for innovators and established brands.
          </p>
          <p>
            From complex mechanical assemblies and medical devices to consumer hardware prototypes, we engineer solutions with strict adherence to ASME standards and GD&T practices. We turn your concepts into assets that win investor pitches, power e-commerce listings, and ensure a seamless handoff to your manufacturing partners—backed by a 99.9% dimensional accuracy guarantee and a flawless 5.0-star track record.
          </p>
          <div className="about-ctas mt-6">
            <CTA href="/contact">Get in touch</CTA>
          </div>
          <div className="about-values">
            <div className="about-value-card">
              <strong>100+ Products</strong>
              <span>Successfully delivered to clients globally, from startup prototypes to enterprise hardware.</span>
            </div>
            <div className="about-value-card">
              <strong>800+ Projects</strong>
              <span>Across industries — product development, medical devices, and consumer hardware.</span>
            </div>
            <div className="about-value-card">
              <strong>550+ Clients</strong>
              <span>Different clients served worldwide, from founders to enterprise teams.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
