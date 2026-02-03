/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useRef, useState } from "react";
import { cn } from "../utils/services/helper";
import ThemeContext from "../utils/services/Themecontext";
import { CometCard } from "../components/ui/commet-card";
import Link from "next/link";

export default function SignupTurby({ id }) {
  const { theme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const componentRef = useRef();

  // Intersection Observer to detect when component is visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={componentRef}
        id={id}
        className="styleContainer min-h-screen w-full rounded-md flex flex-col items-center justify-center  relative overflow-hidden px-4 py-8"
      >
        {/* Animated Turby_Astro.png image - Right side */}
        {isInView && window.innerWidth >= 800 && (
          <div
            className="fixed top-1/2 right-[-200px] rotate-280 z-50"
            style={{
              animation: isHovered
                ? "none"
                : "turbySlideIn 12s ease-in-out infinite",
            }}
          >
            <img
              src="/turby/Turby_Astro.png"
              alt="Turby Astronaut"
              className="h-[300px] w-auto cursor-pointer transition-transform hover:scale-110"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        )}

        {/* Animated Turby_Astro.png image - Left side */}
        {isInView && window.innerWidth >= 800 && (
          <div
            className="fixed top-1/2 left-[-200px] -rotate-280 z-50"
            style={{
              animation: isHovered
                ? "none"
                : "turbySlideInLeft 12s ease-in-out infinite",
            }}
          >
            <img
              src="/turby/Turby_Hacker.png"
              alt="Turby Hacker"
              className="h-[300px] w-auto cursor-pointer transition-transform hover:scale-110"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        )}

        {/* Header Section */}
        <div
          className="relative z-10 text-center max-w-4xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 leading-tight ${
              theme === "dark"
                ? "from-neutral-200 to-neutral-500"
                : "from-neutral-900 to-neutral-500"
            }`}
          >
            MINT TURBY NOW
          </h1>
        </div>

        <div
          className="flex-1 w-full px-4 my-10 mb-20 flex items-stretch justify-center"
          data-aos="fade-up"
          data-aos-delay={450}
        >
          <CometCard showGlare={false}>
            <img src="/turby_rocket.png" alt="Turby" width={200} height={200} />
          </CometCard>
        </div>

        {/* Mint Button Section */}
        <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          <div className="pt-4">
            <div
              className="relative z-20 flex flex-wrap items-center justify-center gap-4  w-full"
              data-aos="fade-up"
              data-aos-delay={350}
            >
              <Link href="/turby_mint" className="w-full">
                <button className="p-[3px] relative cursor-pointer w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[4px] relative group transition duration-200 text-white hover:bg-transparent text-xl font-bold text-center">
                    Mint Now
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* CSS Animation for Turby_Astro.png */}
        <style jsx>{`
          @keyframes turbySlideIn {
            0% {
              transform: translate(100%, 100%) rotate(45deg);
              opacity: 1;
            }
            25% {
              transform: translate(50%, -55%) rotate(45deg);
              opacity: 1;
            }
            75% {
              transform: translate(50%, -55%) rotate(45deg);
              opacity: 1;
            }
            100% {
              transform: translate(100%, 100%) rotate(45deg);
              opacity: 1;
            }
          }

          @keyframes turbySlideInLeft {
            0% {
              transform: translate(-100%, 100%) rotate(-45deg);
              opacity: 1;
            }
            25% {
              transform: translate(-50%, -55%) rotate(-45deg);
              opacity: 1;
            }
            75% {
              transform: translate(-50%, -55%) rotate(-45deg);
              opacity: 1;
            }
            100% {
              transform: translate(-100%, 100%) rotate(-45deg);
              opacity: 1;
            }
          }

          /* Mobile responsive adjustments */
          @media (max-width: 768px) {
            .fixed {
              position: absolute;
            }
          }
        `}</style>
      </div>
    </>
  );
}
