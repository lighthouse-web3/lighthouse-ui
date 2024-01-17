import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Script from "next/script";

function Metadata({
  title = "Lighthouse",
  description = "Store Files Perpetually on IPFS and Filecoin",
  url = "https://lighthouse.storage",
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
}) {
  const router = useRouter();

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
