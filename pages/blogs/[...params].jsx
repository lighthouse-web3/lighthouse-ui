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
  const res = await axios.get(
    `${baseUrl}/blogs?pagination[pageSize]=50&populate=*`
  );
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
    const allBlogsRes = await axios.get(
      `${baseUrl}/blogs?pagination[pageSize]=50&populate=*`
    );
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
        url={`https://www.lighthouse.storage/blogs/${encodeURIComponent(
          blogData?.title
        )}`}
      />
      <div className="bg-[#131314] text-[#e4e2e2] font-sans min-h-screen flex flex-col">
        <Header />
        <main className="pt-32 pb-20 px-6 w-full max-w-screen-lg mx-auto flex-1">
          <BlogView blogData={blogData} />
        </main>
        <div className="px-6 w-full max-w-screen-2xl mx-auto">
          <h3 className="text-3xl font-headline font-bold text-[#e4e2e2] mb-12">Read More Articles</h3>
          <MostPopularBlogs blogsData={allBlogs} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Blog;
