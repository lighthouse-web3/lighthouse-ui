import React, { useContext, useRef } from "react";
import Styles from "./Footer.module.scss";
import {
  FaDiscord,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import { ImageBox } from "../../components";
import { footerData, socialLinks } from "../../utils/Data/SiteContent";
import { useRouter } from "next/router";
import { sendEmail, validateEmail } from "../../utils/services/emailService";
import { notify } from "../../utils/services/notification";
import ThemeContext from "../../utils/services/Themecontext";
import { useEffect } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";

function Footer() {
  const _navigate = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);

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

  useEffect(() => {
    //console.log(theme, "footer");
  }, [theme]);

  return (
    <div className={Styles.Footer}>
      <div className={Styles.Footer__upperFooter + " styleContainer"}>
        <div className={Styles.brandBox}>
          <div
            className={Styles.logo + " ptr"}
            onClick={() => {
              _navigate.push("/");
            }}
          >
            {theme === "light" ? (
              <ImageBox src={"/logo_black.svg"} width="100%" />
            ) : (
              <ImageBox src={"/logo.svg"} width="100%" />
            )}
          </div>
          <div className={Styles.socialBox}>
            {/* <p>Find us on social</p> */}
            <div className={Styles.icons}>
              <span
                className={Styles.icon + " ptr"}
                onClick={() => {
                  window.open(socialLinks?.telegram, "_blank");
                }}
              >
                <FaTelegramPlane />
              </span>
              <span
                className={Styles.icon + " ptr"}
                onClick={() => {
                  window.open(socialLinks?.discord, "_blank");
                }}
              >
                <FaDiscord />
              </span>
              <span
                className={Styles.icon + " ptr"}
                onClick={() => {
                  window.open(socialLinks?.twitter, "_blank");
                }}
              >
                <RiTwitterXLine />
              </span>
              <span
                className={Styles.icon + " ptr"}
                onClick={() => {
                  window.open(socialLinks?.linkedin, "_blank");
                }}
              >
                <FaLinkedinIn />
              </span>
              <span
                className={Styles.icon + " ptr"}
                onClick={() => {
                  window.open(socialLinks?.instagram, "_blank");
                }}
              >
                <FaInstagram />
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
              <MdArrowOutward />
            </p>
          ))}
        </div>

        <div className={Styles.newsLetterBox}>
          <p className={Styles.newsLetterBox__title}>Newsletter</p>
          <input
            type="text"
            placeholder="user@mail.com"
            ref={mailInput}
            id="newsletter-email"
            name="newsletter-email"
            autoComplete="email"
          />
          <button
            className="fillBtn__purple ptr"
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onClick={subscribeEmail}
          >
            Subscribe Now
          </button>
        </div>
      </div>
      <div className={Styles.Footer__lowerFooter}>
        <p>
          © Copyright {new Date().getFullYear()}, All Rights Reserved by
          Lighthouse Storage
        </p>
      </div>
    </div>
  );
}

export default Footer;
