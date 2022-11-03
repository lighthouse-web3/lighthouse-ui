import React, { useState } from "react";
import Styles from "./NewsBar.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

function NewsBar() {
  const [isClosed, setClosed] = useState(false);
  return (
    <div className={!isClosed ? Styles.NewsBar : Styles.NewsBarClosed}>
      <div className={Styles.bgClr}></div>
      <div className={Styles.contentBox}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
          quam!
        </p>
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
