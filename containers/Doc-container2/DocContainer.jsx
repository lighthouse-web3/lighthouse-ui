import React from "react";
import { AiFillGithub } from "react-icons/ai";
import Styles from "./DocContainer.module.scss";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { GrResources } from "react-icons/gr";

const repos = [
  {
    name: "lighthouse-web3/files-dapp",
    link: "https://github.com/lighthouse-web3/files-dapp",
  },
  {
    name: "lighthouse-web3/contracts",
    link: "https://github.com/lighthouse-web3/contracts",
  },
  {
    name: "lighthouse-web3/lighthouse-package",
    link: "https://github.com/lighthouse-web3/lighthouse-package",
  },
];

const resources = [
  {
    name: "Hackathon Presentation - Bits Conquest",
    link: "https://www.canva.com/design/DAFE-rzoE30/GCGSCuaSMhYPwIUUHV4wsQ/view?utm_content=DAFE-rzoE30&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton#12",
    type: "presentation",
  },
];

const getResourceTypeLogo = (type) => {
  let icon = null;
  switch (type) {
    case "presentation":
      icon = <HiOutlinePresentationChartBar />;
      break;

    default:
      icon = <GrResources />;
      break;
  }

  return icon;
};

function DocContainer2({ contentData }) {
  return (
    <div className={Styles.DocContainer2 + " section__padding"}>
      <div className={Styles.listContainer + " " + Styles.left}>
        <div className={Styles.title}>Developers Links</div>

        {contentData?.developerLinks.map((repo, index) => (
          <div
            className={Styles.box + " ptr"}
            key={index}
            onClick={() => {
              window.open(repo.link, "_blank");
            }}
          >
            <div className={Styles.icon}>
              <AiFillGithub />
            </div>
            <div className={Styles.link}>{repo.title}</div>
          </div>
        ))}
      </div>
      <div className={Styles.seprator}></div>
      <div className={Styles.listContainer + " " + Styles.right}>
        <div className={Styles.title}>Resources</div>
        {contentData?.resources.map((resource, index) => (
          <div
            className={Styles.box + " ptr"}
            key={index}
            onClick={() => {
              window.open(resource.link, "_blank");
            }}
          >
            <div className={Styles.link}>{resource.title}</div>
            <div className={Styles.icon} style={{ marginLeft: "10px" }}>
              {getResourceTypeLogo(resource.type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocContainer2;
