import React, { useContext, useMemo } from "react";
import styles from "./StatBox.module.scss";
import ThemeContext from "../../utils/services/Themecontext";
import CountUp from "react-countup";

const StatItem = React.memo(({ label, value, suffix = "+", decimals = 0 }) => (
  <div className={styles.StatBox__stat}>
    <p>{label}</p>
    <p>
      <CountUp duration={8} end={value} delay={2} suffix={suffix} decimals={decimals} />
    </p>
  </div>
));

function StatBox() {
  const { theme } = useContext(ThemeContext);
  
  const boxStyle = useMemo(() => ({
    ...(theme === "dark" ? { border: "1px solid #4f4f4f" } : {})
  }), [theme]);

  return (
    <div className={styles.StatBox} style={boxStyle}>
      <StatItem label="API Requests / Day" value={10} suffix="M+" />
      <StatItem label="Users" value={20} suffix="K+" />
      <StatItem label="Number of files" value={5.5} suffix="M+" decimals={1} />
    </div>
  );
}

export default React.memo(StatBox);
