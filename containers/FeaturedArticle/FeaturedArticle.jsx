import React from "react";
import { FeatureBlogCard, ImageBox } from "../../components";
import useWindowSize from "../../utils/windowSize";
import Style from "./FeaturedArticle.module.scss";

function FeaturedArticle() {
  return (
    <div className={Style.FeaturedArticle}>
      <p className={Style.title}>Read our latest blog</p>
      <div className={Style.blogContainer}>
        <div className={Style.blogContainer__contentBox}>
          <div className={Style.apostrophy}>
            <ImageBox src={"/apostrophy.png"} />
          </div>

          <p className={Style.title}>
            “People now recognise that having a good performance conversation
            means that something happens as a result.”
          </p>
          <p className={Style.subTitle}>
            “With Landingfolio, the design team can now build design which
            identifies employees’ career aspirations and goals and from which we
            approach managers and check to see what is happening.”
          </p>

          <button className={Style.btn + " ptr"}>Read Full Story</button>
        </div>
        <div className={Style.blogContainer__imageBox}>
          <ImageBox src={"/personImage.png"} style={{ borderRadius: "10px" }} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedArticle;
