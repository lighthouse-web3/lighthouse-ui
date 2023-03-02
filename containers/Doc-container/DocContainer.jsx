import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { ImageBox } from "../../components";

import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./DocContainer.module.scss";

function DocContainer({}) {
  return (
    <div className={Styles.DocContainer} id="doc">
      <div className={Styles.DocContainer__titleBox}>
        <p
          className={Styles.title}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.Documentation?.title,
          }}
        ></p>
        <p
          className={Styles.subtitle}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.Documentation?.subtitle,
          }}
        ></p>
      </div>
      <div className={Styles.DocContainer__imageBox}>
        <ImageBox
          src={LandingPageData?.Documentation?.bannerImage}
          style={{ paddingTop: "2rem" }}
          width="80%"
        />
      </div>
    </div>
  );
}

export default DocContainer;
