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
    <div
      className={styles.switcher}
      style={{
        "--tab-count": titles.length,
        "--active-index": activeIndex >= 0 ? activeIndex : 0,
      }}
    >
      {titles.map((title) => (
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
