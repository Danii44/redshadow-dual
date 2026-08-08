"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import './PortfolioEnhanced.css';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 'orbai-spherical-drone',
    title: 'ORBAI Spherical Drone',
    category: 'CAD Design & 3D Renders',
    description: 'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering.',
    icon: '🚁',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png'
  },
  {
    id: 'f1-car-keychain',
    title: 'F1 Race Car Keychain',
    category: 'Precision Engineering',
    description: 'Highly detailed, precision-engineered miniature F1 car model designed for CNC or 3D printing.',
    icon: '🏎️',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d233936dc12e8c10bfcbc01df04f8ee-1778085149990/F1%20Car%20keychain.png'
  },
  {
    id: 'ketchup-cap',
    title: 'Ketchup Dispensing Cap',
    category: 'Product Design',
    description: 'Innovative dispensing cap design with precise mating geometry, engineered for injection molding.',
    icon: '✨',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/993a073adc2457995e71295779fb790d-1778075442653/Ketchup%20dispensing%20Cap.png'
  },
  {
    id: 'tkr-implant',
    title: 'Knee Implant',
    category: 'Medical Device Modeling',
    description: 'Anatomically accurate knee implant CAD model focusing on biomechanics and material specifications.',
    icon: '🦴',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ba554de2ad029f269a870a21a79b4de-1778103959841/Knee%20Implant.png'
  },
  {
    id: 'compressor-chamber',
    title: 'Compressor Chamber',
    category: 'Industrial Design',
    description: 'Full parametric assembly of a compressor chamber with internal component packaging and thermal simulation.',
    icon: '⚙️',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png'
  },
  {
    id: 'camera-housing',
    title: 'Camera Housing',
    category: 'Hardware Design',
    description: 'Precision camera housing design with lens mount integration, weather sealing, and ergonomic grip profiling.',
    icon: '📷',
    image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89a8e01d1172396211415fc354ca854e-1783201809117/Camera%20Black.1.jpg'
  },
];

export function PortfolioEnhanced() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = horizontalRef.current;

    if (!section || !track) return;

    let ctx: gsap.Context | null = null;
    let isActive = true;

    const clearExistingTriggers = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section || trigger.trigger === track) {
          trigger.kill();
        }
      });
    };

    const initScrollTrigger = () => {
      if (!isActive) return;
      clearExistingTriggers();

      ctx = gsap.context(() => {
        // Calculate precise scrollable distance
        const getScrollAmount = () => {
          return Math.max(track.scrollWidth - window.innerWidth, 0);
        };

        // Master timeline that controls both track movement AND image parallax
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            refreshPriority: 2,
            invalidateOnRefresh: true,
          },
        });

        // 1. Move horizontal track
        mainTl.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
        }, 0);

        // 2. Animate inner image parallax attached directly to the main timeline (NO separate ScrollTriggers)
        const cards = gsap.utils.toArray<HTMLElement>('.portfolio-item-wrapper', track);
        cards.forEach((card, index) => {
          const image = card.querySelector('.portfolio-item-img') as HTMLElement | null;
          if (!image) return;

          mainTl.fromTo(
            image,
            {
              xPercent: index % 2 === 0 ? -10 : 10,
              scale: 1.05,
            },
            {
              xPercent: index % 2 === 0 ? 10 : -10,
              scale: 1.12,
              ease: 'none',
            },
            0 // Synchronize with the main timeline start
          );
        });

      }, section);

      ScrollTrigger.refresh();
    };

    // Preload & decode all images to ensure correct scrollWidth calculation
    const images = Array.from(track.querySelectorAll('img'));
    const imagePromises = images.map((img) => {
      if (img.complete) {
        return img.decode().catch(() => Promise.resolve());
      }
      return new Promise<void>((resolve) => {
        img.onload = () => img.decode().then(() => resolve()).catch(() => resolve());
        img.onerror = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      // Small tick delay for Next.js layout engine to paint dimensions
      requestAnimationFrame(() => {
        initScrollTrigger();
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      isActive = false;
      window.removeEventListener('resize', onResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section-wrapper overflow-hidden">
      <div className="portfolio-parallax-bg">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" alt="Background" />
        <div className="portfolio-bg-overlay"></div>
      </div>

      <div className="portfolio-sticky-content h-screen flex flex-col justify-between py-12">
        <div className="portfolio-header-container">
          <motion.div
            className="portfolio-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="portfolio-pill">Immersive showcases</div>
            <h2 className="portfolio-enhanced-title">Featured Projects</h2>
            <p className="portfolio-enhanced-subtitle">Scroll to explore our engineering excellence through cinematic product stories.</p>
          </motion.div>
        </div>

        <div ref={horizontalRef} className="portfolio-horizontal-container flex flex-nowrap w-max gap-8 px-12">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-item-wrapper flex-shrink-0">
              <Link href={`/portfolio/${item.id}`} className="block w-full h-full">
                <motion.div
                  className="portfolio-item glass-card h-full"
                  whileHover={{ y: -10, scale: 1.015, transition: { duration: 0.3 } }}
                >
                  <div className="portfolio-item-image-box">
                    <img src={item.image} alt={item.title} className="portfolio-item-img" />
                    <div className="portfolio-item-icon-overlay">{item.icon}</div>
                  </div>
                  <div className="portfolio-item-info">
                    <span className="portfolio-item-category">{item.category}</span>
                    <h3 className="portfolio-item-title">{item.title}</h3>
                    <p className="portfolio-item-description">{item.description}</p>
                    <div className="portfolio-item-footer mt-auto">
                      <button className="glass-button-sm pointer-events-none">View Details</button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioEnhanced;