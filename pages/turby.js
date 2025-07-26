import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  HeroParallax,
  TurbyCarousel,
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
        <Footer />
      </div>
    </>
  );
}
