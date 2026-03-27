import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Script from "next/script";

function Metadata({
  title = "Lighthouse Web3 Storage",
  description = "Lighthouse Storage provides scalable, permanent decentralized data storage on IPFS & Filecoin for developers and enterprises. Pay once, store forever.",
  keywords = "decentralized storage, permanent storage, IPFS, Filecoin, Web3 storage, scalable data storage, enterprise storage, Lighthouse Web3",
  url = "https://lighthouse.storage/",
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
  siteName = "Lighthouse Storage",
  twitterHandle = "@LighthouseWeb3",
}) {
  const router = useRouter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": url,
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
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" hreflang="en" href={url} />
        <link rel="alternate" hreflang="x-default" href={url} />
        <meta name="author" content={siteName} />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
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
