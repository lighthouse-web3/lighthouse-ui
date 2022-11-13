import React from "react";
import Style from "./Testimonials.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import { TestimonialCard } from "../../components";

function Testimonials() {
  return (
    <div className={Style.Testimonials}>
      <div
        className={Style.titleContainer}
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <div className={Style.title + " sectionTitle"}>
          Our <span className="gradient__Text">TESTIMONIAL</span> From <br />{" "}
          Best Clients
        </div>
      </div>
      <div
        className={Style.carouselContainer}
        data-aos="fade-up"
        data-aos-delay={400}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={true}
          modules={[Pagination]}
          className={Style.testimonialCrousel}
        >
          <SwiperSlide>
            <div className={Style.slide}>
              <TestimonialCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Style.slide}>
              <TestimonialCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Style.slide}>
              <TestimonialCard />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonials;
