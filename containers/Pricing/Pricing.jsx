"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Switcher, TitleSeparator } from "../../components";
import {
  AddOnsPricing,
  AnnualPricing,
  LifetimePricing,
  MonthlyPricing,
} from "../../utils/Data/SiteContent";

const Pricing = () => {
  const [activeTitle, setActiveTitle] = useState("Monthly");

  const renderCards = (plans) => {
    return plans.map((plan, index) => {
      const isPremium = index === 1; // Mark the 2nd plan as the premium one dynamically
      const cardClasses = isPremium 
        ? "p-6 md:p-8 rounded-2xl bg-[#131314] border border-[#dab9ff]/40 relative flex flex-col shadow-[0_48px_48px_rgba(218,185,255,0.06)] transform lg:scale-105 z-10"
        : "p-6 md:p-8 rounded-2xl bg-[#131314] border border-[#4c4354]/10 flex flex-col hover:border-[#dab9ff]/20 transition-all";

      return (
        <div key={index} className={cardClasses} data-aos="fade-up" data-aos-delay={index * 100}>
          {isPremium && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2a0053]">
              Most Popular
            </div>
          )}
          
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-sans mb-2 text-[#e4e2e2]">{plan.title}</h3>
              {activeTitle === "Add-on" ? (
                <p className="flex items-baseline gap-1">
                  {plan.cost === "Custom" ? (
                    <span className="text-lg md:text-2xl font-bold font-sans text-[#dab9ff]">Pay For What You Need</span>
                  ) : (
                    <>
                      <span className="text-4xl md:text-5xl font-bold font-sans text-[#dab9ff]">${plan.cost}</span>
                      <span className="text-[#cec2d7] text-lg">/month</span>
                    </>
                  )}
                </p>
              ) : (
                <p className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold font-sans text-[#dab9ff]">${plan.cost}</span>
                  <span className="text-[#cec2d7] text-lg">
                    {activeTitle === "Lifetime"
                      ? "/lifetime"
                      : activeTitle === "Annually"
                      ? "/annum"
                      : "/month"}
                  </span>
                </p>
              )}
            </div>
            <div className="w-16 h-16 opacity-80">
              <Image
                src={plan.icon}
                alt={`${plan.title} icon`}
                width={64}
                height={64}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 text-sm text-[#cec2d7]">
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
                  {feature?.value === "icon-cross" && <FaXmark className="inline text-[#ffb4ab] text-lg" />}
                  {feature?.value === "icon" && <FaCheck className="inline text-[#dab9ff] text-lg" />}
                  {feature?.value !== "icon-cross" && feature?.value !== "icon" && (
                    <span className="text-[#e4e2e2]">{feature.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <button
            className={isPremium 
              ? "w-full py-4 mt-auto rounded-xl bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] text-[#2a0053] font-bold shadow-[0_10px_30px_rgba(218,185,255,0.2)] hover:scale-[1.02] transition-transform" 
              : "w-full py-4 mt-auto rounded-xl border border-[#dab9ff] text-[#dab9ff] font-bold hover:bg-[#dab9ff]/5 transition-colors"}
            onClick={() =>
              plan.title === "Customize"
                ? window.open(
                    "https://airtable.com/app0KP7ENgYlLDcJ0/shrPFC2TgojuOAYO4",
                    "_blank"
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
      <div className="max-w-7xl mx-auto text-center mb-16">
        <TitleSeparator topTitle={"Discover your perfect plan"} />
        <Switcher
          title1="Monthly"
          title2="Annually"
          title3="Lifetime"
          title4="Add-on"
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />
        <p className="text-[#cec2d7] max-w-2xl mx-auto mt-6 leading-relaxed">
          {activeTitle === "Annually" &&
            "Easy, convenient and budget friendly plans. Just Pay Annually."}
          {activeTitle === "Monthly" &&
            "Flexible month-to-month plans without annual commitment."}
          {activeTitle === "Lifetime" &&
            "Hassle free, price-beating lifetime plans. No recurring subscription fees, just a one time payment to secure your storage for life!"}
          {activeTitle === "Add-on" &&
            "Add-on plans are available for those who want to add additional services to your existing plan."}
        </p>
      </div>

      <div className={`max-w-7xl mx-auto grid gap-4 lg:gap-6 mt-12 items-stretch px-4 ${activeTitle === "Add-on" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {(activeTitle === "Lifetime" ||
          activeTitle === "Annually" ||
          activeTitle === "Monthly") &&
          renderCards(
            activeTitle === "Lifetime"
              ? LifetimePricing
              : activeTitle === "Monthly"
              ? MonthlyPricing
              : AnnualPricing
          )}
        {activeTitle === "Add-on" && renderCards(AddOnsPricing)}
      </div>
    </section>
  );
};

export default Pricing;
