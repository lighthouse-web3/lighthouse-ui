import React from "react";
import { mediaUrl } from "../../utils/Data/config";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./FeatureBlogCard.module.scss";

function FeatureBlogCard({ blog }) {
  console.log(blog, "===");
  return (
    <div
      className={Style.FeatureBlogCard}
      onClick={() => {
        window.open(
          `/blog/${blog?.id}/${blog?.attributes?.title?.replaceAll(" ", "-")}`,
          "_blank"
        );
      }}
    >
      <div className={Style.FeatureBlogCard__imageContainer}>
        <ImageBox
          src={mediaUrl + blog?.attributes?.coverImage?.data?.attributes?.url}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <p className={Style.FeatureBlogCard__title}>{blog?.attributes?.title}</p>
      <p className={Style.FeatureBlogCard__category}>
        {blog?.attributes?.author}
      </p>
    </div>
  );
}

export default FeatureBlogCard;
