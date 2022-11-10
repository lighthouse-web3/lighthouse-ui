import React, { useEffect, useState } from "react";
import Styles from "./FaqContainer.module.scss";
import { BsSearch } from "react-icons/bs";
import { Pagination, QuestionBox } from "../../components";

function FAQContainer({ contentData }) {
  const questions = contentData;
  console.log(questions);
  const [searchWord, setSearchWord] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    if (searchWord.length > 0) {
      let filteredQuestions = questions?.filter((item) =>
        item?.["attributes"]?.question?.includes(searchWord)
      );
      setCurrentQuestions(filteredQuestions);
    } else {
      setCurrentQuestions(questions);
    }
  }, [searchWord]);

  return (
    <div className={Styles.FAQContainer + " section__padding"} id="faq">
      <div className={Styles.faq}>
        <div className={Styles.title}>
          <p className="gradient__text mainTitle">Frequently Asked Questions</p>
        </div>

        <div className={Styles.faqSearchBox}>
          <div className={Styles.searchbox}>
            <span className={Styles.icon}>
              <BsSearch />
            </span>
            <input
              type="text"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              placeholder="Search FAQ"
            />
          </div>
        </div>

        <div className={Styles.faqContentContainer}>
          <div className={Styles.questionsContainer}>
            {currentQuestions?.length > 0 &&
              currentQuestions.map((question, key) => (
                <QuestionBox question={question} key={key} />
              ))}
          </div>
        </div>
      </div>

      <Pagination
        data={filteredQuestions}
        setCurrentData={setCurrentQuestions}
        itemsPerPage={3}
      />
    </div>
  );
}

export default FAQContainer;
