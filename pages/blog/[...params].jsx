import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Style from "../../styles/Blog.module.scss";
import axios from "axios";
import { baseUrl } from "../../utils/Data/config";
import {
  BlogView,
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../../containers";

export const getStaticPaths = async () => {
  const res = await axios.get(`${baseUrl}/blogs?populate=*`);
  let allBlogs = res["status"] === 200 ? res["data"]?.["data"] : null;

  const paths = allBlogs.map((blog) => {
    return {
      params: {
        params: [
          blog["id"] + "",
          blog?.attributes?.title?.replaceAll(" ", "-"),
        ],
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.params[0];
  let blogData = "null";
  try {
    const res = await axios.get(`${baseUrl}/blogs/${id}?populate=*`);
    blogData =
      res["status"] === 200 ? res["data"]?.["data"]?.["attributes"] : null;
  } catch (error) {}
  return {
    props: {
      blogData,
    },
  };
};

function Blog({ blogData }) {
  const router = useRouter();
  const { params } = router.query;
  const [showBlog, setShowBlog] = useState(blogData);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/blogs?populate=*`);
        res["status"] === 200 &&
          getSimilarBlogs(showBlog, res["data"]?.["data"], setSimilarBlogs);
      } catch (error) {}
    })();
  }, [params]);
  return (
    <div className={"bodyContainer"}>
      <Header style={{ backgroundColor: "#000" }} />
      <div className="sectionContainer">
        <div className="contentContainer">
          <BlogView />
        </div>
      </div>
      <div className="sectionContainer">
        <div
          className="contentContainer container"
          style={{ maxHeight: "50vh", marginBottom: "2rem" }}
        >
          <MostPopularBlogs />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
