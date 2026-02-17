/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@rainbow-me/rainbowkit"]);

const markdownAcceptHeader = {
  type: "header",
  key: "accept",
  value: ".*text/markdown.*",
};

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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [markdownAcceptHeader],
          destination: "/index.md",
        },
        {
          source: "/pricing",
          has: [markdownAcceptHeader],
          destination: "/pricing.md",
        },
        {
          source: "/documentation",
          has: [markdownAcceptHeader],
          destination: "/documentation.md",
        },
        {
          source: "/faq",
          has: [markdownAcceptHeader],
          destination: "/faq.md",
        },
        {
          source: "/ecosystem",
          has: [markdownAcceptHeader],
          destination: "/ecosystem.md",
        },
        {
          source: "/terms-condition",
          has: [markdownAcceptHeader],
          destination: "/terms-condition.md",
        },
        {
          source: "/whitepaper",
          has: [markdownAcceptHeader],
          destination: "/whitepaper.md",
        },
        {
          source: "/turby",
          has: [markdownAcceptHeader],
          destination: "/turby.md",
        },
        {
          source: "/turby_mint",
          has: [markdownAcceptHeader],
          destination: "/turby_mint.md",
        },
        {
          source: "/blogs",
          has: [markdownAcceptHeader],
          destination: "/blogs.md",
        },
        {
          source: "/blogs/:path*",
          has: [markdownAcceptHeader],
          destination: "/blogs/:path*.md",
        },
        {
          source: "/turby_mint/:path*",
          has: [markdownAcceptHeader],
          destination: "/turby_mint/:path*.md",
        },
        {
          source: "/index.md",
          destination: "/api/markdown",
        },
        {
          source: "/pricing.md",
          destination: "/api/markdown/pricing",
        },
        {
          source: "/documentation.md",
          destination: "/api/markdown/documentation",
        },
        {
          source: "/faq.md",
          destination: "/api/markdown/faq",
        },
        {
          source: "/ecosystem.md",
          destination: "/api/markdown/ecosystem",
        },
        {
          source: "/terms-condition.md",
          destination: "/api/markdown/terms-condition",
        },
        {
          source: "/whitepaper.md",
          destination: "/api/markdown/whitepaper",
        },
        {
          source: "/turby.md",
          destination: "/api/markdown/turby",
        },
        {
          source: "/turby_mint.md",
          destination: "/api/markdown/turby_mint",
        },
        {
          source: "/blogs.md",
          destination: "/api/markdown/blogs",
        },
        {
          source: "/blogs/:path*.md",
          destination: "/api/markdown/blogs/:path*",
        },
        {
          source: "/turby_mint/:path*.md",
          destination: "/api/markdown/turby_mint/:path*",
        },
        {
          source: "/sitemap.md",
          destination: "/api/markdown/sitemap",
        },
      ],
    };
  },
};

module.exports = withTM(nextConfig);
