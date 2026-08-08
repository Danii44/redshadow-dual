"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "",
    title: "Requirements and Dimensions",
    description: "We analyze technical drawings, customer specifications, envelope dimensions, and tolerance limits to define exact engineering parameters."
  },
  {
    number: "",
    title: "Feasibility Test",
    description: "Evaluating structural viability, stress performance, and material suitability before committing to full 3D modeling."
  },
  {
    number: "",
    title: "Draft Design",
    description: "Creating initial parametric 3D CAD models and spatial layouts for early design review and geometric alignment."
  },
  {
    number: "",
    title: "Rapid Prototyping",
    description: "Iterating and refining 3D digital prototypes for physical validation, ergonomics, and component fit testing."
  },
  {
    number: "",
    title: "DFM (Manufacturing Ready Model)",
    description: "Finalizing production-grade CAD models with draft angles, wall thicknesses, and STEP/STL exports for injection molding, CNC, or 3D printing."
  },
  {
    number: "",
    title: "Renders",
    description: "Producing studio-quality photorealistic product visualizations with realistic materials, textures, and lighting environments."
  },
  {
    number: "",
    title: "Animations",
    description: "Delivering exploded view assembly animations, 360° turntables, and functional mechanism videos for marketing and investor decks."
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-24">
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe] uppercase tracking-[0.16em] text-[0.66rem]">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]">Process</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Our 7-step engineering & design workflow guarantees precision, manufacturing readiness, and stunning visual presentation.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 md:pl-16">
          {/* Vertical Connecting Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-[#00d4ff] to-[#7c3aed] rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)] -translate-x-[1.5px]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => {
              return (
                <div key={index} className="relative flex items-center w-full">

                  {/* Timeline Dot */}
                  <div className="absolute -left-8 md:-left-16 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a] border-2 border-[rgba(0,212,255,0.4)] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(124,58,237,0.2)] -translate-x-1/2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
                  </div>

                  {/* Content Card */}
                  <div className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.05 }}
                      className="glass-strong p-6 md:p-8 rounded-3xl relative overflow-hidden group transition-colors duration-500 w-full"
                    >
                      <div className="absolute -right-4 -top-4 text-7xl font-black text-white/5 font-mono pointer-events-none select-none">
                        {step.number}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-3">
                        <span className="text-[#00d4ff] font-mono text-sm">{step.number}.</span>
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
