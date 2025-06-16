"use client";
import React from "react";
import styles from "./Switcher.module.scss";

function Switcher({ title1, title2, title3, activeTitle, setActiveTitle }) {
  const activeIndex = [title1, title2, title3].indexOf(activeTitle);

  return (
    <div className={styles.switcher} data-active={activeIndex}>
      {[title1, title2, title3].map((title, i) => (
        <button
          key={title}
          className={`${styles.switchButton} ${
            activeTitle === title ? styles.active : ""
          }`}
          onClick={() => setActiveTitle(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

export default Switcher;
