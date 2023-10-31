import React from "react";
import styles from "./KeyFeatureCard.module.scss";
import ImageBox from "../ImageBox/ImageBox";

function KeyFeatureCard({ title, subTitle, icon }) {
  return (
    <div className={styles.KeyFeatureCard}>
      <div className={styles.KeyFeatureCard__innerCard}>
        <p>{title}</p>
        <div className={styles.KeyFeatureCard__iconBox}>
          <ImageBox
            src={icon}
            width={"6rem"}
            height={"6rem"}
            aspectRatio={true}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <p>{subTitle}</p>
      </div>
    </div>
  );
}

export default KeyFeatureCard;
