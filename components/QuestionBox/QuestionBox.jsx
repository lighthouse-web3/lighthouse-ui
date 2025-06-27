import React, { useState, useCallback, useMemo } from "react";
import Styles from "./QuestionBox.module.scss";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

function QuestionBox({ question }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sanitizedAnswer = useMemo(() => {
    return question?.attributes?.answer.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    );
  }, [question?.attributes?.answer]);

  return (
    <div className={Styles.QuestionBox}>
      <button
        className={Styles.title}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`answer-${question?.id}`}
      >
        <p className={Styles.question}>{question?.attributes?.question}</p>
        <div className={Styles.icon} aria-hidden="true">
          {isOpen ? <BiChevronDown /> : <BiChevronRight />}
        </div>
      </button>

      {isOpen && (
        <div
          id={`answer-${question?.id}`}
          className={Styles.answer}
          dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
        />
      )}
    </div>
  );
}

export default React.memo(QuestionBox);
