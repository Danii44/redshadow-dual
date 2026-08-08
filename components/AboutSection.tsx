"use client";

import { motion } from 'framer-motion';
import './AboutSection.css';

export function AboutSection() {
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
          <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden group shadow-[0_0_40px_rgba(0,212,255,0.25)] border border-white/10"
            style={{ background: '#020509' }}>

            {/* High-Fidelity 3D Exploded Video Loop */}
            <video
              src="/assets/images/about-3d-exploded.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-95"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
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
            Red Shadow Designs is a top-rated engineering studio founded by <strong style={{ color: '#00d4ff' }}>Daniyal Ahmad</strong> in Islamabad, Pakistan. We specialise in precision CAD modeling, photorealistic 3D rendering, and industrial product design — delivering production-ready files and cinematic visuals for clients across the globe.
          </p>
          <p>
            From medical implants and mechanical assemblies to consumer products and hardware prototypes, we turn complex engineering concepts into assets that win investor pitches, power e-commerce listings, and drive product launches — with 99.9% dimensional accuracy and a 5.0-star track record on Fiverr.
          </p>
          <div className="about-values">
            <div className="about-value-card">
              <strong>500+ Projects</strong>
              <span>Successfully delivered globally.</span>
            </div>
            <div className="about-value-card">
              <strong>Top Rated</strong>
              <span>5.0 ⭐ on Fiverr. 90% repeat buyers.</span>
            </div>
            <div className="about-value-card">
              <strong>DFM Ready</strong>
              <span>STEP & STL files for direct manufacturing.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
