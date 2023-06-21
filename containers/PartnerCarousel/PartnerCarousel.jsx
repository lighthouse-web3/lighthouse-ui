import React from "react";
import Styles from "./PartnerCarousel.module.scss";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";

function PartnerCarousel() {
  return (
    <div className={Styles.PartnerCarousel}>
      <div className={Styles.PartnerCarousel__titleBox}>
        <div className={Styles.iconContainer}>
          <ImageBox
            src={"/icons/titleStyle.svg"}
            aspectRatio={true}
            width={"120px"}
            height={"50px"}
          />
        </div>
        <p>Meet The Partners</p>
        <div className={Styles.iconContainer}>
          <ImageBox
            src={"/icons/titleStyle.svg"}
            aspectRatio={true}
            width={"120px"}
            height={"50px"}
          />
        </div>
      </div>

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
