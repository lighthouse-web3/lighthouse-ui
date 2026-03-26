import React, { useContext } from "react";
import { ImageBox } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import ThemeContext from "../../utils/services/Themecontext";

function PartnerCarousel() {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="py-16 bg-[#1b1c1c] overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-center text-[#cec2d7]/40 text-xs font-bold tracking-[0.3em] uppercase mb-12 font-sans">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {LandingPageData?.clientsLogo?.map((item, index) => (
            <span
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 * index}
              style={
                theme === "dark"
                  ? { filter: "brightness(100%)" }
                  : { filter: "brightness(10%)" }
              }
            >
              <ImageBox
                src={item?.icon}
                width={"200px"}
                height={"100px"}
                aspectRatio={true}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerCarousel;
