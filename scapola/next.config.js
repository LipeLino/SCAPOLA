/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',  
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

const withImage = require('next-images');

module.exports = withImage(nextConfig);