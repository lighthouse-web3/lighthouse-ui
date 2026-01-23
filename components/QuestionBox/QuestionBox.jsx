import React, { useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { sanitizeHTML } from "../../utils/services/htmlSanitizer";
import Styles from "./QuestionBox.module.scss";

function QuestionBox({ question }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={Styles.QuestionBox}>
      <div
        className={Styles.titleBox}
        onClick={() => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      >
        <p>{question?.attributes?.question}</p>
        {isOpen ? <BiChevronDown /> : <BiChevronRight />}
      </div>
      {isOpen && (
        <div className={Styles.answerBox}>
          <p
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(question?.attributes?.answer) }}
          ></p>
        </div>
      )}
    </div>
  );
}

export default QuestionBox;
