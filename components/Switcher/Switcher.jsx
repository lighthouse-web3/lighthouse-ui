"use client";
import React from "react";
import styles from "./Switcher.module.scss";

function Switcher({
  title1,
  title2,
  title3,
  title4,
  activeTitle,
  setActiveTitle,
}) {
  const titles = [title1, title2, title3, title4].filter(Boolean);
  const activeIndex = titles.indexOf(activeTitle);

  return (
    <div className={styles.switcher} data-active={activeIndex}>
      {titles.map((title, i) => (
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
