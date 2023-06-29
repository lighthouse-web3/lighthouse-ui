import React from "react";
import Style from "./TestimonialCard.module.scss";
import ImageBox from "../ImageBox/ImageBox";

function TestimonialCard({ quote, person, designation }) {
  return (
    <div className={Style.TestimonialCard}>
      <ImageBox src={"/icons/apostrophy.svg"} width={80} height={100} />
      <p className={Style.TestimonialCard__testimonial}>{quote}</p>

      <div className={Style.TestimonialCard__userBox}>
        <ImageBox
          src={"/testimonial/client.png"}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />

        <p>
          {person} <br /> <small>{designation}</small>
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
