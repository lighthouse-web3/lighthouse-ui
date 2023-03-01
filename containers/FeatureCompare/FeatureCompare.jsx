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
          <div className={Styles.featureCard} key={index}>
            <div className={Styles.imgBox}>
              <ImageBox src={item?.icon} />
            </div>
            <p className={Styles.title}>{item?.title}</p>
          </div>
        ))}
      </div>

      <p className={Styles.FeatureCompare__title}>
        We Help Client Around The World
      </p>

      <div className={Styles.FeatureCompare__clientBox}>
        <div className={Styles.logoBox}>
          {LandingPageData?.clientsLogo.map((item, index) => (
            <div className={Styles.logo} key={index}>
              <ImageBox src={item?.icon} />
            </div>
          ))}
        </div>
        {/* <div className={Styles?.ButtonBox}>
          <button className={"border_btn"}>All Partners</button>
        </div> */}
      </div>
    </div>
  );
}

export default FeatureCompare;
