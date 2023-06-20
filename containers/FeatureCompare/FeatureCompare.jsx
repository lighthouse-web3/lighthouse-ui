import React from "react";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  return (
    <div className={Styles.FeatureCompare}>
      <p className={Styles.FeatureCompare__title}>
        Elevate Your Storage Experience:
        <br /> Key Features of Lighthouse
      </p>
      <div className={Styles.FeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <div className={Styles.featureCard} key={index} data-aos="fade-up">
            <div className={Styles.featureCard__gradientBorder}></div>
            <div className={Styles.featureCard__mainCard}>
              <div className={Styles.iconContainer}>
                <div className={Styles.icon}>
                  <ImageBox
                    src={item?.icon}
                    width={"100px"}
                    height={"100px"}
                    maxHeight={"80px"}
                    style={{ height: "100px !important" }}
                    aspectRatio={true}
                  />
                </div>
              </div>

              <p className={Styles.title}>{item?.title}</p>
              <p className={Styles.subTitle}>{item?.subTitle}</p>
            </div>
          </div>
        ))}
      </div>

      <br />
      <br />
      <br />

      <p className={Styles.FeatureCompare__title} data-aos="fade-up">
        Trusted By Teams Around The World
      </p>

      <div className={Styles.FeatureCompare__clientBox} data-aos="fade-up">
        <div className={Styles.logoBox}>
          {LandingPageData?.clientsLogo.map((item, index) => (
            <div className={Styles.logo} key={index}>
              <ImageBox src={item?.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureCompare;
