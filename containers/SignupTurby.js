/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useRef, useState } from "react";
import { Spotlight } from "../components/ui/spotlight";
import { Label } from "../components/ui/label";
import { cn } from "../utils/services/helper";
import { joinWaitlist, validateEmail } from "../utils/services/emailService";
import { Input } from "../components/ui/input";
import { notify } from "../utils/services/notification";
import ThemeContext from "../utils/services/Themecontext";
import MouseFollowingEyes from "../components/ui/MouseFollowingEyes";

export default function SignupTurby({ id }) {
  const emailInput = useRef();
  const addressInput = useRef();
  const { theme, setTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const componentRef = useRef();

  // Intersection Observer to detect when component is visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const LabelInputContainer = ({ children, className }) => {
    return (
      <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
      </div>
    );
  };

  // Wallet address validator
  const validateWalletAddress = (address) => {
    // Check if it's a valid Ethereum-style address (0x followed by 40 hex characters)
    const ethereumRegex = /^0x[a-fA-F0-9]{40}$/;

    // Check if it's a valid Solana address (base58 encoded, 32-44 characters)
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

    // Check if it's a valid Bitcoin address (base58 encoded, 26-35 characters)
    const bitcoinRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

    return (
      ethereumRegex.test(address) ||
      solanaRegex.test(address) ||
      bitcoinRegex.test(address)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailInput?.current?.value || "";
    const address = addressInput?.current?.value || "";

    // Check if both fields are filled
    if (!email.trim() || !address.trim()) {
      notify("Please fill in both email and wallet address", "error");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      notify("Please enter a valid email address", "error");
      return;
    }

    // Validate wallet address format
    if (!validateWalletAddress(address)) {
      notify("Please enter a valid wallet address", "error");
      return;
    }

    // If both fields are valid, call the API
    joinWaitlist(email, address).then(() => {
      notify("You are on the Waitlist", "success");
      // Clear the form after successful submission
      emailInput.current.value = "";
      addressInput.current.value = "";
    });
  };

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
            Join the Waitlist
          </h1>
          <p className="mt-4 sm:mt-6 font-normal text-sm sm:text-base text-[var(--txt-clr)] max-w-2xl mx-auto leading-relaxed">
            Get early access to mint your Turby NFT before the public sale.
            Limited spots available!
          </p>
        </div>

        {/* Turby Rocket Section */}
        <div className="relative z-10 mb-8 sm:mb-12">
          <div className="w-[300px] h-[300px] relative">
            <div className="absolute inset-0">
              <img
                src="/turby/TURBY_BODY.png"
                alt="Turby Astronaut on Rocket"
                className="w-full h-full object-contain"
              />
            </div>
            <MouseFollowingEyes />
          </div>
        </div>

        {/* Form Section */}
        <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-sm sm:text-base text-[var(--txt-clr)]"
                data-aos="fade-up"
                data-aos-delay={150}
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                ref={emailInput}
                className="h-11 sm:h-12 text-sm sm:text-base"
                data-aos="fade-up"
                data-aos-delay={150}
              />
            </LabelInputContainer>

            <LabelInputContainer data-aos="fade-up" data-aos-delay={250}>
              <Label
                htmlFor="address"
                className="text-sm sm:text-base text-[var(--txt-clr)]"
                data-aos="fade-up"
                data-aos-delay={250}
              >
                Wallet Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="0x1234567890..."
                type="text"
                ref={addressInput}
                className="h-11 sm:h-12 text-sm sm:text-base"
                data-aos="fade-up"
                data-aos-delay={250}
              />
            </LabelInputContainer>

            <div className="pt-4">
              <div
                className="relative z-20 flex flex-wrap items-center justify-center gap-4  w-full"
                data-aos="fade-up"
                data-aos-delay={350}
              >
                <button
                  className="p-[3px] relative cursor-pointer w-full"
                  type="submit"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[4px] relative group transition duration-200 text-white hover:bg-transparent text-xl font-bold">
                    Join Waitlist
                  </div>
                </button>
              </div>
            </div>
          </form>
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
