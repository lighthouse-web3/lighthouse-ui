import { useEffect } from "react";
import { Metadata } from "../components";
import { FAQContainer, Footer, Header } from "../containers";

export default function FAQ() {
  return (
    <>
      <Metadata title="Lighthouse Storage | FAQs" />
      <div className={"bodyContainer"}>
        <Header />
        <div className="sectionContainer">
          <div className="contentContainer container">
            <FAQContainer />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
