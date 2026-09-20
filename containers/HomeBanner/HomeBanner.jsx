import React, { useContext } from "react";
import Image from "next/image";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";
import useWindowSize from "../../utils/Hooks/windowSize";
import { StatBox } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";

function HomeBanner() {
  const windowSize = useWindowSize();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="bg-bg text-ink font-sans pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(206,180,251,0.08)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 relative z-10">
          <div
            className="lg:col-span-7 flex flex-col justify-center"
            data-aos="fade-up"
          >
            <h1
              className="text-6xl md:text-8xl font-medium font-sans text-ink mb-8"
              dangerouslySetInnerHTML={{
                __html: LandingPageData?.HeroSection?.title,
              }}
            ></h1>
            <p
              className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: LandingPageData?.HeroSection?.subTitle,
              }}
            ></p>
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-accent text-accent-ink px-8 py-4 rounded-xl text-base font-bold font-sans hover:scale-[1.02] transition-transform shadow-[0_20px_40px_rgba(206,180,251,0.15)]"
                onClick={() => {
                  window.open("https://files.lighthouse.storage/", "_blank");
                }}
              >
                Try For Free
              </button>
              <button
                className="bg-surface-2/20 border border-line/15 backdrop-blur-md text-ink px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-surface-2/30 transition-all"
                onClick={() => {
                  window.open("https://docs.lighthouse.storage/", "_blank");
                }}
              >
                Explore Docs
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* The globe renders with mix-blend-luminosity, so it takes its hue
                from this surface — a lilac wash tints the art on brand. */}
            <div className="w-full aspect-square rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,_#4c3a6e_0%,_#2a2438_55%,_#1b1c1c_100%)] overflow-hidden border border-line/10 shadow-2xl relative">
              <Image
                className="opacity-90 mix-blend-luminosity"
                alt="Dark 3D globe wrapped in concentric rings of light"
                src="/hero/network-globe.jpg"
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 inline-flex items-center gap-3 px-5 py-3 bg-bg/60 backdrop-blur-[20px] rounded-full border border-accent/10">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest font-sans uppercase text-accent">
                  {LandingPageData?.HeroSection?.imageCard?.eyebrow}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Box */}
      <section
        className="bg-surface py-12 px-8"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <div className="max-w-7xl mx-auto">
          <StatBox />
        </div>
      </section>
    </div>
  );
}

export default HomeBanner;
