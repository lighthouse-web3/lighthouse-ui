import React from "react";
import { FeatureBlogCard } from "../../components";

function MostPopularBlogs({ blogsData }) {
  const sortedBlogsData = blogsData?.sort((a, b) => {
    return (
      new Date(b?.attributes?.publishedAt) -
      new Date(a?.attributes?.publishedAt)
    );
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {sortedBlogsData?.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          <FeatureBlogCard blog={item} delay={100 * index} />
        </React.Fragment>
      ))}
    </section>
  );
}

export default MostPopularBlogs;
