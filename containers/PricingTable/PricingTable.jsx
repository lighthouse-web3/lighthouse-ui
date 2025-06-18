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
      newLifetimePricing.flatMap((plan) => plan.features.map((f) => f.title))
    )
  );

  function getTooltipForFeature(featureTitle) {
    const feature = newLifetimePricing[0].features.find(
      (f) => f.title === featureTitle
    );
    return feature?.tooltip;
  }

  return (
    <>
      <div className={styles.pricingTitle}>
        <TitleSeparator title={"Compare Lifetime plans "} />
      </div>

      <div className={styles.pricingTable}>
        <div className={styles.headerRow}>
          <div className={styles.featureColumn}></div>
          {newLifetimePricing.map((plan) => (
            <div key={plan.title} className={styles.planColumn}>
              <h3>{plan.title}</h3>
              <p className={styles.price}>
                ${plan.cost}{" "}
                <span className={styles.priceSpan}>
                  {plan.title === "Pro" ? "/month" : ""}
                </span>
              </p>
            </div>
          ))}
        </div>

        {featureSet.map((featureTitle) => (
          <div className={styles.featureRow} key={featureTitle}>
            <div className={styles.featureColumn}>
              {featureTitle + " "}&nbsp;
              <div className="tooltipWrapper">
                <BsInfoCircle />
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
                    -
                  </div>
                );
              return (
                <div
                  key={feature.title}
                  className={styles.planColumn}
                  title={feature.tooltip}
                >
                  {feature.value === "icon" && (
                    <FaCheck className={styles.iconCheck} />
                  )}
                  {feature.value === "icon-cross" && (
                    <FaXmark className={styles.iconCross} />
                  )}
                  {feature.value !== "icon" &&
                    feature.value !== "icon-cross" &&
                    feature.value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default PricingTable;
