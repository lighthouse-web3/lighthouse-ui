import React from "react";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";

function HomeBanner() {
  return (
    <div className={Styles.Banner}>
      <div className={Styles.infoBox} data-aos="fade-up">
        <div className={Styles.title}>
          {LandingPageData?.HeroSection?.title}
        </div>
        <div
          className={Styles.subTitle}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.HeroSection?.subTitle,
          }}
        ></div>
      </div>
      <div className={Styles.globeBox} data-aos="fade-up">
        {/* <ImageBox
          src={"/test/globe.gif"}
          alt="BannerImage"
          layout={"fill"}
          width={"100%"}
        /> */}
      </div>
    </div>
  );
}

export default HomeBanner;
