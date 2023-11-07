import React from "react";
import { ImageBox } from "../../components";
import { mediaUrl } from "../../utils/Data/config";
import Style from "./BlogView.module.scss";
import ReactMarkdown from "react-markdown";

function BlogView({ blogData }) {
  return (
    <div className={Style.BlogView}>
      <div className={Style.BlogView__BannerImage + " container"}>
        {blogData && (
          <ImageBox
            src={mediaUrl + blogData?.coverImage?.data?.attributes?.url}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            layout={"fill"}
            aspectRatio={false}
            maxHeight={"100%"}
          />
        )}
      </div>
      <div className={Style.BlogView__contentContainer}>
        <p className={Style.title}>{blogData?.title}</p>

        <div className={Style.fontContainer}></div>

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
