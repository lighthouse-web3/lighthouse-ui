import React from "react";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  // LandingPageData.KeyFeatures;
  return (
    <div className={Styles.FeatureCompare}>
      <p className={Styles.FeatureCompare__title}>Key Features</p>
      <div className={Styles.FeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <div className={Styles.featureCard} key={index} data-aos="fade-up">
            <div className={Styles.imgBox}>
              <ImageBox src={item?.icon} />
            </div>
            <p className={Styles.title}>{item?.title}</p>
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
