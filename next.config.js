/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@rainbow-me/rainbowkit"]);

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // Disable SWC minification to avoid BigInt issues
  images: {
    dangerouslyAllowSVG: false,
    domains: [
      "images.unsplash.com",
      "gateway.lighthouse.storage",
      "cms.lighthouse.storage",
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Don't transpile viem and wagmi - they need BigInt support
    config.module.rules.push({
      test: /node_modules\/(viem|wagmi|@wagmi)/,
      use: [],
    });

    return config;
  },
  // Exclude problematic packages from SWC
  experimental: {
    externalDir: true,
  },
};

module.exports = withTM(nextConfig);
