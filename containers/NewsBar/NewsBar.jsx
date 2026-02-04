import React, { useState } from "react";
import { useRouter } from "next/router";
import Styles from "./NewsBar.module.scss";
import { disclaimerText } from "../../utils/Data/SiteContent";

function NewsBar({ text, href = "/turby" }) {
  const router = useRouter();
  const content = text || disclaimerText;
  const handleNavigate = () => {
    router.push(href);
  };
  return (
    <div
      className={Styles.NewsBar}
      onClick={handleNavigate}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
      aria-label="Go to Turby page"
    >
      <div className={Styles.bgClr}></div>
      <div className={Styles.contentBox}>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    </div>
  );
}

export default NewsBar;
