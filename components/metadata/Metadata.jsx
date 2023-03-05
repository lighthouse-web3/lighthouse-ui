import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Metadata({
  title = "Lighthouse",
  description = "Store Files Perpetually on IPFS and Filecoin",
  url = "lighthouse.storage",
  image = "https://www.lighthouse.storage/_next/image?url=%2Flogo.png&w=1920&q=75",
}) {
  const router = useRouter();

  return (
    <Head>
      {/* Primary Meta Tags  */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="dark" />
      <meta name="author" content="Lighthouse" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LighthouseWeb3" />
      <meta name="twitter:creator" content="@LighthouseWeb3" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lighthouse Storage" />

      <meta
        property="og:url"
        content={`https://www.lighthouse.storage${router?.asPath}`}
        key="og-url"
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}

export default Metadata;
