"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import all sections with ssr:false — this is the permanent fix
// for the removeChild hydration mismatch crash on mobile.
// SSR renders nothing for these; client mounts them cleanly after hydration.
const HeroModelSection   = dynamic(() => import('@/components/HeroModelSection'),    { ssr: false });
const AboutSection       = dynamic(() => import('@/components/AboutSection'),         { ssr: false });
const VideoSection       = dynamic(() => import('@/components/VideoSection'),         { ssr: false });
const ServicesEnhanced     = dynamic(() => import('@/components/ServicesEnhanced'),     { ssr: false });
const ClientMarqueeSection = dynamic(() => import('@/components/ClientMarqueeSection'), { ssr: false });
const PortfolioShowcase    = dynamic(() => import('@/components/PortfolioShowcase'),    { ssr: false });
const ProcessSection       = dynamic(() => import('@/components/ProcessSection'),       { ssr: false });
const FAQSection           = dynamic(() => import('@/components/FAQSection'),           { ssr: false });
const ContactEnhanced      = dynamic(() => import('@/components/ContactEnhanced'),      { ssr: false });

export default function Page() {
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      if (window.location.hash === '#portfolio') {
        const section = document.getElementById('portfolio');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="homepage-shell">
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />

      <main className="homepage-main">
        <HeroModelSection />
        <AboutSection />
        <VideoSection />
        <ServicesEnhanced />
        <ClientMarqueeSection />
        <PortfolioShowcase />
        <ProcessSection />
        <FAQSection />
        <ContactEnhanced />
      </main>
    </div>
  );
}
