"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Hexagon, Box, Triangle, Circle, Zap, Cloud, Globe, Cpu, Layers } from "lucide-react";
import CTA from './ui/CTA';

type Category = "All" | "CAD" | "3D Modeling" | "Rendering" | "Motion & Post-Production";

interface SoftwareItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  category: "CAD" | "3D Modeling" | "Rendering" | "Motion & Post-Production";
}

// --- CLIENT DATA ---
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

// --- SOFTWARE DATA (Mapped to your exact public folder files) ---
const software: SoftwareItem[] = [
  {
    id: "solidworks",
    name: "SolidWorks",
    href: "https://www.solidworks.com/",
    icon: "/assets/icons/solidworks.png",
    category: "CAD",
  },
  {
    id: "ptc-creo",
    name: "PTC Creo",
    href: "https://www.ptc.com/en/products/cad/creo",
    icon: "/assets/icons/ptc-creo.svg",
    category: "CAD",
  },
  {
    id: "blender",
    name: "Blender",
    href: "https://www.blender.org/",
    icon: "/assets/icons/blender.svg",
    category: "3D Modeling",
  },
  {
    id: "keyshot",
    name: "KeyShot",
    href: "https://www.keyshot.com/",
    icon: "/assets/icons/keyshot.png",
    category: "Rendering",
  },
  {
    id: "after-effects",
    name: "Adobe After Effects",
    href: "https://www.adobe.com/products/aftereffects.html",
    icon: "/assets/icons/after-effects.svg",
    category: "Motion & Post-Production",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    href: "https://www.adobe.com/products/photoshop.html",
    icon: "/assets/icons/photoshop.svg",
    category: "Motion & Post-Production",
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    href: "https://www.adobe.com/products/illustrator.html",
    icon: "/assets/icons/illustrator.svg",
    category: "Motion & Post-Production",
  },
  {
    id: "canva",
    name: "Canva",
    href: "https://www.canva.com/",
    icon: "/assets/icons/canva.svg",
    category: "Motion & Post-Production",
  },
];

const categories: Category[] = ["All", "CAD", "3D Modeling", "Rendering", "Motion & Post-Production"];

export default function ClientMarqueeSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [mounted, setMounted] = useState(false);

  // Prevent client/server hydration DOM divergence
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSoftware = useMemo(() => {
    if (activeCategory === "All") return software;
    return software.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const marqueeItems = useMemo(() => {
    if (filteredSoftware.length < 6) {
      return [...filteredSoftware, ...filteredSoftware, ...filteredSoftware, ...filteredSoftware];
    }
    return [...filteredSoftware, ...filteredSoftware];
  }, [filteredSoftware]);

  const reversedMarqueeItems = useMemo(() => [...marqueeItems].reverse(), [marqueeItems]);

  if (!mounted) return null;

  return (
    <section className="relative w-full py-28 md:py-36 bg-slate-50 dark:bg-[#060912] z-10 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* SECTION HEADER & HERO COPY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-600/30 dark:border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
          Engineered For Excellence
        </div>

        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight leading-tight mb-8 text-slate-900 dark:text-white">
          Crafting vision into <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-[#00d4ff] dark:via-[#3b82f6] dark:to-[#7c3aed]">
            tangible reality
          </span>.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <p className="lg:col-span-8 text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
            Every product carries an identity. We refine raw concepts into engineered precision—building physical and digital experiences that speak clearly, function flawlessly, and elevate brand authority.
          </p>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 border-l border-slate-200 dark:border-white/10 pl-6">
            <div className="col-span-2 mb-2">
              <CTA href="mailto:hello@redshadowdesigns.com">Have a query? Contact now</CTA>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold font-mono text-cyan-600 dark:text-[#00d4ff]">100+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Products</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold font-mono text-purple-600 dark:text-purple-400">800+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* SOFTWARE MARQUEE WITH CATEGORY FILTER */}
      <div className="mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Production Tech Stack
              </h3>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={`cat-btn-${cat}`}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "text-slate-900 dark:text-white font-semibold"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5"
                  }`}
                >
                  {activeCategory === cat && (
                    <span className="absolute inset-0 bg-slate-200/80 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-purple-500/20 border border-slate-300 dark:border-cyan-500/40 rounded-full transition-opacity duration-300" />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MARQUEE ANIMATION CONTAINER */}
        <div key={activeCategory} className="space-y-4">
          {/* Row 1 (Left movement) */}
          <div className="relative w-full overflow-hidden py-2 flex">
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#060912] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#060912] to-transparent" />

            <motion.div
              className="flex flex-shrink-0 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex items-center gap-4 pr-4">
                {marqueeItems.map((s, idx) => (
                  <SoftwareCard key={`r1-group1-${s.id}-${idx}-${activeCategory}`} software={s} />
                ))}
              </div>
              <div className="flex items-center gap-4 pr-4">
                {marqueeItems.map((s, idx) => (
                  <SoftwareCard key={`r1-group2-${s.id}-${idx}-${activeCategory}`} software={s} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2 (Right movement) */}
          <div className="relative w-full overflow-hidden py-2 flex">
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#060912] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#060912] to-transparent" />

            <motion.div
              className="flex flex-shrink-0 w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex items-center gap-4 pr-4">
                {reversedMarqueeItems.map((s, idx) => (
                  <SoftwareCard key={`r2-group1-${s.id}-${idx}-${activeCategory}`} software={s} />
                ))}
              </div>
              <div className="flex items-center gap-4 pr-4">
                {reversedMarqueeItems.map((s, idx) => (
                  <SoftwareCard key={`r2-group2-${s.id}-${idx}-${activeCategory}`} software={s} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable card with error fallback handling
function SoftwareCard({ software }: { software: SoftwareItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={software.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3.5 px-5 py-3.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md hover:border-cyan-500/50 dark:hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.08] shadow-sm dark:shadow-none transition-all duration-300 group"
      title={`${software.name} (${software.category})`}
    >
      <div className="relative w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900/90 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/50 dark:group-hover:border-cyan-400/50 transition-colors">
        {!imgError ? (
          <img
            src={software.icon}
            alt={software.name}
            width={28}
            height={28}
            className="object-contain p-1"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">
            {software.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-slate-800 dark:text-slate-200 text-sm font-medium tracking-wide group-hover:text-slate-950 dark:group-hover:text-white transition-colors leading-none">
          {software.name}
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 mt-1 uppercase tracking-wider leading-none">
          {software.category}
        </span>
      </div>
    </a>
  );
}