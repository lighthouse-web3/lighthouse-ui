import React from "react";
import Style from "./MascotBox.module.scss";

function MascotBox({
  bgImage,
  mascotImage,
  heading,
  description,
  position = "left",
}) {
  return (
    <div
      className={Style.mascotBoxWrapper}
      style={
        position === "left"
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    >
      <div className={Style.imageWrapper}>
        <div className={position === "left" ? Style.leftBg : Style.rightBg}>
          <img src={bgImage} alt="moon" />
        </div>
      </div>

      <div
        className={position === "left" ? Style.mascotLeft : Style.mascotRight}
      >
        <img src={mascotImage} alt="mascot" />
      </div>
      <div className={Style.textWrapper}>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MascotBox;
