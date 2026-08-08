"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'feasibility-test',
    title: 'Feasibility Test',
    description: 'Initial structural, mechanical, and dimensional assessment to evaluate concept viability.',
    images: [
      '/assets/images/services/cad-1.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4d784892d35280098ce5474d75bae7a2-1783231400688/Open.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e64564c7b2c31a31a0c29a3ef409b3c4-1778085712334/Bull%20Lock.png',
    ],
  },
  {
    id: 'cad-design',
    title: 'CAD Design',
    description: 'Precision parametric 3D modeling and technical drawing creation tailored to exact specifications.',
    images: [
      '/assets/images/services/cad-2.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d233936dc12e8c10bfcbc01df04f8ee-1778085149990/F1%20Car%20keychain.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89a8e01d1172396211415fc354ca854e-1783201809117/Camera%20Black.1.jpg',
    ],
  },
  {
    id: 'mechanical-engineering',
    title: 'Mechanical Engineering',
    description: 'Complex mechanical assemblies, thermal management, kinematic testing, and load-bearing design.',
    images: [
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/cb9b8c35d2fb72999dcf5bb5773722d6-1631718544/Side.18.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/e7e1dbec8d61e63e0a5b86f1edb9a626-1614518000/Rendered%20model%201.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ba554de2ad029f269a870a21a79b4de-1778103959841/Knee%20Implant.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/7442505a8d7f74fffbcc04b86a02d3e4-1614966074/Harpy.jpg',
    ],
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid Prototyping',
    description: 'Optimized digital modeling for quick physical validation, iteration, and fit testing.',
    images: [
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/993a073adc2457995e71295779fb790d-1778075442653/Ketchup%20dispensing%20Cap.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2d12f0c4410cc1fa7519db8c93eb1996-1783230425150/Makeup%20stick.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8fdeb965bb29fb18f301edcca595ee79-1783229718869/Bamboo%20Toothbrush.2.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/f3077a8b519897ece4bc11b645a1292d-1783203450582/1.png',
    ],
  },
  {
    id: '3d-printing',
    title: '3D Printing',
    description: 'SLA/FDM/SLS print-ready CAD optimization, wall thickness validation, and mesh slicing support.',
    images: [
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/00ff0cc011ecc79a7d13ac34cc8f1c66-1624184877/Budha%20Head.4.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6e1f4fd6a2a8914f5359711f911f39c5-1783204771068/4.jpeg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/delivery/asset/7e8e770c6ebc4e82e4e72f5fad729c8d-1684943612/untitled.32.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/435df2ac457fbaccafb89af9ae9b9a63-1778071894834/Taupe%20Urn.4.jpg',
    ],
  },
  {
    id: 'design-for-manufacturing',
    title: 'Design for Manufacturing (DFM)',
    description: 'Production-ready file conversion (STEP, IGES, STL), draft angles, tooling analysis, and DFM compliance.',
    images: [
      '/assets/images/services/3d-viz-4.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png',
      '/assets/images/services/cad-1.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4d784892d35280098ce5474d75bae7a2-1783231400688/Open.png',
    ],
  },
  {
    id: 'product-visualization-renders',
    title: 'Product Visualization/Renders',
    description: 'Studio lighting, photorealistic textures, materials, and cinematic hero renders for marketing and launch campaigns.',
    images: [
      '/assets/images/services/3d-viz-1.jpg',
      '/assets/images/services/3d-viz-2.jpg',
      '/assets/images/services/3d-viz-3.jpg',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/03ebb2fc4976ec19df71727c22a38472-1778084709761/Render.png',
    ],
  },
  {
    id: 'product-animations',
    title: 'Product Animations',
    description: 'Exploded view animations, 360-degree turntables, and functional mechanism walk-through videos.',
    images: [
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e64564c7b2c31a31a0c29a3ef409b3c4-1778085712334/Bull%20Lock.png',
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/03ebb2fc4976ec19df71727c22a38472-1778084709761/Render.png',
      '/assets/images/services/3d-viz-2.jpg',
    ],
  },
];

export default function ServicesEnhanced() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hoveredIndex !== null) {
      interval = setInterval(() => {
        setImageIndex((prev) => prev + 1);
      }, 400);
    } else {
      setImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hoveredIndex]);

  return (
    <section id="services" className="relative w-full py-32 bg-transparent z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="mb-24">
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.16em] text-[0.66rem]">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Services</span>.
          </h2>
          <p className="text-white/60 max-w-2xl text-sm md:text-lg leading-relaxed">
            From initial feasibility testing to production-ready DFM and cinematic renders, we deliver full-cycle engineering and design solutions.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col relative w-full">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div key={service.id} className="relative w-full overflow-visible">
                <Link 
                  href={`/services/${service.id}`} 
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/10 cursor-pointer transition-colors hover:border-[rgba(0,212,255,0.3)]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Left side: Text */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-2/3">
                    <span className="text-white/30 font-mono text-sm md:text-lg transition-colors group-hover:text-[#00d4ff]">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00d4ff] group-hover:to-[#7c3aed] group-hover:translate-x-4">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right side description */}
                  <div className="mt-2 md:mt-0 w-full md:w-1/3 md:text-right">
                    <p className="text-white/50 text-sm transition-opacity duration-300 md:group-hover:opacity-0 md:pr-8">
                      {service.description}
                    </p>
                  </div>
                </Link>

                {/* Desktop Hover Reveal Image Sequence (Opaque Dark Overlay & High z-index to cover background text) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[240px] md:w-[520px] md:h-[340px] rounded-2xl overflow-hidden pointer-events-none z-[999] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 hidden md:block bg-[#02040a]"
                    >
                      <div className="absolute inset-0 bg-[#02040a]" />
                      {service.images.map((img, i) => {
                        const isActive = i === (imageIndex % service.images.length);
                        return (
                          <motion.img 
                            key={img}
                            src={img} 
                            alt={`${service.title} preview ${i}`}
                            initial={false}
                            animate={{ 
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1 : 1.05
                            }}
                            transition={{ duration: 0 }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        );
                      })}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 z-10">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[#00d4ff]">
                          {service.title}
                        </span>
                        <span className="text-white/60">0{imageIndex % service.images.length + 1} / 0{service.images.length}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile View Card Display: Shows service preview image directly inline under title on mobile screens */}
                <div className="block md:hidden my-4 rounded-xl overflow-hidden border border-white/10 bg-black/40 h-48 relative">
                  <img 
                    src={service.images[0]} 
                    alt={service.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-mono text-[#00d4ff] flex items-center gap-2">
                    <span>View {service.title}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
