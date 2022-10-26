import React from "react";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./FeatureCard.module.scss";

function FeatureCard({ feature, index }) {
  return (
    <div className={Style.FeatureCard}>
      <div className={Style.bgImage}>
        <ImageBox
          src={"/cmd.png"}
          layout="fill"
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={index % 2 === 0 ? Style.bgOverlayR : Style.bgOverlayL}>
        <div className={Style.title}>
          Lighthouse <span className="gradient__Text">CLI</span>{" "}
        </div>
        <p className={Style.subTitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ut
          molestias asperiores consectetur aperiam eius dolor amet suscipit
          repudiandae illo totam quae corrupti, deserunt, earum, voluptatum
          ratione ipsa sequi consequatur?
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
