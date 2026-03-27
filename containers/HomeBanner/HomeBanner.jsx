import React, { useContext } from "react";
import { LandingPageData } from "../../utils/Data/SiteContent";
import Styles from "./HomeBanner.module.scss";
import useWindowSize from "../../utils/Hooks/windowSize";
import { StatBox } from "../../components";
import ThemeContext from "../../utils/services/Themecontext";

function HomeBanner() {
  const windowSize = useWindowSize();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="bg-[#131314] text-[#e4e2e2] font-sans pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(218,185,255,0.08)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-7 flex flex-col justify-center" data-aos="fade-up">
            <span className="self-start px-3 py-1 mb-6 rounded-full bg-[#b170ff]/20 border border-[#dab9ff]/20 text-[#dab9ff] text-xs font-bold tracking-widest font-sans uppercase">
              Decentralized Web 3.0 Storage
            </span>
            <h1 
              className="text-6xl md:text-8xl font-bold font-sans tracking-tighter leading-[0.9] text-[#e4e2e2] mb-8"
              dangerouslySetInnerHTML={{
               __html: LandingPageData?.HeroSection?.title
              }}
            ></h1>
            <p 
              className="text-lg md:text-xl text-[#cec2d7] max-w-xl mb-10 leading-relaxed"
              dangerouslySetInnerHTML={{
               __html: LandingPageData?.HeroSection?.subTitle
              }}
            ></p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] text-[#2a0053] px-8 py-4 rounded-xl text-base font-bold font-sans hover:scale-[1.02] transition-transform shadow-[0_20px_40px_rgba(218,185,255,0.15)]"
                onClick={() => {
                  window.open("https://files.lighthouse.storage/", "_blank");
                }}
              >
                Try For Free
              </button>
              <button 
                className="bg-[#343535]/20 border border-[#4c4354]/15 backdrop-blur-md text-[#e4e2e2] px-8 py-4 rounded-xl text-base font-bold font-sans hover:bg-[#343535]/30 transition-all"
                onClick={() => {
                  window.open("https://docs.lighthouse.storage/", "_blank");
                }}
              >
                Explore Docs
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-full aspect-square rounded-[2rem] bg-[#1b1c1c] overflow-hidden border border-[#4c4354]/10 shadow-2xl relative">
              <img 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
                alt="Abstract 3D digital obsidian structure glowing purple" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnaHoOpczjcSnXSNY8tSTTzSBKGIi4qgdSWMputiXklkFzvuQtVtJY9T9ygfkcCyKYn_GjTeP4tIZCjMOjbp5_-eoNqHPgLShRhhn9vq0ugYXH7p_kEzUKzXyww38du-Keiy8iZhhC1s-ZxVvQWPm25mYyTqsL-p3H_no_FuWXeW9t76bQMf65k2MSRGNzJTHuKTRu4XAYnMTRG8b7DlVLedj-smft82Rce8PnvAeFVVYYTIGePH7SukmTMfHumAx7gjoUlkxty4o"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-[#131314]/60 backdrop-blur-[20px] rounded-2xl border border-[#dab9ff]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#dab9ff] animate-pulse"></div>
                  <span className="text-xs font-bold tracking-widest font-sans uppercase text-[#dab9ff]">Live Network Status</span>
                </div>
                <div className="text-2xl font-bold font-sans tracking-tight">Perpetual Sync Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Box */}
      <section className="bg-[#1b1c1c] py-12 px-8" data-aos="fade-up" data-aos-delay={200}>
        <div className="max-w-7xl mx-auto">
          <StatBox />
        </div>
      </section>
    </div>
  );
}

export default HomeBanner;
