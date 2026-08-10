"use client";

import React, { useEffect, useState } from 'react';
import { projects } from '@/lib/projects';

export default function PreviewCarousel({ service }: { service: any }) {
  const images = getPreviewImages(service);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 400);
    return () => clearInterval(interval);
  }, [service.slug, images.join('|')]);

  const src = images.length ? images[idx] : '/assets/images/thumbnail.png';

  return (
    <div className="w-full h-full relative">
      <img src={src} alt={`${service.title} preview`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function getPreviewImages(service: any) {
  // Prefer explicit heroImage, otherwise select a curated set per slug
  const slug = (service.slug || '').toLowerCase();
  const explicit = service.heroImage ? [service.heroImage] : [];

  const mapping: Record<string, string[]> = {
    'feasibility-test': ['/assets/images/services/cad-1.jpg','/assets/images/services/cad-2.jpg','/assets/images/services/3d-viz-1.jpg'],
    'cad-design': ['/assets/images/services/cad-2.jpg','/assets/images/services/cad-1.jpg','/assets/images/services/3d-viz-1.jpg'],
    'mechanical-engineering': ['/assets/images/services/cad-1.jpg','/assets/images/services/cad-2.jpg'],
    'rapid-prototyping': ['/assets/images/services/cad-2.jpg','/assets/images/services/3d-viz-1.jpg'],
    '3d-printing': ['/assets/images/services/3d-viz-1.jpg','/assets/images/services/3d-viz-2.jpg'],
    'design-for-manufacturing': ['/assets/images/services/cad-1.jpg','/assets/images/services/cad-2.jpg'],
    'product-visualization-renders': ['/assets/images/services/3d-viz-2.jpg','/assets/images/services/3d-viz-3.jpg','/assets/images/services/3d-viz-1.jpg'],
    'product-animations': ['/assets/images/services/3d-viz-3.jpg','/assets/images/services/3d-viz-4.jpg'],
  };

  // Start with explicit hero image (if present), but always supplement with
  // curated mapping or sensible fallbacks so the carousel has multiple frames.
  let selected: string[] = [...explicit];
  if (mapping[slug]) selected = [...selected, ...mapping[slug]];
  else if (slug.includes('3d') || slug.includes('render') || (service.title||'').toLowerCase().includes('render')) selected = [...selected, '/assets/images/services/3d-viz-1.jpg','/assets/images/services/3d-viz-2.jpg'];
  else selected = [...selected, '/assets/images/services/cad-1.jpg','/assets/images/services/cad-2.jpg','/assets/images/services/3d-viz-1.jpg'];

  // Supplement with project images to avoid repeats
  const projectImgs = projects.map((p) => p.image).filter(Boolean) as string[];
  if (projectImgs.length > 0) {
    const seed = (slug || '')
      .split('')
      .reduce((s: number, ch: string) => s + ch.charCodeAt(0), 0);
    for (let i = 0; i < projectImgs.length && selected.length < 4; i++) {
      const idx = (seed + i) % projectImgs.length;
      if (!selected.includes(projectImgs[idx])) selected.push(projectImgs[idx]);
    }
  }

  // Ensure uniqueness and limit to 4
  return Array.from(new Set(selected)).slice(0, 4);
}
