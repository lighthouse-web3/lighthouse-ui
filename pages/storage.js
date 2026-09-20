import { Metadata } from "../components";
import StorageLanding from "../containers/StorageLanding/StorageLanding";

/**
 * Same tree as the homepage, on its own URL. Both exist while the root is still
 * storage-led; the canonical here is self-referencing, so when the root moves to
 * the memory product this page is already a crawled, indexed storage page rather
 * than a cold URL.
 */
export default function StoragePage() {
  return (
    <>
      <Metadata title="Lighthouse Storage - Store Data Securely & Reliably" />
      <StorageLanding />
    </>
  );
}
