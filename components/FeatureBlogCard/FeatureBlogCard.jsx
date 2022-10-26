import React from "react";
import Style from "./FeatureBlogCard.module.scss";

function FeatureBlogCard() {
  return (
    <div className={Style.FeatureBlogCard}>
      <div
        className={Style.bg}
        style={{
          background:
            'url("https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")',
        }}
      ></div>
      <div className={Style.content}>
        <p className={Style.title}>Lighthouse is partnering up with Stack OS</p>
      </div>
    </div>
  );
}

export default FeatureBlogCard;
