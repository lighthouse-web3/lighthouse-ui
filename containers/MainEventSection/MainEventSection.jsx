import React from "react";
import Style from "./MainEventSection.module.scss";

function MainEventSection() {
  return (
    <div className={Style.MainEventSection}>
      <div className={Style.contentBlock}>
        <div className={Style.title}>
          Hackathon at
          <span className="gradient__Text"> IIT Delhi</span>
        </div>
        <p className={Style.subTitle}>Hackathon at IIT Delhi</p>
      </div>
      <div className={Style.imageBlock + " gradient__Border"}>ss</div>
    </div>
  );
}

export default MainEventSection;
