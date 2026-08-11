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

const loopedProjects = [...projects, ...projects, ...projects];

export default function PortfolioShowcase() {
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const contentWidthRef = useRef(0);
  const dragRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const trackContainer = trackContainerRef.current;
    const track = trackRef.current;
    if (!trackContainer || !track || !mounted) return;

    const isTouch =
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      window.matchMedia('(pointer: coarse)').matches;

    const updateTransform = (offset: number) => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const initializeSizes = () => {
      const fullWidth = track.scrollWidth;
      const singleWidth = fullWidth / 3;
      contentWidthRef.current = singleWidth;
      offsetRef.current = singleWidth;
      updateTransform(offsetRef.current);
    };

    const normalizeOffset = (rawOffset: number) => {
      const width = contentWidthRef.current;
      if (width <= 0) return rawOffset;

      let next = rawOffset;
      while (next < width * 0.25) next += width;
      while (next > width * 2.75) next -= width;
      return next;
    };

    const updateOffset = (rawOffset: number) => {
      const normalized = normalizeOffset(rawOffset);
      offsetRef.current = normalized;
      updateTransform(normalized);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      dragRef.current = true;
      startXRef.current = event.clientX;
      startOffsetRef.current = offsetRef.current;
      trackContainer.setPointerCapture(event.pointerId);
      trackContainer.classList.add('dragging');
      trackContainer.style.cursor = 'grabbing';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      event.preventDefault();
      const deltaX = event.clientX - startXRef.current;
      updateOffset(startOffsetRef.current - deltaX);
    };

    const endDrag = () => {
      if (!dragRef.current) return;
      dragRef.current = false;
      trackContainer.classList.remove('dragging');
      trackContainer.style.cursor = 'grab';
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        updateOffset(offsetRef.current + event.deltaY * 1.2);
      }
    };

    const onResize = () => {
      initializeSizes();
    };

    trackContainer.style.overflow = 'hidden';
    trackContainer.style.touchAction = 'pan-x';
    trackContainer.style.cursor = 'grab';

    initializeSizes();
    window.requestAnimationFrame(initializeSizes);

    trackContainer.addEventListener('pointerdown', onPointerDown);
    trackContainer.addEventListener('pointermove', onPointerMove);
    trackContainer.addEventListener('pointerup', endDrag);
    trackContainer.addEventListener('pointerleave', endDrag);
    trackContainer.addEventListener('pointercancel', endDrag);

    if (!isTouch) {
      trackContainer.addEventListener('wheel', onWheel, { passive: false });
    }
    window.addEventListener('resize', onResize);

    return () => {
      trackContainer.removeEventListener('pointerdown', onPointerDown);
      trackContainer.removeEventListener('pointermove', onPointerMove);
      trackContainer.removeEventListener('pointerup', endDrag);
      trackContainer.removeEventListener('pointerleave', endDrag);
      trackContainer.removeEventListener('pointercancel', endDrag);
      if (!isTouch) trackContainer.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      trackContainer.classList.remove('dragging');
      trackContainer.style.cursor = '';
      trackContainer.style.touchAction = '';
      trackContainer.style.overflow = '';
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
          <div ref={trackRef} className="portfolio-track">
            {loopedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
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