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
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <div className="styleContainer">
          <FeatureCompare />
        </div>
        <div className="styleContainer">
          <Pricing />
        </div>

        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer styleContainer">
            <PartnerCarousel />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer styleContainer">
            <TitleSeparator title={"Empowering the Data Economy"} />
            {LandingPageData.lighthouseSuit.map((data, index) => (
              <div key={index}>
                <LighthouseSuit data={{ ...data, index }} />
                {index !== 3 && <hr style={{ borderColor: "#667085" }} />}
              </div>
            ))}
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer styleContainer">
            <TitleSeparator title={"Lighthouse Ecosystem"} />
            <EcosystemGrid />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer styleContainer">
            <Testimonials />
          </div>
        </div>
        <FeatureCardList />
        <div className="contentContainer styleContainer">
          <FAQContainer />
        </div>
        <Footer />
      </div>
    </>
  );
}
