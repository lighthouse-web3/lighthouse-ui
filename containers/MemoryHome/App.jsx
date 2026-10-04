"use client";

import { useState } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Token from "./components/Token";
import MemoryNetwork from "./components/MemoryNetwork";
import HowItWorks from "./components/HowItWorks";
import Principles from "./components/Principles";
import UseCases from "./components/UseCases";
import ClosingCTA from "./components/ClosingCTA";
import FAQ from "./components/FAQ";
import BuildWithLighthouse from "./components/BuildWithLighthouse";
import Footer from "./components/Footer";
import { RouteContext } from "./RouteContext";
import { normalisePath } from "./data/seo";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { usePageMotion } from "./hooks/usePageMotion";

function Home() {
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
        <BuildWithLighthouse />
        <HowItWorks motionDisabled={motionDisabled} />
        <Principles motionDisabled={motionDisabled} />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

function RoutePage({ path }) {
  if (path === "/token") return <Token />;
  if (path === "/use-cases" || path.startsWith("/use-cases/"))
    return <UseCases slug={path.split("/")[2]} />;
  if (path === "" || path === "/index.html") return <Home />;
  return (
    <>
      <Navbar />
      <main className="ucx-page">
        <section className="ucx-shell ucx-not-found">
          <p className="ucx-kicker">LIGHTHOUSE</p>
          <h1>Page not found.</h1>
          <p>Check the address or return to Lighthouse.</p>
          <a className="ucx-button" href="/">
            Go to the homepage
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App({ path = "/" }) {
  useSmoothScroll();
  const canonicalPath = normalisePath(path);
  const route = canonicalPath.replace(/\/+$/, "");
  return (
    <RouteContext.Provider value={canonicalPath}>
      <RoutePage path={route} />
    </RouteContext.Provider>
  );
}
