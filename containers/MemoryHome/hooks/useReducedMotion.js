import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Starts as false rather than reading matchMedia during render: the initialiser
 * also runs on the server, where `window` does not exist, which failed the
 * prerender of every page that uses this hook. The real preference is picked up
 * in the effect on the first client pass.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setReduced(query.matches);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
