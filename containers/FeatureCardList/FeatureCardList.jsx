import React, { useEffect, useRef, useState } from "react";
import { SuitCard } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Style from "./FeatureCardList.module.scss";

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
    <div className={Style.FeatureCardList + " container"}>
      <div
        className={Style.FeatureCardList__BannerContainer}
        data-aos="fade-up"
      >
        <div className={Style.Banner} style={gradientStyle}>
          <p>Experience the power of <br/>affordable permanent storage</p>
          <button
            className="border_btn"
            ref={bannerRef}
            onClick={() => {
              window.open(
                "https://docs.lighthouse.storage/lighthouse-1/",
                "__blank"
              );
            }}
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeatureCardList;
