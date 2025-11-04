import React, { useContext, useEffect, useRef, useState } from "react";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import Styles from "./header.module.scss";

import Image from "next/image";
import { useRouter } from "next/router";
import { BsMoon, BsSun } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import ThemeContext from "../../utils/services/Themecontext";

const links = [
  {
    title: "Home",
    path: "/",
    href: "",
  },
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
    title: "Pricing",
    path: "/pricing",
    href: "",
  },
  {
    title: "Ecosystem",
    path: "/ecosystem",
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
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);
  const _navigate = useRouter();

  useEffect(() => {
    setCurrentRoute(_navigate?.route);
  }, [_navigate]);

  const prevScrollRef = useRef(scrollTop);

  useEffect(() => {
    const onScroll = (e) => {
      const newScrollTop = e.target.documentElement.scrollTop;
      setScrollTop(newScrollTop);
      setScrolling(newScrollTop > prevScrollRef.current);
      // This is done to close the mobile menu when scrolling
      if (Math.abs(newScrollTop - prevScrollRef.current) > 50) {
        setToggleMenu(false);
      }
      prevScrollRef.current = newScrollTop;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [toggleMenu]);

  const handleLinkClick = (link) => {
    setToggleMenu(false);
    if (link.path.length > 0) {
      _navigate.push(link.path);
    } else if (link.href) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={Styles.Header + " container"}>
      <div className={Styles.infoContainer}>
        <div className={Styles.logoContainer}>
          <div
            className={Styles.imageBox + " ptr"}
            onClick={() => _navigate.push("/")}
          >
            <Image src={"/logo.svg"} layout="fill" alt="brandLogo" />
          </div>
        </div>
        <div className={Styles.navbarMobileMenu}>
          <span
            className="ptr"
            tabIndex={0}
            role="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"
              } mode`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleTheme();
              }
            }}
          >
            {theme === "light" ? (
              <BsMoon onClick={toggleTheme} />
            ) : (
              <BsSun onClick={toggleTheme} />
            )}
          </span>
          {toggleMenu ? (
            <RiCloseLine
              color="#ffff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenuFill
              color="#ffff"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}


        </div>
        <div className={Styles.linksContainer}>
          {links.map((link, index) => (
            <p key={index}>
              {link.path.length > 0 ? (
                <a
                  href={link.path}
                  className={currentRoute === link.path ? Styles.active : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                >
                  {link.title}
                </a>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  role="link"
                >
                  {link.title}
                  <MdArrowOutward />
                </a>
              )}
            </p>
          ))}
        </div>

        <div className={Styles.buttonContainer}>
          <span
            className="ptr"
            tabIndex={0}
            role="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"
              } mode`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleTheme();
              }
            }}
          >
            {theme === "light" ? (
              <BsMoon onClick={toggleTheme} />
            ) : (
              <BsSun onClick={toggleTheme} />
            )}
          </span>
          <button
            onClick={() =>
              window.open(
                "https://files.lighthouse.storage/?redirectfrom=main",
                "_blank"
              )
            }
            className={"fillBtn__purple"}
            style={{ padding: "0.5rem 2rem" }}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className={`${Styles.MobileMenu} ${toggleMenu ? Styles.open : ''}`}>
        {links.map((link, index) => (
          <p key={index}>
            <a
              href={link.path || link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
            >
              {link.title}
              {link.path.length === 0 && <MdArrowOutward />}
            </a>
          </p>
        ))}

        <button
          onClick={() =>
            window.open("https://files.lighthouse.storage/", "_blank")
          }
          className="fillBtn__blue"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
