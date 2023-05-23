import React from "react";
import { ImageBox } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";
import Style from "./Testimonials.module.scss";

function Testimonials() {
  return (
    <div className={Style.Testimonials}>
      <div className={Style.Testimonials__titleContainer} data-aos="fade-up">
        <p className={Style.title}>{testimonialSection?.title}</p>
      </div>
      <div className={Style.Testimonials__testimonialContainer}>
        <div className={Style.Box1}>
          <div className={Style.testimonialBox} data-aos="fade-up">
            <p className={Style.testimonialBox__quote}>
              {testimonialSection?.testimonials[0]?.quote}
            </p>

            <p className={Style.testimonialBox__designation}>
              {testimonialSection?.testimonials[0]?.person} <br />
              <span>{testimonialSection?.testimonials[0]?.designation}</span>
            </p>
          </div>
          <div className={Style.testimonialBox} data-aos="fade-up">
            <p className={Style.testimonialBox__quote}>
              {testimonialSection?.testimonials[1]?.quote}
            </p>

            <p className={Style.testimonialBox__designation}>
              {testimonialSection?.testimonials[1]?.person} <br />
              <span>{testimonialSection?.testimonials[1]?.designation}</span>
            </p>
          </div>
        </div>
        <div className={Style.Box2}>
          <div className={Style.testimonialBox} data-aos="fade-up">
            <p className={Style.testimonialBox__quote}>
              {testimonialSection?.testimonials[2]?.quote}
            </p>

            <p className={Style.testimonialBox__designation}>
              {testimonialSection?.testimonials[2]?.person} <br />
              <span>{testimonialSection?.testimonials[2]?.designation}</span>
            </p>
          </div>
          <div className={Style.testimonialBox} data-aos="fade-up">
            <p className={Style.testimonialBox__quote}>
              {testimonialSection?.testimonials[3]?.quote}
            </p>

            <p className={Style.testimonialBox__designation}>
              {testimonialSection?.testimonials[3]?.person} <br />
              <span>{testimonialSection?.testimonials[3]?.designation}</span>
            </p>
          </div>
        </div>
        <div className={Style.GlobeBox} data-aos="fade-up">
          <ImageBox src={"/globe2.webp"} />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
