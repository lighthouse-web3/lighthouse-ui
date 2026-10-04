import Head from "next/head";
import { Metadata } from "../../components";
import App from "./App";
import {
  SOCIAL_PREVIEW,
  canonicalUrl,
  getPageMetadata,
  pageSchema,
} from "./data/seo";

/**
 * The one piece of this folder that is not part of the design drop. The memory
 * UI is built as a standalone App Router site (app/layout.jsx, SitePage,
 * metadataFor); this does those three jobs for the pages router instead, so
 * everything else under containers/MemoryHome can stay a near-verbatim copy.
 *
 * - Titles, descriptions and the JSON-LD graph still come from data/seo.js,
 *   but go out through the shared Metadata component, so the memory pages get
 *   the same canonical, Open Graph and analytics handling as the rest.
 * - The .memory-page wrapper is what the scoped stylesheets key on. See
 *   scripts/scope-memory-css.mjs.
 */
export default function MemoryPage({ path }) {
  const page = getPageMetadata(path);

  return (
    <>
      <Metadata
        title={page.title}
        description={page.description}
        url={canonicalUrl(path)}
        image={SOCIAL_PREVIEW.url}
        siteName="Lighthouse"
        schema={pageSchema(path)}
      />
      <Head>
        <meta name="theme-color" content="#101012" />
        <meta property="og:image:alt" content={SOCIAL_PREVIEW.alt} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link
          rel="preload"
          href="/fonts/dm-sans-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="memory-page">
        <App path={path} />
      </div>
    </>
  );
}
