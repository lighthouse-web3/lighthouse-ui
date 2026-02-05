import React, { useContext } from "react";
import { ImageBox, TitleSeparator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import ThemeContext from "../../utils/services/Themecontext";
import Styles from "./PartnerCarousel.module.scss";

function PartnerCarousel() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={Styles.PartnerCarousel}>
      <TitleSeparator topTitle={"Trusted By"} />

      <div className={Styles.PartnerCarousel__brandLogoContainer}>
        {LandingPageData?.clientsLogo?.map((item, index) => (
          <span
            key={index}
            data-aos="fade-up"
            data-aos-delay={100 * index}
            style={
              theme === "dark"
                ? { filter: "brightness(100%)" }
                : { filter: "brightness(10%)" }
            }
          >
            <ImageBox
              src={item?.icon}
              width={"200px"}
              height={"100px"}
              aspectRatio={true}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default PartnerCarousel;
