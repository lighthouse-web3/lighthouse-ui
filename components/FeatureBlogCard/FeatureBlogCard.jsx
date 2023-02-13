import React from "react";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./FeatureBlogCard.module.scss";

function FeatureBlogCard() {
  return (
    <div
      className={Style.FeatureBlogCard}
      onClick={() => {
        window.open(
          `/blog/6/Encryption-and-Access-Control-for-Web3-using-Lighthouse`,
          "_blank"
        );
      }}
    >
      <div className={Style.FeatureBlogCard__imageContainer}>
        <ImageBox
          src={"/blogImage.png"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <p className={Style.FeatureBlogCard__title}>
        Most popular design systems to learn from in 2022
      </p>
      <p className={Style.FeatureBlogCard__category}>Design Systems</p>
    </div>
  );
}

export default FeatureBlogCard;
