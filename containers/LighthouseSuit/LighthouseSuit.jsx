import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import styles from "./LighthouseSuit.module.scss";

export default function LighthouseSuit({ data }) {
  return (
    <div className={styles.LighthouseSuitContainer}>
      <div
        className={styles.header}
        style={data.index % 2 !== 0 ? { flexDirection: "row-reverse" } : {}}
      >
        <div
          className={styles.headerLeft}
          style={data.index % 2 !== 0 ? { textAlign: "right" } : {}}
        >
          <h2 className={styles.title}>{data.title}</h2>
          <h3 className={styles.subtitle}>{data.subTitle}</h3>
          <p className={styles.description}>{data.description}</p>
          <button
            className={styles.learnMore}
            onClick={() => {
              window.open(data.link, "_blank");
            }}
          >
            {data.buttonText}
          </button>
        </div>
        <div className={styles.headerRight}>
          <img src={data.icon} alt="Dashboard" width={"100%"} height={"auto"} />
        </div>
      </div>
      <div className={styles.features}>
        {data.featureCard.map((data, index) => (
          <div className={styles.featureCard} key={index}>
            <div>
              <FiCheckCircle />
            </div>
            <h4 className={styles.featureTitle}>{data.title}</h4>
            <p className={styles.featureDescription}>{data.subTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
