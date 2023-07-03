import React, { useEffect, useRef, useState } from "react";
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

function Testimonials() {
  const windowSize = useWindowSize();
  const [currentSlide, setCurrentSlide] = useState();
  const swiperRef = useRef();

  useEffect(() => {
    swiperRef?.current?.slideNext();
  }, []);

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
        onSlideChange={(e) => {
          console.log(e);
          setCurrentSlide(e?.activeIndex);
        }}
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
          style={currentSlide === 0 ? { opacity: "0.5", cursor: "auto" } : {}}
        >
          <MdOutlineNavigateNext />
        </span>
        <span
          onClick={() => {
            swiperRef?.current?.slideNext();
          }}
          style={
            currentSlide === testimonialSection?.["testimonials"]?.length - 1
              ? { opacity: "0.5", cursor: "auto" }
              : {}
          }
        >
          <MdOutlineNavigateNext />
        </span>
      </div>
    </div>
  );
}

export default Testimonials;
