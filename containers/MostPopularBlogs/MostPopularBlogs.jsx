import React, { useEffect, useRef, useState } from "react";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FeatureBlogCard } from "../../components";
import Style from "./MostPopularBlogs.module.scss";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const getNumberOfElements = (parentWidth, minComponentWidth) => {
  let number = Math.floor(parentWidth / minComponentWidth);
  return number;
};

const getFillWidth = (parentWidth) => {
  let numberOfElement = getNumberOfElements(parentWidth, 300);
  return (parentWidth / numberOfElement).toFixed(2) - 20;
};

function MostPopularBlogs({ blogsData }) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={Style.MostPopularBlogs} data-aos="fade-up">
      <p className={Style.MostPopularBlogs__title}>Our Blogs</p>
      <div className={Style.MostPopularBlogs__carouselContainer}>
        {blogsData?.map((item, index) => (
          <div
            className={Style.blogCard}
            style={{
              width: getFillWidth(
                windowSize.width > 550
                  ? windowSize.width - 0.3 * windowSize.width
                  : windowSize.width
              ),
            }}
            key={index}
          >
            <FeatureBlogCard blog={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostPopularBlogs;
