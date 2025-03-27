import React from "react";
import Styles from "./TitleSeprator.module.scss";
import ImageBox from "../ImageBox/ImageBox";

function TitleSeprator({ topTitle, title, style }) {
  return (
    <div className={Styles.TitleSeprator} style={style}>
      {/* <p>{topTitle}</p> */}
      <p>{title}</p>
    </div>
  );
}

export default TitleSeprator;
