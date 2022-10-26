import React from "react";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./TeamCard.module.scss";

function TeamCard() {
  return (
    <div className={Style.TeamCard}>
      <div className="imageContainer">
        <ImageBox src={"/sphere.png"} layout={"fill"} />
      </div>
      <div className={Style.Title}>Team Member</div>
      <div className={Style.designation}>Designation</div>
    </div>
  );
}

export default TeamCard;
