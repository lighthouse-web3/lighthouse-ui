import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { TitleSeparator } from "../../components";
import { LandingPageData } from "../../utils/Data/SiteContent";
import { baseUrl } from "../../utils/Data/config";
import Styles from "./FaqContainer.module.scss";

// optional props: type = "main" | "pricing"
function FAQContainer({ type = "main" }) {
  const [isOpen, setIsOpen] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (type === "pricing") {
      setFaqs(LandingPageData.PricingFAQs);
    } else {
      (async () => {
        const res = await axios.get(`${baseUrl}/faqs?populate=*`);
        let faqData = res["status"] === 200 ? res["data"]?.["data"] : null;
        const mainSiteFaq = faqData.filter(
          (faq) => faq.attributes.Platform === "Mainsite"
        );
        setFaqs(mainSiteFaq);
      })();
    }
    return () => {};
  }, [type]);

  return (
    <div className={Styles.FAQContainer}>
      <TitleSeparator
        data-aos="fade-up"
        title={type === "pricing" ? "Pricing FAQs" : "FAQs"}
      />

      <div className={Styles.FAQContainer__Container}>
        {faqs.map((item, index) => (
          <div
            className={Styles.FAQbox}
            key={index}
            data-aos="fade-up"
            data-aos-delay={100 * index}
          >
            <div
              className={Styles.questionBox + " ptr"}
              onClick={() => {
                isOpen === index ? setIsOpen(null) : setIsOpen(index);
              }}
            >
              <p>{item?.attributes?.question}</p>
              <div className={Styles.icon}>
                {isOpen === index ? (
                  <AiOutlineMinusCircle />
                ) : (
                  <AiOutlinePlusCircle />
                )}
              </div>
            </div>
            <div 
              className={`${Styles.answerBox} ${
                isOpen === index ? Styles.open : ''
              }`}
            >
              <p
                dangerouslySetInnerHTML={{ __html: item?.attributes?.answer }}
              ></p>
            </div>
          </div>
        ))}
      </div>
      <div className={Styles.FAQContainer__QuestionBox} data-aos="fade-up">
        <p className={Styles.title}>Lets Talk!</p>
        <p className={Styles.subTitle}>
          Didn&apos;t find what you were looking for? <br /> Our team is happy to
          help.{" "}
        </p>
        <br />
        <button
          className={"fillBtn__purple ptr"}
          onClick={() => {
            window.open(
              "https://airtable.com/app0KP7ENgYlLDcJ0/shrPFC2TgojuOAYO4",
              "__blank"
            );
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default FAQContainer;
