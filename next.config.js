/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: false,
    domains: [
      "images.unsplash.com",
      "gateway.lighthouse.storage",
      "cms.lighthouse.storage",
    ],
  },
};

module.exports = nextConfig;
