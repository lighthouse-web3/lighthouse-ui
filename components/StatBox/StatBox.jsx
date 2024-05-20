import React, { useContext } from "react";
import styles from "./StatBox.module.scss";
import ThemeContext from "../../utils/services/Themecontext";
import CountUp from "react-countup";

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
        <p>API Requests / Day</p>
        <p>
          <CountUp duration={8} end={10} delay={2} suffix="M+" />
        </p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Users</p>
        <p>
          <CountUp duration={8} end={14} delay={2} suffix="K+" />
        </p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Number of files</p>
        <p>
          <CountUp duration={8} end={2.0} decimals={1} delay={2} suffix="M+" />
        </p>
      </div>
    </div>
  );
}

export default StatBox;
