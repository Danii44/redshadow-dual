"use client";

import { motion } from 'framer-motion';
import './AboutSection.css';
import CTA from './ui/CTA';

const stats = [
  { value: '100+', label: 'Products Delivered' },
  { value: '800+', label: 'Projects Completed' },
  { value: '550+', label: 'Happy Clients' },
  { value: '4.9★', label: 'Star Rating' },
];

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-background-glow" />

      <div className="about-inner">
        {/* ── HEADER ── */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="about-pill">About Red Shadow Designs</span>
          <h2 className="about-heading">
            From precise CAD to{' '}
            <span className="about-heading-accent">production-ready</span> parts
          </h2>
          <p className="about-subtitle">
            A top-rated engineering studio bridging concept and production — delivering manufacturing-ready files and photorealistic visuals for product teams worldwide.
          </p>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="about-bento-grid">

          {/* Main Content Card (Left Span) */}
          <motion.div
            className="about-card main-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="main-card-content">
              <h3>Engineering Excellence</h3>
              <p>
                Red Shadow Designs is a top-rated engineering studio specializing in precision 3D CAD modeling, photorealistic rendering, and DFM-optimized industrial design. We bridge the gap between initial concept and final production—delivering manufacturing-ready files and high-fidelity visualization for product teams and hardware startups.
              </p>
              <p>
                From complex mechanical assemblies and medical devices to consumer hardware prototypes, we engineer solutions with strict adherence to ASME standards and GD&T practices. We turn your concepts into assets that win investor pitches, power e-commerce listings, and ensure a seamless handoff to your manufacturing partners—backed by strict dimensional accuracy standards and a proven 4.9-star track record.
              </p>

              <div className="about-trust-badges mt-6">
                {['ASME Standards', 'GD&T Compliant', 'DFM Optimised', 'NDA Ready'].map((badge) => (
                  <span key={badge} className="about-trust-badge">{badge}</span>
                ))}
              </div>

              <div className="mt-8">
                <CTA href="/contact">Start your project</CTA>
              </div>
            </div>

            <div className="main-card-bg-glow" />
          </motion.div>

          {/* Top Right: Video Card */}
          <motion.div
            className="about-card image-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <video
              src="/assets/images/about-3d-exploded.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/images/video-thumbnail.webp"
              preload="none"
            />

          </motion.div>

          {/* Bottom Right: Stats Grid */}
          <motion.div
            className="about-card stats-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={s.label} className="stat-box">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;
