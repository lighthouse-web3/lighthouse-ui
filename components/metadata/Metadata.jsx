import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Script from "next/script";

function Metadata({
  title = "Lighthouse Storage - Store Data Permanently & Securely",
  description = "Decentralized storage powered by Filecoin. Secure, scalable, and ideal for individuals, developers, and enterprises.",
  url = "https://lighthouse.storage/",
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
}) {
  const router = useRouter();

  // ✅ Use environment variable for GA ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // ✅ Skip analytics in development or if not configured
  const shouldLoadAnalytics = gaId && process.env.NODE_ENV === "production";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta name="msvalidate.01" content="604856DE8115C3F615EDBDB485DD021A" />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>

      {/*Only load if configured and in production  */}
      {shouldLoadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
            onError={(e) => {
              console.error("Google Analytics failed to load:", e);
            }}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            onError={(e) => {
              console.error("Google Analytics initialization failed:", e);
            }}
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default Metadata;
