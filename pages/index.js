import { Metadata, TitleSeparator } from "../components";
import {
  EcosystemGrid,
  FAQContainer,
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  LighthouseSuit, PartnerCarousel,
  Pricing,
  Testimonials
} from "../containers";
import { LandingPageData } from "../utils/Data/SiteContent";




export default function Home() {
  return (
    <>
      <Metadata title="Lighthouse Storage - Store Data Permanently & Securely" />
      <div className={"bodyContainer"}>
        {/* <NewsBar /> */}
        <Header />
          <div className="contentContainer">
            <HomeBanner />
          </div>

          <div className="container">
            <FeatureCompare />
          </div>

          <div className="container">
            <Pricing />
          </div>
          <div style={{ minHeight: "auto" }}>
            <div className="contentContainer container">
              <PartnerCarousel />
            </div>
          </div>
          <div style={{ minHeight: "auto" }}>
            <div className="contentContainer container">
              <TitleSeparator title={"Empowering the Data Economy"} />
              {LandingPageData.lighthouseSuit.map((data, index) => (
                <div key={index}>
                  <LighthouseSuit data={{ ...data, index }} />
                  {index !== 3 && <hr style={{borderColor:'#667085'}} />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ minHeight: "auto" }}>
            <div className="contentContainer container">
            <TitleSeparator title={"Lighthouse Ecosystem"} />
              <EcosystemGrid/>
            </div>
          </div>
          <div style={{ minHeight: "auto" }}>
            <div className="contentContainer container">
              <Testimonials />
            </div>

          </div>
          <FeatureCardList />
          <div className="contentContainer container">
            <FAQContainer />
          </div>
          <Footer />
        </div>
    </>
  );
}
