import { TitleSeparator } from "../../components";
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
} from "../index";
import { LandingPageData } from "../../utils/Data/SiteContent";

/**
 * The storage marketing page, lifted out of pages/index.js so that `/` and
 * `/storage` render one tree rather than two copies that drift apart. When the
 * root moves to the memory product, pages/index.js stops rendering this and
 * pages/storage.js becomes its only caller.
 */
export default function StorageLanding() {
  return (
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
  );
}
