import React from "react";
import Styles from "./Footer.module.scss";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BsTelegram, BsDiscord, BsTwitter } from "react-icons/bs";
import { ImageBox } from "../../components";

const socialCards = [
  {
    icon: <BsTwitter />,
    link: "@lighthouse/web3",
    showText: "@lighthouse/web3",
  },
  {
    icon: <BsDiscord />,
    link: "@lighthouse/web3",
    showText: "@lighthouse/web3",
  },
  {
    icon: <BsTelegram />,
    link: "@lighthouse/web3",
    showText: "@lighthouse/web3",
  },
];

function Footer() {
  return (
    <div className={Styles.Footer}>
      <div className={Styles.upperBox + " container"}>
        <div className={Styles.infoBox}>
          <div className={Styles.title + " gradient__Text"}>Get In Touch</div>
          <div className={Styles.subTitle}>
            with out team, to use lighthouse for all your storage needs.
          </div>

          <div className={Styles.emailBox}>
            <div className={Styles.title}>
              Stay Always <span className="gradient__Text">Updated</span>{" "}
            </div>
            <div className={Styles.subTitle}>
              Enter your Email to get updates from lighthouse Team
            </div>
            <div className={Styles.inputBox}>
              <input type={"text"}></input>
              <button>
                <HiOutlineArrowNarrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.socialBox}>
          {socialCards.map((data, index) => (
            <div className={Styles.card + " gradient__Border"} key={index}>
              {data.icon}
              {data.showText}
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.lowerBox + " container"}>
        <p>LighthouseWeb3</p>
        <ImageBox
          src={"/logo.png"}
          layout="fill"
          height={"40px"}
          width={"40px"}
        />
        <p>@2022 | All Rights Reserved</p>
      </div>
      <div className={Styles.ellipseSmall}></div>
      <div className={Styles.ellipseBig}></div>
    </div>
  );
}

export default Footer;
