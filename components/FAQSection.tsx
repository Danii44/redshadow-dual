"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-32 bg-slate-50 dark:bg-[#060912] z-10 border-t border-slate-200/60 dark:border-[rgba(255,255,255,0.05)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mb-4">
            Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Answers.</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-lg">
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
                  <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-[#00d4ff]' : 'text-slate-900 dark:text-white'}`}>
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

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-slate-600 dark:text-white/60 text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
