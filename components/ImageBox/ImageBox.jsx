import Image from "next/image";
import React from "react";
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
  aspectRatio,
  ...rest
}) {
  let dimensions = {};
  width ? (dimensions["width"] = width) : "100%";
  maxWidth ? (dimensions["maxWidth"] = maxWidth) : "100%";
  height ? (dimensions["height"] = height) : "unset";
  maxHeight ? (dimensions["maxHeight"] = maxHeight) : "unset";

  return (
    <div
      className={
        aspectRatio ? Styles.imageRatioContainer : Styles.imageContainer
      }
      style={{ ...dimensions, overflow: "hidden" }}
    >
      <Image
        className={Styles.image}
        {...rest}
        style={{ ...style }}
        // style={style}
        alt={alt ? alt : "icon"}
        src={src}
        objectFit={style?.objectFit ? style.objectFit : "cover"}
        layout={layout ? layout : "fill"}
      />
    </div>
  );
}

export default ImageBox;
