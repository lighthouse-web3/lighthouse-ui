import { Metadata, TitleSeparator } from "../components";
import {
  EcosystemGrid,
  FAQContainer,
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  LighthouseSuit,
  PartnerCarousel,
  Pricing,
  Testimonials,
} from "../containers";
import { LandingPageData } from "../utils/Data/SiteContent";

export default function Home() {
  return (
    <>
      <Metadata title="Lighthouse Storage - Store Data Permanently & Securely" />
      <div className={"bodyContainer"}>
        <Header />
        <div className="contentContainer">
          <HomeBanner />
        </div>
        <div className="">
          <FeatureCompare />
        </div>
        <div className="styleContainer">
          <Pricing />
        </div>

        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer">
            <PartnerCarousel />
          </div>
        </div>
        <div style={{ minHeight: "auto", marginTop: "4rem" }}>
          <div className="w-full bg-[#1b1c1c]">
            <TitleSeparator topTitle={"Empowering the Data Economy"} />
            {LandingPageData.lighthouseSuit.map((data, index) => (
              <LighthouseSuit key={index} data={{ ...data, index }} />
            ))}
          </div>
        </div>
        {/* <div style={{ minHeight: "auto" }}>
          <div className="contentContainer styleContainer">
            <TitleSeparator topTitle={"Lighthouse Ecosystem"} />
            <EcosystemGrid />
          </div>
        </div> */}
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer">
            <Testimonials />
          </div>
        </div>
        <FeatureCardList />
        <div className="contentContainer">
          <FAQContainer />
        </div>
        <Footer />
      </div>
    </>
  );
}
