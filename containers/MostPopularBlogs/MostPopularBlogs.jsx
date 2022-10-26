import React from "react";
import { FeatureBlogCard } from "../../components";
import Style from "./MostPopularBlogs.module.scss";

function MostPopularBlogs() {
  return (
    <div className={Style.MostPopularBlogs}>
      <div className={Style.title}>Most Popular</div>
      <div className={Style.container}>
        <div className={Style.div1}>
          <FeatureBlogCard />
        </div>
        <div className={Style.div2}>
          <div
            className={Style.imgBox}
            style={{
              background:
                'url("https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")',
            }}
          ></div>
          <div className={Style.contentBox}>
            <p className={Style.title}>
              Lighthouse is partnering up with Stack OS
            </p>
            <p className={Style.subTitle}>
              Lighthouse is a permanent file storage protocol that allows the
              ability of perpetual storage for your files. Using Lighthouse you
              can store your files forever on a distributed web ....
            </p>
          </div>
        </div>
        <div className={Style.div3}>
          <div
            className={Style.imgBox}
            style={{
              background:
                'url("https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")',
            }}
          ></div>
          <div className={Style.contentBox}>
            <p className={Style.title}>
              Lighthouse is partnering up with Stack OS
            </p>
            <p className={Style.subTitle}>
              Lighthouse is a permanent file storage protocol that allows the
              ability of perpetual storage for your files. Using Lighthouse you
              can store your files forever on a distributed web ....
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostPopularBlogs;
