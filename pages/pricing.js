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
          <div className="contentContainer styleContainer">
            <Pricing />
          </div>
          <LogoMarquee />

          <div className="contentContainer styleContainer">
            <br />
            <br />
            <PricingTable />
          </div>
          <div className="contentContainer styleContainer">
            <FAQContainer type="pricing" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
