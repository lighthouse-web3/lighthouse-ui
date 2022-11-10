import { FAQContainer, Footer, Header } from "../containers";

export default function FAQ() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <FAQContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
