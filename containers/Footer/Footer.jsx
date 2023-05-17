import React, { useRef } from "react";
import Styles from "./Footer.module.scss";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BsTelegram, BsDiscord, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { ImageBox } from "../../components";
import { footerData, socialLinks } from "../../utils/Data/SiteContent";
import { useRouter } from "next/router";
import { sendEmail, validateEmail } from "../../utils/services/emailService";
import { notify } from "../../utils/services/notification";

function Footer() {
  const _navigate = useRouter();

  const mailInput = useRef();
  const subscribeEmail = () => {
    let userEmail = mailInput?.current?.value || null;
    if (validateEmail(userEmail)) {
      sendEmail(userEmail).then((res) => {
        mailInput.current.value = "";
      });
    } else {
      notify("Please Enter a valid Email", "error");
    }
  };

  return (
    <div className={Styles.Footer}>
      <div className={Styles.Footer__upperFooter + " container"}>
        <div className={Styles.brandBox}>
          <div className={Styles.logo}>
            <ImageBox src={"/logo.svg"} width="100%" />
          </div>
          <div className={Styles.socialBox}>
            {/* <p>Find us on social</p> */}
            <div className={Styles.icons}>
              <span
                className={Styles.icon}
                onClick={() => {
                  window.open(socialLinks?.telegram, "_blank");
                }}
              >
                <BsTelegram />
              </span>
              <span
                className={Styles.icon}
                onClick={() => {
                  window.open(socialLinks?.discord, "_blank");
                }}
              >
                <BsDiscord />
              </span>
              <span
                className={Styles.icon}
                onClick={() => {
                  window.open(socialLinks?.twitter, "_blank");
                }}
              >
                <BsTwitter />
              </span>
              <span
                className={Styles.icon}
                onClick={() => {
                  window.open(socialLinks?.linkedin, "_blank");
                }}
              >
                <BsLinkedin />
              </span>
              <span
                className={Styles.icon}
                onClick={() => {
                  window.open(socialLinks?.instagram, "_blank");
                }}
              >
                <FaInstagramSquare />
              </span>
            </div>
            <p
              className={Styles.mail}
              onClick={() => {
                window.open(`mailto:${socialLinks?.contactMail}`, "_blank");
              }}
            >
              {socialLinks?.contactMail}
            </p>
          </div>
        </div>
        <div className={Styles.siteMap}>
          <p className={Styles.siteMap__title}>Sitemap</p>

          {footerData?.sitemap.map((item, index) => (
            <p
              className={Styles.siteMap__link + " ptr"}
              key={index}
              onClick={() => {
                item?.path
                  ? _navigate.push(item?.path)
                  : window.open(item?.link, "_blank");
              }}
            >
              {item?.text}
            </p>
          ))}
        </div>
        <div className={Styles.siteMap}>
          <p className={Styles.siteMap__title}>Help</p>
          {footerData?.otherLinks.map((item, index) => (
            <p
              className={Styles.siteMap__link + " ptr"}
              key={index}
              onClick={() => {
                item?.path
                  ? _navigate.push(item?.path)
                  : window.open(item?.link, "_blank");
              }}
            >
              {item?.text}
            </p>
          ))}
        </div>

        <div className={Styles.newsLetterBox}>
          <p className={Styles.newsLetterBox__title}>Newsletter</p>
          <input type="text" placeholder="user@mail.com" ref={mailInput} />
          <button
            className="fillBtn__purple ptr"
            style={{
              width: "100%",
              background: "#2563EB",
              border: "1px solid #2563EB",
              marginTop: "1rem",
            }}
            onClick={subscribeEmail}
          >
            Subscribe Now
          </button>
        </div>
      </div>
      <div className={Styles.Footer__lowerFooter}>
        <p>© Copyright 2023, All Rights Reserved by Lighthouse Storage</p>
      </div>
    </div>
  );
}

export default Footer;
