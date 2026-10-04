import MemoryPage from "../containers/MemoryHome/MemoryPage";

/**
 * The root is the memory product. The storage marketing page it used to render
 * lives at /storage, which has been a crawled URL since before the swap.
 */
export default function Home() {
  return <MemoryPage path="/" />;
}
