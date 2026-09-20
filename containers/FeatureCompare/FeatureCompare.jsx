import React, { useContext } from "react";
import { LandingPageData } from "../../utils/Data/SiteContent";
import { ImageBox } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";

function FeatureCompare() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="py-24 px-8 bg-bg text-ink font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left" data-aos="fade-up">
          <span className="text-accent font-sans text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Engineered for Permanence
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tighter">
            Why choose Lighthouse?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LandingPageData.KeyFeatures.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 * index}
              className="p-8 rounded-xl bg-surface border border-line/10 hover:border-accent/30 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 overflow-hidden"
                style={theme === "dark" ? {} : { background: "#343535" }}
              >
                <ImageBox
                  src={item.icon}
                  width="2.5rem"
                  height="2.5rem"
                  aspectRatio={true}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
              <h3 className="text-xl font-bold font-sans mb-4 text-ink">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed">{item.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureCompare;
