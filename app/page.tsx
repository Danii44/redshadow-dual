"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroModelSection from '@/components/HeroModelSection';
import AboutSection from '@/components/AboutSection';
import VideoSection from '@/components/VideoSection';
import ServicesEnhanced from '@/components/ServicesEnhanced';
import ClientMarqueeSection from '@/components/ClientMarqueeSection';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import ProcessSection from '@/components/ProcessSection';
import FAQSection from '@/components/FAQSection';
import ContactEnhanced from '@/components/ContactEnhanced';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      // Only auto-scroll to the portfolio anchor on initial load when the page is at the top
      // and the user hasn't recently interacted (wheel/touch) which indicates manual scrolling.
      const lastInteraction = (window as any).__lastUserInteraction || 0;
      if (window.location.hash === '#portfolio' && window.scrollY < 50 && Date.now() - lastInteraction > 300) {
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
