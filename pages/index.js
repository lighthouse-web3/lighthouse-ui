import {
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  PartnerCarousel,
} from "../containers";

import Styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <div className="sectionContainer">
        <div className="contentContainer container">
          <HomeBanner />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow">ss</div>
        <div className="bigShadow">ss</div>
        <div className="contentContainer container">
          <FeatureCompare />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="contentContainer container">
          <PartnerCarousel />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow">ss</div>
        <div className="bigShadow">ss</div>
        <div className="contentContainer container">
          <FeatureCardList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
