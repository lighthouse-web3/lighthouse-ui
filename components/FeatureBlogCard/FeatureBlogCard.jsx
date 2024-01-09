import React from "react";
import { mediaUrl } from "../../utils/Data/config";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./FeatureBlogCard.module.scss";

function FeatureBlogCard({ blog }) {
  return (
    <div
      className={Style.FeatureBlogCard}
      onClick={() => {
        window.open(`/blogs/${blog?.attributes?.title?.trim()}`, "_blank");
      }}
    >
      <div className={Style.FeatureBlogCard__imageContainer}>
        <ImageBox
          src={mediaUrl + blog?.attributes?.coverImage?.data?.attributes?.url}
          width={"100%"}
          height={"200px"}
          aspectRatio={false}
          layout={"fill"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <p className={Style.FeatureBlogCard__category}>
        {blog?.attributes?.author}
      </p>
      <p className={Style.FeatureBlogCard__title}>{blog?.attributes?.title}</p>
    </div>
  );
}

export default FeatureBlogCard;
