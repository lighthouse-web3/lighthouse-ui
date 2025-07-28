"use client";
import React from "react";
import { Spotlight } from "../components/ui/spotlight";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/services/helper";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupTurby() {
  const LabelInputContainer = ({ children, className }) => {
    return (
      <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
      </div>
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="styleContainer h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 mt-10">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Join the Whitelist
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Get early access to mint your Turby NFT before the public sale.
          Limited spots available!
        </p>
        <div className="p-4 max-w-3xl mx-auto relative z-10  w-full pt-20 md:pt-0 mt-10">
          <div className="flex flex-col gap-4">
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label htmlFor="firstname">First name</Label>
                  <Input id="firstname" placeholder="Tyler" type="text" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input id="lastname" placeholder="Durden" type="text" />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                />
              </LabelInputContainer>

              <div className="flex justify-center mt-7">
                <button className="border_btn w-full" type="submit">
                  Join Whitelist
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
