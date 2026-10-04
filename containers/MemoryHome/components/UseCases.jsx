import { useEffect, useRef } from "react";
import { useCases } from "../data/usecases";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CaseDirectory, CaseDetail } from "./UseCaseExperience";
export default function UseCases({ slug }) {
  const item = useCases.find((c) => c.slug === slug);
  const page = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const nodes = page.current?.querySelectorAll("[data-ucx-reveal]") || [];
    if (reducedMotion) {
      nodes.forEach((node) => node.classList.remove("ucx-wait"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ucx-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("ucx-wait");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [slug, item, reducedMotion]);
  return (
    <>
      <Navbar />
      <main className="ucx-page" ref={page}>
        {slug && !item ? (
          <section className="ucx-shell ucx-not-found">
            <p className="ucx-kicker">LIGHTHOUSE USE CASES</p>
            <h1>Use case not found.</h1>
            <a className="ucx-button" href="/use-cases">
              Explore all use cases
            </a>
          </section>
        ) : item ? (
          <CaseDetail
            key={item.slug}
            item={item}
            reducedMotion={reducedMotion}
          />
        ) : (
          <CaseDirectory />
        )}
      </main>
      <Footer />
    </>
  );
}
