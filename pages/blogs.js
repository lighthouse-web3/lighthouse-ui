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
      <Header />
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <FeaturedArticle />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set2"></div>
        <div className="bigShadow__set2"></div>
        <div className="contentContainer container">
          <MostPopularBlogs />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default blogs;
