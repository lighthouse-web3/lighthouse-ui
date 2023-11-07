import React from "react";
import Style from "./TestimonialCard.module.scss";
import ImageBox from "../ImageBox/ImageBox";

function TestimonialCard({ quote, person, designation, img, link }) {
  return (
    <div className={Style.TestimonialCard}>
      <div className={Style.TestimonialCard__titleBox}>
        <ImageBox
          src={img}
          style={{ borderRadius: "50%" }}
          width={"3rem"}
          height={"3rem"}
        />
        <div className={Style.personBox}>
          <p
            className="ptr"
            onClick={() => {
              window.open(link, "_blank");
            }}
          >
            {person}
          </p>
          <p>{designation}</p>
        </div>
      </div>
      <p className={Style.TestimonialCard__testimonial}>{quote}</p>
    </div>
  );
}

export default TestimonialCard;
