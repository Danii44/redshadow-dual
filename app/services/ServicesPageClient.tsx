"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServicesEnhanced from '@/components/ServicesEnhanced';
import ContactEnhanced from '@/components/ContactEnhanced';

export default function ServicesPageClient() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              src="https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2574&auto=format&fit=crop" 
              alt="Services Background" 
              className="w-full h-full object-cover opacity-10 mix-blend-lighten"
            />
            <div className="page-hero-overlay absolute inset-0" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#7c3aed] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
              Capabilities
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter">
              Engineering <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Unleashed</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto">
              From parametric CAD modeling to photorealistic cinematic rendering, we provide end-to-end industrial design services.
            </p>
          </motion.div>
        </section>

        {/* The Core Services Grid */}
        <section className="py-12">
          <ServicesEnhanced />
        </section>

        {/* Methodology / Why Choose Us */}
        <section className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                The Red Shadow <br /> Advantage
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Most agencies do either engineering or artistry. We do both. Our dual-disciplinary approach means that the models we build for your marketing materials are structurally sound enough to be sent directly to manufacturing.
              </p>
              <ul className="space-y-4">
                {[
                  "Production-Ready STEP & STL Files",
                  "99.9% Dimensional Accuracy",
                  "Cinematic Lighting & Texturing",
                  "Seamless DFM (Design for Manufacturing) Handoff"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <span className="text-[#00d4ff]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2670&auto=format&fit=crop" 
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
