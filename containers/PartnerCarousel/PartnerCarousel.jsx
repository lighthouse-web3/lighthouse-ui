import React from "react";
import Styles from "./PartnerCarousel.module.scss";

function PartnerCarousel() {
  return (
    <div className={Styles.PartnerCarousel}>
      <div className={Styles.title}>
        Trusted <span className="gradient__Text">By</span>
      </div>
      <hr />
      <div className={Styles.carouselContainer}>
        <div className={Styles.bgContainer}></div>
        <div className={Styles.contentContainer}></div>
      </div>
    </div>
  );
}

export default PartnerCarousel;
