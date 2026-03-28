import React, { useContext, useRef } from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
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
    <footer className="bg-[#131314] py-16 border-t border-[#4c4354]/15 font-sans">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col gap-6">
            <div
              className="w-44 cursor-pointer"
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
            
            <div className="flex gap-5">
              <span
                className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-xl cursor-pointer"
                onClick={() => window.open(socialLinks?.telegram, "_blank")}
              >
                <FaTelegramPlane />
              </span>
              <span
                className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-xl cursor-pointer"
                onClick={() => window.open(socialLinks?.discord, "_blank")}
              >
                <FaDiscord />
              </span>
              <span
                className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-xl cursor-pointer"
                onClick={() => window.open(socialLinks?.twitter, "_blank")}
              >
                <RiTwitterXLine />
              </span>
              <span
                className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-xl cursor-pointer"
                onClick={() => window.open(socialLinks?.linkedin, "_blank")}
              >
                <FaLinkedinIn />
              </span>
              <span
                className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-xl cursor-pointer"
                onClick={() => window.open(socialLinks?.instagram, "_blank")}
              >
                <FaInstagram />
              </span>
            </div>
            <p
              className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors cursor-pointer text-sm"
              onClick={() => {
                window.open(`mailto:${socialLinks?.contactMail}`, "_blank");
              }}
            >
              {socialLinks?.contactMail}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[#e4e2e2] text-lg font-headline">Sitemap</p>
            {footerData?.sitemap.map((item, index) => (
              <p
                className="text-[#cec2d7] hover:text-[#dab9ff] text-sm transition-colors cursor-pointer w-fit"
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

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[#e4e2e2] text-lg font-headline">Help</p>
            {footerData?.otherLinks.map((item, index) => (
              <p
                className="text-[#cec2d7] hover:text-[#dab9ff] text-sm transition-colors cursor-pointer w-fit flex items-center gap-1"
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

          <div className="flex flex-col gap-4">
            <p className="font-bold text-[#e4e2e2] text-lg font-headline">Newsletter</p>
            <input
              type="email"
              placeholder="user@mail.com"
              ref={mailInput}
              id="newsletter-email"
              name="newsletter-email"
              autoComplete="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  subscribeEmail();
                }
              }}
              className="bg-[#1b1c1c] border border-[#4c4354]/20 text-[#e4e2e2] px-4 py-3 rounded-xl focus:outline-none focus:border-[#dab9ff] transition-colors w-full"
            />
            <button
              className="bg-[#dab9ff] text-[#470084] px-4 py-3 rounded-xl font-bold font-sans hover:bg-[#c79ef5] transition-colors w-full shadow-lg"
              onClick={subscribeEmail}
            >
              Subscribe Now
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-[#4c4354]/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[#cec2d7]/60">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by Lighthouse Storage
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
