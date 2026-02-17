"use client";
import { useEffect, useRef, useState } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  HeroParallax,
  TurbyCarousel,
  TurbyFeatures,
  SignupTurby,
  WhyTurby,
} from "../containers";
import { turbyPageContent } from "../utils/Data/TurbyContent";

export default function PricingPage() {
  const [scrollY, setScrollY] = useState(0);
  const rocketRef = useRef(null);
  const signupRef = useRef(null);

  return (
    <>
      <Metadata title="Lighthouse Storage | Pricing" />
      <div className={"bodyContainer"}>
        <Header />

        {/* Hero Section - Full height */}
        <div className="">
          <HeroParallax />
        </div>

        {/* Carousel Section - Full height */}
        <div className="">
          <TitleSeparator
            topTitle="Get to know your Turby"
            style={{ textAlign: "center", marginBottom: "0px" }}
            data-aos="fade-up"
          />
          <TurbyCarousel />
        </div>

        {/* Why Turby Section - Full height */}
        <div className="flex items-center">
          <div className="w-full">
            <TitleSeparator
              topTitle={turbyPageContent.aboutTitle}
              title={turbyPageContent.aboutDescription}
              style={{ textAlign: "center" }}
            />
            <div className="my-16">
              <WhyTurby />
            </div>
          </div>
        </div>

        {/* Turby Features Section - Full height */}
        <div className="flex items-center">
          <div className="w-full">
            <TitleSeparator
              topTitle={turbyPageContent.benefitsTitle}
              title={turbyPageContent.benefitsDescription}
              style={{ textAlign: "center" }}
            />
            <TurbyFeatures />
          </div>
        </div>

        {/* Signup Section - Full height */}
        <div className="" ref={signupRef}>
          <SignupTurby id="signup-turby" />
        </div>

        {/* FAQ Section - Full height */}
        <div className="flex items-center">
          <div className="contentContainer styleContainer flex-1">
            <FAQContainer type="turby" />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
