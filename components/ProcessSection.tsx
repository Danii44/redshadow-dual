"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CTA from './ui/CTA';

const steps = [
  {
    title: "Requirements and Dimensions",
    description: "We analyze technical drawings, customer specifications, envelope dimensions, and tolerance limits to define exact engineering parameters."
  },
  {
    title: "Feasibility Test",
    description: "Evaluating structural viability, stress performance, and material suitability before committing to full 3D modeling."
  },
  {
    title: "Draft Design",
    description: "Creating initial parametric 3D CAD models and spatial layouts for early design review and geometric alignment."
  },
  {
    title: "Rapid Prototyping",
    description: "Iterating and refining 3D digital prototypes for physical validation, ergonomics, and component fit testing. Deliverables include 3D print-ready files."
  },
  {
    title: "DFM (Manufacturing Ready Model)",
    description: "Finalizing production-grade CAD models with draft angles, wall thicknesses, and STEP/STL exports for injection molding, CNC, or 3D printing."
  },
  {
    title: "Renders",
    description: "Producing studio-quality photorealistic product visualizations with realistic materials, textures, and lighting environments."
  },
  {
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
          {/* Section pill — matches all other sections */}
          <div
            className="inline-flex mb-4 items-center gap-2 rounded-full uppercase font-semibold"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              border: '1px solid rgba(124,58,237,0.3)',
              background: 'rgba(124,58,237,0.08)',
              color: 'var(--primary, #7c3aed)',
            }}
          >
            Workflow
          </div>

          {/* h2 — site standard: clamp(2.25rem, 4.5vw, 3.75rem), weight 700 */}
          <h2
            className="font-mono tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--foreground)',
              margin: '0 0 1rem',
            }}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]">Process</span>
          </h2>

          {/* Subtitle — site standard */}
          <p
            className="max-w-2xl mx-auto"
            style={{
              color: 'var(--muted-foreground)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              lineHeight: 1.8,
            }}
          >
            Our 7-step engineering &amp; design workflow guarantees precision, manufacturing readiness, and stunning visual presentation.
          </p>
          <div className="mt-6 flex justify-center">
            <CTA href="/contact?topic=estimate">Need an estimate? Contact now</CTA>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 md:pl-16">
          {/* Vertical Connecting Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <motion.div
            className="absolute left-0 top-0 w-1 rounded-full -translate-x-[1.5px]"
            style={{
              height: lineHeight,
              background: 'linear-gradient(to bottom, #00d4ff, #7c3aed)',
              boxShadow: '0 0 15px rgba(0,212,255,0.5)',
            }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center w-full">

                {/* Timeline Dot */}
                <div
                  className="absolute -left-8 md:-left-16 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 -translate-x-1/2"
                  style={{
                    background: 'var(--background, #0a0a0a)',
                    border: '2px solid rgba(0,212,255,0.4)',
                    boxShadow: '0 0 20px rgba(124,58,237,0.2)',
                  }}
                >
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
                    {/* h3 — site standard: clamp(1.1–1.35rem), weight 600 */}
                    <h3
                      className="mb-3 flex items-center gap-3"
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: 'var(--muted-foreground)',
                        fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                        lineHeight: 1.75,
                      }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
