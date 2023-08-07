import React, { useEffect, useState } from "react";
import { FeatureBlogCard, ImageBox } from "../../components";
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
    console.log(sorted[0]);

    setLatestBlog(sorted[0]);
  }, []);

  return (
    <div className={Style.FeaturedArticle}>
      <p className={Style.title}>Read our latest blog</p>
      <div className={Style.blogContainer} data-aos="fade-up">
        <div className={Style.blogContainer__contentBox}>
          <p className={Style.title}>{latestBlog?.attributes?.title}</p>

          <button
            className={"fillBtn__blue ptr"}
            onClick={() => {
              window.open(
                `/blog/${
                  latestBlog?.id
                }/${latestBlog?.attributes?.title?.replaceAll(" ", "-")}`,
                "_blank"
              );
            }}
          >
            Read Full Story
          </button>
        </div>
        <div className={Style.blogContainer__imageBox}>
          {latestBlog && (
            <ImageBox
              src={
                mediaUrl +
                latestBlog?.attributes?.coverImage?.data?.attributes?.url
              }
              width={"100%"}
              height={"30vh"}
              aspectRatio={true}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedArticle;
