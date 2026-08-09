"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const techStack = [
  { name: 'SolidWorks', icon: '⚙️' },
  { name: 'Cinema4D', icon: '🎬' },
  { name: 'AutoCAD', icon: '📐' },
  { name: 'Blender', icon: '🎨' },
  { name: 'Unreal Engine', icon: '🎮' },
  { name: 'Next.js', icon: '⚛️' },
  { name: 'WebGL', icon: '🌐' }
];

export default function AboutPageClient() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="w-full h-full object-cover opacity-20 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/10 via-[#02040a]/60 to-[#02040a]" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <div className="mb-6 text-sm text-white/50 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white">About</span>
            </div>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
              The Studio
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Precision</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto">
              We bridge the gap between heavy industrial design and digital cinematic artistry.
            </p>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Beyond traditional <br />CAD modeling.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Red Shadow Designs was founded on a simple premise: industrial engineering doesn't have to look industrial. We take raw mechanical concepts, complex assemblies, and visionary hardware, and we render them with the visual fidelity of a blockbuster film.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Whether you're presenting a new autonomous drone to investors, or need precise tooling documentation for a medical device, our hybrid team of mechanical engineers and 3D artists ensures your product is built accurately and presented flawlessly.
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
                { label: "Projects Delivered", value: "500+" },
                { label: "Years Experience", value: "10+" },
                { label: "Global Clients", value: "85+" },
                { label: "Dimensional Accuracy", value: "99.9%" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                  <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white/50 font-mono text-sm uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CEO / Founder Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
              Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Founder</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm p-8 md:p-12">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(124,58,237,0.12)] rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[rgba(0,212,255,0.08)] rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl border-2 border-[rgba(0,212,255,0.3)] overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.15)] bg-gradient-to-br from-[#0a1628] to-[#1a0033]">
                    <img
                      src="/assets/images/Profile.jpg"
                      alt="Daniyal Ahmad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Top-rated badge */}
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest">
                      ⭐ Top Rated Seller
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">Daniyal Ahmad</h3>
                  <p className="text-[#00d4ff] font-mono text-sm uppercase tracking-widest mb-4">Founder & CEO — Red Shadow Designs</p>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Daniyal is a mechanical engineer and precision 3D modelling specialist with over a decade of experience delivering production-ready CAD assemblies, cinematic renders, and complex industrial designs for clients across North America, Europe, and the Middle East. Rated as a Top Seller on Fiverr with 500+ successful projects delivered.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                    {['Mechanical Engineering', 'SolidWorks', 'Blender', '3D Rendering', 'Product Design', 'DFM'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://www.fiverr.com/daniyalahmad7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
                  >
                    <img src="/assets/images/fiverr.svg" alt="Fiverr" className="h-5 w-5" />
                    View Fiverr Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Fiverr CTA Section */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-[rgba(0,212,255,0.2)] p-10 md:p-16 text-center glass-card fiverr-cta-card"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[rgba(0,212,255,0.06)] blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[rgba(124,58,237,0.08)] blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available on Fiverr — Top Rated Seller
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Start Your Project on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Fiverr</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4">
                Red Shadow Designs is also available on Fiverr as a Top Rated Seller. Browse our gigs, view our full portfolio, and order directly — with Fiverr's buyer protection guarantee.
              </p>
              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-8 my-8">
                {[
                  { label: 'Projects Completed', value: '500+' },
                  { label: 'Rating', value: '5.0 ⭐' },
                  { label: 'Delivery', value: '4–8 Days' },
                  { label: 'Repeat Buyers', value: '90%' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">{s.value}</div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.fiverr.com/daniyalahmad7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-[#1dbf73] to-[#19a463] hover:shadow-[0_0_40px_rgba(29,191,115,0.4)] transition-all duration-300 hover:scale-105"
              >
                <img src="/assets/images/fiverr.svg" alt="Fiverr" className="h-5 w-5" />
                Contact on Fiverr
              </a>
              <p className="text-white/30 text-xs mt-4">Secured by Fiverr Buyer Protection. Fast response guaranteed.</p>
            </div>
          </motion.div>
        </section>

        {/* Software & Tech Stack */}
        <section className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Arsenal</h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">We leverage industry-leading software to transition seamlessly from parametric modeling to photorealistic rendering.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4">
            {techStack.map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-6 py-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-3 hover:border-[#00d4ff]/50 transition-colors"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-white font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cinematic Gallery Grid */}
        <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight">The Studio</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop" alt="Engineering Studio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#00d4ff] font-mono text-xs tracking-widest uppercase mb-1">Facility</p>
                <h3 className="text-2xl font-bold text-white">Rapid Prototyping Lab</h3>
              </div>
            </div>
            
            <div className="h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2564&auto=format&fit=crop" alt="3D Workstation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#7c3aed] font-mono text-xs tracking-widest uppercase mb-1">Hardware</p>
                <h3 className="text-2xl font-bold text-white">Render Farms</h3>
              </div>
            </div>

            <div className="h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2671&auto=format&fit=crop" alt="Design Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#00d4ff] font-mono text-xs tracking-widest uppercase mb-1">Team</p>
                <h3 className="text-2xl font-bold text-white">Design Huddles</h3>
              </div>
            </div>

            <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2670&auto=format&fit=crop" alt="CAD Screen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#7c3aed] font-mono text-xs tracking-widest uppercase mb-1">Process</p>
                <h3 className="text-2xl font-bold text-white">Parametric Modeling</h3>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
