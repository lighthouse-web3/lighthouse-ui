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
  Testimonials,
} from "../containers";
import { LandingPageData } from "../utils/Data/SiteContent";



export default function Home() {
  return (
    <>
      <Metadata title="Lighthouse Permanent Storage" />
      <div className={"bodyContainer"}>
        {/* <NewsBar /> */}
        <Header />
        <div>
          <div className="contentContainer">
            <HomeBanner />
          </div>
        </div>

        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <PartnerCarousel />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
          <TitleSeprator title={'Empowering Digital Sovereignty'}  />
            {
              LandingPageData.lighthouseSuit.map((data,index)=>  <>
              <LighthouseSuit key={index} data={{...data,index}} />
              <hr/>
              </>)
            } 
          </div> 
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer">
            <LogoMarquee />
          </div>
        </div>
        <div className="">
          <div className="container">
            <FeatureCompare />
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
