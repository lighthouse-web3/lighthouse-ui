import React, { useState, useEffect } from "react";
import Styles from "./header.module.scss";
import { RiMenuFill, RiCloseLine } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import Image from "next/image";
import { useRouter } from "next/router";
import NewsBar from "../NewsBar/NewsBar";

const links = [
  {
    title: "Home",
    path: "/",
    href: "",
  },
  // {
  //   title: "About Us",
  //   path: "/about",
  //   href: "",
  // },
  {
    title: "Blogs",
    path: "/blogs",
    href: "",
  },
  {
    title: "FAQ",
    path: "/faq",
    href: "",
  },
  {
    title: "Documentation",
    path: "/documentation",
    href: "",
  },

  {
    title: "Contact us",
    path: "",
    href: "https://airtable.com/shrPFC2TgojuOAYO4",
  },
];

function Header({ style }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollTop, setScrollTop] = useState();
  const [scrolling, setScrolling] = useState();
  const _navigate = useRouter();
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    setToggleMenu(false);
  }, [scrolling]);
  return (
    <div className={Styles.Header + " container"} style={style}>
      <div className={Styles.infoContainer}>
        <div className={Styles.logoContainer}>
          <div className={Styles.imageBox}>
            <Image src="/logo.svg" layout="fill" alt="brandLogo" />
          </div>
        </div>
        <div className={Styles.linksContainer}>
          {links.map((link, index) => (
            <p key={index}>
              {link.path.length > 0 ? (
                <a
                  onClick={() => {
                    _navigate.push(link.path);
                  }}
                >
                  {link.title}
                </a>
              ) : (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              )}
            </p>
          ))}
          <button
            onClick={() =>
              window.open("https://files.lighthouse.storage/", "_blank")
            }
            className="gradient__Border"
            style={{ padding: "0.5rem 2rem" }}
          >
            Login
          </button>
        </div>
      </div>

      <div className={Styles.navbarMobileMenu}>
        {toggleMenu ? (
          <RiCloseLine
            color="#ffff"
            size={27}
            onClick={() => {
              setToggleMenu(false);
            }}
          ></RiCloseLine>
        ) : (
          <RiMenuFill
            color="#ffff"
            size={27}
            onClick={() => {
              setToggleMenu(true);
            }}
          ></RiMenuFill>
        )}

        {toggleMenu && (
          <div className={Styles.MobileMenu + " scale-up-tr"}>
            {links.map((link, index) => (
              <p key={index}>
                {link.path.length > 0 ? (
                  <a
                    onClick={() => {
                      _navigate.push(link.path);
                    }}
                  >
                    {link.title}
                  </a>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                )}
              </p>
            ))}

            <button
              onClick={() =>
                window.open("https://files.lighthouse.storage/", "_blank")
              }
              className="gradient__Border"
              style={{ padding: "0.5rem 2rem" }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
