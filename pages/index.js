import { Metadata, TitleSeprator } from "../components";
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
        <div>
          <div className="contentContainer">
            <HomeBanner />
          </div>
        </div>

        <div>
          <div className="container">
            <FeatureCompare />
          </div>
        </div>
        <div>
          <div className="container">
            <Pricing />
          </div>
        </div>

        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <PartnerCarousel />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <TitleSeprator title={"Empowering the Data Economy"} />
            {LandingPageData.lighthouseSuit.map((data, index) => (
              <>
                <LighthouseSuit key={index} data={{ ...data, index }} />
                {index !== 3 && <hr style={{borderColor:'#667085'}} />}
              </>
            ))}
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
          <TitleSeprator title={"Lighthouse Ecosystem"} />
            <EcosystemGrid/>
          </div>
        </div>

        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <Testimonials />
          </div>
        </div>
        <div>
          <div>
            <FeatureCardList />
          </div>
        </div>
        <div>
          <div className="contentContainer container">
            <FAQContainer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
