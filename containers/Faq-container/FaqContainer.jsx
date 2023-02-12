import React, { useEffect, useState } from "react";
import Styles from "./FaqContainer.module.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";

function FAQContainer() {
  return (
    <div className={Styles.FAQContainer}>
      <p className={Styles.FAQContainer__title}>
        FAQ<small>s</small>
      </p>

      <div className={Styles.FAQContainer__Container}>
        <div className={Styles.FAQbox}>
          <div className={Styles.questionBox}>
            <p>Is there a free trial available?</p>
            <div className={Styles.icon}>
              <AiOutlineMinusCircle />
            </div>
          </div>
          <div className={Styles.answerBox}>
            <p>
              Yes, you can try us for free for 30 days. If you want, we’ll
              provide you with a free, personalized 30-minute onboarding call to
              get you up and running as soon as possible.
            </p>
          </div>
        </div>
        <div className={Styles.FAQbox}>
          <div className={Styles.questionBox}>
            <p>Is there a free trial available?</p>
            <div className={Styles.icon}>
              <AiOutlineMinusCircle />
            </div>
          </div>
          <div className={Styles.answerBox}>
            <p>
              Yes, you can try us for free for 30 days. If you want, we’ll
              provide you with a free, personalized 30-minute onboarding call to
              get you up and running as soon as possible.
            </p>
          </div>
        </div>
      </div>
      <div className={Styles.FAQContainer__QuestionBox}></div>
    </div>
  );
}

export default FAQContainer;
