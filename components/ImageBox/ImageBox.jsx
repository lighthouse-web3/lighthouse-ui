import Image from "next/image";
import React, { useState } from "react";
import Styles from "./ImageBox.module.scss";

function ImageBox({
  width,
  maxWidth,
  height,
  maxHeight,
  alt,
  src,
  style,
  layout,
  ...rest
}) {
  let dimensions = {};
  width ? (dimensions["width"] = width) : "100%";
  maxWidth ? (dimensions["maxWidth"] = maxWidth) : "100%";
  height ? (dimensions["height"] = height) : "unset";
  maxHeight ? (dimensions["maxHeight"] = maxHeight) : "unset";

  const [source, setSource] = useState(src);

  return (
    <div className={Styles.imageContainer} style={dimensions}>
      <Image
        className={Styles.image}
        {...rest}
        style={style}
        alt={alt ? alt : "icon"}
        src={src}
        layout={layout ? layout : "fill"}
      />
    </div>
  );
}

export default ImageBox;
