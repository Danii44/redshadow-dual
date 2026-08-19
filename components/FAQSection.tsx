"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Are your CAD files actually ready for manufacturing (CNC, Injection Molding, etc.)?",
    answer: "Absolutely. We are engineers first. We don't just create concepts that look good on screen; we build highly accurate parametric models using SolidWorks and PTC Creo. Every design undergoes strict Design for Manufacturability (DFM) review to ensure correct tolerances, draft angles, and assembly clearances."
  },
  {
    question: "I only have a rough sketch or a basic idea. Is that enough to get started?",
    answer: "Yes. We specialize in taking raw concepts and engineering them into tangible realities. Whether you have a comprehensive technical brief or just a sketch on a napkin, our team will guide you through feasibility testing, dimensioning, and the entire product development cycle."
  },
  {
    question: "I need to pitch my product to investors before we manufacture it. Can you help?",
    answer: "Yes, this is one of our core specialties. Because our engineering and visualization pipelines are fully integrated, we take the exact CAD geometry and use Blender and KeyShot to generate cinematic, photorealistic renders and motion animations. You get production-ready files and pitch-ready marketing assets from a single studio."
  },
  {
    question: "What happens if the design needs adjustments during the process?",
    answer: "Iteration is a natural part of hardware development. We build our CAD models with robust, adaptable feature trees, making revisions efficient. We map out clear project milestones and structured revision rounds in our initial quotes, so you always know exactly what to expect and when."
  },
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs) to protect my intellectual property?",
    answer: "100%. We understand that for hardware innovators, your IP is your most valuable asset. All client communications and project files are strictly confidential, and we are happy to sign standard NDAs before you share any sensitive briefs or proprietary concepts with our team."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-32 bg-slate-50 dark:bg-[#060912] z-10 border-t border-slate-200/60 dark:border-[rgba(255,255,255,0.05)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          {/* Section pill — matches all other sections */}
          <div
            className="inline-flex mb-4 items-center gap-2 rounded-full uppercase font-semibold"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              border: '1px solid rgba(0,212,255,0.3)',
              background: 'rgba(0,212,255,0.06)',
              color: 'var(--primary, #00d4ff)',
            }}
          >
            FAQ
          </div>

          {/* h2 — site standard: clamp(2.25rem, 4.5vw, 3.75rem), weight 700 */}
          <h2
            className="font-mono tracking-tight mb-4 text-slate-900 dark:text-white"
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 1rem',
            }}
          >
            Questions?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
              Answers.
            </span>
          </h2>

          {/* Subtitle — site standard */}
          <p
            className="text-slate-600 dark:text-white/60"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              lineHeight: 1.8,
            }}
          >
            Everything you need to know about our engineering and design process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen
                  ? 'bg-slate-100 dark:bg-[#0a0f1a] border-[rgba(0,212,255,0.3)]'
                  : 'bg-transparent border-slate-200 dark:border-[rgba(255,255,255,0.1)] hover:border-slate-300 dark:hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-inset"
                >
                  {/* Question — h3-level importance, consistent weight */}
                  <span
                    className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-[#00d4ff]' : 'text-slate-900 dark:text-white'}`}
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      lineHeight: 1.4,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`shrink-0 ml-4 p-2 rounded-full ${isOpen ? 'bg-[rgba(0,212,255,0.1)] text-[#00d4ff]' : 'bg-slate-100 dark:bg-[rgba(255,255,255,0.05)] text-slate-500 dark:text-white/60'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  style={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <div
                    className="px-6 md:px-8 pb-8 pt-0 text-slate-600 dark:text-white/60"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
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
