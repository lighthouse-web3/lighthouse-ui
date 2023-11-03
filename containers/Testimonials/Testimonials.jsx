import React, { useEffect, useRef, useState } from "react";
import Style from "./Testimonials.module.scss";
import { TestimonialCard } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";

function Testimonials() {
  return (
    <div className={Style.Testimonials}>
      <div className={Style.Testimonials__titleContainer}>
        <p></p>
        <p>What our client say</p>
      </div>
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
