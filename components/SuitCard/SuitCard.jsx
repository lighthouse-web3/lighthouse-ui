import React from "react";
import styles from "./SuitCard.module.scss";
import Image from "next/image";
import ImageBox from "../ImageBox/ImageBox";

function SuitCard({ title, description, icon }) {
  return (
    <div className={styles.SuitCard}>
      <div className={styles.SuitCard__iconBox}>
        <ImageBox
          src={icon}
          width={"2.2rem"}
          height={"2.2rem"}
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <p className={styles.SuitCard__title}>{title} </p>
      <p className={styles.SuitCard__subTitle}>{description}</p>
    </div>
  );
}

export default SuitCard;
