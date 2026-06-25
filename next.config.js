/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;

module.exports = {
  allowedDevOrigins: ['10.144.130.193'],
}