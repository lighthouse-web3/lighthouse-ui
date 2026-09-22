import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MemoryNetwork from "./components/MemoryNetwork";
import HowItWorks from "./components/HowItWorks";
import Principles from "./components/Principles";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { usePageMotion } from "./hooks/usePageMotion";

/**
 * The memory landing page, ported from the standalone Vite app. This is the
 * composition that used to live in its App.jsx; routing is now handled by the
 * files under pages/ instead of reading location.pathname.
 */
export default function MemoryHome() {
  useSmoothScroll();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const motionDisabled = reducedMotion || paused;
  usePageMotion(motionDisabled);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <MemoryNetwork
          motionDisabled={motionDisabled}
          paused={paused}
          reducedMotion={reducedMotion}
          onToggleMotion={() => setPaused((value) => !value)}
        />
        <HowItWorks motionDisabled={motionDisabled} />
        <Principles motionDisabled={motionDisabled} />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
