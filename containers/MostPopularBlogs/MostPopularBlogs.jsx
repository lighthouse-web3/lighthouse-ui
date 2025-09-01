import React from "react";
import { FeatureBlogCard, TitleSeparator } from "../../components";
import Style from "./MostPopularBlogs.module.scss";

// import required modules

function MostPopularBlogs({ blogsData }) {
  console.log(blogsData, "-----BLOGS DATA --- ");
  const sortedBlogsData = blogsData?.sort((a, b) => {
    return (
      new Date(b?.attributes?.publishedAt) -
      new Date(a?.attributes?.publishedAt)
    );
  });
  console.log(sortedBlogsData, "-----SORTED BLOGS DATA --- ");

  return (
    <div className={Style.MostPopularBlogs} data-aos="fade-up">
      <TitleSeparator
        style={{ alignItems: "flex-start" }}
        topTitle={"Our Blogs"}
        title={"Read our latest blog"}
      />
      <div className={Style.MostPopularBlogs__carouselContainer}>
        {sortedBlogsData?.map((item, index) => (
          <div
            className={Style.blogCard}
            key={index}
            data-aos="fade-up"
            data-aos-delay={100 * index}
          >
            <FeatureBlogCard blog={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostPopularBlogs;
