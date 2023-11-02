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
        <p>Clients</p>
        <p>
          <CountUp duration={5} end={100} delay={2} suffix="+" />
        </p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>
          <CountUp duration={5} end={100} delay={3} suffix="+" />
        </p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>
          <CountUp duration={5} end={100} delay={4} suffix="+" />
        </p>
      </div>
      <div className={styles.StatBox__stat}>
        <p>Clients</p>
        <p>
          <CountUp duration={5} end={100} delay={5} suffix="+" />
        </p>
      </div>
    </div>
  );
}

export default StatBox;
