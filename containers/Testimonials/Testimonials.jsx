import React from "react";
import { ImageBox, TestimonialCard, TitleSeprator } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";
import useWindowSize from "../../utils/Hooks/windowSize";

import Style from "./Testimonials.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

function Testimonials() {
  const windowSize = useWindowSize();
  console.log(windowSize.width);
  return (
    <div className={Style.Testimonials}>
      <TitleSeprator title={"Testimonials"} />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className={"testimonialSwipper"}
      >
        {testimonialSection?.["testimonials"]?.map((item, key) => (
          <SwiperSlide key={key}>
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
