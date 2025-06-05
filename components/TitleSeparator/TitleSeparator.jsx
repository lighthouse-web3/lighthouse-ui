import React from "react";
import Styles from "./TitleSeparator.module.scss";

function TitleSeparator({ topTitle, title, style }) {
  return (
    <div className={Styles.TitleSeparator} style={style}>
      {/* <p>{topTitle}</p> */}
      <h2>{title}</h2>
    </div>
  );
}

export default TitleSeparator;
