"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { projects } from '@/lib/projects';
import './Portfolio.css';

const impactItems = [
  {
    value: '4.9/5',
    label: 'Client Rating',
    detail: 'Average score from 120+ verified client reviews.',
  },
  {
    value: '+65%',
    label: 'Engagement Lift',
    detail: 'Conversion increases from interface refreshes and UX-driven visual storytelling.',
  },
  {
    value: '24h',
    label: 'Rapid Turnaround',
    detail: 'Fast prototyping and iteration cycles for concept-to-delivery momentum.',
  },
];

export default function PortfolioShowcase() {
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const trackContainer = trackContainerRef.current;
    if (!trackContainer || !mounted) return;

    const isTouch =
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      window.matchMedia('(pointer: coarse)').matches;

    trackContainer.style.overflowX = 'auto';
    trackContainer.style.overflowY = 'hidden';
    trackContainer.style.scrollBehavior = 'smooth';
    trackContainer.style.touchAction = 'pan-x';
    (trackContainer.style as any).webkitOverflowScrolling = 'touch';
    trackContainer.classList.add('portfolio-track-scrollable');

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isDragging = true;
      startX = event.clientX;
      scrollStart = trackContainer.scrollLeft;
      trackContainer.setPointerCapture(event.pointerId);
      trackContainer.classList.add('dragging');
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = event.clientX - startX;
      trackContainer.scrollLeft = scrollStart - deltaX;
    };

    const endDrag = () => {
      isDragging = false;
      trackContainer.classList.remove('dragging');
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        trackContainer.scrollLeft += event.deltaY;
      }
    };

    trackContainer.addEventListener('pointerdown', onPointerDown);
    trackContainer.addEventListener('pointermove', onPointerMove);
    trackContainer.addEventListener('pointerup', endDrag);
    trackContainer.addEventListener('pointerleave', endDrag);
    trackContainer.addEventListener('pointercancel', endDrag);

    if (!isTouch) {
      trackContainer.addEventListener('wheel', onWheel, { passive: false });
    }

    return () => {
      trackContainer.removeEventListener('pointerdown', onPointerDown);
      trackContainer.removeEventListener('pointermove', onPointerMove);
      trackContainer.removeEventListener('pointerup', endDrag);
      trackContainer.removeEventListener('pointerleave', endDrag);
      trackContainer.removeEventListener('pointercancel', endDrag);
      if (!isTouch) trackContainer.removeEventListener('wheel', onWheel);
      trackContainer.classList.remove('portfolio-track-scrollable', 'dragging');
    };
  }, [mounted]);

  const activeTheme = mounted ? theme : 'dark';

  return (
    <section id="portfolio" className={`portfolio-section ${activeTheme}`}>
      <div className="portfolio-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="portfolio-pill">Portfolio</span>
          <h2 className="section-title">Crafted deliverables with impact</h2>
          <p className="section-subtitle">
            High-fidelity CAD models, product visuals and motion-ready concepts designed to impress stakeholders and accelerate decisions.
          </p>
        </motion.div>

        <div ref={trackContainerRef} className="portfolio-track-container">
          <div className="portfolio-track">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="portfolio-card"
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Link href={`/portfolio/${project.id}`} className="block h-full">
                  <div className="portfolio-image-placeholder">
                    <img src={project.image} alt={project.title} className="portfolio-card-img" />
                  </div>
                  <div className="portfolio-content">
                    <span className="portfolio-category">{project.category}</span>
                    <h3 className="portfolio-card-title">{project.title}</h3>
                    <p className="portfolio-description">{project.description}</p>
                  </div>
                </Link>
                <div className="portfolio-glow" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="proven-impact-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="proven-impact-header">
            <span className="portfolio-pill">Proven Impact</span>
            <h3 className="portfolio-impact-title">Results that feel as polished as the experience.</h3>
            <p className="portfolio-impact-copy">
              Our work combines aesthetic clarity with functional engineering to deliver confident digital experiences and stronger product storytelling.
            </p>
          </div>

          <div className="impact-cards">
            {impactItems.map((item) => (
              <div key={item.label} className="impact-card">
                <span className="impact-label">{item.label}</span>
                <h4 className="impact-value">{item.value}</h4>
                <p className="impact-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}