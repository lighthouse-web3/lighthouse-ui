import React, { useContext } from "react";
import styles from "./StatBox.module.scss";
import ThemeContext from "../../utils/services/Themecontext";
function StatBox() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      className={styles.StatBox}
      style={
        theme === "dark"
          ? {
              border: "1px solid #4f4f4f",
            }
          : {}
      }
    >
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>3K+</p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>3K+</p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>3K+</p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>3K+</p>
      </div>
    </div>
  );
}

export default StatBox;
