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
    detail: 'Average score from 550+ verified client reviews.',
  },
  {
    value: '+65%',
    label: 'Engagement Lift',
    detail: 'Conversion increases from interface refreshes and UX-driven visual storytelling.',
  },
  {
    value: '3D print-ready files',
    label: 'Rapid Prototyping',
    detail: 'Files for rapid prototyping and fast turn around time.',
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

    // ─── Mouse / Stylus (pointer events) ───────────────────────────────────
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return; // handled by touch events below
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
      if (event.pointerType === 'touch') return;
      if (!dragRef.current) return;
      event.preventDefault();
      const deltaX = event.clientX - startXRef.current;
      updateOffset(startOffsetRef.current - deltaX);
    };

    const endPointerDrag = () => {
      if (!dragRef.current) return;
      dragRef.current = false;
      trackContainer.classList.remove('dragging');
      trackContainer.style.cursor = 'grab';
    };

    // ─── Touch events (mobile) ──────────────────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartOffset = 0;
    let isHorizontalSwipe: boolean | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartOffset = offsetRef.current;
      isHorizontalSwipe = null;
      dragRef.current = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragRef.current) return;
      const touch = event.touches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;

      // Determine swipe direction on the first significant movement
      if (isHorizontalSwipe === null) {
        if (Math.abs(dx) > Math.abs(dy) + 4) {
          isHorizontalSwipe = true;
        } else if (Math.abs(dy) > Math.abs(dx) + 4) {
          isHorizontalSwipe = false;
        }
      }

      if (isHorizontalSwipe) {
        event.preventDefault(); // only prevent scroll when clearly swiping horizontally
        updateOffset(touchStartOffset - dx);
      }
    };

    const onTouchEnd = () => {
      dragRef.current = false;
      isHorizontalSwipe = null;
    };

    const onResize = () => {
      initializeSizes();
    };

    trackContainer.style.overflow = 'hidden';
    trackContainer.style.touchAction = 'pan-y'; // allow vertical page scroll; we handle horizontal ourselves
    trackContainer.style.cursor = 'grab';

    initializeSizes();
    window.requestAnimationFrame(initializeSizes);

    let animationFrameId: number;
    const autoScrollSpeed = 0.5;

    const loop = () => {
      if (!dragRef.current) {
        updateOffset(offsetRef.current + autoScrollSpeed);
      }
      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);

    trackContainer.addEventListener('pointerdown', onPointerDown);
    trackContainer.addEventListener('pointermove', onPointerMove);
    trackContainer.addEventListener('pointerup', endPointerDrag);
    trackContainer.addEventListener('pointerleave', endPointerDrag);
    trackContainer.addEventListener('pointercancel', endPointerDrag);

    // Touch listeners need passive:false so we can call preventDefault on horizontal swipes
    trackContainer.addEventListener('touchstart', onTouchStart, { passive: true });
    trackContainer.addEventListener('touchmove', onTouchMove, { passive: false });
    trackContainer.addEventListener('touchend', onTouchEnd, { passive: true });
    trackContainer.addEventListener('touchcancel', onTouchEnd, { passive: true });

    window.addEventListener('resize', onResize);

    return () => {
      trackContainer.removeEventListener('pointerdown', onPointerDown);
      trackContainer.removeEventListener('pointermove', onPointerMove);
      trackContainer.removeEventListener('pointerup', endPointerDrag);
      trackContainer.removeEventListener('pointerleave', endPointerDrag);
      trackContainer.removeEventListener('pointercancel', endPointerDrag);
      trackContainer.removeEventListener('touchstart', onTouchStart);
      trackContainer.removeEventListener('touchmove', onTouchMove);
      trackContainer.removeEventListener('touchend', onTouchEnd);
      trackContainer.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animationFrameId);
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
                    <img src={project.image} alt={project.title} className="portfolio-card-img" loading="lazy" decoding="async" />
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