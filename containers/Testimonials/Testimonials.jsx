import React from "react";
import { TestimonialCard, TitleSeparator } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";
import Style from "./Testimonials.module.scss";

function Testimonials() {
  return (
    <div className={Style.Testimonials}>
      {/* <div className={Style.Testimonials__titleContainer}>
        <p></p>
        <p>Testimonials</p>
      </div> */}
      <TitleSeparator title={"Testimonials"} />

      <div className={Style.Testimonials__cardContainer}>
        {testimonialSection?.testimonials.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <TestimonialCard {...item} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
