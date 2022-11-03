import React from "react";
import ImageBox from "../ImageBox/ImageBox";
import Style from "./MarqueeScroller.module.scss";

function MarqueeScroller({ logos, direction, speed }) {
  const icons = [
    "/icons/binance.png",
    "/icons/ethereum.png",
    "/icons/fantom.png",
    "/icons/polygon.png",
    "/icons/solana_s.png",
    "/icons/binance.png",
    "/icons/ethereum.png",
    "/icons/fantom.png",
    "/icons/polygon.png",
    "/icons/solana_s.png",
  ];
  return (
    <div className={Style.MarqueeScroller}>
      <marquee
        width="100%"
        direction={direction}
        height="150px"
        behavior="scroll"
        scrollamount={speed}
        scrolldelay="60"
      >
        <div className={Style.logoContainer}>
          {icons.map((logo, index) => (
            <div className={Style.logoBox} key={index}>
              <ImageBox
                src={logo}
                layout="fill"
                width={"100px"}
                height={"100px"}
              />
            </div>
          ))}
        </div>
      </marquee>
    </div>
  );
}

export default MarqueeScroller;
