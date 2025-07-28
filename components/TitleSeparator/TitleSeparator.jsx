import React from "react";
import Styles from "./TitleSeparator.module.scss";

function TitleSeparator({ topTitle, title, style }) {
  return (
    <div className={Styles.TitleSeparator} style={style}>
      {topTitle && <p>{topTitle}</p>}
      <h2 className="text-center w-4xl mx-auto">{title}</h2>
    </div>
  );
}

export default TitleSeparator;
