"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What CAD and rendering software do you specialize in?",
    answer: "We primarily utilize SolidWorks, Fusion 360, and Rhino for precision parametric and surface modeling. For cinematic rendering and visualization, we rely on Cinema 4D, Blender, and Unreal Engine 5 to achieve photorealistic results."
  },
  {
    question: "How do you ensure manufacturing tolerances are met?",
    answer: "Every mechanical design undergoes rigorous tolerance analysis and DFM (Design for Manufacturing) checks. We simulate assemblies and kinematic movements to guarantee that all parts fit and function perfectly before any prototyping begins."
  },
  {
    question: "Do you handle the prototyping phase?",
    answer: "Yes. We work closely with trusted manufacturing partners to produce high-fidelity prototypes using advanced SLA/SLS 3D printing, CNC machining, and rapid tooling. We oversee the iteration process until the prototype perfectly matches the digital twin."
  },
  {
    question: "What is your typical turnaround time for a product visualization?",
    answer: "For standard photorealistic product renders (studio lighting, multiple angles), we typically deliver within 1 to 2 weeks. Complex animations or highly technical exploded-view mechanical breakdowns may take 3 to 4 weeks depending on the complexity of the CAD assembly."
  },
  {
    question: "Can you reverse engineer an existing physical part?",
    answer: "Absolutely. We utilize high-resolution 3D scanning and manual precision measurement to reverse engineer physical components, delivering highly accurate, fully editable parametric CAD files ready for modification or mass production."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-32 bg-[#060912] z-10 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-white mb-4">
            Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Answers.</span>
          </h2>
          <p className="text-white/60 text-lg">
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
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-[#0a0f1a] border-[rgba(0,212,255,0.3)]' : 'bg-transparent border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-[#00d4ff]' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`shrink-0 ml-4 p-2 rounded-full ${isOpen ? 'bg-[rgba(0,212,255,0.1)] text-[#00d4ff]' : 'bg-[rgba(255,255,255,0.05)] text-white/60'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-white/60 text-base md:text-lg leading-relaxed">
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
