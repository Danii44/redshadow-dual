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
  const isLight = theme === 'light';

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
                className={`relative w-full border-b border-white/10 transition-colors duration-500 ${isHovered ? 'bg-white/5 border-[rgba(0,212,255,0.2)]' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col md:flex-row items-center py-8 md:py-12 cursor-pointer"
                >
                  
                  {/* LEFT SIDE: Tilted Image Stack in line with service */}
                  <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-8 md:mb-0 md:pl-4">
                    <div className="relative w-[260px] h-[180px] xl:w-[320px] xl:h-[220px]">
                      {/* Background tilted cards ("foam") */}
                      <div className={`absolute inset-0 rounded-2xl border ${isLight ? 'bg-gray-800 border-gray-700' : 'bg-[#050914] border-white/10'} rotate-[6deg] scale-[0.95] translate-x-[10px] translate-y-[8px] shadow-xl transition-all duration-500 ${isHovered ? 'rotate-[8deg] translate-x-[15px]' : ''}`} />
                      <div className={`absolute inset-0 rounded-2xl border ${isLight ? 'bg-gray-200 border-gray-300' : 'bg-[#1a1f2e] border-white/5'} rotate-[-4deg] scale-[0.98] translate-x-[-8px] translate-y-[4px] shadow-lg transition-all duration-500 ${isHovered ? 'rotate-[-6deg] translate-x-[-12px]' : ''}`} />

                      {/* Main active image card with Fast Changing Carousel */}
                      <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border ${isLight ? 'border-gray-200 bg-white' : 'border-white/20 bg-[#02040a]'} transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}>
                        {/* Only show the fast-changing carousel if hovered to save performance, otherwise static image */}
                        {isHovered ? (
                          <PreviewCarousel service={service} />
                        ) : (
                          <img 
                            src={service.heroImage} 
                            alt={service.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Number, Title, Description */}
                  <div className="w-full md:w-2/3 flex flex-col sm:flex-row gap-4 sm:gap-8 md:pl-8 lg:pl-16">
                    <span className={`font-mono text-lg sm:text-xl transition-colors duration-300 mt-1 ${isHovered ? 'text-[#00d4ff]' : 'text-white/30 group-hover:text-[#00d4ff]'}`}>
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    
                    <div>
                      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 mb-3
                        ${isHovered 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] translate-x-2' 
                          : 'text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                      
                      <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed mb-4">
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
                            <p className="text-white/40 text-sm mt-2 max-w-xl">
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
