import React, { useContext } from "react";
import styles from "./KeyFeatureCard.module.scss";
import ImageBox from "../ImageBox/ImageBox";
import ThemeContext from "../../utils/services/Themecontext";

function KeyFeatureCard({ title, subTitle, icon, width }) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={styles.KeyFeatureCard}>
      <div className={styles.KeyFeatureCard__innerCard}>
        <p style={{ marginTop: "0rem" }}>{title}</p>
        <div
          className={styles.KeyFeatureCard__iconBox}
          style={theme === "dark" ? { background: "#ffffff" } : {}}
        >
          <ImageBox
            src={icon}
            width={theme === "dark" ? "6rem" : "6rem"}
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
