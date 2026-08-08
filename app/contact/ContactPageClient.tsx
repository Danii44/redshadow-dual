"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import ContactEnhanced from '@/components/ContactEnhanced';

export default function ContactPageClient() {
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

      <main className="homepage-main relative z-10">

        {/* Page Header */}
        <section className="pt-32 pb-12 text-center px-4">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Connect</span>.
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            We're based in Islamabad, Pakistan — and we work with clients worldwide.
          </p>
        </section>

        {/* Contact Form & Info Section */}
        <ContactEnhanced />

        {/* Full-Width Map */}
        <div className="map-section w-full h-[45vh] md:h-[55vh] relative border-t border-white/10 overflow-hidden mt-16">
          <div className="map-fade-top absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none" />
          <div className="map-fade-bottom absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212872.0831904165!2d72.9831059!3d33.6844202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789d6d4a4c6e3f!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1722000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            className="map-iframe"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Red Shadow Designs Office — Islamabad, Pakistan"
          />
        </div>

      </main>
    </div>
  );
}
