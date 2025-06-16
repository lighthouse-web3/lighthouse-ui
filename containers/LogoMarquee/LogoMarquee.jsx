import React from "react";
import { TitleSeparator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import styles from "./LogoMarquee.module.scss";

export default function LogoMarquee() {
  return (
    <div className={styles.LogoMarqueeContainer}>
      <TitleSeparator title={"Trusted by"} />
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {LandingPageData?.clientsLogo?.map((logo, index) => (
            // eslint-disable-next-line @next/next/no-img-element
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
