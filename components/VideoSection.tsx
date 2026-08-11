"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function VideoSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailImagePath = '/assets/images/thumbnail.png';

  const sectionBg = isLight ? 'bg-[#f4f1f9]' : 'bg-[#060912]';
  const textColor = isLight ? 'text-[#1e1830]' : 'text-white';
  const subtitleColor = isLight ? 'text-[#3e325d]/80' : 'text-white/60';
  const cardBg = isLight ? 'bg-white' : 'bg-[#090b14]';
  const cardBorder = isLight ? 'border-[rgba(93,75,139,0.15)]' : 'border-[rgba(0,212,255,0.15)]';
  const buttonStyle = isLight
    ? 'bg-white/95 text-[#1e1830] border border-[#7c3aed]/20 shadow-[0_20px_60px_rgba(124,58,237,0.18)]'
    : 'bg-[#0f1728]/95 text-white border border-white/10 shadow-[0_20px_60px_rgba(0,212,255,0.22)]';
  const iconColor = isLight ? 'border-l-[#1e1830]' : 'border-l-white';

  // autoplay when the video container is scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    const el = containerRef.current;
    if (!video || !el || typeof IntersectionObserver === 'undefined') return;

    video.muted = true;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        try {
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            await video.play();
          } else {
            video.pause();
          }
        } catch (e) {
          // autoplay may fail due to browser policies; ignore
        }
      });
    }, { threshold: [0.45] });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoaded = () => setIsLoaded(true);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoaded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoaded);
    };
  }, []);

  return (
    <section className={`relative w-full py-32 ${sectionBg} z-10`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight ${textColor}`}>
            Built to be pitched.
            <br />
            Engineered to be made.
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,212,255,0.3)] shrink-0"
          >
            See our work
          </Link>
        </div>

        <p className={`${subtitleColor} max-w-3xl mx-auto text-center mb-6 text-lg md:text-xl leading-relaxed`}>
          We speak the language of both investors and manufacturers. Our studio delivers the photorealistic cinematic assets you need to secure funding, backed by the rigorous, dimensionally accurate CAD files required to actually build the product. No guesswork, just flawless execution at every stage of product development.
        </p>

        <div className="flex justify-center mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/15 bg-white/10 text-white font-semibold tracking-wide hover:bg-white/15 transition-colors shadow-[0_10px_30px_rgba(0,212,255,0.16)]"
          >
            REQUEST A PROJECT QUOTE
          </Link>
        </div>

        <div ref={containerRef} className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border ${cardBorder} ${cardBg}`}>
          <img
            src={thumbnailImagePath}
            alt="Video preview thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
          />

          <video
            ref={videoRef}
            src="/assets/video/3d-cad-design.mp4"
            playsInline
            preload="metadata"
            muted
            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            onPlay={() => setIsLoaded(true)}
            onLoadedData={() => setIsLoaded(true)}
            onPause={() => setIsLoaded(true)}
          />

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/90 text-sm tracking-[0.18em] uppercase">Loading video...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
