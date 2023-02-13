import { useEffect, useState } from "react";
import {
  FAQContainer,
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  NewsBar,
  PartnerCarousel,
  SupportedBlockchain,
  Testimonials,
} from "../containers";

import Styles from "../styles/Home.module.scss";

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
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
    <div className={"bodyContainer"}>
      <NewsBar />
      <Header style={{ background: "#1e0f2c" }} />
      <div className="sectionContainer">
        <div
          className="contentContainer container"
          style={
            windowSize.width > 600
              ? {
                  padding: "1rem 0rem 1rem 6rem",
                  background: "#000",
                }
              : {
                  padding: "1rem",
                  background: "#000",
                }
          }
        >
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
  );
}
