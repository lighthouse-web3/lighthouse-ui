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
} from "../../utils/Data/SiteContent";
import styles from "./Pricing.module.scss";

const Pricing = () => {
  const [activeTitle, setActiveTitle] = useState("Annually");

  const renderCards = (plans) => {
    return plans.map((plan, index) => (
      <div key={index} className={styles.card}>
        <h3 className={styles.planTitle}>{plan.title}</h3>

        <div className={styles.iconWrapper}>
          <Image
            src={plan.icon}
            alt={`${plan.title} icon`}
            width={100}
            height={100}
          />
        </div>
        {activeTitle === "Add-on" ? (
          <p className={styles.price}>
            {plan.cost === "Custom" ? (
              <span>Pay For What You Need</span>
            ) : (
              <>
                ${plan.cost} <span>/month</span>
              </>
            )}
          </p>
        ) : (
          <p className={styles.price}>
            ${plan.cost}{" "}
            <span>{activeTitle === "Annually" ? "/month" : "/lifetime"}</span>
          </p>
        )}

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
                    <div className="tooltipWrapper">
                      <BsInfoCircle />
                      {feature.tooltip && (
                        <div className="tooltipContent">{feature.tooltip}</div>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {feature?.value === "icon-cross" && <FaXmark />}
                    {feature?.value === "icon" && <FaCheck />}
                    {feature?.value !== "icon-cross" &&
                      feature?.value !== "icon" && <span>{feature.value}</span>}
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
      <TitleSeparator topTitle={"Discover your perfect plan"} />
      <div className={styles.switcherWrapper}>
        <Switcher
          title1="Annually"
          title2="Lifetime"
          title3="Add-on"
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />
      </div>
      <p className={styles.subText}>
        {activeTitle === "Annually" &&
          "Easy, convenient and budget friendly plans. Just Pay Annually."}
        {activeTitle === "Lifetime" &&
          "Hassle free, price-beating lifetime plans. No recurring subscription fees, just a one time payment to secure your storage for life!"}
        {activeTitle === "Add-on" &&
          "Add-on plans are available for those who want to add additional services to your existing plan."}
      </p>
      <div className={styles.cardGrid}>
        {(activeTitle === "Lifetime" || activeTitle === "Annually") &&
          renderCards(
            activeTitle === "Lifetime" ? LifetimePricing : AnnualPricing
          )}
        {activeTitle === "Add-on" && renderCards(AddOnsPricing)}
      </div>
    </section>
  );
};

export default Pricing;
