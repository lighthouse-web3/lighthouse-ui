import {
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  NewsBar,
  PartnerCarousel,
  SupportedBlockchain,
} from "../containers";

import Styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={"bodyContainer"}>
      <NewsBar />
      <Header />
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <HomeBanner />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set2"></div>
        <div className="bigShadow__set2"></div>
        <div className="contentContainer container">
          <FeatureCompare />
        </div>
      </div>
      <div className="sectionContainer" style={{ minHeight: "50vh" }}>
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <PartnerCarousel />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set2"></div>
        <div className="bigShadow__set2"></div>
        <div className="contentContainer container">
          <FeatureCardList />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer">
          <SupportedBlockchain />
        </div>
      </div>
      <Footer />
    </div>
  );
}
