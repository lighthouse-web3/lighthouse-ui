import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl, mediaUrl } from "../../utils/Data/config";
import {
  BlogView,
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../../containers";
import { Metadata } from "../../components";

export const getStaticPaths = async () => {
  const res = await axios.get(`${baseUrl}/blogs?populate=*`);
  let allBlogs = res["status"] === 200 ? res["data"]?.["data"] : null;
  const paths = allBlogs.map((blog) => {
    return {
      params: {
        params: [blog?.attributes?.title?.trim()],
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const title = context.params.params[0];
  let blogData = "null";
  let allBlogs = [];
  try {
    const allBlogsRes = await axios.get(`${baseUrl}/blogs?populate=*`);
    allBlogs =
      allBlogsRes["status"] === 200 ? allBlogsRes["data"]?.["data"] : [];
    // console.log(allBlogs, "-----ALL BLOGS --- ");
    blogData = allBlogs.filter(
      (blog) =>
        blog?.attributes?.title?.trim()?.toLowerCase() == title?.toLowerCase()
    )?.[0]?.attributes;
  } catch (error) {}
  return {
    props: {
      blogData,
      allBlogs,
    },
  };
};

function Blog({ blogData, allBlogs }) {
  return (
    <>
      <Metadata
        title={blogData?.title}
        description={blogData?.description?.slice(0, 100) + "..."}
        image={mediaUrl + blogData?.coverImage?.data?.attributes?.url}
        url={`https://www.lhprotocol.com/blogs/${encodeURIComponent(
          blogData?.title
        )}`}
      />
      <div className={"bodyContainer"}>
        <Header style={{ backgroundColor: "#000" }} />
        <div className="sectionContainer">
          <div className="contentContainer">
            <BlogView blogData={blogData} />
          </div>
        </div>
        <div className="sectionContainer" style={{ minHeight: "auto" }}>
          <div
            className="contentContainer container"
            style={{ paddingBottom: "2rem" }}
          >
            <MostPopularBlogs blogsData={allBlogs} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Blog;
