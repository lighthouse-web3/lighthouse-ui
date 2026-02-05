import Link from "next/link";
import Styles from "./NewsBar.module.scss";
import { disclaimerText } from "../../utils/Data/SiteContent";
import { FiArrowRight } from "react-icons/fi";

function NewsBar({ text, href = "/turby" }) {
  const content = text || disclaimerText;

  return (
    <div className={Styles.NewsBar}>
      <div className={Styles.bgClr}></div>
      <Link href={href}>
        <a className={Styles.contentBox} style={{ textDecoration: "none" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: content }} />
            <FiArrowRight style={{ transform: "rotate(-45deg)" }} />
          </p>
        </a>
      </Link>
    </div>
  );
}

export default NewsBar;
