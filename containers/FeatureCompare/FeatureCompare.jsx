import React, { useEffect, useRef, useState } from "react";
import { KeyFeatureCard, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  return (
    <div className={Styles.FeatureCompare}>
      <TitleSeprator title={"Why choose Lighthouse?"} />
      <div className={Styles.FeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <KeyFeatureCard {...item} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default FeatureCompare;
