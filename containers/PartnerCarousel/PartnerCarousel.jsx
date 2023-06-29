import React from "react";
import Styles from "./PartnerCarousel.module.scss";
import { ImageBox, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";

function PartnerCarousel() {
  return (
    <div className={Styles.PartnerCarousel}>
      <TitleSeprator title={"Trusted By"} />

      <div className={Styles.PartnerCarousel__brandLogoContainer}>
        {LandingPageData?.clientsLogo?.map((item, index) => (
          <span key={index}>
            <ImageBox
              src={item?.icon}
              width={"200px"}
              height={"100px"}
              aspectRatio={true}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default PartnerCarousel;
