import React from "react";
import Styles from "./TitleSeprator.module.scss";
import ImageBox from "../ImageBox/ImageBox";

function TitleSeprator({ title }) {
  return (
    <div className={Styles.TitleSeprator}>
      <div className={Styles.TitleSeprator__iconContainer}>
        <ImageBox
          src={"/icons/titleStyle.svg"}
          aspectRatio={true}
          width={"120px"}
          height={"50px"}
        />
      </div>
      <p>{title}</p>
      <div className={Styles.TitleSeprator__iconContainer}>
        <ImageBox
          src={"/icons/titleStyle.svg"}
          aspectRatio={true}
          width={"120px"}
          height={"50px"}
        />
      </div>
    </div>
  );
}

export default TitleSeprator;
