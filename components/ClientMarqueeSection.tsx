"use client";

import { motion } from 'framer-motion';
import { Hexagon, Box, Triangle, Circle, Zap, Cloud, Globe, Cpu } from 'lucide-react';

const clients = [
  { id: 1, icon: Hexagon, name: "HexaCorp Engineering" },
  { id: 2, icon: Box, name: "Cube Industrial" },
  { id: 3, icon: Triangle, name: "Prism Dynamics" },
  { id: 4, icon: Circle, name: "Orbit Aerospace" },
  { id: 5, icon: Zap, name: "Volt Motors" },
  { id: 6, icon: Cloud, name: "Aero Medical" },
  { id: 7, icon: Globe, name: "Global CAD Systems" },
  { id: 8, icon: Cpu, name: "Neural Robotics" },
];

export default function ClientMarqueeSection() {
  // Duplicate array to create a seamless infinite loop
  const marqueeItems = [...clients, ...clients];

  return (
    <section className="relative w-full py-32 bg-[#060912] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white mb-6">
          Where our work<br/>made a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">difference</span>.
        </h2>
        <p className="text-white/60 max-w-3xl text-lg">
          Your idea has a <span className="text-[#00d4ff]">soul</span>. Our job is to find it, then build it so precisely that anyone who touches your product understands it <strong className="text-white font-semibold">without a word</strong>.
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex py-8">
        {/* Fade gradients at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060912] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060912] to-transparent z-10" />

        <motion.div 
          className="flex gap-8 md:gap-16 whitespace-nowrap px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((client, index) => {
            const Icon = client.icon;
            return (
              <div 
                key={`${client.id}-${index}`} 
                className="flex items-center justify-center shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#0a0f1a] border-2 border-[rgba(0,212,255,0.15)] shadow-[0_0_30px_rgba(124,58,237,0.1)] group hover:border-[#00d4ff] transition-colors duration-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white/40 group-hover:text-[#00d4ff] transition-colors duration-500" />
                  {/* Optional: Add client name text underneath if desired, though Octane8 just uses logos */}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
