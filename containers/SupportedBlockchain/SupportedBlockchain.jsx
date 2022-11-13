import React from "react";
import { MarqueeScroller } from "../../components";
import Styles from "./SupportedBlockchain.module.scss";

function SupportedBlockchain() {
  return (
    <div className={Styles.SupportedBlockchain}>
      <div className={Styles.title}>
        Build On Any <span className="gradient__Text">Blockchain</span>
      </div>
      <hr />
      <div className={Styles.BlockchainContainer}>
        <span
          className={Styles.Scroller}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <MarqueeScroller logos={[]} direction="right" speed={6} />
        </span>
        <span
          className={Styles.Scroller}
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <MarqueeScroller logos={[]} direction="left" speed={8} />
        </span>
        <span
          className={Styles.Scroller}
          data-aos="fade-up"
          data-aos-duration="1400"
        >
          <MarqueeScroller logos={[]} direction="right" speed={10} />
        </span>
      </div>
    </div>
  );
}

export default SupportedBlockchain;
