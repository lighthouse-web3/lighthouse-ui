"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { Switcher, TitleSeparator } from "../../components";
import {
  AnnualPricing,
  LifetimePricing
} from "../../utils/Data/SiteContent";
import styles from "./Pricing.module.scss";

const Pricing = () => {
  const [activeTitle, setActiveTitle] = useState("Annually");


  const renderCards = (plans) => {
    return plans.map((plan, index) => (
      <div key={index} className={styles.card}>
        <h3 className={styles.planTitle}>{plan.title}</h3>

        <div className={styles.iconWrapper}>
          <Image src={plan.icon} alt={`${plan.title} icon`} width={100} height={100} />
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
                    <div className={styles.tooltipWrapper}>
                      <BsInfoCircle />
                      {feature.tooltip && (
                        <div className={styles.tooltipContent}>
                          {feature.tooltip}
                        </div>
                      )}
                    </div>
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
      <TitleSeparator title={"Discover your perfect plan"} />
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
