import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
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
          <div className="contentContainer container">
            <Pricing />
          </div>
          <LogoMarquee />

          <div className="contentContainer container">
            <br />
            <br />
            <PricingTable />
          </div>
          <div className="contentContainer container">
            <FAQContainer type="pricing" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
