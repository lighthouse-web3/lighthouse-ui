import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { documentationCards } from "../../utils/Data/SiteContent";

import Styles from "./DocContainer.module.scss";

function DocContainer2() {
  return (
    <div className={Styles.DocContainer2}>
      <p className={Styles.DocContainer2__title}>Not sure where to start?</p>
      <p className={Styles.DocContainer2__subTitle}>
        Programs offer day-to-day guidance on an interactive calendar to keep
        you on track.
      </p>
      <div className={Styles.DocContainer2__cardContainer}>
        {documentationCards.map((item, index) => (
          <div
            className={Styles.card}
            key={index}
            onClick={() => {
              window.open(item?.link, "__blank");
            }}
          >
            <p className={Styles.card__title}>{item?.title}</p>
            <div className={Styles.card__subTitle}>
              <p>{item?.subTitle}</p>
              <span>
                <AiOutlineArrowRight />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocContainer2;
