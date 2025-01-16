/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['pages', 'utils'],
  },
  //output: 'export',
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;