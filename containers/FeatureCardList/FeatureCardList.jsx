import React from "react";
import { FeatureCard, ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Style from "./FeatureCardList.module.scss";

const featuresList = [];

function FeatureCardList() {
  return (
    <div className={Style.FeatureCardList}>
      <p className={Style.FeatureCardList__Title}>Lighthouse Storage System</p>
      <div className={Style.FeatureCardList__FeatureContainer}>
        {LandingPageData?.StorageFeature.map((item, index) => (
          <div className={Style.featureBox} key={index}>
            <div className={Style.featureBox__icon}>
              <ImageBox src={item?.icon} />
            </div>
            <p className={Style.featureBox__title}>{item?.title}</p>
            <p className={Style.featureBox__description}>{item?.description}</p>
          </div>
        ))}
      </div>
      <div className={Style.FeatureCardList__BannerContainer}>
        <div className={Style.Banner}>
          <p>Come change the way people make music</p>
          <button className="border_btn">Join Now</button>
        </div>
      </div>
    </div>
  );
}

export default FeatureCardList;
