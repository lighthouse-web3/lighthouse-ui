import React, { useState } from "react";
import Styles from "./QuestionBox.module.scss";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

function QuestionBox({ question }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={Styles.QuestionBox}>
      <div
        className={Styles.title}
        onClick={() => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      >
        <p className={Styles.question}>{question?.attributes?.question}</p>
        <div className={Styles.icon}>
          {isOpen ? <BiChevronDown /> : <BiChevronRight />}
        </div>
      </div>

      {isOpen && (
        <div
          className={Styles.answer}
          dangerouslySetInnerHTML={{ __html: question?.attributes?.answer }}
        ></div>
      )}
    </div>
  );
}

export default QuestionBox;
