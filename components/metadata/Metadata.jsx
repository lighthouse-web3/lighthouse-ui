import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Script from "next/script";

function Metadata({
  title = "Lighthouse",
  description = "Store Files Perpetually on IPFS and Filecoin",
  url = "lighthouse.storage",
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Lighthouse Permanent Storage</title>
        <meta name="title" content="Lighthouse Permanent Storage" />
        <meta
          name="description"
          content="Store Files Perpetually on IPFS and Filecoin"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lighthouse.storage/" />
        <meta property="og:title" content="Lighthouse Perpetual Storage" />
        <meta
          property="og:description"
          content="Store Files Perpetually on IPFS and Filecoin"
        />
        <meta
          property="og:image"
          content="https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.lighthouse.storage/"
        />
        <meta property="twitter:title" content="Lighthouse Perpetual Storage" />
        <meta name="msvalidate.01" content="604856DE8115C3F615EDBDB485DD021A" />
        <meta
          property="twitter:description"
          content="Store Files Perpetually on IPFS and Filecoin"
        />
        <meta
          property="twitter:image"
          content="https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB"
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
