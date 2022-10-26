import React from "react";
import Style from "./Roadmap.module.scss";

function Roadmap() {
  return (
    <div className={Style.Roadmap}>
      <div className={Style.milestoneContainer}>
        <div className={Style.leftContainer}>
          <div className={Style.quater}>Q4-2021</div>
          <div className={Style.title}>Milestone-1</div>
          <div className={Style.number}>1</div>
        </div>
        <div className={Style.rightContainer}>
          <div className={Style.quater}>Q4-2021</div>
          <div className={Style.title}>Milestone-1</div>
          <div className={Style.number}>2</div>
        </div>
        <div className={Style.leftContainer}>
          <div className={Style.quater}>Q4-2021</div>
          <div className={Style.title}>Milestone-1</div>
          <div className={Style.number}>3</div>
        </div>
        <div className={Style.rightContainer} style={{ border: "none" }}>
          <div className={Style.quater}>Q4-2021</div>
          <div className={Style.title}>Milestone-1</div>
          <div className={Style.number}>4</div>
        </div>
      </div>
      <div className={Style.informationContainer}>
        <div className={Style.title}>
          Our
          <span className="gradient__Text"> Roadmap</span>
        </div>
        <div className={Style.subTitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos autem
          quod odio quo, possimus temporibus neque ipsa dolorem. Animi,
          expedita!
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
