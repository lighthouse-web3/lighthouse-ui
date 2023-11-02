import React, { useEffect, useRef, useState } from "react";
import { KeyFeatureCard, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  return (
    <div className={Styles.FeatureCompare}>
      <TitleSeprator title={"Key Features"} />
      <div className={Styles.FeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <KeyFeatureCard
              title={item?.title}
              subTitle={item?.subTitle}
              icon={item?.icon}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default FeatureCompare;
