import React, { useEffect, useRef, useState } from "react";
import Style from "./Testimonials.module.scss";
import { TestimonialCard } from "../../components";
import { testimonialSection } from "../../utils/Data/SiteContent";

function Testimonials() {
  const cardContainerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const calculateCardWidth = () => {
    const containerWidth = cardContainerRef?.current?.offsetWidth;
    const cardCount = 3;
    const gapRem = 2;
    const cardWidth =
      (containerWidth - gapRem * (cardCount - 1) * 16 - 2) / cardCount;
    return cardWidth;
  };

  useEffect(() => {
    setCardWidth(calculateCardWidth());
  }, []);

  return (
    <div className={Style.Testimonials}>
      <div className={Style.Testimonials__titleContainer}>
        <p>Testimonials</p>
        <p>What our client say</p>
      </div>
      <div className={Style.Testimonials__cardContainer} ref={cardContainerRef}>
        {testimonialSection?.testimonials.map((item, index) => (
          <span key={index} style={{ width: `${cardWidth}px` }}>
            <TestimonialCard {...item} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
