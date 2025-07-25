import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  HeroParallax,
  LogoMarquee,
  Pricing,
  PricingTable,
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
        <Footer />
      </div>
    </>
  );
}
