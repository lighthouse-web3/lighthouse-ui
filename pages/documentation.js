import { DocContainer, DocContainer2, Footer, Header } from "../containers";

import Styles from "../styles/Home.module.scss";

export default function Documentation() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <DocContainer />
          <DocContainer2 />
        </div>
      </div>

      <Footer />
    </div>
  );
}
