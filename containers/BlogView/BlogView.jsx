import React from "react";
import { ImageBox } from "../../components";
import { mediaUrl } from "../../utils/Data/config";
import Style from "./BlogView.module.scss";
import ReactMarkdown from "react-markdown";

function BlogView({ blogData }) {
  return (
    <div className={Style.BlogView}>
      <div className={Style.BlogView__BannerImage}>
        <div
          className={Style.image}
          style={{
            background: `url("${
              mediaUrl + blogData?.coverImage?.data?.attributes?.url
            }")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className={Style.overlay}></div>
      </div>
      <div className={Style.BlogView__contentContainer + " container"}>
        <p className={Style.title}>{blogData?.title}</p>

        <div className={Style.contentBox}>
          <ReactMarkdown
            linkTarget={"_blank"}
            // eslint-disable-next-line react/no-children-prop
            children={blogData?.description?.replaceAll(
              "/uploads/",
              `${mediaUrl}/uploads/`
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogView;
