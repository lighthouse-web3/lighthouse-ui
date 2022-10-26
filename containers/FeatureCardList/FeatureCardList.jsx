import React from "react";
import { FeatureCard } from "../../components";
import Style from "./FeatureCardList.module.scss";

const featuresList = [
  {
    title: `Lighthouse <span classname="gradient__Text">CLI</span>`,
    content:
      "Lighthouse allows users to store their files on the decentralized network for lifetime at a fixed price",
    bgImg: "/cmd.png",
  },
  {
    title: `Lighthouse <span classname="gradient__Text">CLI</span>`,
    content:
      "Lighthouse allows users to store their files on the decentralized network for lifetime at a fixed price",
    bgImg: "/cmd.png",
  },
  {
    title: `Lighthouse <span classname="gradient__Text">CLI</span>`,
    content:
      "Lighthouse allows users to store their files on the decentralized network for lifetime at a fixed price",
    bgImg: "/cmd.png",
  },
  {
    title: `Lighthouse <span classname="gradient__Text">CLI</span>`,
    content:
      "Lighthouse allows users to store their files on the decentralized network for lifetime at a fixed price",
    bgImg: "/cmd.png",
  },
];

function FeatureCardList() {
  return (
    <div className={Style.FeatureCardList}>
      {featuresList.map((feature, key) => (
        <div className={Style.card} key={key}>
          <FeatureCard index={key} feature={feature} />
        </div>
      ))}
    </div>
  );
}

export default FeatureCardList;
