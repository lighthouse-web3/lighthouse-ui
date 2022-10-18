import React from "react";
import { Styles } from "./BGComponent.module.scss";

function BGComponent({ Component }) {
  return (
    <div>
      <Component />
    </div>
  );
}

export default BGComponent;
