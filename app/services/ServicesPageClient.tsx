"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServicesEnhanced from '@/components/ServicesEnhanced';
import ContactEnhanced from '@/components/ContactEnhanced';
import { useTheme } from '@/contexts/ThemeContext';

export default function ServicesPageClient() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = mounted && theme === 'light';

  const ambientStyle = {
    '--scroll-offset': `${Math.min(scrollY * 0.12, 120)}px`,
    '--scroll-rise': `${Math.min(scrollY * 0.08, 70)}px`,
  } as CSSProperties;

  return (
    <div className="homepage-shell" style={ambientStyle}>
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />

      <main className="homepage-main pt-[100px] md:pt-24 relative z-10">

        {/* Cinematic Hero Section for Services */}
        <section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/images/services/cad-1.webp"
              alt="Services Background"
              className={`w-full h-full object-cover ${isLight ? 'opacity-35 mix-blend-multiply' : 'opacity-20 mix-blend-screen'}`}
            />
            <div className="page-hero-overlay absolute inset-0" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className={`inline-block mb-6 px-4 py-1.5 rounded-full border uppercase tracking-[0.2em] text-[0.7rem] font-bold ${
              isLight
                ? 'border-[rgba(93,75,139,0.3)] bg-[rgba(93,75,139,0.08)] text-[#5D4B8B]'
                : 'border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#7c3aed]'
            }`}>
              Capabilities
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter ${
              isLight ? 'text-[#1e1830]' : 'text-white'
            }`}>
              Engineering &amp; <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5D4B8B] to-[#3E325D]">Design</span>.
            </h1>
            <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto ${
              isLight ? 'text-[#1e1830]/65' : 'text-white/60'
            }`}>
              From parametric CAD modeling and DFM analysis to high-fidelity product rendering, we provide end-to-end industrial design services.
            </p>
          </motion.div>
        </section>

        {/* The Core Services Grid */}
        <section className="py-12">
          <ServicesEnhanced />
        </section>

        {/* Methodology / Why Choose Us */}
        <section className={`py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t ${
          isLight ? 'border-[rgba(93,75,139,0.12)] bg-[rgba(93,75,139,0.02)]' : 'border-white/5 bg-white/[0.01]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tight ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>
                The Red Shadow <br /> Advantage
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${isLight ? 'text-[#1e1830]/65' : 'text-white/60'}`}>
                We provide a true end-to-end product development pipeline. Most agencies do either engineering or artistry, forcing you to manage multiple vendors. We do both under one roof. Our dual-disciplinary approach means the models we engineer for strict manufacturing standards are the exact same files we use to generate your product visualization materials.              </p>
              <ul className="space-y-4">
                {[
                  "End-to-End Product Pipeline",
                  "Rigorous FEA & CFD Simulation",
                  "Production-Ready STEP & STL Files",
                  "Seamless DFM (Design for Manufacturing) Handoff",
                  "99.9% Dimensional Accuracy",
                  "Studio-Grade Product Rendering"
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 ${isLight ? 'text-[#1e1830]/80' : 'text-white/80'}`}>
                    <span className={isLight ? 'text-[#5D4B8B]' : 'text-[#00d4ff]'}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative h-[400px] rounded-3xl overflow-hidden border ${
                isLight ? 'border-[rgba(93,75,139,0.2)]' : 'border-white/10'
              }`}
            >
              <img
                src="/assets/images/services/3d-viz-2.webp"
                alt="Engineering Accuracy"
                className="w-full h-full object-cover"
              />
              <div className="photo-card-overlay absolute inset-0" />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-white/5">
          <ContactEnhanced />
        </section>

      </main>
    </div>
  );
}
