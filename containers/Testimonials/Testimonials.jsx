import React, { useRef } from "react";
import { ImageBox, TestimonialCard, TitleSeprator } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";
import useWindowSize from "../../utils/Hooks/windowSize";

import Style from "./Testimonials.module.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

function Testimonials() {
  const windowSize = useWindowSize();
  const swiperRef = useRef();

  console.log(windowSize.width, swiperRef);
  return (
    <div className={Style.Testimonials}>
      <TitleSeprator title={"Testimonials"} />
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
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
        modules={[EffectCoverflow, Navigation]}
        className={"testimonialSwipper"}
      >
        {testimonialSection?.["testimonials"]?.map((item, key) => (
          <SwiperSlide key={key}>
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={Style.Testimonials__navigationBox}>
        <span
          onClick={() => {
            swiperRef?.current?.slidePrev();
          }}
        >
          <MdOutlineNavigateNext />
        </span>
        <span
          onClick={() => {
            swiperRef?.current?.slideNext();
          }}
        >
          <MdOutlineNavigateNext />
        </span>
      </div>
    </div>
  );
}

export default Testimonials;
