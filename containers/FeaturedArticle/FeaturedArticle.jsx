import React from "react";
import { FeatureBlogCard } from "../../components";
import useWindowSize from "../../utils/windowSize";
import Style from "./FeaturedArticle.module.scss";

function FeaturedArticle() {
  return (
    <div className={Style.FeaturedArticle}>
      <p className={Style.title}>Featured Article</p>
      <p className={Style.subTitle}>
        Read about the latest updates and technology behind ligthouse
      </p>
      <div className={Style.blogContainer}>
        <div className={Style.cardContainer}>
          <FeatureBlogCard />
        </div>
        <div className={Style.cardContainer}>
          <FeatureBlogCard />
        </div>
        <div className={Style.cardContainer}>
          <FeatureBlogCard />
        </div>
      </div>
    </div>
  );
}

export default FeaturedArticle;
