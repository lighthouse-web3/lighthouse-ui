import { useEffect, useState } from "react";
import { Metadata, TitleSeprator } from "../components";
import {
  FAQContainer,
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  LighthouseSuit,
  LogoMarquee,
  NewsBar,
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
        {/* <NewsBar /> */}
        <Header />
        <div>
          <div className="contentContainer">
            <HomeBanner />
          </div>
        </div>

        <div className="">
          <div className="container">
            <FeatureCompare />
          </div>
        </div>
        <div className="">
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
          <div className="contentContainer">
            <LogoMarquee />
          </div>
        </div>
      
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <Testimonials />
          </div>
        </div>
        <div>
          <div className="">
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
