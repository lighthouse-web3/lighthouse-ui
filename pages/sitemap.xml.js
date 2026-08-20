import axios from "axios";
import { baseUrl } from "../utils/Data/config";
import { SITE_URL } from "../utils/Data/config";
import { STATIC_CANONICAL_PATHS } from "../lib/markdown";

// Crawl priority per page. Anything not listed falls back to DEFAULT_PRIORITY,
// so adding a canonical path in lib/markdown.js is enough to get it indexed.
const PRIORITY = {
  "/": 1.0,
  "/pricing": 0.9,
  "/documentation": 0.9,
  "/blogs": 0.8,
  "/ecosystem": 0.7,
  "/faq": 0.5,
  "/whitepaper": 0.5,
  "/turby": 0.3,
  "/turby_mint": 0.3,
  "/terms-condition": 0.2,
};
const DEFAULT_PRIORITY = 0.5;

function urlEntry({ loc, lastmod, changefreq = "weekly", priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function generateSiteMap(posts) {
  // Static pages carry no lastmod on purpose. Stamping the request time would
  // claim the page changed on every crawl, which is the fastest way to get a
  // crawler to stop trusting the field. Blog entries below use the CMS's real
  // updatedAt, so lastmod means something wherever it appears.
  const staticEntries = STATIC_CANONICAL_PATHS.map((path) =>
    urlEntry({
      loc: `${SITE_URL}${path}`,
      priority: PRIORITY[path] ?? DEFAULT_PRIORITY,
    }),
  );

  const blogEntries = (posts || [])
    .map((post) => post?.attributes)
    .filter((attributes) => attributes?.title?.trim())
    .map((attributes) =>
      urlEntry({
        loc: `${SITE_URL}/blogs/${encodeURIComponent(attributes.title.trim())}`,
        lastmod: attributes.updatedAt,
        priority: 0.3,
      }),
    );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ...staticEntries,
    ...blogEntries,
    "</urlset>",
  ].join("\n");
}

export async function getServerSideProps({ res }) {
  let blogsData = [];

  // A CMS outage should still leave a sitemap listing every static page,
  // rather than dropping the whole document.
  try {
    const response = await axios.get(
      `${baseUrl}/blogs?pagination[pageSize]=50&populate=*`,
    );
    if (response.status === 200 && Array.isArray(response.data?.data)) {
      blogsData = response.data.data;
    }
  } catch (err) {
    console.error("sitemap: could not load blogs from CMS", err?.message);
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(generateSiteMap(blogsData));
  res.end();

  return { props: {} };
}

export default function SiteMap() {}
