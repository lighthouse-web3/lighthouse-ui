import { useEffect, useState } from "react";
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
  MascotBox,
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
        <div className="">
          <div className="contentContainer container">
            <TitleSeprator title={"What Turby Says"} />
            <MascotBox
              bgImage="./mascot/moon_bg.png"
              mascotImage="/mascot/turby_astronaut.png"
              heading="Discover your perfect plan"
              description="Lighthouse offers permanent, decentralized storage powered by Filecoin. Secure, scalable, and ideal for individuals, developers, and enterprises."
            />
            <MascotBox
              bgImage="./mascot/beach_bg.png"
              mascotImage="/mascot/turby_lifeguard.png"
              position="right"
              heading="Discover your perfect plan"
              description="Lighthouse offers permanent, decentralized storage powered by Filecoin. Secure, scalable, and ideal for individuals, developers, and enterprises."
            />
            <MascotBox
              bgImage="./mascot/globe_bg.png"
              mascotImage="/mascot/turby_hacker.png"
              position="left"
              heading="Discover your perfect plan"
              description="Lighthouse offers permanent, decentralized storage powered by Filecoin. Secure, scalable, and ideal for individuals, developers, and enterprises."
            />
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
                {index !== 3 && <hr style={{ borderColor: "#667085" }} />}
              </>
            ))}
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <TitleSeprator title={"Lighthouse Ecosystem"} />
            <EcosystemGrid />
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
