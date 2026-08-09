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

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused || video.ended) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error('Video playback error:', error);
    }
  };

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
            We engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">meaning</span>.
            <br />
            Not just <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">products</span>.
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,212,255,0.3)] shrink-0"
          >
            See our work
          </Link>
        </div>

        <p className={`${subtitleColor} max-w-3xl mx-auto text-center mb-16 text-lg md:text-xl leading-relaxed`}>
          We go beyond <strong className={`${isLight ? 'text-[#1e1830]' : 'text-white'} font-semibold`}>form and function</strong>, decode what a product needs to say, then build it <strong className={`${isLight ? 'text-[#1e1830]' : 'text-white'} font-semibold`}>to say it exactly right</strong>. Deep technical insight creates work that doesn't just perform. It <strong className="text-[#00d4ff] font-semibold">resonates</strong>.
        </p>

        <div className={`relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border ${cardBorder} ${cardBg}`}>
          <div className="absolute inset-0 z-10 overflow-hidden">
            <img
              src={thumbnailImagePath}
              alt="Video preview thumbnail"
              className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <video
            ref={videoRef}
            src="/assets/video/3d-cad-design.mp4"
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            onPlay={() => setIsLoaded(true)}
            onLoadedData={() => setIsLoaded(true)}
          />

          <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={togglePlayback}
              className={`relative z-20 inline-flex items-center gap-3 rounded-full px-6 py-4 transition-all duration-300 hover:scale-105 ${buttonStyle}`}
            >
              <span className={`block w-0 h-0 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-l-[18px] ${isPlaying ? 'opacity-0' : iconColor}`} />
              <span className={`block w-5 h-5 rounded-full border border-current ${isPlaying ? 'bg-current' : 'bg-transparent'}`} />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                {isPlaying ? 'Pause video' : 'Play video'}
              </span>
            </button>
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-white/90 text-sm tracking-[0.18em] uppercase">Loading video...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
