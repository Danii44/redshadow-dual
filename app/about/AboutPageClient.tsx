"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

const techStack = [
  { name: 'SolidWorks (CAD)' },
  { name: 'PTC Creo (CAD)' },
  { name: 'Blender (3D MODELING)' },
  { name: 'KeyShot (RENDERING)' },
  { name: 'Adobe After Effects (ANIMATION / MOTION GRAPHICS)' },
  { name: 'Adobe Photoshop (POST-PRODUCTION / GRAPHICS)' },
  { name: 'Adobe Illustrator (VECTOR GRAPHICS)' },
  { name: 'Canva (PITCH DECKS / PRESENTATIONS)' }
];

export default function AboutPageClient() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe client-side check to prevent SSR/hydration mismatch
  const isLight = mounted && theme === 'light';

  const ambientStyle = {
    '--scroll-offset': `${Math.min(scrollY * 0.12, 120)}px`,
    '--scroll-rise': `${Math.min(scrollY * 0.08, 70)}px`,
  } as CSSProperties;

  return (
    <div className="homepage-shell" style={ambientStyle}>
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />

      <main className="homepage-main pt-24 relative z-10">

        {/* Cinematic Hero Section */}
        <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
              alt="Engineering Background"
              className={`w-full h-full object-cover ${isLight ? 'opacity-60 mix-blend-normal' : 'opacity-20 mix-blend-lighten'}`}
            />
            <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#ede8f6]/70 via-[#ede8f6]/20 to-transparent' : 'bg-gradient-to-b from-[#02040a]/10 via-[#02040a]/60 to-[#02040a]'}`} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className={`inline-block mb-6 px-4 py-1.5 rounded-full border uppercase tracking-[0.2em] text-[0.7rem] font-bold ${isLight
                ? 'border-[rgba(93,75,139,0.3)] bg-[rgba(93,75,139,0.08)] text-[#5D4B8B]'
                : 'border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]'
              }`}>
              The Studio
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter ${isLight ? 'text-[#1e1830]' : 'text-white'
              }`}>
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5D4B8B] to-[#3E325D]">Precision</span>.
            </h1>
            <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto ${isLight ? 'text-[#1e1830]/65' : 'text-white/60'
              }`}>
              We bridge the gap between sketches to complete DFM (Manufacturing-Ready files) and digital visualization.
            </p>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className={`py-20 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tight ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>
                Beyond traditional <br />CAD modeling.
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${isLight ? 'text-[#1e1830]/65' : 'text-white/60'}`}>
                Red Shadow Designs was founded on a simple premise: industrial engineering doesn't have to look industrial. We take raw mechanical concepts, complex assemblies, and visionary hardware, and we develop them with strict manufacturing tolerances and visualize them with professional studio-grade rendering.
              </p>
              <p className={`text-lg leading-relaxed ${isLight ? 'text-[#1e1830]/65' : 'text-white/60'}`}>
                Whether you're presenting a new autonomous drone to investors, or need precise tooling documentation for a medical device, our hybrid team of mechanical engineers and 3D artists ensures your product is engineered accurately for manufacturing and presented clearly for stakeholder review.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Products Delivered", value: "100+" },
                { label: "Projects Completed", value: "800+" },
                { label: "Global Clients", value: "550+" },
                { label: "Dimensional Accuracy", value: "99.9%" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                  <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5D4B8B] to-[#3E325D] mb-2">
                    {stat.value}
                  </h3>
                  <p className={`font-mono text-sm uppercase tracking-widest ${isLight ? 'text-[#1e1830]/55' : 'text-white/50'}`}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CEO / Founder Section */}
        <section className={`py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t ${isLight ? 'border-[rgba(93,75,139,0.12)]' : 'border-white/5'}`}>
          <div className="text-center mb-16">
            <div className={`inline-block mb-4 px-4 py-1.5 rounded-full border uppercase tracking-[0.2em] text-[0.7rem] font-bold ${isLight
                ? 'border-[rgba(93,75,139,0.3)] bg-[rgba(93,75,139,0.08)] text-[#5D4B8B]'
                : 'border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe]'
              }`}>
              Leadership
            </div>
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5D4B8B] to-[#3E325D]">Founder</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`relative rounded-3xl overflow-hidden border p-8 md:p-12 ${isLight
                ? 'bg-white/80 border-[rgba(93,75,139,0.18)] shadow-[0_20px_60px_rgba(62,50,93,0.1)]'
                : 'border-white/10 bg-black/40 backdrop-blur-sm'
              }`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(124,58,237,0.12)] rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[rgba(0,212,255,0.08)] rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className={`w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden ${isLight
                      ? 'border-2 border-[rgba(93,75,139,0.3)] shadow-[0_0_40px_rgba(93,75,139,0.15)]'
                      : 'border-2 border-[rgba(0,212,255,0.3)] shadow-[0_0_40px_rgba(0,212,255,0.15)] bg-gradient-to-br from-[#0a1628] to-[#1a0033]'
                    }`}>
                    <img
                      src="/assets/images/Profile.webp"
                      alt="Daniyal Ahmad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-bold uppercase tracking-widest">
                      ⭐ Top Rated Seller
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-3xl md:text-4xl font-bold mb-1 ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>Daniyal Ahmad</h3>
                  <p className={`font-mono text-sm uppercase tracking-widest mb-4 ${isLight ? 'text-[#5D4B8B]' : 'text-[#00d4ff]'}`}>Founder & CEO — Red Shadow Designs</p>
                  <p className={`leading-relaxed mb-6 ${isLight ? 'text-[#1e1830]/65' : 'text-white/60'}`}>
                    As a Master's qualified and Registered Mechanical Engineer, Daniyal leads Red Shadow Designs with a strict focus on manufacturing viability. With deep expertise in SolidWorks parametric modeling, advanced surfacing, and sheet metal design, he bridges the gap between conceptual industrial design and production-ready geometry. Under his leadership, the studio consistently delivers DFM-optimized assemblies for CNC machining and plastic injection molding workflows—earning him Top Rated Seller status on Fiverr and a consistent track record of successful client deployments.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                    {['Mechanical Engineering', 'SolidWorks', 'Blender', '3D Rendering', 'Product Design', 'DFM'].map((tag) => (
                      <span key={tag} className={`px-3 py-1 rounded-full text-xs ${isLight
                          ? 'bg-[rgba(93,75,139,0.08)] border border-[rgba(93,75,139,0.2)] text-[#3E325D]'
                          : 'bg-white/5 border border-white/10 text-white/60'
                        }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://www.fiverr.com/users/daniyalahmad7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isLight
                        ? 'bg-[#1DBF73] text-white hover:bg-[#19a463] shadow-[0_4px_20px_rgba(29,191,115,0.3)]'
                        : 'bg-[#1DBF73] text-white hover:bg-[#19a463] shadow-[0_4px_20px_rgba(29,191,115,0.35)]'
                    }`}
                    aria-label="View Daniyal Ahmad on Fiverr"
                  >
                    <span>View on Fiverr</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>



        {/* Software & Tech Stack */}
        <section className={`py-24 border-y ${isLight ? 'border-[rgba(93,75,139,0.12)] bg-[rgba(93,75,139,0.03)]' : 'border-white/5 bg-white/[0.02]'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>Our Arsenal</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isLight ? 'text-[#1e1830]/55' : 'text-white/50'}`}>We leverage industry-leading software to transition seamlessly from parametric modeling to photorealistic rendering.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`px-6 py-4 rounded-xl border backdrop-blur-md flex items-center gap-3 transition-colors ${isLight
                    ? 'border-[rgba(93,75,139,0.2)] bg-white/70 hover:border-[rgba(93,75,139,0.5)]'
                    : 'border-white/10 bg-black/40 hover:border-[#00d4ff]/50'
                  }`}
              >
                <span className={`font-medium ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cinematic Gallery Grid 
        <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight">The Studio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop" alt="Engineering Studio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-black/80 to-transparent'}`} />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#00d4ff] font-mono text-xs tracking-widest uppercase mb-1">Facility</p>
                <h3 className="text-2xl font-bold text-white">Rapid Prototyping Lab</h3>
              </div>
            </div>

            <div className="h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2564&auto=format&fit=crop" alt="3D Workstation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-black/80 to-transparent'}`} />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#7c3aed] font-mono text-xs tracking-widest uppercase mb-1">Hardware</p>
                <h3 className="text-2xl font-bold text-white">Render Farms</h3>
              </div>
            </div>

            <div className="h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2671&auto=format&fit=crop" alt="Design Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-black/80 to-transparent'}`} />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#00d4ff] font-mono text-xs tracking-widest uppercase mb-1">Team</p>
                <h3 className="text-2xl font-bold text-white">Design Huddles</h3>
              </div>
            </div>

            <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2670&auto=format&fit=crop" alt="CAD Screen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/80 to-transparent' : 'bg-gradient-to-t from-black/80 to-transparent'}`} />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#7c3aed] font-mono text-xs tracking-widest uppercase mb-1">Process</p>
                <h3 className="text-2xl font-bold text-white">Parametric Modeling</h3>
              </div>
            </div>
          </div>
        </section>
        */}
      </main>
    </div>
  );
}