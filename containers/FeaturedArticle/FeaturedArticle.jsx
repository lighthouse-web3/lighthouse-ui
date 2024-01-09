import React, { useEffect, useState } from "react";
import { FeatureBlogCard, ImageBox, TitleSeprator } from "../../components";
import blogs from "../../pages/blogs";
import { mediaUrl } from "../../utils/Data/config";
import useWindowSize from "../../utils/Hooks/windowSize";
import Style from "./FeaturedArticle.module.scss";

function FeaturedArticle({ blogsData }) {
  const [latestBlog, setLatestBlog] = useState(null);
  useEffect(() => {
    let sorted = blogsData.sort(function (a, b) {
      return (
        new Date(b?.attributes?.publishedAt) -
        new Date(a?.attributes?.publishedAt)
      );
    });
    setLatestBlog(sorted[0]);
  }, []);

  return (
    <div className={Style.FeaturedArticle}>
      <div className={Style.blogContainer} data-aos="fade-up">
        <div
          className={Style.blogContainer__contentBox}
          onClick={() => {
            window.open(
              `/blogs/${latestBlog?.attributes?.title?.trim()}`,
              "_blank"
            );
          }}
        >
          <p className={Style.title + " ptr"}>
            {latestBlog?.attributes?.title}
          </p>
          <button className={"fillBtn__blue ptr"}>Read Full Story</button>
        </div>
        <div
          className={Style.blogContainer__imageBox}
          onClick={() => {
            window.open(
              `/blogs/${latestBlog?.attributes?.title?.trim()}`,
              "_blank"
            );
          }}
        >
          {latestBlog && (
            <ImageBox
              src={
                mediaUrl +
                latestBlog?.attributes?.coverImage?.data?.attributes?.url
              }
              className="ptr"
              width={"100%"}
              height={"100%"}
              aspectRatio={true}
              layout={"fill"}
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedArticle;
