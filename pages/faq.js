import { FAQContainer, Footer, Header } from "../containers";

export default function FAQ() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <div className="sectionContainer">
        <div className="contentContainer container">
          <FAQContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
