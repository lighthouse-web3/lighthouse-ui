"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { TitleSeparator } from "../../components";
import {
  FilecoinMonthlyPricing,
  FilecoinAnnualPricing,
  WalrusMonthlyPricing,
} from "../../utils/Data/SiteContent";

const NETWORKS = [
  {
    id: "Filecoin",
    label: "Filecoin",
    logo: "/icons/Filecoin_Circle.png",
    blurb:
      "Battle-tested decentralized storage with Filecoin backup and full add-on support.",
  },
  {
    id: "Walrus",
    label: "Walrus",
    logo: "/icons/Walrus_Circle.png",
    blurb:
      "Fast, programmable storage on the Sui-powered Walrus network. Billed monthly.",
  },
];

const Pricing = () => {
  const [network, setNetwork] = useState("Filecoin");
  const [billing, setBilling] = useState("Monthly"); // only relevant for Filecoin

  // Walrus is monthly-only; force the billing view back to Monthly when active.
  const effectiveBilling = network === "Walrus" ? "Monthly" : billing;

  const plans =
    network === "Walrus"
      ? WalrusMonthlyPricing
      : effectiveBilling === "Annually"
        ? FilecoinAnnualPricing
        : FilecoinMonthlyPricing;

  const activeNetwork = NETWORKS.find((n) => n.id === network);

  const renderCards = (plans) => {
    return plans.map((plan, index) => {
      const isPremium = index === plans.length - 1; // Last plan = the super value one
      const cardClasses = isPremium
        ? "p-6 md:p-8 rounded-2xl bg-[#131314] border border-[#dab9ff]/40 relative flex flex-col shadow-[0_48px_48px_rgba(218,185,255,0.06)] transform lg:scale-105 z-10"
        : "p-6 md:p-8 rounded-2xl bg-[#131314] border border-[#4c4354]/10 flex flex-col hover:border-[#dab9ff]/20 transition-all";

      return (
        <div
          key={`${network}-${effectiveBilling}-${index}`}
          className={cardClasses}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          {isPremium && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2a0053]">
              Super Value
            </div>
          )}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-sans mb-2 text-[#e4e2e2]">
                {plan.title}
              </h3>
              <p className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold font-sans text-[#dab9ff]">
                  ${plan.cost}
                </span>
                <span className="text-[#cec2d7] text-lg">
                  {effectiveBilling === "Annually" ? "/annum" : "/month"}
                </span>
              </p>
            </div>
            <div className="w-16 h-16 opacity-80">
              <Image
                src={plan.icon}
                alt={`${plan.title} icon`}
                width={64}
                height={64}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-4 text-sm text-[#cec2d7]"
              >
                <div className="flex items-center gap-3">
                  <div className="group relative cursor-pointer flex items-center">
                    <span className="text-[#e4e2e2]">{feature.title}</span>
                    {feature.tooltip && (
                      <div className="ml-2 flex items-center">
                        <BsInfoCircle className="text-[#cec2d7]/60 hover:text-[#e4e2e2]" />
                        <div className="invisible group-hover:visible absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#343535] border border-[#4c4354]/40 text-xs text-[#e4e2e2] p-2 rounded shadow-xl whitespace-nowrap z-50">
                          {feature.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right font-medium">
                  {feature?.value === "icon-cross" && (
                    <FaXmark className="inline text-[#ffb4ab] text-lg" />
                  )}
                  {feature?.value === "icon" && (
                    <FaCheck className="inline text-[#dab9ff] text-lg" />
                  )}
                  {feature?.value !== "icon-cross" &&
                    feature?.value !== "icon" && (
                      <span className="text-[#e4e2e2]">{feature.value}</span>
                    )}
                </div>
              </li>
            ))}
          </ul>

          <button
            className={
              isPremium
                ? "w-full py-4 mt-auto rounded-xl bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] text-[#2a0053] font-bold shadow-[0_10px_30px_rgba(218,185,255,0.2)] hover:scale-[1.02] transition-transform"
                : "w-full py-4 mt-auto rounded-xl border border-[#dab9ff] text-[#dab9ff] font-bold hover:bg-[#dab9ff]/5 transition-colors"
            }
            onClick={() =>
              plan.title === "Customize"
                ? window.open(
                    "https://airtable.com/app0KP7ENgYlLDcJ0/shrPFC2TgojuOAYO4",
                    "_blank",
                  )
                : window.open("https://files.lighthouse.storage/", "_self")
            }
          >
            {plan.buttonText || "Get Started"}
          </button>
        </div>
      );
    });
  };

  return (
    <section className="py-24 px-8 bg-[#1b1c1c] font-sans">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <TitleSeparator topTitle={"Discover your perfect plan"} />

        {/* Primary switch — Storage Network */}
        <div className="mt-8 inline-flex items-center gap-1 p-1.5 bg-[#343535] rounded-2xl border border-[#4c4354]/20 mx-auto w-max">
          {NETWORKS.map((n) => {
            const active = network === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setNetwork(n.id)}
                className={`flex items-center gap-2.5 px-6 md:px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                  active
                    ? "bg-[#131314] text-[#e4e2e2] shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-[#dab9ff]/40"
                    : "text-[#cec2d7] hover:text-[#e4e2e2]"
                }`}
              >
                <span
                  className={`inline-flex transition-opacity ${
                    active ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <Image
                    src={n.logo}
                    alt={`${n.label} logo`}
                    width={24}
                    height={24}
                    style={{ objectFit: "contain", width: 24, height: 24 }}
                  />
                </span>
                {n.label}
              </button>
            );
          })}
        </div>

        {/* Secondary control — billing period (Filecoin only; Walrus is monthly-only) */}
        <div className="mt-5 h-9 flex items-center justify-center">
          {network === "Filecoin" ? (
            <div className="inline-flex items-center p-0.5 bg-[#131314] rounded-full border border-[#4c4354]/20 text-xs font-semibold">
              {["Monthly", "Annually"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-4 py-1.5 rounded-full transition-colors ${
                    billing === b
                      ? "bg-[#dab9ff] text-[#470084]"
                      : "text-[#cec2d7] hover:text-[#e4e2e2]"
                  }`}
                >
                  {b === "Annually" ? "Annually · Save" : b}
                </button>
              ))}
            </div>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131314] border border-[#4c4354]/20 text-xs font-semibold text-[#cec2d7]">
              Billed monthly
            </span>
          )}
        </div>

        <p className="text-[#cec2d7] max-w-2xl mx-auto mt-6 leading-relaxed">
          {activeNetwork?.blurb}
        </p>
      </div>

      <div
        className={`max-w-7xl mx-auto grid gap-4 lg:gap-6 mt-12 items-stretch px-0 md:px-4 ${
          plans.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3"
        }`}
      >
        {renderCards(plans)}
      </div>
    </section>
  );
};

export default Pricing;
