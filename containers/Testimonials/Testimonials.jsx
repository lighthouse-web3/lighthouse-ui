import React from "react";
import { ImageBox } from "../../components";
import Style from "./Testimonials.module.scss";

function Testimonials() {
  return (
    <div className={Style.Testimonials}>
      <div className={Style.Testimonials__titleContainer}>
        <p className={Style.title}>What creators are saying about Lighthouse</p>
        <p className={Style.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue tellus
          urna, mi velit diam. Turpis diam amet massa id.
        </p>
        <button className={Style.button}>Try it Now</button>
      </div>
      <div className={Style.Testimonials__testimonialContainer}>
        <div className={Style.Box1}>
          <div className={Style.testimonialBox}>s</div>
          <div className={Style.testimonialBox}>s</div>
        </div>
        <div className={Style.Box2}>
          <div className={Style.testimonialBox}></div>
          <div className={Style.testimonialBox}></div>
        </div>
        <div className={Style.GlobeBox}>
          <ImageBox src={"/globe2.png"} />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
