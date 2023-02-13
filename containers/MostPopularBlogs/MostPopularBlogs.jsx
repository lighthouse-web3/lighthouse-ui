import React, { useEffect, useState } from "react";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FeatureBlogCard } from "../../components";
import Style from "./MostPopularBlogs.module.scss";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

function MostPopularBlogs() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
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
    <div className={Style.MostPopularBlogs}>
      <p className={Style.MostPopularBlogs__title}>Recent Blogs</p>
      <div className={Style.MostPopularBlogs__carouselContainer}>
        <Swiper
          slidesPerView={windowSize.width > 600 ? 4 : 1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={Style.blogCard}>
              <FeatureBlogCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Style.blogCard}>
              <FeatureBlogCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Style.blogCard}>
              <FeatureBlogCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Style.blogCard}>
              <FeatureBlogCard />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MostPopularBlogs;
