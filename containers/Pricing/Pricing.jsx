"use client";
import React, { useState, useEffect } from "react";
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
  const [activeTitle, setActiveTitle] = useState("Annually");


  const renderCards = (plans) => {
    return plans.map((plan, index) => (
      <div key={index} className={styles.card}>
        <h3 className={styles.planTitle}>{plan.title}</h3>

        <div className={styles.iconWrapper}>
          <img src={plan.icon} alt={`${plan.title} icon`} />
        </div>
        <p className={styles.price}>
          ${plan.cost}{" "}
          <span>{activeTitle === "Annually" ? "/month" : "/lifetime"}</span>
        </p>
        {activeTitle === "Annually" ? (
          <p
            style={{
              marginTop: "-20px",
              fontWeight: "400",
              fontSize: "0.9rem",
              opacity: !plan.onlyShow ? "0.7" : "0",
            }}
          >
            ( billed once yearly )
          </p>
        ) : (
          <></>
        )}

        <button
          className={styles.button}
          onClick={() =>
            window.open("https://files.lighthouse.storage/", "_self")
          }
        >
          {plan.buttonText}
        </button>
        <div className={styles.details}>
          <table>
            <tbody>
              {plan.features.map((feature, index) => (
                <tr key={index}>
                  <td>
                    {feature.title}{" "}
                    <span
                      // data-tooltip-id="pricingPage-tooltip"
                      // data-tooltip-content={
                      //   typeof feature.tooltip === "string"
                      //     ? feature.tooltip
                      //     : ""
                      // }
                      // data-tooltip-place="top"
                    >
                      {/* <BsInfoCircle /> */}
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
          title1="Annually"
          title2="Lifetime"
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
      {/* {isClient && <Tooltip id="pricingPage-tooltip" />} */}
    </section>
  );
};

export default Pricing;
