import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Metadata({
  title = "Lighthouse",
  description = "Store Files Perpetually on IPFS and Filecoin",
  url = "lighthouse.storage",
  image = "https://gateway.lighthouse.storage/ipfs/Qmd7rR9EPKomhmoRUw2WB7FJAeSWAtC8c1nkKgGZL39LpB",
}) {
  const router = useRouter();

  return (
    <Head>
      <title>Lighthouse Perpetual Storage</title>
      <meta name="title" content="Lighthouse Perpetual Storage" />
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
      <meta property="twitter:url" content="https://www.lighthouse.storage/" />
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
  );
}

export default Metadata;
