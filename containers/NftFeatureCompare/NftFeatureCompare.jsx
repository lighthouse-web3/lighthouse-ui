import React, { useEffect, useRef, useState } from "react";
import { KeyFeatureCard, TitleSeprator, SuitCard } from "../../components";
import {
  LandingPageData,
  NftLandingPageData,
} from "../../utils/Data/SiteContent";
import Styles from "./NftFeatureCompare.module.scss";
import CardNative from "../../components/CardNative/CardNative";

function NftFeatureCompare() {
  return (
    <div className={Styles.NftFeatureCompare}>
      <TitleSeprator
        title={"Make every step user-centric"}
        bottomTitle={"Lorem ipsum dolor sit amet, consectetur adipis elit"}
      />
      <div className={Styles.NftFeatureCompare__featureContainer}>
        {NftLandingPageData?.StorageFeature.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <CardNative {...item} link={false} />
          </span>
        ))}
      </div>
      {/* <div className="subTitle"></div> */}
      {/* <div className={Styles.NftFeatureCompare__featureContainer}>
        {LandingPageData.KeyFeatures.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <KeyFeatureCard {...item} />
          </span>
        ))}
      </div> */}
    </div>
  );
}

export default NftFeatureCompare;
