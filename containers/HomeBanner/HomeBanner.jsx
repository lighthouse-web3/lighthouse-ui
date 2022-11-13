import React from "react";
import { ImageBox } from "../../components";
import Styles from "./HomeBanner.module.scss";

function HomeBanner() {
  return (
    <div className={Styles.Banner}>
      <div className={Styles.infoBox} data-aos="fade-up">
        <div className={Styles.title}>The Future is now</div>
        <div className={Styles.subTitle}>
          Store Files Perpetually on IPFS and Filecoin : Store Files Perpetually
          on IPFS and Filecoin
        </div>
        <div className={Styles.mainBox}>
          <p>Enter your email to get the latest news</p>
          <div className={Styles.inputContainer}>
            <input type="text" placeholder="Email" />
            <button className={Styles.button + " gradient__Button"}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.globeBox} data-aos="fade-up">
        <ImageBox
          src={"/globe.png"}
          alt="BannerImage"
          layout={"fill"}
          width={"100%"}
        />
      </div>
    </div>
  );
}

export default HomeBanner;
