import React, { useContext, useEffect, useState } from "react";
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
    title: "Turby",
    path: "/turby",
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
    href: "https://docs.lighthouse.storage/",
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
    <nav className="fixed top-0 w-full z-50 bg-[#131314]/60  shadow-[0_48px_48px_rgba(218,185,255,0.06)]">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => _navigate.push("/")}
        >
          <div className="relative w-32 h-8 md:w-36 md:h-10">
            <Image
              src={"/logo.svg"}
              layout="fill"
              objectFit="contain"
              alt="brandLogo"
            />
          </div>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link, index) => {
            const isActive = currentRoute === link.path;
            const linkClasses = isActive
              ? "text-[#dab9ff] border-b-2 border-[#dab9ff] pb-1 font-sans text-sm tracking-tight transition-colors"
              : "text-[#cec2d7] hover:text-[#dab9ff] transition-colors font-sans text-sm tracking-tight";

            return link.path.length > 0 ? (
              <a
                key={index}
                href={link.path}
                className={linkClasses}
                onClick={(e) => {
                  e.preventDefault();
                  _navigate.push(link.path);
                }}
              >
                {link.title}
              </a>
            ) : (
              <a
                key={index}
                href={link.href}
                className={linkClasses + " flex items-center gap-1"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
                <MdArrowOutward />
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {/* <span
            className="cursor-pointer text-[#cec2d7] hover:text-[#dab9ff] transition-colors"
            tabIndex={0}
            role="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setTheme(theme === "light" ? "dark" : "light");
              }
            }}
          >
            {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
          </span> */}

          {/* <button
            onClick={() =>
              window.open("https://files.lighthouse.storage/", "_blank")
            }
            className="text-[#cec2d7] hover:text-[#dab9ff] transition-colors text-sm font-semibold font-sans"
          >
            Login
          </button> */}
          <button
            onClick={() =>
              window.open(
                "https://files.lighthouse.storage/?redirectfrom=main",
                "_blank",
              )
            }
            className="bg-[#dab9ff] text-[#470084] px-6 py-2.5 rounded-md text-sm font-bold font-sans hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_0_40px_rgba(218,185,255,0.3)]"
          >
            Start Now
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          {/* <span
            className="cursor-pointer text-[#cec2d7]"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
             {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
          </span> */}
          {toggleMenu ? (
            <RiCloseLine
              color="#cec2d7"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenuFill
              color="#cec2d7"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </div>

      {toggleMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#131314]/95 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          {links.filter(link => link.path.length > 0).map((link, index) => {
            const isActive = currentRoute === link.path;
            const linkClasses = isActive
              ? "text-[#dab9ff] font-sans text-base font-medium"
              : "text-[#cec2d7] font-sans text-base";

            return (
              <a
                key={index}
                href={link.path}
                className={linkClasses}
                onClick={(e) => {
                  e.preventDefault();
                  _navigate.push(link.path);
                  setToggleMenu(false);
                }}
              >
                {link.title}
              </a>
            );
          })}
          <hr className="border-white/10 my-2" />
          {links.filter(link => link.path.length === 0).map((link, index) => {
            const isActive = currentRoute === link.path;
            const linkClasses = isActive
              ? "text-[#dab9ff] font-sans text-base font-medium"
              : "text-[#cec2d7] font-sans text-base";

            return (
              <a
                key={`ext-${index}`}
                href={link.href}
                className={linkClasses + " flex items-center gap-1"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
            );
          })}
          <hr className="border-white/10 my-2" />
          {/* <button
            onClick={() =>
              window.open("https://files.lighthouse.storage/", "_blank")
            }
            className="w-full text-center text-[#cec2d7] py-3 text-base font-semibold"
          >
            Login
          </button> */}
          <button
            onClick={() =>
              window.open(
                "https://files.lighthouse.storage/?redirectfrom=main",
                "_blank",
              )
            }
            className="w-full bg-[#dab9ff] text-[#470084] px-6 py-3 rounded-md text-base font-bold shadow-[0_0_40px_rgba(218,185,255,0.3)]"
          >
            Start Now
          </button>
        </div>
      )}
    </nav>
  );
}

export default Header;
