import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';
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
        // The design drop ships 0.1, which was reported as sluggish on this
        // site; 0.18 keeps the smoothing but settles in roughly half the time.
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
