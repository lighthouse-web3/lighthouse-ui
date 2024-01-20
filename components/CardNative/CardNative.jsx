import React from "react";
import styles from "./CardNative.module.scss";
import Image from "next/image";
import ImageBox from "../ImageBox/ImageBox";

function CardNative({ title, description, icon, style, link }) {
  return (
    <div className={styles.CardNative} style={style}>
      <div className={styles.CardNative__iconBox}>
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
      <p className={styles.CardNative__title}>{title} </p>
      <p className={styles.CardNative__subTitle}>{description}</p>
      {link && <p className={styles.CardNative__link}>Learn more</p>}
    </div>
  );
}

export default CardNative;
