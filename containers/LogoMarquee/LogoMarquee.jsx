import React from "react";
import styles from "./LogoMarquee.module.scss";
import { LandingPageData } from "../../utils/Data/SiteContent";
import { TitleSeprator } from "../../components";

export default function LogoMarquee() {
  return (
    <div className={styles.LogoMarqueeContainer}>
              <TitleSeprator title={"Trusted By"} />

      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {LandingPageData?.clientsLogo?.map((logo, index) => (
            <img
              key={index}
              src={logo.icon}
              alt={"Logo"}
              className={styles.logo}
            />
          ))}
          {LandingPageData?.clientsLogo?.map((logo, index) => (
            <img
              key={index}
              src={logo.icon}
              alt={"Logo"}
              className={styles.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
