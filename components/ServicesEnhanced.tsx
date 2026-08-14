"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { servicesData } from '@/app/services/seoServices';
import PreviewCarousel from './PreviewCarousel';
import { projects } from '@/lib/projects';

export default function ServicesEnhanced() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  function getPreviewImages(service: any) {
    // Prefer explicit heroImage, then augment with category lookups
    const pool = new Set<string>();
    if (service.heroImage) pool.add(service.heroImage);

    const slug = service.slug || '';
    const title = (service.title || '').toLowerCase();

    // Common local service images in public/assets/images/services
    const viz = ['/assets/images/services/3d-viz-1.webp', '/assets/images/services/3d-viz-2.webp', '/assets/images/services/3d-viz-3.webp', '/assets/images/services/3d-viz-4.webp'];
    const cad = ['/assets/images/services/cad-1.webp', '/assets/images/services/cad-2.webp'];

    if (slug.includes('3d') || title.includes('render') || title.includes('visual')) viz.forEach(u => pool.add(u));
    if (slug.includes('cad') || title.includes('cad') || title.includes('feasibility') || title.includes('design')) cad.forEach(u => pool.add(u));

    // fallback: ensure there are up to 4 images
    const fallback = [...viz, ...cad];
    for (const f of fallback) {
      if (pool.size >= 4) break;
      pool.add(f);
    }

    // Supplement with project images to avoid repeating the same service visuals.
    const projectImgs = projects.map((p) => p.image).filter(Boolean) as string[];
    if (projectImgs.length > 0 && pool.size < 4) {
      const seed = (slug || '')
        .split('')
        .reduce((s: number, ch: string) => s + ch.charCodeAt(0), 0);
      for (let i = 0; i < projectImgs.length && pool.size < 4; i++) {
        const idx = (seed + i) % projectImgs.length;
        pool.add(projectImgs[idx]);
      }
    }

    return Array.from(pool).slice(0, 4);
  }

  return (
    <section id="services" className="relative w-full py-32 bg-transparent z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="mb-24">
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.16em] text-[0.66rem] font-bold">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Services</span>.
          </h2>
          <p className="text-white/60 max-w-2xl text-sm md:text-lg leading-relaxed">
            From feasibility testing to production-ready DFM and cinematic renders, we deliver full-cycle engineering and design solutions.
          </p>
        </div>

        <div className="flex flex-col relative w-full">
          {servicesData.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div key={service.slug} className="relative w-full overflow-visible">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/10 cursor-pointer transition-colors hover:border-[rgba(0,212,255,0.3)]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-2/3">
                    <span className="text-white/30 font-mono text-sm md:text-lg transition-colors group-hover:text-[#00d4ff]">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00d4ff] group-hover:to-[#7c3aed] group-hover:translate-x-4">
                        {service.title}
                      </h3>
                      <p className="text-white/60 mt-3 max-w-2xl">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 w-full md:w-1/3 md:text-right">
                    <p className="text-white/50 text-sm transition-opacity duration-300 md:group-hover:opacity-0 md:pr-8">
                      {service.longDescription}
                    </p>
                  </div>
                </Link>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, x: 20 }}
                      animate={{ opacity: 1, scale: 0.75, x: 0 }}
                      exit={{ opacity: 0, scale: 0.6, x: 20 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      style={{ transformOrigin: 'top right' }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[240px] md:w-[520px] md:h-[340px] rounded-2xl overflow-hidden pointer-events-none z-[999] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 hidden md:block bg-[#02040a]"
                    >
                      <PreviewCarousel service={service} />
                      {/* No text overlay on previews (clean images) */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
