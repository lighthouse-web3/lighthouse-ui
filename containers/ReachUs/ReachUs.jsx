import React from "react";
import { ImageBox } from "../../components";
import Style from "./ReachUs.module.scss";

function ReachUs() {
  return (
    <div className={Style.ReachUs}>
      <div
        className={Style.infoContainer}
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <div className={Style.top}>
          <div className={Style.title}>
            Reach Us <span className="gradient__Text">Out</span>
          </div>
          More about lighthouse roadmap and progress.
        </div>
        <div className={Style.bottom}>
          Contact Us <br />
          <span className={Style.email}>Support@lighthouse.storage</span>
        </div>
      </div>
      <div
        className={Style.mapContainer}
        data-aos="fade-up"
        data-aos-delay={400}
      >
        <ImageBox src={"/worldMap.png"} layout="fill" />
      </div>
    </div>
  );
}

export default ReachUs;
