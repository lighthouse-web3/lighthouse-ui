import React, { useEffect, useRef, useState } from "react";
import Style from "./NftSteps.module.scss";
import { SuitCard, TitleSeprator } from "../../components";
import { NftStepsData } from "../../utils/Data/SiteContent";
import CardNative from "../../components/CardNative/CardNative";

function NftSteps() {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const bannerRef = useRef();
  const calculateGradientAngle = () => {
    const angle = Math.atan2(mouseCoords.y, mouseCoords.x) * (180 / Math.PI);
    return angle;
  };

  const gradientAngle = calculateGradientAngle();
  const gradientStyle = {
    background: `linear-gradient(${gradientAngle}deg, #6643eb -28.73%, #7178ff 23.23%, #2148ff 62.74%, #6643eb 111.77%)`,
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
    <div className={Style.NftSteps}>
      <TitleSeprator
        title={"How it works"}
        bottomTitle={
          "Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups."
        }
      />
      <div className={Style.NftSteps__cardContainer}>
        {NftStepsData?.NftSteps.map((item, index) => (
          <span key={index} data-aos="fade-up" data-aos-delay={100 * index}>
            <CardNative
              {...item}
              style={{ border: "2px solid #4f4f4f" }}
              link={true}
            />
          </span>
        ))}
      </div>
      <div className={Style.NftSteps__BannerContainer} data-aos="fade-up">
        <div className={Style.Banner} style={gradientStyle}>
          <div>
            <p>Lorem Ipsum is simply dummy text</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          <button
            className="border_btn"
            ref={bannerRef}
            onClick={() => {
              // window.open("https://files.lighthouse.storage/", "__blank");
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default NftSteps;
