import { SITE_URL } from "../../../utils/Data/config";

// The standalone export defaulted to the bare domain. Inside this app the
// origin has to be the one the sitemap and every other canonical use, or the
// memory pages would declare a different host from the rest of the site.
export const SITE_ORIGIN = SITE_URL.replace(/\/+$/, "");

export const SOCIAL_PREVIEW = {
  url: `${SITE_ORIGIN}/og.png?v=memory-20261003`,
  alt: "Lighthouse: persistent memory for AI agents. Shared context connects ChatGPT, Claude and Gemini.",
  type: "image/png",
  width: 1734,
  height: 907,
};

export const pages = {
  "/": {
    title: "A Persistent Brain for AI Agents | Lighthouse",
    description:
      "Give AI agents a persistent brain with long-term memory. Save, retrieve and recover context through the Lighthouse SDK or a supported MCP connection.",
    name: "Lighthouse Memory",
  },
  "/use-cases/": {
    title: "An Agent’s Brain: Memory Use Cases | Lighthouse",
    description:
      "Explore how AI agents can use persistent memory for trading research, prediction markets, asset documents and a proposed physical AI integration.",
    name: "AI agent memory use cases",
  },
  "/use-cases/trading-agents/": {
    title: "Memory for AI Trading Agents | Lighthouse",
    description:
      "Keep strategy research, risk preferences and decision records available across sessions. Explore a memory workflow for trading agents with Lighthouse.",
    name: "Memory for trading agents",
  },
  "/use-cases/prediction-markets/": {
    title: "Memory for Prediction Market Agents | Lighthouse",
    description:
      "Keep sources, assumptions and forecast revisions together. See how prediction market agents can retrieve earlier research and review resolved outcomes.",
    name: "Memory for prediction market agents",
  },
  "/use-cases/tokenised-assets/": {
    title: "Memory for Tokenised Asset Research | Lighthouse",
    description:
      "Connect issuer updates, document versions and research notes to an asset. Use content identifiers to check the source documents behind a review.",
    name: "Memory for tokenised asset research",
  },
  "/use-cases/physical-ai/": {
    title: "Memory for Physical AI: Proposed Integration | Lighthouse",
    description:
      "Explore Lighthouse’s proposed memory integration for robots and devices: site records, local buffering and recovery of saved operational history.",
    name: "Proposed memory integration for physical AI",
  },
  "/token/": {
    title: "Lighthouse Token: Utility and Tokenomics",
    description:
      "Read the proposed Lighthouse token model: lock tokens for service credits or pay for memory and storage. Allocation, supply and launch details are TBD.",
    name: "Lighthouse token",
  },
};

export const normalisePath = (path) => {
  const clean = path.replace(/\/index\.html$/, "/");
  return clean === "/" ? "/" : `${clean.replace(/\/+$/, "")}/`;
};
// `pages` is keyed with trailing slashes, as the export served them. This app
// serves and canonicalises without one (Next 308s /token/ to /token), so every
// URL that leaves this file goes through here.
export const canonicalUrl = (path) => {
  const route = normalisePath(path);
  return SITE_ORIGIN + (route === "/" ? "/" : route.replace(/\/+$/, ""));
};
export const getPageMetadata = (path) =>
  pages[normalisePath(path)] || {
    title: "Page Not Found | Lighthouse",
    description:
      "This Lighthouse page could not be found. Browse memory documentation, use cases or the homepage.",
    name: "Page not found",
    noindex: true,
  };

export function pageSchema(path) {
  const route = normalisePath(path),
    page = getPageMetadata(route);
  const url = canonicalUrl(route);
  const graph = [
    {
      "@type": "Organization",
      "@id": SITE_ORIGIN + "/#organisation",
      name: "Lighthouse",
      url: SITE_ORIGIN,
      logo: SITE_ORIGIN + "/assets/lighthouse-logo.svg",
    },
    {
      "@type": "WebSite",
      "@id": SITE_ORIGIN + "/#website",
      url: SITE_ORIGIN,
      name: "Lighthouse",
      publisher: { "@id": SITE_ORIGIN + "/#organisation" },
    },
    {
      "@type": route === "/use-cases/" ? "CollectionPage" : "WebPage",
      "@id": url + "#page",
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": SITE_ORIGIN + "/#website" },
    },
  ];
  if (route.startsWith("/use-cases/") && route !== "/use-cases/")
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Lighthouse",
          item: SITE_ORIGIN + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Use cases",
          item: canonicalUrl("/use-cases/"),
        },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
      ],
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
