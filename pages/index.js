import { useEffect, useState } from "react";
import { Metadata } from "../components";
import {
  FAQContainer,
  FeatureCardList,
  FeatureCompare,
  Footer,
  // Header,
  HomeBanner,
  NewsBar,
  PartnerCarousel,
  Testimonials,
} from "../containers";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../containers/Header/Header"));

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Metadata title="Lighthouse Perpetual Storage" />
      <div className={"bodyContainer"}>
        <NewsBar />
        <Header />
        <div className="sectionContainer">
          <div className="contentContainer">
            <HomeBanner />
          </div>
        </div>

        <div className="sectionContainer" style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <PartnerCarousel />
          </div>
        </div>
        <div className="sectionContainer">
          <div className="contentContainer container">
            <FeatureCompare />
          </div>
        </div>
        <div className="sectionContainer" style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <Testimonials />
          </div>
        </div>
        <div className="sectionContainer">
          <div className="contentContainer container">
            <FeatureCardList />
          </div>
        </div>
        <div className="sectionContainer">
          <div className="contentContainer container">
            <FAQContainer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
