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

      {/* DESKTOP / TABLET — Interactive hover list */}
      <div className="services-interaction services-desktop-list" onMouseLeave={() => setActiveIndex(null)}>
        <nav className="services-title-list">
          {(servicesData as Service[]).map((service, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            const images = getAllServiceImages(service);

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
                {/* Left: Description */}
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

                {/* Center: Title */}
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

                {/* Right: Image Stack */}
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
                          const stackPosition = absoluteLoopIndex - itemIndex;

                          return (
                            <motion.div
                              key={itemIndex}
                              className="services-stack-card"
                              initial={{ opacity: 0, scale: 1.1, rotate: (itemIndex % 2 === 0 ? 15 : -15), y: -30 }}
                              animate={{
                                opacity: 1 - (stackPosition * 0.15),
                                scale: 1 - (stackPosition * 0.05),
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

      {/* MOBILE — Static card grid: image → title → description */}
      <div className="services-mobile-cards">
        {(servicesData as Service[]).map((service, index) => {
          const images = getAllServiceImages(service);
          const heroImage = images[0];
          return (
            <motion.div
              key={service.slug}
              className="services-mobile-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Link href={`/services/${service.slug}`} className="services-mobile-card-link">
                {/* Image */}
                <div className="services-mobile-card-img">
                  <img src={heroImage} alt={service.title} />
                  <span className="services-mobile-card-badge">
                    {actionLabels[index] ?? 'EXPLORE IT'}
                  </span>
                </div>
                {/* Title */}
                <h3 className="services-mobile-card-title">{service.title}</h3>
                {/* Description */}
                <p className="services-mobile-card-desc">{service.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
