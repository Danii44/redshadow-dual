"use client";

import { type CSSProperties, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/projects';

const ALL_CATEGORIES = ['All', 'CAD Design', 'Product Design', 'Industrial Design', '3D Rendering', 'Medical', 'Hardware'];

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
        <section className="pt-28 md:pt-32 pb-16 text-center px-4">
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
