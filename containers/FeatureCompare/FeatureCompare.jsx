import React, { useEffect, useRef, useState } from "react";
import { ImageBox, KeyFeatureCard, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  return (
    <div className={Styles.FeatureCompare}>
      <TitleSeprator title={"Key Features"} />
      <div className={Styles.FeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <span key={index}>
            <KeyFeatureCard title={item?.title} subTitle={item?.subTitle} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default FeatureCompare;
