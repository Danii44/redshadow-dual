"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { servicesData } from '@/app/services/seoServices';
import PreviewCarousel from './PreviewCarousel';
import { useTheme } from '@/contexts/ThemeContext';

export default function ServicesEnhanced() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  // We'll force these cards to look bright and high-contrast like Octane 8 regardless of theme,
  // or adapt them nicely. Let's use bright distinct colors for the stack.

  return (
    <section id="services" className="relative w-full py-24 lg:py-32 bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="mb-16 lg:mb-24">
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

        <div className="flex flex-col w-full">
          {servicesData.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={service.slug} 
                className={`relative w-full border-b border-white/10 transition-colors duration-500 ${isHovered ? 'bg-white/[0.02]' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col md:flex-row items-center py-10 md:py-16 cursor-pointer"
                >
                  
                  {/* LEFT SIDE: Highly visible tilted card stack (Octane 8 style) */}
                  <div className="w-full md:w-2/5 flex justify-center md:justify-start mb-12 md:mb-0 md:pl-4">
                    <div className="relative w-[280px] h-[190px] xl:w-[360px] xl:h-[240px]">
                      
                      {/* Deepest Card (e.g. Maroon/Dark Red like Octane 8) */}
                      <div className={`absolute inset-0 rounded-2xl bg-[#5C161E] border border-white/10 rotate-[8deg] scale-[0.9] translate-x-[25px] translate-y-[15px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ${isHovered ? 'rotate-[12deg] translate-x-[35px] translate-y-[20px]' : ''}`} />
                      
                      {/* Middle Card (e.g. Clean White/Light Gray) */}
                      <div className={`absolute inset-0 rounded-2xl bg-[#e2e8f0] border border-white/20 rotate-[-5deg] scale-[0.95] translate-x-[-15px] translate-y-[5px] shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-500 ${isHovered ? 'rotate-[-8deg] translate-x-[-25px] translate-y-[10px]' : ''}`} />

                      {/* Top Active Image Card (Bright White border, strong shadow) */}
                      <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-white border-[6px] border-white transition-transform duration-500 ${isHovered ? 'scale-110 rotate-[2deg]' : 'scale-100 rotate-0'}`}>
                        {/* Show fast-changing carousel on hover, otherwise static hero image */}
                        {isHovered ? (
                          <PreviewCarousel service={service} />
                        ) : (
                          <img 
                            src={service.heroImage} 
                            alt={service.title}
                            className="w-full h-full object-cover transition-opacity"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Number, Title, Description */}
                  <div className="w-full md:w-3/5 flex flex-col sm:flex-row gap-4 sm:gap-8 md:pl-8 lg:pl-12">
                    <span className={`font-mono text-xl md:text-2xl transition-colors duration-300 mt-1 font-bold ${isHovered ? 'text-[#00d4ff]' : 'text-white/30 group-hover:text-[#00d4ff]'}`}>
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    
                    <div>
                      <h3 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 mb-4
                        ${isHovered 
                          ? 'text-white translate-x-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                          : 'text-white/80 group-hover:translate-x-3'
                        }`}
                      >
                        {service.title}
                      </h3>
                      
                      <p className={`text-sm md:text-lg max-w-xl leading-relaxed mb-4 transition-colors ${isHovered ? 'text-white/80' : 'text-white/50'}`}>
                        {service.description}
                      </p>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#00d4ff] text-sm md:text-base mt-2 max-w-xl font-medium">
                              {service.longDescription}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
