import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // optimizePackageImports removed — caused /_document unhandledRejection 
  // with pnpm + Next.js 15 when using server component page wrappers
};

export default nextConfig;
