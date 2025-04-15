import React, { useState } from "react";
import styles from "./Pricing.module.scss";
import { Switcher, TitleSeprator } from "../../components";
import {
  AnnualPricing,
  LifetimePricing,
  pricingPlans,
} from "../../utils/Data/SiteContent";
import { Tooltip } from "react-tooltip";
import { BsInfoCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";

const Pricing = () => {
  const [activeTitle, setActiveTitle] = useState("Lifetime");

  const renderCards = (plans) => {
    return plans.map((plan, index) => (
      <div key={index} className={styles.card}>
        <h3 className={styles.planTitle}>{plan.title}</h3>

        <div className={styles.iconWrapper}>
          <img src={plan.icon} alt={`${plan.title} icon`} />
        </div>
        <p className={styles.price}>
          ${plan.cost}{" "}
          <span>{activeTitle === "Annually" ? "/year" : "/lifetime"}</span>
        </p>
        <button  className={styles.button} onClick={() => window.open('https://files.lighthouse.storage/', "_self")}>{plan.buttonText}</button>
        <div className={styles.details}>
          <table>
            <tbody>
              {plan.features.map((feature, index) => (
                <tr key={index}>
                  <td >
                    {feature.title}{" "}
                    <span>
                      <BsInfoCircle
                        data-tooltip-id="pricingPage-tooltip"
                        data-tooltip-content={feature?.tooltip}
                      />
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {feature?.value === "icon" ? (
                      <FaCircleCheck />
                    ) : (
                      feature.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  return (
    <section>
      <TitleSeprator title={"Discover your perfect plan"} />
      <div className={styles.switcherWrapper}>
        <Switcher
          title1="Lifetime"
          title2="Annually"
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />
      </div>
      <p className={styles.subText}>
        {activeTitle === "Annually"
          ? "Easy, convenient and budget friendly plans. Just Pay Annually."
          : "Hassle free, price-beating lifetime plans. No recurring subscription fees, just a one time payment to secure your storage for life!"}
      </p>
      <div className={styles.cardGrid}>
        {renderCards(
          activeTitle === "Lifetime" ? LifetimePricing : AnnualPricing
        )}
      </div>
      <Tooltip id="pricingPage-tooltip" />
    </section>
  );
};

export default Pricing;
