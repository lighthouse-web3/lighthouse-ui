import React from "react";
import Style from "./TestimonialCard.module.scss";

function TestimonialCard() {
  return (
    <div className={Style.TestimonialCard}>
      <div className={Style.container + " gradient__Border"}>
        <div className={Style.titleContainer}>
          <p className={Style.title}>John Doe</p>
          <p className={Style.designation}>Designation</p>
        </div>
        <p className={Style.testimonialContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          magni expedita dolor fugiat rem labore aut vel soluta, iusto repellat!
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
