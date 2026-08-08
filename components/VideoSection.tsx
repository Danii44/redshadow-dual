"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function VideoSection() {
  const { theme, resolvedTheme } = useTheme();
  const isLight = (resolvedTheme || theme) === 'light';

  return (
    <section className="relative w-full py-32 bg-[#060912] z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-white leading-tight">
            We engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">meaning</span>.<br/>
            Not just <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">products</span>.
          </h2>
          <Link 
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,212,255,0.3)] shrink-0"
          >
            See our work
          </Link>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 max-w-3xl mx-auto text-center mb-16 text-lg md:text-xl leading-relaxed">
          We go beyond <strong className="text-white font-semibold">form and function</strong>, decode what a product needs to say, then build it <strong className="text-white font-semibold">to say it exactly right</strong>. Deep technical insight creates work that doesn't just perform. It <strong className="text-[#00d4ff] font-semibold">resonates</strong>.
        </p>

        {/* 16:9 Media Frame */}
        <div className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-[rgba(0,212,255,0.15)] group cursor-pointer ${isLight ? 'bg-white' : 'bg-[#0a0a0a]'}`}>
          {/* Placeholder Image (Will be replaced by user video) */}
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
            alt="Engineering Video Placeholder"
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLight ? 'opacity-100 mix-blend-normal' : 'opacity-60 mix-blend-lighten'}`}
          />
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white/0 via-white/0 to-transparent' : 'bg-gradient-to-t from-[#060912] via-transparent to-transparent'}`} />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`w-24 h-24 rounded-full ${isLight ? 'bg-white/40' : 'bg-black/40'} backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-transform duration-300 group-hover:scale-110`}>
              <div className={`w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] ${isLight ? 'border-l-[#1e1830]' : 'border-l-white'} border-b-[12px] border-b-transparent ml-2`} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
