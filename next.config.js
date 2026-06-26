/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  allowedDevOrigins: ['10.144.130.193'],
};

module.exports = nextConfig;