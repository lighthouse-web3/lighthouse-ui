import React from "react";
import { ImageBox } from "../../components";
import Style from "./EventBlogBanner.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowSize from "../../utils/Hooks/windowSize";

function EventBlogBanner() {
  let blogs = [1, 1, 1, 1];
  let size = useWindowSize();
  console.log(size);
  return (
    <div className={Style.EventBlogBanner}>
      <div className={Style.BannerContainer}>
        <div className={Style.imageContainer}>
          <ImageBox
            src={
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
            layout="fill"
            width={"100%"}
          />
        </div>
        <div className={Style.overlayContainer}></div>
        <div className={Style.contentContainer + " container"}>
          <p className={Style.title}>Short Reads</p>
          <hr />
          <div className={Style.carouselContainer}>
            <Swiper
              spaceBetween={50}
              slidesPerView={size?.width < 500 ? 1 : 3}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {blogs.map((blog, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={Style.blogCard}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                  >
                    <div className={Style.imgBlock}>
                      <ImageBox
                        src={
                          "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        }
                        layout="fill"
                        height={"100%"}
                      />
                    </div>
                    <p className={Style.title}>
                      Lighthouse is partnering with Stack OS
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventBlogBanner;
