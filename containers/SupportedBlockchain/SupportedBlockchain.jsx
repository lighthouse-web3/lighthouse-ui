import React from "react";
import { MarqueeScroller } from "../../components";
import Styles from "./SupportedBlockchain.module.scss";

function SupportedBlockchain() {
  return (
    <div className={Styles.SupportedBlockchain}>
      <div className={Styles.title}>
        Build On Any <span className="gradient__Text">Blockchain</span> <br />{" "}
        using
        <span className="gradient__Text"> Lighthouse</span>
      </div>
      <hr />
      <div className={Styles.BlockchainContainer}>
        <span className={Styles.Scroller}>
          <MarqueeScroller logos={[]} direction="right" speed={6} />
        </span>
        <span className={Styles.Scroller}>
          <MarqueeScroller logos={[]} direction="left" speed={8} />
        </span>
        <span className={Styles.Scroller}>
          <MarqueeScroller logos={[]} direction="right" speed={10} />
        </span>
      </div>
    </div>
  );
}

export default SupportedBlockchain;
