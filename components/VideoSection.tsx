"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailImagePath = '/assets/images/thumbnail.webp';

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
    <section className="video-section relative w-full py-32 bg-[#060912] z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <h2 className="video-section-title text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight text-white">
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

        <p className="video-section-subtitle text-white/60 max-w-3xl mx-auto text-center mb-6 text-lg md:text-xl leading-relaxed">
          We speak the language of both investors and manufacturers. Our studio delivers the professional visual assets you need for stakeholder review, backed by the rigorous, dimensionally accurate CAD files required to actually build the product. No guesswork, just strict adherence to DFM standards at every stage of product development.
        </p>

        <div className="flex justify-center mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/15 bg-white/10 text-white font-semibold tracking-wide hover:bg-white/15 transition-colors shadow-[0_10px_30px_rgba(0,212,255,0.16)]"
          >
            REQUEST A PROJECT QUOTE
          </Link>
        </div>

        <div ref={containerRef} className="video-card-container relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-[rgba(0,212,255,0.15)] bg-[#090b14]">
          <img
            src={thumbnailImagePath}
            alt="Video preview thumbnail"
            loading="lazy"
            decoding="async"
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
