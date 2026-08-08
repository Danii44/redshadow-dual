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

            {/* Subtle Gradient & Scan line Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

            {/* Laser Line Scanning Effect */}
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent shadow-[0_0_15px_#00d4ff] z-20 pointer-events-none"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Technical Telemetry Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[rgba(0,212,255,0.4)] z-30">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
              <span className="text-[0.68rem] font-mono text-[#00d4ff] uppercase tracking-widest font-bold">
                ORBEI // Exploded 3D Render Video
              </span>
            </div>

            <div className="absolute top-6 right-6 text-right hidden sm:block z-30">
              <div className="text-[0.6rem] font-mono text-white/50 uppercase">Rendering Fidelity</div>
              <div className="text-xs font-mono text-green-400 font-bold">60 FPS Photorealistic</div>
            </div>

            {/* Corner HUD Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00d4ff]/70 rounded-tl-md pointer-events-none z-30" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#7c3aed]/70 rounded-tr-md pointer-events-none z-30" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#7c3aed]/70 rounded-bl-md pointer-events-none z-30" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00d4ff]/70 rounded-br-md pointer-events-none z-30" />

            {/* Status Badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.4)] bg-black/90 backdrop-blur-md text-[#00d4ff] text-[0.65rem] font-mono uppercase tracking-widest whitespace-nowrap z-30 flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              3D Parametric Exploded Video Loop · Red Shadow Designs
            </div>
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
