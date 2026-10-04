import React, { useContext } from "react";
import styles from "./StatBox.module.scss";
import ThemeContext from "../../utils/services/Themecontext";
import CountUp from "react-countup";

function StatBox() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="flex flex-wrap justify-around gap-12 md:gap-8 w-full">
      <div className="text-center md:text-left">
        <div className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-accent mb-1">
          <CountUp duration={8} end={10} delay={2} suffix="M+" />
        </div>
        <div className="text-xs font-bold tracking-widest font-sans uppercase text-muted/60">
          API Requests
        </div>
      </div>
      <div className="text-center md:text-left">
        <div className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-accent mb-1">
          <CountUp duration={8} end={34} delay={2} suffix="K+" />
        </div>
        <div className="text-xs font-bold tracking-widest font-sans uppercase text-muted/60">
          Users
        </div>
      </div>
      <div className="text-center md:text-left">
        <div className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-accent mb-1">
          <CountUp duration={8} end={50} delay={2} suffix=" TiB+" />
        </div>
        <div className="text-xs font-bold tracking-widest font-sans uppercase text-muted/60">
          Storage Consumed
        </div>
      </div>
    </div>
  );
}

export default StatBox;
