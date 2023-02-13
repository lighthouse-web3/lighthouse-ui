import React from "react";
import {
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../containers";

function blogs() {
  return (
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
          <MostPopularBlogs />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default blogs;
