"use client";
import React, { useState, useEffect } from "react";
import { IconBolt, IconInfinity, IconUsersGroup } from "@tabler/icons-react";
import { CometCard } from "../components/ui/commet-card";

export default function WhyTurby() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => void setMounted(true), []);
  if (!mounted) return null;
  return (
    <section className="styleContainer w-full flex flex-col md:flex-row items-stretch justify-between gap-8 py-8 text-[var(--txt-clr)]">
      {/* Left Side: Features List */}
      <div className="flex-1 px-4 flex flex-col justify-center">
        <div
          className="mb-8 flex items-start gap-4"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          <IconInfinity className="h-10 w-12" />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Permanent Storage
            </h3>
            <p className="text-gray-500 text-base md:text-lg">
              Each NFT is permanently stored on Lighthouse, ensuring your
              digital asset lasts forever.
            </p>
          </div>
        </div>
        <div
          className="mb-8 flex items-start gap-4"
          data-aos="fade-up"
          data-aos-delay={250}
        >
          <IconUsersGroup className="h-10 w-12" />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Community Building
            </h3>
            <p className="text-gray-500 text-base md:text-lg">
              Join a community of developers, creators, and web3 enthusiasts
              building the future of storage.
            </p>
          </div>
        </div>
        <div
          className="flex items-start gap-4"
          data-aos="fade-up"
          data-aos-delay={350}
        >
          <IconBolt className="h-10 w-12" />
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              Utility & Access
            </h3>
            <p className="text-gray-500 text-base md:text-lg">
              NFT holders get exclusive access to Lighthouse features, events,
              and future drops.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Card needs to be same height as the left side */}
      <div
        className="flex-1 w-full px-4 flex items-stretch justify-center"
        data-aos="fade-up"
        data-aos-delay={450}
      >
        <CometCard>
          <button
            type="button"
            className=" flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:p-4"
            aria-label="View invite F7RA"
            style={{
              transformStyle: "preserve-3d",
              transform: "none",
              opacity: 1,
            }}
          >
            <div className="mx-2 flex-1">
              <div className="relative mt-2 aspect-[4/4] w-full">
                <img
                  loading="lazy"
                  className=" h-full w-full rounded-[16px]  object-cover "
                  alt="Turby NFT"
                  src={`/turby/turby_${
                    Math.floor(Math.random() * 20) + 1
                  }.jpeg`}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col flex-shrink-0 gap-2 items-center justify-between p-4 font-mono text-white">
              <div className="text-sm font-semibold"> Many Unique Turtles</div>
              <div className="text-xs text-gray-300 opacity-50">
                Each Turby has unique traits, accessories, and backgrounds,
                making every NFT special and collectible.
              </div>
            </div>
          </button>
        </CometCard>
      </div>
    </section>
  );
}
