import axios from "axios";
import React, { useEffect, useState } from "react";
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
    console.log(blogsData);
  } catch (error) {}
  return {
    props: {
      blogsData,
    },
  };
};

function Blogs({ blogsData }) {
  // const [blogsData, setBlogsData] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(`${baseUrl}/blogs?populate=*`);
  //     let blogsData = res["status"] === 200 ? res["data"]?.["data"] : null;
  //     setBlogsData(blogsData);
  //   })();

  //   return () => {};
  // }, []);

  return (
    <>
      <Metadata title="Lighthouse Storage | Blogs" />

      <div className={"bodyContainer"}>
        <Header style={{ background: "#000" }} />
        <div className="sectionContainer" style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            {blogsData && <FeaturedArticle blogsData={blogsData} />}
          </div>
        </div>
        <div className="sectionContainer" style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            {blogsData && <MostPopularBlogs blogsData={blogsData} />}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Blogs;
