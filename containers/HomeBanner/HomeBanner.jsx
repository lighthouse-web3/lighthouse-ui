import React from "react";
import { ImageBox } from "../../components";
import Styles from "./HomeBanner.module.scss";

function HomeBanner() {
  return (
    <div className={Styles.Banner}>
      <div className={Styles.infoBox} data-aos="fade-up">
        <div className={Styles.title}>Store Files Perpetually</div>
        <div className={Styles.subTitle}>
          Lighthouse allows users to store their files on the decentralized
          network for lifetime at a fixed price
        </div>
        {/* <div className={Styles.mainBox}>
          <p>Enter your email to get the latest news</p>
          <div className={Styles.inputContainer}>
            <input type="text" placeholder="Email" />
            <button className={Styles.button + " gradient__Button"}>
              Submit
            </button>
          </div>
        </div> */}
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
