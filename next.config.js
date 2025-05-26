/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: false,
    domains: [
      "images.unsplash.com",
      "gateway.lighthouse.storage",
      "cms.lighthouse.storage",
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
    }
    return config
  },
};

module.exports = nextConfig;
