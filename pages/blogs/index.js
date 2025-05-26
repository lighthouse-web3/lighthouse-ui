import axios from "axios";
import React from "react";
import { Metadata } from "../../components";
import {
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../../containers";
import { baseUrl } from "../../utils/Data/config";

export const getStaticProps = async () => {
  let blogsData = null;
  try {
    const res = await axios.get(`${baseUrl}/blogs?pagination[pageSize]=50&populate=*`);
    blogsData = res["status"] === 200 ? res["data"]?.["data"] : null;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
  
  return {
    props: {
      blogsData: blogsData || [],
    },
    revalidate: 3600, 
    notFound: !blogsData, 
  };
};

function Blogs({ blogsData }) {
  if (!blogsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Metadata 
        title="Lighthouse Storage | Blogs"
        description="Latest blogs and articles about decentralized storage and Lighthouse"
      />

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
