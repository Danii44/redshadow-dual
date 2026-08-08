"use client";

import { type CSSProperties, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ALL_CATEGORIES = ['All', 'CAD Design', 'Product Design', 'Industrial Design', '3D Rendering', 'Medical', 'Hardware'];

const projects = [
  { id: 'orbai-spherical-drone', title: 'ORBAI Spherical Drone', category: 'CAD Design', description: 'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering for an autonomous aerial platform.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/81067f724df0670e9a752db093dcfc84-1778076067376/Orbei.png', size: 'large' },
  { id: 'f1-car-keychain', title: 'F1 Race Car Keychain', category: 'CAD Design', description: 'Highly detailed, precision-engineered miniature F1 car model for CNC machining or SLA 3D printing.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/6d233936dc12e8c10bfcbc01df04f8ee-1778085149990/F1%20Car%20keychain.png', size: 'small' },
  { id: 'tkr-implant', title: 'Knee Implant', category: 'Medical', description: 'Anatomically accurate knee implant CAD model focusing on biomechanics, material specifications, and regulatory compliance.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/3ba554de2ad029f269a870a21a79b4de-1778103959841/Knee%20Implant.png', size: 'small' },
  { id: 'ketchup-cap', title: 'Ketchup Dispensing Cap', category: 'Product Design', description: 'Innovative ketchup dispensing cap design with precise mating geometry, engineered for injection molding production.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/993a073adc2457995e71295779fb790d-1778075442653/Ketchup%20dispensing%20Cap.png', size: 'large' },
  { id: 'bull-lock', title: 'Bull Lock Mechanism', category: 'Industrial Design', description: 'Heavy-duty bull lock mechanism with fully articulated locking geometry, designed for agricultural and industrial applications.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/e64564c7b2c31a31a0c29a3ef409b3c4-1778085712334/Bull%20Lock.png', size: 'small' },
  { id: 'taupe-urn', title: 'Decorative Urn', category: '3D Rendering', description: 'Photorealistic 3D render of a premium taupe decorative urn with subsurface scattering material simulation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/435df2ac457fbaccafb89af9ae9b9a63-1778071894834/Taupe%20Urn.4.jpg', size: 'small' },
  { id: 'compressor-chamber', title: 'Compressor Chamber', category: 'Industrial Design', description: 'Full parametric assembly of a compressor chamber with internal component packaging, tolerances, and thermal simulation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/113b8251a0029e50715d5027db806a51-1778104554118/Compressor%20chmber.png', size: 'large' },
  { id: 'hero-render', title: 'Product Hero Render', category: '3D Rendering', description: 'Studio-quality hero render for product launch campaign materials, featuring dramatic lighting and precise texture work.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/03ebb2fc4976ec19df71727c22a38472-1778084709761/Render.png', size: 'small' },
  { id: 'makeup-stick', title: 'Makeup Stick', category: 'Product Design', description: 'Sleek cosmetic makeup stick housing design with precision tolerance mating parts, ready for injection molding.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/2d12f0c4410cc1fa7519db8c93eb1996-1783230425150/Makeup%20stick.png', size: 'small' },
  { id: 'camera-housing', title: 'Camera Housing', category: 'Hardware', description: 'Precision camera housing design with lens mount integration, weather sealing geometry, and ergonomic grip profiling.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/89a8e01d1172396211415fc354ca854e-1783201809117/Camera%20Black.1.jpg', size: 'large' },
  { id: 'bamboo-toothbrush', title: 'Bamboo Toothbrush', category: 'Product Design', description: 'Eco-friendly bamboo toothbrush CAD model with ergonomic handle geometry and sustainability-focused material specifications.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/8fdeb965bb29fb18f301edcca595ee79-1783229718869/Bamboo%20Toothbrush.2.png', size: 'small' },
  { id: 'open-assembly', title: 'Mechanical Assembly', category: 'CAD Design', description: 'Complex multi-component mechanical assembly with exploded view renders and full BOM documentation.', image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_portfolio_project_large/v1/attachments/project_item/attachment/4d784892d35280098ce5474d75bae7a2-1783231400688/Open.png', size: 'small' },
];

export default function PortfolioPageClient() {
  const [scrollY, setScrollY] = useState(0);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ambientStyle = { '--scroll-offset': `${Math.min(scrollY * 0.12, 120)}px`, '--scroll-rise': `${Math.min(scrollY * 0.08, 70)}px` } as CSSProperties;

  const filtered = useMemo(() => projects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [search, activeCategory]);

  return (
    <div className="homepage-shell" style={ambientStyle}>
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />
      <main className="homepage-main relative z-10">
        <section className="pt-32 pb-16 text-center px-4">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.2em] text-[0.7rem] font-bold">Our Work</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Portfolio</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Explore our full range of engineering and design projects. From precision CAD models to cinematic renders.</p>
        </section>
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
            <input type="text" placeholder="Search projects, categories..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-base" />
            {search && <button onClick={() => setSearch('')} className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white transition-colors">✕</button>}
          </div>
          <div className="flex flex-wrap gap-3">
            {ALL_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-[0_0_20px_rgba(0,212,255,0.3)]' : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/30 hover:text-white'}`}>{cat}</button>
            ))}
            <span className="ml-auto self-center text-white/30 text-sm">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </section>
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-32">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-32 text-white/30">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-xl">No projects found for "{search}"</p>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 text-[#00d4ff] hover:underline text-sm">Clear filters</button>
              </motion.div>
            ) : (
              <motion.div key="grid" className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filtered.map((project, i) => (
                  <motion.div key={project.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="break-inside-avoid mb-6">
                    <Link href={`/portfolio/${project.id}`} className="block group">
                      <div className="portfolio-card relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm hover:border-[#00d4ff]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                        <div className={`overflow-hidden ${project.size === 'large' ? 'h-64' : 'h-44'}`}>
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="portfolio-img-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        </div>
                        <div className="p-6">
                          <span className="text-[#00d4ff] font-mono text-xs uppercase tracking-widest mb-2 block">{project.category}</span>
                          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00d4ff] transition-colors">{project.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
                          <div className="mt-4 flex items-center gap-2 text-[#00d4ff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
