import React from "react";
import styles from "./PricingTable.module.scss";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { LifetimePricing } from "../../utils/Data/SiteContent";
import { BsInfoCircle } from "react-icons/bs";
import { TitleSeparator } from "../../components";

const addOn = {
  index: 0,
  title: "Pro",
  cost: "99",
  features: [
    {
      title: "Total Storage",
      value: "-",
      tooltip: "Total Storage Space",
    },
    {
      title: "Bandwidth",
      value: "-",
      tooltip: "Additional bandwidth at $0.1 per GB / month",
    },
    {
      title: "IPFS",
      value: "icon",
      tooltip: "Hot Storage",
    },
    {
      title: "Filecoin",
      value: "icon",
      tooltip: "Storage Backup",
    },
    {
      title: "Encryption & Token Gating",
      value: "icon",
      tooltip: "Get Add-ons for Encryption & Token Gating",
    },
    {
      title: "IPNS",
      value: "icon",
      tooltip: "Get Add-ons for IPNS",
    },
    {
      title: "Migration Support",
      value: "icon",
      tooltip: "Get Add-ons for Migration Support",
    },
  ],
};

const newLifetimePricing = [...LifetimePricing, addOn];

function PricingTable() {
  const featureSet = Array.from(
    new Set(
      newLifetimePricing.flatMap((plan) => plan.features.map((f) => f.title)),
    ),
  );

  function getTooltipForFeature(featureTitle) {
    const feature = newLifetimePricing[0].features.find(
      (f) => f.title === featureTitle,
    );
    return feature?.tooltip;
  }

  return (
    <>
      {/* <div className={styles.pricingTitle}>
        <TitleSeparator topTitle={"Compare Lifetime plans "} />
      </div>

      <div className={`${styles.pricingTable} font-sans text-[#cec2d7] shadow-xl`}>
        <div className={styles.headerRow}>
          <div className={`${styles.featureColumn} text-[#e4e2e2] text-lg`}></div>
          {newLifetimePricing.map((plan) => (
            <div key={plan.title} className={styles.planColumn}>
              <h3 className="font-headline font-bold text-3xl text-[#e4e2e2] mb-3">{plan.title}</h3>
              <p className={`${styles.price} text-[#dab9ff] text-2xl`}>
                ${plan.cost}{" "}
                <span className={`${styles.priceSpan} text-[#cec2d7]/60 text-sm font-medium tracking-wide`}>
                  {plan.title === "Pro" ? "/month" : ""}
                </span>
              </p>
            </div>
          ))}
        </div>

        {featureSet.map((featureTitle) => (
          <div className={styles.featureRow} key={featureTitle}>
            <div className={`${styles.featureColumn} text-[#e4e2e2]`}>
              {featureTitle + " "}&nbsp;
              <div className="tooltipWrapper text-[#cec2d7]">
                <BsInfoCircle className="hover:text-[#dab9ff] transition-colors cursor-pointer" />
                {
                  <div className="tooltipContent">
                    {getTooltipForFeature(featureTitle)}
                  </div>
                }
              </div>
            </div>
            {newLifetimePricing.map((plan) => {
              const feature = plan.features.find(
                (f) => f.title === featureTitle
              );
              if (!feature)
                return (
                  <div className={styles.planColumn} key={featureTitle}>
                    <span className="text-[#4c4354]">-</span>
                  </div>
                );
              return (
                <div
                  key={feature.title}
                  className={styles.planColumn + " flex justify-center items-center"}
                  title={feature.tooltip}
                >
                  {feature.value === "icon" && (
                    <FaCheck className={`${styles.iconCheck} text-[#dab9ff] text-xl`} />
                  )}
                  {feature.value === "icon-cross" && (
                    <FaXmark className={`${styles.iconCross} text-[#4c4354] text-xl`} />
                  )}
                  {feature.value !== "icon" &&
                    feature.value !== "icon-cross" &&
                    <span className="font-bold text-[#e4e2e2]">{feature.value}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div> */}
    </>
  );
}

export default PricingTable;
