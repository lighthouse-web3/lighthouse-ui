import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdArrowOutward } from "react-icons/md";
import { useCases } from "../data/usecases";

const summaries = {
  "trading-agents": "Keep strategy and execution in context.",
  "prediction-markets": "Carry research into the next decision.",
  "tokenised-assets": "Connect assets with their history.",
  "physical-ai": "Memory beyond a single machine.",
};

/**
 * Ported from the standalone Vite site. Two changes for Next: the current route
 * comes from the router rather than `location` (which does not exist during the
 * server render), and the outbound arrows use the same MdArrowOutward icon the
 * storage header uses, so both navs match.
 */
export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);

  const path = (router.asPath || "/").split(/[?#]/)[0].replace(/\/$/, "");
  const home = path === "";
  const anchor = (id) => (home ? "#" + id : "/#" + id);

  useEffect(() => {
    function close(e) {
      if (e.type === "keydown" && e.key === "Escape") {
        if (open) trigger.current?.focus();
        setOpen(false);
        setMobile(false);
      } else if (
        e.type === "pointerdown" &&
        !root.current?.contains(e.target)
      ) {
        setOpen(false);
        setMobile(false);
      }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className="nav" ref={root}>
      <a className="brand" href="/" aria-label="Lighthouse home">
        <img
          className="brand-logo"
          src="/memory/lighthouse-logo.svg"
          alt="Lighthouse"
          width="218"
          height="66"
        />
      </a>
      <button
        className="uc-mobile-toggle"
        onClick={() => setMobile(!mobile)}
        aria-expanded={mobile}
        aria-label="Toggle navigation"
      >
        {mobile ? "Close" : "Menu"} <span aria-hidden="true">{mobile ? "×" : "☰"}</span>
      </button>
      <nav
        onClick={(e) => {
          if (e.target.closest("a")) {
            setOpen(false);
            setMobile(false);
          }
        }}
        className={mobile ? "uc-nav-open" : ""}
        aria-label="Main navigation"
      >
        <a href={anchor("memory")}>Memory network</a>
        <a href="/storage">
          Storage <MdArrowOutward />
        </a>
        <a href={anchor("how")}>How it works</a>
        <div className="uc-nav-dropdown">
          <button
            ref={trigger}
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
                requestAnimationFrame(() =>
                  root.current?.querySelector(".uc-menu a")?.focus(),
                );
              }
            }}
            aria-expanded={open}
            aria-controls="usecases-menu"
          >
            Use cases{" "}
            <svg
              className="uc-chevron"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {open && (
            <div
              className="uc-menu"
              id="usecases-menu"
              onBlur={(e) => {
                if (!e.currentTarget.parentElement.contains(e.relatedTarget))
                  setOpen(false);
              }}
            >
              <a href="/use-cases/" className="uc-menu-all">
                <div>
                  <small>MEMORY AT WORK</small>
                  <strong>Explore all use cases</strong>
                </div>
                <span aria-hidden="true">→</span>
              </a>
              <div className="uc-menu-items">
                {useCases.map((c) => (
                  <a
                    key={c.slug}
                    href={"/use-cases/" + c.slug + "/"}
                    aria-current={
                      path === "/use-cases/" + c.slug ? "page" : undefined
                    }
                  >
                    <span className="uc-menu-icon" aria-hidden="true">
                      <img
                        src={"/memory/usecase-" + c.slug + ".webp"}
                        alt=""
                        width="48"
                        height="48"
                      />
                    </span>
                    <div className="uc-menu-copy">
                      <strong>{c.name}</strong>
                      <small>{summaries[c.slug]}</small>
                    </div>
                    <span className="uc-menu-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <a
          href="https://docs.lighthouse.storage/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation <MdArrowOutward />
        </a>
      </nav>
      <a href={anchor("memory")} className="nav-cta">
        Explore memory <MdArrowOutward />
      </a>
    </header>
  );
}
