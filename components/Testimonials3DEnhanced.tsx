"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechNova",
    content: "Working with Red Shadow Designs completely transformed our online presence. Their attention to detail and innovative 3D elements made our brand stand out in a crowded market.",
  },
  {
    name: "Marcus Aurelius",
    role: "Founder, Stoic Solutions",
    content: "The level of creativity and technical expertise is unmatched. They don't just build websites; they craft immersive digital experiences that captivate our users.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, Lumina",
    content: "From the initial concept to the final execution, the process was seamless. The dynamic interfaces and animations have significantly increased our user engagement.",
  },
  {
    name: "David Chen",
    role: "Lead Designer, Apex Creative",
    content: "As a fellow designer, I have high standards. Red Shadow Designs exceeded all of them. Their mastery of modern web technologies is truly inspiring.",
  }
];

export default function Testimonials3DEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === 'light';

  useEffect(() => {
    if (!mounted || !sectionRef.current || !containerRef.current) return;

    let refreshTimeout = 0;
    const onLoad = () => ScrollTrigger.refresh();
    const onResize = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Ensure the pinned section has enough height to host the scroll animation
      const sectionHeight = Math.max(window.innerHeight * (cards.length + 0.8), window.innerHeight + cards.length * 280);
      sectionRef.current!.style.minHeight = `${sectionHeight}px`;

      // Position all cards at center stacked
      gsap.set(cards, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        y: 180,
        scale: 1,
        filter: 'blur(0px)',
        willChange: 'transform, opacity, filter',
        zIndex: (i) => i + 1,
      });

      // First card starts fully visible
      if (cards[0]) {
        gsap.set(cards[0], { opacity: 1, y: 0 });
      }

      const totalScroll = window.innerHeight * (cards.length + 0.75);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: sectionRef.current,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      testimonials.forEach((_, index) => {
        if (index === 0) return;
        const currentCard = cards[index];
        if (!currentCard) return;

        // Animate new card in from bottom
        tl.to(currentCard, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });

        // Stack previous cards with scale, shift, opacity & depth-of-field blur
        for (let j = 0; j < index; j++) {
          const prevCard = cards[j];
          if (prevCard) {
            const depth = index - j;
            tl.to(
              prevCard,
              {
                scale: Math.max(1 - depth * 0.05, 0.8),
                y: -(depth * 24),
                opacity: Math.max(1 - depth * 0.22, 0.3),
                filter: `blur(${depth * 2.5}px)`,
                duration: 1,
                ease: 'power2.out',
              },
              '<'
            );
          }
        }
        tl.to({}, { duration: 0.4 });
      });

      // Refresh ScrollTrigger after images or other resources settle
      window.addEventListener('load', onLoad);
      window.addEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 200);

      return () => {
        window.removeEventListener('load', onLoad);
        window.removeEventListener('resize', onResize);
        window.clearTimeout(refreshTimeout);
      };
    }, sectionRef);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full min-h-screen overflow-visible z-10"
      style={{ background: isLight ? '#f8f6ff' : '#060912' }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[90px] ${isLight ? 'bg-[rgba(124,58,237,0.1)]' : 'bg-[rgba(0,212,255,0.15)]'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[90px] ${isLight ? 'bg-[rgba(99,102,241,0.08)]' : 'bg-[rgba(124,58,237,0.12)]'}`} />
      </div>

      <div className="absolute top-[8%] left-0 w-full text-center z-20 px-4">
        <div className={`inline-block mb-3 px-4 py-1 rounded-full text-[0.66rem] uppercase tracking-[0.16em] font-semibold border ${isLight ? 'border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#7c3aed]' : 'border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#a3f0ff]'
          }`}>
          Client Signal
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight mb-3">
          Proven Impact
        </h2>
        <p className={`max-w-2xl mx-auto text-xs md:text-sm leading-relaxed ${isLight ? 'text-[#3E325D]/80' : 'text-white/60'}`}>
          See how our engineering precision and cinematic 3D visual implementations have elevated ambitious brands.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-full max-w-4xl mx-auto z-10 pt-[14vh]">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="w-[90%] max-w-[680px] rounded-3xl p-6 md:p-10 flex flex-col gap-6 relative"
            style={{
              background: isLight ? 'rgba(255, 255, 255, 0.95)' : '#060912',
              boxShadow: isLight ? '0 24px 80px rgba(62, 50, 93, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.8)' : '0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
              border: isLight ? '1px solid rgba(124, 58, 237, 0.2)' : '1px solid rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="absolute top-6 left-6 w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] rounded-full" />
            <div className="mt-3">
              <p className={`text-base md:text-xl leading-relaxed font-light italic ${isLight ? 'text-[#1e1830]' : 'text-white/90'}`}>
                "{testimonial.content}"
              </p>
            </div>
            <div className={`flex items-center gap-4 mt-2 pt-4 border-t ${isLight ? 'border-purple-100' : 'border-white/10'}`}>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className={`font-bold text-base md:text-lg ${isLight ? 'text-[#1e1830]' : 'text-white'}`}>{testimonial.name}</h4>
                <p className={`text-xs md:text-sm ${isLight ? 'text-[#5D4B8B]' : 'text-white/60'}`}>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
