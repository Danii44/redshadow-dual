"use client";

import { useRef, useState, type TouchEvent, type WheelEvent } from 'react';
import { motion } from 'framer-motion';
import './ReviewsSection.css';

const reviews = [
  {
    id: 1,
    name: 'Ava Carter',
    role: 'Product Designer',
    quote: 'Red Shadow Design transformed our concept into a futuristic product visual with precision, motion, and atmosphere.',
  },
  {
    id: 2,
    name: 'Milo Nguyen',
    role: 'Startup Founder',
    quote: 'The 3D product renderings and interactive presentation elevated our brand instantly; every detail felt premium.',
  },
  {
    id: 3,
    name: 'Luna Patel',
    role: 'Creative Director',
    quote: 'Fluid animations, sharp materials, and perfect lighting made our campaign stand out in a crowded digital world.',
  },
  {
    id: 4,
    name: 'Noah Brooks',
    role: 'Growth Lead',
    quote: 'The immersive product scenes created an emotional connection with our customers and boosted our conversion story.',
  },
  {
    id: 5,
    name: 'Maya Chen',
    role: 'Experience Strategist',
    quote: 'This team delivered cinematic visuals with a premium sci-fi edge, keeping the experience engaging from first scroll.',
  },
];

const softwareStack = [
  'SolidWorks',
  'PTC Creo',
  'Blender',
  'KeyShot',
  'After Effects',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Canva',
];

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const lastWheelStep = useRef(0);
  const count = reviews.length;

  const updateActiveByDirection = (direction: 1 | -1) => {
    setActive((current) => (current + direction + count) % count);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelStep.current < 520) return;

    lastWheelStep.current = now;
    if (Math.abs(event.deltaY) < 8) return;

    event.preventDefault();
    updateActiveByDirection(event.deltaY > 0 ? 1 : -1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;

    const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
    const delta = touchStartY.current - endY;

    if (Math.abs(delta) > 40) {
      updateActiveByDirection(delta > 0 ? 1 : -1);
    }

    touchStartY.current = null;
  };

  return (
    <section className="reviews-section">
      <div className="reviews-shell glass-strong">
        <motion.div
          className="reviews-background-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />

        <div className="reviews-header">
          <div className="reviews-pill">Client signal</div>
          <h2>Trusted by ambitious teams</h2>
          <p>Creative founders, product teams, and brand builders choose us when they need memorable 3D storytelling that feels premium.</p>
        </div>

        <div
          className="reviews-carousel-shell"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="reviews-stage">
            {reviews.map((review, index) => {
              const relativeIndex = ((index - active + count) % count + count) % count;
              const isActive = relativeIndex === 0;
              const isNext = relativeIndex === 1;
              const isPrev = relativeIndex === count - 1;
              const isDeep = relativeIndex > 1;

              const style = isActive
                ? {
                    transform: 'translate3d(0, 0, 0) scale(1)',
                    opacity: 1,
                    filter: 'blur(0px)',
                    zIndex: count,
                  }
                : isNext
                  ? {
                      transform: 'translate3d(0, 42px, 0) scale(0.98)',
                      opacity: 0.86,
                      filter: 'blur(0px)',
                      zIndex: count - 1,
                    }
                  : isPrev
                    ? {
                        transform: 'translate3d(0, -24px, 0) scale(0.94)',
                        opacity: 0.58,
                        filter: 'blur(2px)',
                        zIndex: 2,
                      }
                    : {
                        transform: `translate3d(0, ${-70 - (relativeIndex - 1) * 16}px, 0) scale(${0.9 - (relativeIndex - 1) * 0.03})`,
                        opacity: 0.18,
                        filter: 'blur(3px)',
                        zIndex: 1,
                      };

              return (
                <article
                  key={review.id}
                  className={`review-card ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''} ${isNext ? 'is-next' : ''} ${isDeep ? 'is-deep' : ''}`}
                  style={style}
                >
                  <div className="review-ribbon">Client</div>
                  <p className="review-quote">“{review.quote}”</p>
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="reviews-controls">
          <button
            className="carousel-button"
            onClick={() => updateActiveByDirection(-1)}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <div className="carousel-dots">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                className={`carousel-dot ${index === active ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-button"
            onClick={() => updateActiveByDirection(1)}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="reviews-marquee-wrap" aria-hidden="true">
          <div className="reviews-marquee-track">
            {[...softwareStack, ...softwareStack].map((tool, index) => (
              <span key={`${tool}-${index}`} className="marquee-pill">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
