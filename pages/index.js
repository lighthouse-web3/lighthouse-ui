import { Metadata } from "../components";
import MemoryHome from "../containers/MemoryHome/MemoryHome";

/**
 * The root is the memory product. The storage marketing page it used to render
 * now lives at /storage, which has been a crawled URL since before the swap.
 */
export default function Home() {
  return (
    <>
      <Metadata
        title="Lighthouse — A memory that moves with you."
        description="One verifiable memory layer for the context your agents need to remember, carry and build on."
      />
      <div className="memory-page">
        <MemoryHome />
      </div>
    </>
  );
}
