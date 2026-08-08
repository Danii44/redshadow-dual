"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';
import { projects } from '@/lib/projects';
import './Portfolio.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // debug log to confirm client initialization
    console.debug('PortfolioShowcase mounted', { sectionExists: !!section, trackExists: !!track });

    let ctx: gsap.Context | null = null;
    let alive = true;

    const getDistance = () => Math.max(track.scrollWidth - section.clientWidth + 40, 0);

    const clearTriggers = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerEl = trigger.trigger as HTMLElement | null;
        if (triggerEl === section || triggerEl === track) {
          trigger.kill();
        }
      });
    };

    const init = () => {
      if (!alive) return;
      clearTriggers();

      ctx = gsap.context(() => {
        gsap.set(track, {
          x: 0,
          willChange: 'transform',
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).to(track, {
          x: () => -getDistance(),
          ease: 'none',
        });
      }, section);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const preloadImages = async () => {
      const images = Array.from(track.querySelectorAll<HTMLImageElement>('img'));
      await Promise.all(
        images.map(async (img) => {
          if (img.complete) {
            return img.decode().catch(() => undefined);
          }
          return new Promise<void>((resolve) => {
            img.addEventListener('load', () => img.decode().catch(() => undefined).then(() => resolve()), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          });
        })
      );
    };

    // Initialize when images are preloaded AND when section enters viewport.
    let io: IntersectionObserver | null = null;

    const onReady = () => {
      requestAnimationFrame(() => {
        if (alive) {
          init();
          console.info('PortfolioShowcase: ScrollTrigger initialized');
        }
      });
    };

    preloadImages().then(() => {
      // If section is already visible, init immediately.
      if (section.getBoundingClientRect().top < window.innerHeight) {
        onReady();
      } else {
        io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onReady();
              if (io) {
                io.disconnect();
                io = null;
              }
            }
          });
        }, { threshold: 0.15 });

        io.observe(section);
      }
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      alive = false;
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
      if (io) io.disconnect();
      clearTriggers();
    };
  }, []);

  const activeTheme = mounted ? theme : 'dark';

  return (
    <section id="portfolio" ref={sectionRef} className={`portfolio-section ${activeTheme}`}>
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

        <div className="portfolio-track-container">
          <div ref={trackRef} className="portfolio-track">
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
