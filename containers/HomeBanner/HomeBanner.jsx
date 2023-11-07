import React, { useContext } from "react";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";
import useWindowSize from "../../utils/Hooks/windowSize";
import { ImageBox, StatBox } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";
// import { HoverContainer } from "..";

function HomeBanner() {
  const windowSize = useWindowSize();
  const { theme, setTheme } = useContext(ThemeContext);

  //console.log(windowSize);

  return (
    <div className={Styles.Banner}>
      <span className={Styles.Banner__bgImg1}>
        <ImageBox
          src={`/BannerImages/${theme}_bannerImg_1.png`}
          width={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          height={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </span>
      <span className={Styles.Banner__bgImg2}>
        <ImageBox
          src={`/BannerImages/${theme}_bannerImg_2.png`}
          width={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "50vw"
          }
          height={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "50vw"
          }
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </span>
      <span className={Styles.Banner__bgImg3}>
        <ImageBox
          src={`/BannerImages/${theme}_bannerImg_3.png`}
          width={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          height={
            windowSize?.width > 1440
              ? "30vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </span>
      <div className={Styles.infoBox + " container"} data-aos="fade-up">
        <div className={Styles.title}>
          {LandingPageData?.HeroSection?.title}
        </div>
        <div
          className={Styles.subTitle}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.HeroSection?.subTitle,
          }}
        ></div>

        <div className="flex-center">
          <button
            className="fillBtn__slide"
            onClick={() => {
              window.open(
                "https://docs.lighthouse.storage/lighthouse-1/",
                "_blank"
              );
            }}
          >
            Start Now
          </button>
        </div>
      </div>
      <div className={Styles.statBox} data-aos="fade-up" data-aos-delay={100}>
        <StatBox />
      </div>
    </div>
  );
}

export default HomeBanner;
