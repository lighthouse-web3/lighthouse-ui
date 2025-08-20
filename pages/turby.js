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
              topTitle="About Lighthouse & Turby NFTs"
              title="Lighthouse is a decentralized storage protocol that makes data permanent and accessible. Our Turby NFT collection celebrates this mission while building a community of web3 enthusiasts."
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
              topTitle="What You Get"
              title="Turby NFT holders enjoy exclusive benefits and utilities within the Lighthouse ecosystem."
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
          <div className="contentContainer styleContainer">
            <FAQContainer type="turby" />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
