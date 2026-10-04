import Head from "next/head";
import App from "../containers/MemoryHome/App";
import { getPageMetadata } from "../containers/MemoryHome/data/seo";

/**
 * Site-wide not-found page, in the new design. It does not go through Metadata
 * on purpose: that component always emits a canonical and `index, follow`,
 * and a 404 should carry neither.
 */
export default function NotFound() {
  const page = getPageMetadata("/404/");

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="robots" content="noindex, follow" />
        <meta name="theme-color" content="#101012" />
      </Head>
      <div className="memory-page">
        <App path="/404/" />
      </div>
    </>
  );
}
