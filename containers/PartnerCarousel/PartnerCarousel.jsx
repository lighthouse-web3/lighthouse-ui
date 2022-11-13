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
        <div
          className={Styles.bgContainer}
          data-aos="fade-up"
          data-aos-delay="100"
        ></div>
        <div
          className={Styles.contentContainer}
          data-aos="fade-up"
          data-aos-delay="200"
        ></div>
      </div>
    </div>
  );
}

export default PartnerCarousel;
