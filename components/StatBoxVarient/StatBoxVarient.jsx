import React, { useContext } from "react";
import styles from "./StatBoxVarient.module.scss";
import ThemeContext from "../../utils/services/Themecontext";
import CountUp from "react-countup";

function StatBoxVarient() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={styles.StatBoxVarient}>
      <div className={styles.StatBoxVarient__stat}>
        <p>
          <CountUp duration={5} end={546} />
        </p>
        <p>NFT Items</p>
      </div>
      <div
        style={{
          borderRight: "2px solid #4f4f4f",
          height: "50%",
        }}
      ></div>
      <div className={styles.StatBoxVarient__stat}>
        <p>
          <CountUp duration={5} end={42} />
        </p>
        <p>Owners</p>
      </div>
      <div
        style={{
          borderRight: "2px solid #4f4f4f",
          height: "50%",
        }}
      ></div>
      <div className={styles.StatBoxVarient__stat}>
        <p>
          <CountUp duration={5} end={378} />
        </p>
        <p>Items Sold</p>
      </div>
    </div>
  );
}

export default StatBoxVarient;
