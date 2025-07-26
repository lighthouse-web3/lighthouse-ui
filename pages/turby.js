import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  HeroParallax,
  TurbyCarousel,
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
          <WhyTurby />
        </div>
        <Footer />
      </div>
    </>
  );
}
