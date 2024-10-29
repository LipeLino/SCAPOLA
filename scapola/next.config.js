/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
  assetPrefix: '/', // Ensures assets like images use relative paths
  images: {
    unoptimized: true, // Disables Next.js optimization for compatibility with `next export`
  },
};

module.exports = nextConfig;