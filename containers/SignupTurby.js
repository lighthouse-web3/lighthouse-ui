"use client";
import React, { useRef } from "react";
import { Spotlight } from "../components/ui/spotlight";
import { Label } from "../components/ui/label";
import { cn } from "../utils/services/helper";
import { joinWaitlist, validateEmail } from "../utils/services/emailService";
import { Input } from "../components/ui/input";
import { notify } from "../utils/services/notification";

const rocketAnimation = `
  @keyframes rocket-rocking {
    0%, 100% { transform: rotate(-2deg) translateY(0px); }
    25% { transform: rotate(1deg) translateY(-3px); }
    50% { transform: rotate(2deg) translateY(0px); }
    75% { transform: rotate(-1deg) translateY(-2px); }
  }
`;

export default function SignupTurby({ id }) {
  const emailInput = useRef();
  const addressInput = useRef();

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
      <style jsx>{rocketAnimation}</style>
      <div
        id={id}
        className="styleContainer min-h-screen w-full rounded-md flex flex-col items-center justify-center  relative overflow-hidden px-4 py-8"
      >
        {/* Header Section */}
        <div
          className="relative z-10 text-center max-w-4xl mx-auto mb-8"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight">
            Join the Waitlist
          </h1>
          <p className="mt-4 sm:mt-6 font-normal text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Get early access to mint your Turby NFT before the public sale.
            Limited spots available!
          </p>
        </div>

        {/* Turby Rocket Section */}
        <div className="relative z-10 mb-8 sm:mb-12">
          <div className="animate-bounce animate-pulse">
            <img
              src="/turby_rocket.png"
              alt="Turby Astronaut on Rocket"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:w-72 object-contain drop-shadow-2xl transform transition-all duration-1000 ease-in-out hover:scale-110 hover:rotate-2 active:scale-95"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-sm sm:text-base text-neutral-200"
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
                className="text-sm sm:text-base text-neutral-200"
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
      </div>
    </>
  );
}
