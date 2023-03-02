import React from "react";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";
// import { globe_1 } from "../../public/test/globe_1.mp4";

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
          src={"/test/globe2.gif"}
          alt="BannerImage"
          layout={"fill"}
          width={"100%"}
        /> */}

        <video src="/test/globe_1.mp4" autoPlay loop muted></video>
      </div>
      <div className={Styles.overlay}></div>
    </div>
  );
}

export default HomeBanner;
