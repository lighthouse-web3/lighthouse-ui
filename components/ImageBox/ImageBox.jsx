import Image from "next/image";
import React, { useMemo } from "react";
import Styles from "./ImageBox.module.scss";

function ImageBox({
  width,
  maxWidth,
  height,
  maxHeight,
  alt,
  src,
  style,
  layout = "fill",
  aspectRatio,
  priority = false,
  ...rest
}) {
  const dimensions = useMemo(() => {
    const dims = {};
    if (width) dims.width = width;
    if (maxWidth) dims.maxWidth = maxWidth;
    if (height) dims.height = height;
    if (maxHeight) dims.maxHeight = maxHeight;
    return dims;
  }, [width, maxWidth, height, maxHeight]);

  const containerClass = aspectRatio ? 
    Styles.imageRatioContainer : 
    Styles.imageContainer;

  return (
    <div className={containerClass} style={dimensions}>
      <Image
        className={Styles.image}
        {...rest}
        style={{ objectFit: "cover", ...style }}
        alt={alt || "image"}
        src={src}
        objectFit="contain"
        layout={layout}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

export default React.memo(ImageBox);
