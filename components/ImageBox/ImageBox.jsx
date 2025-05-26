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
  quality = 75,
  sizes,
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

  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

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
        quality={quality}
        sizes={defaultSizes}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0eHh0dHx8dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  );
}

export default React.memo(ImageBox);
