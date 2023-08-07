import React from "react";
import { ImageBox, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./FeatureCompare.module.scss";

function FeatureCompare() {
  return (
    <div className={Styles.FeatureCompare}>
      <TitleSeprator title={"Key Features"} />
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
            <div className={Styles.featureCard__gradientCard}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCompare;
