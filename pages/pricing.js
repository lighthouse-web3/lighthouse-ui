import { useEffect } from "react";
import { Metadata } from "../components";
import { FAQContainer, Footer, Header, Pricing } from "../containers";

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
          <div className="contentContainer container">
            <FAQContainer type="pricing" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
