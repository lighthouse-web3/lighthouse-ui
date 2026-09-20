import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Script from "next/script";
import { SITE_URL } from "../../utils/Data/config";

/**
 * Every page used to fall back to the same default `url`, so every page shipped
 * `<link rel="canonical" href="https://lighthouse.storage/">` and told crawlers
 * it was a duplicate of the homepage. The canonical now follows the route the
 * visitor is actually on, built on SITE_URL so it agrees with the host the
 * sitemap emits. Pages that know their own URL ahead of the router — blog posts
 * rendered from CMS data — still pass `url` explicitly.
 */
function canonicalFromRouter(router) {
  const path = (router?.asPath || "/").split(/[?#]/)[0];

  // A dynamic route can render before its params resolve. A canonical carrying
  // a literal "[address]" is worse than falling back to the site root.
  if (path === "/" || path.includes("[")) {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path.replace(/\/+$/, "")}`;
}

function Metadata({
  title = "Lighthouse Web3 Storage",
  description = "Lighthouse Storage provides scalable, decentralized data storage on IPFS with support for networks like Filecoin and Walrus for developers and enterprises.",
  keywords = "decentralized storage, IPFS, Filecoin, Walrus, Web3 storage, scalable data storage, enterprise storage, Lighthouse Web3",
  url,
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
  siteName = "Lighthouse Storage",
  twitterHandle = "@LighthouseWeb3",
}) {
  const router = useRouter();
  const canonical = url || canonicalFromRouter(router);

  // The Organization node describes Lighthouse, not whichever page is being
  // rendered, so it stays pinned to the site root.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": `${SITE_URL}/`,
    "logo": image,
    "sameAs": [
      "https://twitter.com/LighthouseWeb3",
      "https://github.com/lighthouse-web3"
    ]
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Technical SEO Tags */}
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" hrefLang="en" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />
        <meta name="author" content={siteName} />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <meta property="twitter:site" content={twitterHandle} />
        <meta name="twitter:creator" content={twitterHandle} />

        <meta name="msvalidate.01" content="604856DE8115C3F615EDBDB485DD021A" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-20157XPF9Y"></Script>
      <Script id="google-analytics">
        {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-20157XPF9Y');`}
      </Script>
    </>
  );
}

export default Metadata;
