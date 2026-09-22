import { Metadata } from "../../components";
import UseCases from "../../containers/MemoryHome/components/UseCases";
import { useSmoothScroll } from "../../containers/MemoryHome/hooks/useSmoothScroll";
import { useCases } from "../../containers/MemoryHome/data/usecases";

/**
 * One page per use case. The Vite build wrote a static HTML shell per route
 * through a bundler plugin; here the same routes come from getStaticPaths, so
 * each one is a real prerendered page with its own title and canonical.
 */
export default function UseCasePage({ slug }) {
  useSmoothScroll();
  const item = useCases.find((c) => c.slug === slug);

  return (
    <>
      <Metadata
        title={item ? `${item.name} | Lighthouse` : "Use cases | Lighthouse"}
        description={item?.description}
      />
      <div className="memory-page">
        <UseCases slug={slug} />
      </div>
    </>
  );
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
