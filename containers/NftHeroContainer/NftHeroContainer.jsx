import React, { useContext } from "react";
import { NftLandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./NftHeroContainer.module.scss";
import useWindowSize from "../../utils/Hooks/windowSize";
import { ImageBox, StatBoxVarient } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";

function NftHeroContainer() {
  const windowSize = useWindowSize();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={Styles.Banner}>
      <div className={Styles.Banner__container}>
        <div className={Styles.Banner__leftContainer}>
          <div className={Styles.title}>
            {NftLandingPageData?.HeroSection?.title}
          </div>
          <div className={Styles.subTitle}>
            {NftLandingPageData?.HeroSection?.subTitle}
          </div>
          <div
            className={Styles.statBox}
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <StatBoxVarient />
          </div>
          <button
            className="fillBtn__slide"
            onClick={() => {
              window.open("https://files.lighthouse.storage", "_blank");
            }}
          >
            Start Now
          </button>
        </div>
        <div className={Styles.Banner__rightContainer}>
          <ImageBox
            src={"/BannerImages/sample.png"}
            width={"90%"}
            height="50%"
            aspectRatio={false}
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NftHeroContainer;
