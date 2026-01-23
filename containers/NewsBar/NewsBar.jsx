import React, { useState } from "react";
import Styles from "./NewsBar.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { disclaimerText } from "../../utils/Data/SiteContent";
import { sanitizeHTML } from "../../utils/services/htmlSanitizer";

function NewsBar() {
  const [isClosed, setClosed] = useState(false);
  return (
    <div className={!isClosed ? Styles.NewsBar : Styles.NewsBarClosed}>
      <div className={Styles.bgClr}></div>
      <div className={Styles.contentBox}>
        <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(disclaimerText) }}></p>
        <span
          onClick={() => {
            setClosed(true);
          }}
        >
          <AiOutlineCloseCircle />
        </span>
      </div>
    </div>
  );
}

export default NewsBar;
