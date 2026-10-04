import MemoryPage from "../../containers/MemoryHome/MemoryPage";
import { useCases } from "../../containers/MemoryHome/data/usecases";

/**
 * One prerendered page per use case. `fallback: false` means an unknown slug
 * is a real 404 rather than a soft one rendered by the client.
 */
export default function UseCasePage({ slug }) {
  return <MemoryPage path={`/use-cases/${slug}/`} />;
}

export function getStaticPaths() {
  return {
    paths: useCases.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
