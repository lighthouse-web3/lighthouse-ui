import React, { useContext } from "react";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";
import useWindowSize from "../../utils/Hooks/windowSize";
import { ImageBox, StatBox } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";

function HomeBanner() {
  const windowSize = useWindowSize();
  const { theme, setTheme } = useContext(ThemeContext);

// const bannerImages = {
//     dark_bannerImg_1:
//       "https://gateway.lighthouse.storage/ipfs/bafkreicxy3eocvtyyl3xfs3euk5pc4zgxsyosjrxknft5hrdaqueg2l5na",
//     dark_bannerImg_2:
//       "https://gateway.lighthouse.storage/ipfs/bafkreifjzr3gc6v24yv5c4sgecb6a3dcyxeyuivxgzf4zakqtfuuaz6bgy",
//     dark_bannerImg_3:
//       "https://gateway.lighthouse.storage/ipfs/bafkreiesyhpu3eagitbizbyzndoxdinuqyrqotdxobnpboynooyk6ef27y",
//     light_bannerImg_1:
//       "https://gateway.lighthouse.storage/ipfs/bafkreihkck4tgwwgrbxyln3vesqopa242uqasojr5d5tnin2vv3zrltksa",
//     light_bannerImg_2:
//       "https://gateway.lighthouse.storage/ipfs/bafkreiauljyamwu3xn4kzh5guy5m66n3l2xmjzithky37fgy7wqvoyjuiy",
//     light_bannerImg_3:
//       "https://gateway.lighthouse.storage/ipfs/bafkreiaaa3gohgn7p4tut3prs7zlrppxiawnfw56rfxn55k47h5qeydpfm",
//   };


  
// Use local images instead of IPFS URLs for faster loading  
 

const bannerImages = {
    dark_bannerImg_1: "/BannerImages/dark_bannerImg_1.png",
    dark_bannerImg_2: "/BannerImages/dark_bannerImg_2.png",
    dark_bannerImg_3: "/BannerImages/dark_bannerImg_3.png",
    light_bannerImg_1: "/BannerImages/light_bannerImg_1.png",
    light_bannerImg_2: "/BannerImages/light_bannerImg_2.png",
    light_bannerImg_3: "/BannerImages/light_bannerImg_3.png",
  };

  return (
    <div className={Styles.Banner}>
      <span className={Styles.Banner__bgImg1}>
        <ImageBox
          src={bannerImages[`${theme ? theme : "dark"}_bannerImg_1`]}
          width={
            windowSize?.width > 1440
              ? "34vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          height={
            windowSize?.width > 1440
              ? "34vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority={true}  // Add priority for faster loading
        />
      </span>
      <span className={Styles.Banner__bgImg2}>
        <ImageBox
          src={bannerImages[`${theme ? theme : "dark"}_bannerImg_2`]}
          width={
            windowSize?.width >= 1440
              ? "32vw"
              : windowSize?.width > 600
              ? "35vw"
              : "50vw"
          }
          height={
            windowSize?.width >= 1440
              ? "32vw"
              : windowSize?.width > 600
              ? "35vw"
              : "50vw"
          }
          aspectRatio={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority={true}  
        />
      </span>
      <span className={Styles.Banner__bgImg3}>
        <ImageBox
          src={bannerImages[`${theme ? theme : "dark"}_bannerImg_3`]}
          width={
            windowSize?.width > 1440
              ? "34vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          height={
            windowSize?.width > 1440
              ? "34vw"
              : windowSize?.width > 600
              ? "35vw"
              : "80vw"
          }
          aspectRatio={true}
          style={{
            zindex: "1",
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority={true}  
        />
      </span>
      <div className={Styles.infoBox + " container"} data-aos="fade-up">
        <h1
          className={Styles.title}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.HeroSection?.title,
          }}
        ></h1>

        <p
          className={Styles.subTitle}
          dangerouslySetInnerHTML={{
            __html: LandingPageData?.HeroSection?.subTitle,
          }}
        ></p>

        <div className={Styles.buttonContainer}>
          <button
            className="fillBtn__grey"
            style={{ margin: "0px 8px" }}
            onClick={() => {
              window.open("https://docs.lighthouse.storage/", "_blank");
            }}
          >
            Explore Docs
          </button>
          <button
            className="fillBtn__purple"
            style={{ margin: "0px 8px", height: "50px" }}
            onClick={() => {
              window.open("https://files.lighthouse.storage/", "_blank");
            }}
          >
            Try For Free
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
