import { Metadata } from "../components";
import { DocContainer, DocContainer2, Footer, Header } from "../containers";

export default function Documentation() {
  return (
    <>
      <Metadata title="Lighthouse Storage | Documentation" />

      <div className={"bodyContainer"}>
        <Header style={{ background: "#000" }} />

        <div
          className="sectionContainer"
          style={{
            minHeight: "auto",
          }}
        >
          <div className="contentContainer container">
            <DocContainer />
          </div>
        </div>
        <div
          className="sectionContainer"
          style={{
            minHeight: "auto",
          }}
        >
          <div className="contentContainer container">
            <DocContainer2 />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
