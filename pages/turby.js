import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  HeroParallax,
  TurbyCarousel,
  TurbyFeatures,
  SignupTurby,
  WhyTurby,
} from "../containers";

export default function PricingPage() {
  return (
    <>
      <Metadata title="Lighthouse Storage | Pricing" />
      <div className={"bodyContainer"}>
        <Header />
        <div className="sectionContainer">
          <HeroParallax />
        </div>
        <div className="sectionContainer">
          <TurbyCarousel />
        </div>
        <div className="sectionContainer">
          <TitleSeparator
            topTitle="About Lighthouse & Turby NFTs"
            title="Lighthouse is a decentralized storage protocol that makes data permanent and accessible.  Our Turby NFT collection celebrates this mission while building a community of web3 enthusiasts."
            style={{ textAlign: "center" }}
          />
          <div className="my-16">
            <WhyTurby />
          </div>
        </div>
        <div className="sectionContainer">
          <TitleSeparator
            topTitle="What You Get"
            title="Turby NFT holders enjoy exclusive benefits and utilities within the Lighthouse ecosystem."
            style={{ textAlign: "center" }}
          />
          <TurbyFeatures />
        </div>
        <div className="sectionContainer my-16">
          <SignupTurby />
        </div>
        <div className="contentContainer styleContainer">
          <FAQContainer type="turby" />
        </div>
        <Footer />
      </div>
    </>
  );
}
