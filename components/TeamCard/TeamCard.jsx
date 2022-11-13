import React from "react";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./TeamCard.module.scss";

function TeamCard({ index }) {
  return (
    <div
      className={Style.TeamCard}
      data-aos="fade-up"
      data-aos-delay={100 * index}
    >
      <div className="imageContainer">
        <ImageBox src={"/sphere.png"} layout={"fill"} />
      </div>
      <div className={Style.Title}>Team Member</div>
      <div className={Style.designation}>Designation</div>
    </div>
  );
}

export default TeamCard;
