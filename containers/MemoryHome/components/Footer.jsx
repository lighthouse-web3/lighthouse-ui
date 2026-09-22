import { useRef } from "react";
import { FaDiscord, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";
import { footerData, socialLinks } from "../../../utils/Data/SiteContent";
import { sendEmail, validateEmail } from "../../../utils/services/emailService";
import { notify } from "../../../utils/services/notification";

/**
 * Same four columns as the storage footer in containers/Footer, reading the
 * same link data and using the same newsletter service, so the two footers stay
 * in step. Only the styling differs -- this one is CSS-classed to sit inside the
 * memory page's own type and colour scale, and it keeps the big wordmark.
 */
export default function Footer() {
  const mailInput = useRef();

  const subscribeEmail = () => {
    const userEmail = mailInput?.current?.value || null;
    if (validateEmail(userEmail)) {
      sendEmail(userEmail).then(() => {
        mailInput.current.value = "";
      });
    } else {
      notify("Please Enter a valid Email", "error");
    }
  };

  return (
    <footer>
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label="Lighthouse home">
            <img
              className="brand-logo"
              src="/memory/lighthouse-logo.svg"
              alt="Lighthouse"
              width="218"
              height="66"
            />
          </a>
          <p>The verifiable memory layer for AI agents.</p>
          <div className="footer-socials">
            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <FaDiscord />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <RiTwitterXLine />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <a className="footer-mail" href={`mailto:${socialLinks.contactMail}`}>
            {socialLinks.contactMail}
          </a>
        </div>

        <div className="footer-col">
          <h3>Sitemap</h3>
          {footerData.sitemap.map((item) => (
            <a key={item.text} href={item.path}>
              {item.text}
            </a>
          ))}
          <a
            href="https://docs.lighthouse.storage/memory/intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Memory docs <MdArrowOutward />
          </a>
        </div>

        <div className="footer-col">
          <h3>Help</h3>
          {footerData.otherLinks.map((item) => (
            <a
              key={item.text}
              href={item.path || item.link}
              target={item.path ? undefined : "_blank"}
              rel={item.path ? undefined : "noopener noreferrer"}
            >
              {item.text}
              {item.path ? null : <MdArrowOutward />}
            </a>
          ))}
        </div>

        <div className="footer-col footer-newsletter">
          <h3>Newsletter</h3>
          <input
            type="email"
            placeholder="user@mail.com"
            ref={mailInput}
            id="memory-newsletter-email"
            name="memory-newsletter-email"
            autoComplete="email"
            onKeyDown={(e) => {
              if (e.key === "Enter") subscribeEmail();
            }}
          />
          <button type="button" onClick={subscribeEmail}>
            Subscribe Now
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © Copyright {new Date().getFullYear()}, All Rights Reserved by
          Lighthouse Storage
        </span>
        <a href="/#home">Back to top ↑</a>
      </div>

      <div className="footer-word reveal" aria-hidden="true">
        LIGHTHOUSE
      </div>
    </footer>
  );
}
