import React, { useEffect, useState } from "react";
import Styles from "./FaqContainer.module.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { LandingPageData, socialLinks } from "../../utils/Data/SiteContent";
import { ImageBox } from "../../components";

function FAQContainer() {
  const [isOpen, setIsOpen] = useState(0);
  return (
    <div className={Styles.FAQContainer}>
      <p className={Styles.FAQContainer__title}>
        FAQ<small>s</small>
      </p>

      <div className={Styles.FAQContainer__Container}>
        {LandingPageData?.FAQs.map((item, index) => (
          <div className={Styles.FAQbox} key={index}>
            <div className={Styles.questionBox}>
              <p>{item?.question}</p>
              <div
                className={Styles.icon + " ptr"}
                onClick={() => {
                  setIsOpen(index);
                }}
              >
                <AiOutlineMinusCircle />
              </div>
            </div>
            {isOpen === index && (
              <div className={Styles.answerBox}>
                <p dangerouslySetInnerHTML={{ __html: item?.answer }}></p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={Styles.FAQContainer__QuestionBox}>
        <div className={Styles.icon}>
          <ImageBox src={"/groupIcon.png"} />
        </div>

        <p className={Styles.title}>Still have questions?</p>
        <p className={Styles.subTitle}>
          Can’t find the answer you’re looking for? Get in touch with our team.
        </p>
        <button
          className={"fillBtn__purple ptr"}
          onClick={() => {
            window.location.href = `mailto:${socialLinks?.contactMail}`;
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default FAQContainer;
