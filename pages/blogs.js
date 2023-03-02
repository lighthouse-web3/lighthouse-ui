import axios from "axios";
import React from "react";
import { Metadata } from "../components";
import {
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../containers";
import { baseUrl } from "../utils/Data/config";

export const getStaticProps = async () => {
  let blogsData = null;
  try {
    const res = await axios.get(`${baseUrl}/blogs?populate=*`);
    blogsData = res["status"] === 200 ? res["data"]?.["data"] : null;
  } catch (error) {}
  return {
    props: {
      blogsData,
    },
  };
};

function blogs({ blogsData }) {
  return (
    <>
      <Metadata title="Lighthouse Storage | Blogs" />

      <div className={"bodyContainer"}>
        <Header style={{ background: "#000" }} />
        <div
          className="sectionContainer"
          style={{
            background: "#1E0F2C",
            paddingTop: "3rem",
          }}
        >
          <div className="contentContainer container">
            <FeaturedArticle />
          </div>
        </div>
        <div
          className="sectionContainer"
          style={{
            background: "#1E0F2C",
            paddingTop: "3rem",
            marginTop: "4rem",
            minHeight: "50vh",
          }}
        >
          <div className="contentContainer container">
            <MostPopularBlogs blogsData={blogsData} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default blogs;
