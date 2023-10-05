import React from "react";
import styles from "./SuitCard.module.scss";

function SuitCard({ title, description }) {
  return (
    <div className={styles.SuitCard}>
      <div className={styles.SuitCard__iconBox}></div>
      <p className={styles.SuitCard__title}>{title} </p>
      <p className={styles.SuitCard__subTitle}>{description}</p>
    </div>
  );
}

export default SuitCard;
