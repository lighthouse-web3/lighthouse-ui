import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FeatureCard, ImageBox, TitleSeprator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Style from "./FeatureCardList.module.scss";

const featuresList = [];

function FeatureCardList() {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const bannerRef = useRef();
  const calculateGradientAngle = () => {
    const angle = Math.atan2(mouseCoords.y, mouseCoords.x) * (180 / Math.PI);
    return angle;
  };

  const gradientAngle = calculateGradientAngle();

  const gradientStyle = {
    background: `linear-gradient(${gradientAngle}deg, #a659ff -28.73%, #7178ff 23.23%, #2148ff 62.74%, #ff3517 111.77%)`,
  };

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      const rect = bannerRef?.current?.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouseCoords({ x, y });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <div className={Style.FeatureCardList}>
      <TitleSeprator data-aos="fade-up" title={"Lighthouse Suite"} />
      <div className={Style.FeatureCardList__FeatureContainer}>
        {LandingPageData?.StorageFeature.map((item, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={100 * index}
            className={Style.featureBox}
            key={index}
            onClick={() => {
              window.open(item?.link, "__blank");
            }}
          >
            <div className={Style.featureBox__icon}>
              <ImageBox src={item?.icon} />
            </div>
            <div className={Style.featureBox__title}>
              <p>{item?.title}</p>
              <span>
                <AiOutlineArrowRight />
              </span>
            </div>
            <p className={Style.featureBox__description}>{item?.description}</p>
          </div>
        ))}
      </div>
      <div
        className={Style.FeatureCardList__BannerContainer}
        data-aos="fade-up"
      >
        <div className={Style.Banner} style={gradientStyle}>
          <p>Come change the way we store data on blockchain</p>
          <button
            className="border_btn"
            ref={bannerRef}
            onClick={() => {
              window.open("https://files.lighthouse.storage/", "__blank");
            }}
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeatureCardList;
