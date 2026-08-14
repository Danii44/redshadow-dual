'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { servicesData } from '@/app/services/seoServices';
import './ServicesEnhanced.css';

type Service = (typeof servicesData)[number] & {
  images?: string[];
  gallery?: string[];
  previewImages?: string[];
};

const actionLabels = [
  'DESIGN IT',
  'PROTOTYPE IT',
  'MAKE IT REAL',
  'BRAND IT',
  'MARKET IT',
  'FUND IT',
  'SHOW IT',
  'ANIMATE IT',
];

function getAllServiceImages(service: Service) {
  const baseImage = service.heroImage;
  
  // Gather other images
  const otherImages = servicesData
    .filter((s) => s.slug !== service.slug)
    .map((s) => s.heroImage)
    .filter(Boolean);

  // Create a pseudo-random offset based on the slug length
  // so every service loops through a UNIQUE sequence of images
  const offset = service.slug.length % otherImages.length;
  const uniqueOtherImages = [
    ...otherImages.slice(offset),
    ...otherImages.slice(0, offset)
  ].slice(0, 4);
  
  return [baseImage, ...uniqueOtherImages].filter(Boolean);
}

export default function ServicesEnhanced() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [absoluteLoopIndex, setAbsoluteLoopIndex] = useState(0);

  // Interval for fast looping images
  useEffect(() => {
    if (activeIndex === null) {
      setAbsoluteLoopIndex(0);
      return;
    }
    
    // Sweet spot speed: 400 milliseconds per image
    const interval = setInterval(() => {
      setAbsoluteLoopIndex((prev) => prev + 1);
    }, 400);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="services" className="services-section-wrapper">
      {/* HEADER */}
      <motion.div
        className="services-header-panel"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <span className="services-pill">Our Services</span>
        <h2 className="services-heading">End-to-end engineering solutions</h2>
        <p className="services-subtitle">
          From early-stage concept validation to production-ready deliverables.
        </p>
      </motion.div>

      {/* INTERACTIVE LIST */}
      <div className="services-interaction" onMouseLeave={() => setActiveIndex(null)}>
        {/* List of words */}
        <nav className="services-title-list">
          {(servicesData as Service[]).map((service, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            const images = getAllServiceImages(service);

            // Keep the current image and the 2 previous ones for the stack
            const visibleItems = [
              absoluteLoopIndex - 2,
              absoluteLoopIndex - 1,
              absoluteLoopIndex,
            ].filter((i) => i >= 0);

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`services-title-link ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                {/* Left Side: Description inline with the row */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="services-active-desc"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{service.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="services-title-center">
                  <span className="services-title-text">{service.title}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="services-action-badge"
                        initial={{ opacity: 0, scale: 0.8, y: 10, rotate: index % 2 === 0 ? -6 : 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: index % 2 === 0 ? -4 : 4 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.25, type: 'spring', stiffness: 200 }}
                      >
                        {actionLabels[index] ?? 'EXPLORE IT'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Side: Image Loop inline with the row */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="services-stack-card-container"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                    >
                      <AnimatePresence>
                        {visibleItems.map((itemIndex) => {
                          const imageIndex = itemIndex % images.length;
                          const currentImage = images[imageIndex];
                          const stackPosition = absoluteLoopIndex - itemIndex; // 0 is top, 1 is middle, 2 is back

                          return (
                            <motion.div
                              key={itemIndex}
                              className="services-stack-card"
                              initial={{ 
                                opacity: 0, 
                                scale: 1.1, 
                                rotate: (itemIndex % 2 === 0 ? 15 : -15),
                                y: -30 
                              }}
                              animate={{ 
                                opacity: 1 - (stackPosition * 0.15), // Top=1, Middle=0.85, Back=0.7
                                scale: 1 - (stackPosition * 0.05), // Top=1, Middle=0.95, Back=0.9
                                rotate: (itemIndex % 2 === 0 ? 4 : -4) + (stackPosition * (itemIndex % 2 === 0 ? -2 : 2)),
                                y: 0,
                                zIndex: 10 - stackPosition 
                              }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                            >
                              <img src={currentImage} alt="" />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
