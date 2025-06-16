import React from "react";
import styles from "./PricingTable.module.scss";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { LifetimePricing } from "../../utils/Data/SiteContent";

function PricingTable() {
  const featureSet = Array.from(
    new Set(
      LifetimePricing.flatMap((plan) => plan.features.map((f) => f.title))
    )
  );

  return (
    <div className={styles.pricingTable}>
      <div className={styles.headerRow}>
        <div className={styles.featureColumn}></div>
        {LifetimePricing.map((plan) => (
          <div key={plan.title} className={styles.planColumn}>
            <h3>{plan.title}</h3>
            <p className={styles.price}>${plan.cost}</p>
          </div>
        ))}
      </div>

      {featureSet.map((featureTitle) => (
        <div className={styles.featureRow} key={featureTitle}>
          <div className={styles.featureColumn}>{featureTitle}</div>
          {LifetimePricing.map((plan) => {
            const feature = plan.features.find((f) => f.title === featureTitle);
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
  );
}

export default PricingTable;
