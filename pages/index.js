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
  Testimonials,
} from "../containers";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("../containers/Header/Header"));

import Styles from "../styles/Home.module.scss";

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
        <Header style={{ background: "#1e0f2c" }} />
        <div className="sectionContainer">
          <div className="contentContainer">
            <HomeBanner />
          </div>
        </div>
        <div className="sectionContainer">
          <div className="contentContainer container">
            <FeatureCompare />
          </div>
        </div>
        <div
          className="sectionContainer"
          style={{
            background: "#000",
          }}
        >
          <div className="contentContainer container">
            <Testimonials />
          </div>
        </div>
        <div
          className="sectionContainer"
          style={{
            background: "#000",
            paddingTop: "3rem",
          }}
        >
          <div className="contentContainer container">
            <FeatureCardList />
          </div>
        </div>
        <div
          className="sectionContainer"
          style={{
            background: "#1E0F2C",
            paddingTop: "3rem",
          }}
        >
          <div className="contentContainer container">
            <FAQContainer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
