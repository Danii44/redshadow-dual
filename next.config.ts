import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable HTTP compression (gzip/brotli) for JS, CSS, HTML
  compress: true,

  // Image optimisation — Next.js auto-converts to WebP/AVIF and resizes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Allow Unsplash images used in About and Portfolio pages
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;
