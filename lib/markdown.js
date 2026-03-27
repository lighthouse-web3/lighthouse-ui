import axios from "axios";
import {
  AddOnsPricing,
  AnnualPricing,
  LifetimePricing,
  LandingPageData,
  documentationCards,
  footerData,
} from "../utils/Data/SiteContent";
import { whitepaperContent } from "../utils/Data/StaticPageContent";
import { turbyMintStaticContent, turbyPageContent } from "../utils/Data/TurbyContent";
import { baseUrl, NFTcontractAddress, NFTNetwork } from "../utils/Data/config";
import { fetchOwnedNFTs } from "../utils/services/nft";

const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
const NOSNIFF = "nosniff";

const STATIC_CANONICAL_PATHS = [
  "/",
  "/pricing",
  "/documentation",
  "/faq",
  "/ecosystem",
  "/terms-condition",
  "/whitepaper",
  "/turby",
  "/turby_mint",
  "/blogs",
];

function setMarkdownHeaders(res) {
  res.setHeader("Content-Type", MARKDOWN_CONTENT_TYPE);
  res.setHeader("X-Content-Type-Options", NOSNIFF);
}

function sendMarkdown(res, statusCode, body) {
  setMarkdownHeaders(res);
  res.status(statusCode).send(body);
}

function decodeEntities(text = "") {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function htmlToMarkdownText(value = "") {
  return decodeEntities(
    String(value)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizePath(pathname = "/") {
  let normalized = pathname || "/";
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  normalized = normalized.replace(/\/+/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function normalizeSegments(slug = []) {
  const segments = Array.isArray(slug) ? slug : [slug];
  const decodedSegments = segments
    .map((segment) => {
      try {
        return decodeURIComponent(String(segment));
      } catch {
        return String(segment);
      }
    })
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (decodedSegments.length === 0) {
    return "/";
  }

  if (decodedSegments.length === 1 && decodedSegments[0] === "index") {
    return "/";
  }

  return normalizePath(`/${decodedSegments.join("/")}`);
}

function safeText(value) {
  return String(value || "").trim();
}

function markdownLink(label, href) {
  if (!href) {
    return label;
  }
  return `[${label}](${href})`;
}

function formatPlanSection(plans, billingLabel) {
  const lines = [];

  plans.forEach((plan) => {
    lines.push(`### ${plan.title}`);
    if (billingLabel === "custom") {
      lines.push(`- Price: ${plan.cost === "Custom" ? "Custom" : `$${plan.cost}/month`}`);
    } else {
      lines.push(`- Price: $${plan.cost} ${billingLabel}`);
    }
    lines.push("- Features:");
    plan.features.forEach((feature) => {
      const value = feature.value === "icon" ? "Yes" : feature.value === "icon-cross" ? "No" : feature.value;
      lines.push(`  - ${feature.title}: ${value}`);
    });
    lines.push("");
  });

  return lines.join("\n").trim();
}

async function fetchBlogs() {
  try {
    const response = await axios.get(
      `${baseUrl}/blogs?pagination[pageSize]=50&populate=*`
    );
    if (response.status !== 200) {
      return [];
    }
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
}

async function fetchMainSiteFaqs() {
  try {
    const response = await axios.get(`${baseUrl}/faqs?populate=*`);
    if (response.status !== 200 || !Array.isArray(response.data?.data)) {
      return [];
    }
    return response.data.data.filter(
      (faq) => faq?.attributes?.Platform === "Mainsite"
    );
  } catch {
    return [];
  }
}

function renderFaqSection(faqs, title = "FAQs") {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return "";
  }

  const lines = [`## ${title}`, ""];
  faqs.forEach((faq, index) => {
    const question = safeText(faq?.attributes?.question) || `Question ${index + 1}`;
    const answer = htmlToMarkdownText(faq?.attributes?.answer);
    lines.push(`${index + 1}. **${question}**`);
    lines.push(answer || "Answer unavailable.");
    lines.push("");
  });

  return lines.join("\n").trim();
}

async function buildHomeMarkdown() {
  const heroTitle = htmlToMarkdownText(LandingPageData?.HeroSection?.title);
  const heroSubtitle = safeText(LandingPageData?.HeroSection?.subTitle);
  const faqs = await fetchMainSiteFaqs();

  const lines = [
    "# Lighthouse Storage",
    "",
    heroTitle,
    "",
    heroSubtitle,
    "",
    "## Why choose Lighthouse?",
    "",
  ];

  (LandingPageData?.KeyFeatures || []).forEach((feature) => {
    lines.push(`- **${feature.title}**: ${safeText(feature.subTitle)}`);
  });

  lines.push("", "## Lighthouse Suite", "");
  (LandingPageData?.lighthouseSuit || []).forEach((suite) => {
    lines.push(`### ${suite.title}`);
    lines.push(safeText(suite.subTitle));
    lines.push("");
    lines.push(safeText(suite.description));
    lines.push("");
    if (suite.link) {
      lines.push(`- Link: ${suite.link}`);
    }
    (suite.featureCard || []).forEach((feature) => {
      lines.push(`- ${feature.title}: ${safeText(feature.subTitle)}`);
    });
    lines.push("");
  });

  const faqSection = renderFaqSection(faqs);
  if (faqSection) {
    lines.push(faqSection);
  }

  return lines.join("\n").trim();
}

async function buildPricingMarkdown() {
  const lines = [
    "# Lighthouse Pricing",
    "",
    "## Annual Plans",
    "",
    formatPlanSection(AnnualPricing, "per month (billed yearly)"),
    "",
    "## Lifetime Plans",
    "",
    formatPlanSection(LifetimePricing, "one-time"),
    "",
    "## Add-on Plans",
    "",
    formatPlanSection(AddOnsPricing, "custom"),
    "",
    renderFaqSection(LandingPageData?.PricingFAQs, "Pricing FAQs"),
  ];

  return lines.filter(Boolean).join("\n").trim();
}

function buildDocumentationMarkdown() {
  const doc = LandingPageData?.Documentation || {};

  const lines = [
    `# ${safeText(doc.title) || "Lighthouse Documentation"}`,
    "",
    safeText(doc.subtitle),
    "",
    "## Quick Links",
    "",
  ];

  documentationCards.forEach((card) => {
    lines.push(`- ${markdownLink(card.title, card.link)}: ${safeText(card.subTitle)}`);
  });

  return lines.join("\n").trim();
}

async function buildFaqMarkdown() {
  const faqs = await fetchMainSiteFaqs();
  const section = renderFaqSection(faqs, "FAQs");

  if (!section) {
    return "# FAQs\n\nFAQ content is currently unavailable.";
  }

  return `# Lighthouse FAQs\n\n${section}`.trim();
}

function buildEcosystemMarkdown() {
  return [
    "# Lighthouse Ecosystem",
    "",
    "Explore the Lighthouse Ecosystem",
    "",
    "Harnessing the power of decentralized network, Lighthouse empowers developers, data contributors, and users with secure, transparent, and scalable infrastructure.",
    "",
    "Use the canonical URL `/ecosystem` with `Accept: text/markdown` for agent-friendly responses.",
  ].join("\n");
}

function buildTermsMarkdown() {
  const termsLink = (footerData?.otherLinks || []).find(
    (link) => link.text === "T&C"
  )?.link;

  const lines = [
    "# Terms and Conditions",
    "",
    "Lighthouse terms and conditions are published at the following URL:",
    "",
    termsLink || "Terms and conditions link is currently unavailable.",
  ];

  return lines.join("\n").trim();
}

function buildWhitepaperMarkdown() {
  return [
    "# Lighthouse Whitepaper",
    "",
    "Open the Lighthouse whitepaper using the preview link below:",
    "",
    whitepaperContent.previewUrl,
  ].join("\n");
}

function buildTurbyMarkdown() {
  const lines = [
    "# Turby by Lighthouse",
    "",
    `## ${turbyPageContent.aboutTitle}`,
    "",
    turbyPageContent.aboutDescription,
    "",
    `## ${turbyPageContent.benefitsTitle}`,
    "",
    turbyPageContent.benefitsDescription,
    "",
    renderFaqSection(LandingPageData?.TurbyFAQs, "Turby NFT FAQs"),
  ];

  return lines.filter(Boolean).join("\n").trim();
}

function buildTurbyMintMarkdown() {
  const lines = [
    `# ${turbyMintStaticContent.name}`,
    "",
    `- Chain: ${turbyMintStaticContent.chain}`,
    `- Contract: ${NFTcontractAddress}`,
    `- Network: ${NFTNetwork}`,
    "",
    turbyMintStaticContent.description,
    "",
    "## Links",
    "",
    `- ${markdownLink("Twitter", turbyMintStaticContent.socialLinks.twitter)}`,
    `- ${markdownLink("Discord", turbyMintStaticContent.socialLinks.discord)}`,
    `- ${markdownLink("Telegram", turbyMintStaticContent.socialLinks.telegram)}`,
    `- ${markdownLink("OpenSea", turbyMintStaticContent.socialLinks.opensea)}`,
    `- ${markdownLink("BaseScan", turbyMintStaticContent.socialLinks.baseScan)}`,
    "",
    renderFaqSection(LandingPageData?.TurbyFAQs, "Turby NFT FAQs"),
  ];

  return lines.filter(Boolean).join("\n").trim();
}

async function buildTurbyProfileMarkdown(address) {
  const ownerAddress = safeText(address);
  const lines = [
    "# Turby Profile",
    "",
    `- Wallet: ${ownerAddress}`,
    `- Contract: ${NFTcontractAddress}`,
    "",
  ];

  if (!ownerAddress) {
    lines.push("Wallet address is required.");
    return lines.join("\n").trim();
  }

  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (!alchemyApiKey) {
    lines.push("NFT data is unavailable because NEXT_PUBLIC_ALCHEMY_API_KEY is not configured.");
    return lines.join("\n").trim();
  }

  let nfts = [];
  try {
    nfts = await fetchOwnedNFTs(
      alchemyApiKey,
      NFTNetwork,
      NFTcontractAddress,
      ownerAddress
    );
  } catch {
    nfts = [];
  }

  lines.push(`- Total NFTs: ${nfts.length}`);
  lines.push("");

  if (nfts.length === 0) {
    lines.push("No Turby NFTs found for this wallet.");
    return lines.join("\n").trim();
  }

  lines.push("## Tokens", "");
  nfts.forEach((nft) => {
    lines.push(`- Token #${nft.tokenId}${nft.name ? ` (${nft.name})` : ""}`);
    if (nft.tokenURI) {
      lines.push(`  - Metadata: ${nft.tokenURI}`);
    }
    if (nft.image) {
      lines.push(`  - Image: ${nft.image}`);
    }
  });

  return lines.join("\n").trim();
}

async function buildBlogsIndexMarkdown() {
  const blogs = await fetchBlogs();

  const lines = [
    "# Lighthouse Blogs",
    "",
    blogs.length === 0
      ? "No blog posts are currently available."
      : "## Posts",
    "",
  ];

  blogs.forEach((blog) => {
    const title = safeText(blog?.attributes?.title);
    const description = htmlToMarkdownText(blog?.attributes?.description);
    const path = `/blogs/${encodeURIComponent(title)}`;
    const updatedAt = safeText(blog?.attributes?.updatedAt);
    lines.push(`- ${markdownLink(title, path)}`);
    if (description) {
      lines.push(`  - ${description}`);
    }
    if (updatedAt) {
      lines.push(`  - Updated: ${updatedAt}`);
    }
  });

  return lines.join("\n").trim();
}

async function buildBlogDetailMarkdown(rawSlug) {
  const slug = safeText(rawSlug);
  if (!slug) {
    return null;
  }

  const blogs = await fetchBlogs();
  const blog = blogs.find(
    (item) =>
      safeText(item?.attributes?.title).toLowerCase() === slug.toLowerCase()
  );

  if (!blog) {
    return null;
  }

  const attributes = blog.attributes || {};
  const title = safeText(attributes.title) || "Lighthouse Blog";
  const description = htmlToMarkdownText(attributes.description);
  const updatedAt = safeText(attributes.updatedAt);
  const coverImage = safeText(attributes?.coverImage?.data?.attributes?.url);
  const coverImageUrl = coverImage
    ? `https://cms.lighthouse.storage${coverImage}`
    : null;

  const lines = [`# ${title}`, ""];

  if (updatedAt) {
    lines.push(`- Updated: ${updatedAt}`);
  }
  lines.push(`- Canonical URL: /blogs/${encodeURIComponent(title)}`);
  lines.push("");

  if (description) {
    lines.push(description, "");
  }

  if (coverImageUrl) {
    lines.push(`Cover image: ${coverImageUrl}`, "");
  }

  return lines.join("\n").trim();
}

async function resolveMarkdownByPath(pathname) {
  if (pathname === "/") {
    return buildHomeMarkdown();
  }
  if (pathname === "/pricing") {
    return buildPricingMarkdown();
  }
  if (pathname === "/documentation") {
    return buildDocumentationMarkdown();
  }
  if (pathname === "/faq") {
    return buildFaqMarkdown();
  }
  if (pathname === "/ecosystem") {
    return buildEcosystemMarkdown();
  }
  if (pathname === "/terms-condition") {
    return buildTermsMarkdown();
  }
  if (pathname === "/whitepaper") {
    return buildWhitepaperMarkdown();
  }
  if (pathname === "/turby") {
    return buildTurbyMarkdown();
  }
  if (pathname === "/turby_mint") {
    return buildTurbyMintMarkdown();
  }
  if (pathname === "/blogs") {
    return buildBlogsIndexMarkdown();
  }

  if (pathname.startsWith("/blogs/")) {
    return buildBlogDetailMarkdown(pathname.slice("/blogs/".length));
  }

  if (pathname.startsWith("/turby_mint/")) {
    return buildTurbyProfileMarkdown(pathname.slice("/turby_mint/".length));
  }

  return null;
}

function getOriginFromRequest(req) {
  const forwardedProto = (req.headers["x-forwarded-proto"] || "https")
    .split(",")[0]
    .trim();
  const forwardedHost =
    (req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000")
      .split(",")[0]
      .trim();

  return `${forwardedProto}://${forwardedHost}`;
}

function toMarkdownPath(canonicalPath) {
  if (canonicalPath === "/") {
    return "/index.md";
  }
  return `${canonicalPath}.md`;
}

export async function sendMarkdownResponse(req, res, slug = []) {
  const pathname = normalizePath(normalizeSegments(slug));
  const markdown = await resolveMarkdownByPath(pathname);

  if (!markdown) {
    return sendMarkdown(
      res,
      404,
      "# 404 Not Found\n\nThe requested markdown page could not be found."
    );
  }

  return sendMarkdown(res, 200, markdown);
}

export async function sendMarkdownSitemapResponse(req, res) {
  const origin = getOriginFromRequest(req);
  const blogs = await fetchBlogs();

  const canonicalPaths = [...STATIC_CANONICAL_PATHS];
  const dynamicBlogPaths = blogs
    .map((blog) => safeText(blog?.attributes?.title))
    .filter(Boolean)
    .map((title) => `/blogs/${encodeURIComponent(title)}`);

  canonicalPaths.push(...dynamicBlogPaths);

  const canonicalLines = canonicalPaths.map((path) => `- ${origin}${path}`);
  canonicalLines.push(`- ${origin}/turby_mint/{address}`);

  const alternateLines = canonicalPaths.map(
    (path) => `- ${origin}${toMarkdownPath(path)}`
  );
  alternateLines.push(`- ${origin}/turby_mint/{address}.md`);

  const body = [
    "# Agent Markdown Sitemap",
    "",
    "Canonical URLs are listed first. Request markdown with `Accept: text/markdown`.",
    "",
    "## Canonical URLs",
    "",
    ...canonicalLines,
    "",
    "## Alternate .md URLs",
    "",
    ...alternateLines,
  ].join("\n");

  return sendMarkdown(res, 200, body);
}
