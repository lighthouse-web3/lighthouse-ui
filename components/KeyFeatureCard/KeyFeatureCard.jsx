import React from "react";
import styles from "./KeyFeatureCard.module.scss";

function KeyFeatureCard({ title, subTitle }) {
  return (
    <div className={styles.KeyFeatureCard}>
      <div className={styles.KeyFeatureCard__innerCard}>
        <p>{title}</p>
        <p>{subTitle}</p>
      </div>
    </div>
  );
}

export default KeyFeatureCard;
