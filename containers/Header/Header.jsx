import React, { useState, useEffect, useContext } from "react";
import Styles from "./header.module.scss";
import { RiMenuFill, RiCloseLine } from "react-icons/ri";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import Image from "next/image";
import { useRouter } from "next/router";
import { themeChanger } from "../../utils/services/theme";
import { BsMoon, BsSun } from "react-icons/bs";
import ThemeContext from "../../utils/services/Themecontext";

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
    title: "Blog",
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
    path: "",
    href: "https://docs.lighthouse.storage/lighthouse-1/",
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
  const [currentRoute, setCurrentRoute] = useState();
  const { theme, setTheme } = useContext(ThemeContext);
  const _navigate = useRouter();

  useEffect(() => {
    setCurrentRoute(_navigate?.route);
  }, [_navigate]);

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
    <div className={Styles.Header + " container"}>
      <div className={Styles.infoContainer}>
        <div className={Styles.logoContainer}>
          <div
            className={Styles.imageBox + " ptr"}
            onClick={() => {
              _navigate.push("/");
            }}
          >
            <Image src={"/logo.svg"} layout="fill" alt="brandLogo" />
          </div>
        </div>
        <div className={Styles.linksContainer}>
          {links.map((link, index) => (
            <p key={index}>
              {link.path.length > 0 ? (
                <a
                  className={currentRoute === link.path ? Styles.active : ""}
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
        </div>

        <div className={Styles.buttonContainer}>
          <span className="ptr">
            {theme === "light" ? (
              <BsMoon
                onClick={() => {
                  setTheme("dark");
                }}
              />
            ) : (
              <BsSun
                onClick={() => {
                  setTheme("light");
                }}
              />
            )}
          </span>
          <button
            onClick={() =>
              window.open("https://files.lighthouse.storage/?redirectfrom=main", "_blank")
              // window.open("https://files.lighthouse.storage/?referfrom=main", "_blank")
            }
            className={"fillBtn__purple"}
            style={{ padding: "0.5rem 2rem" }}
          >
            LOGIN
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
              className="fillBtn__blue"
              style={{
                padding: "0.5rem 2rem",
                marginTop: "1rem",
                width: "80%",
              }}
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
