import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';
import 'lenis/dist/lenis.css';

export function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let lenis;
    const update = () => {
      const paused = document.body.classList.contains('paused');
      if (paused) { lenis?.destroy(); lenis = undefined; }
      else if (!lenis) lenis = new Lenis({
        autoRaf: true,
        // The source site uses 0.1, which takes roughly 1.2s to settle a single
        // wheel tick and reads as sluggish. Frame timing was never the problem
        // (16.6ms average); this is purely how hard Lenis eases. 0.18 keeps the
        // smoothing but follows the wheel much more closely. Set it back to 0.1
        // to match the original exactly.
        lerp: 0.18,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -110 },
        allowNestedScroll: true,
      });
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => { observer.disconnect(); lenis?.destroy(); };
  }, [reduced]);
}
