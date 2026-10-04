import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { utilities, floors } from "../data/tokenEconomy";
import TokenLighthouse3D from "./TokenLighthouse3D";
import TokenAllocation from "./TokenAllocation";





function Icon({ name, size = 24 }) {
  const fill = { fill: "currentColor", fillOpacity: 0.12 };
  const paths = {
    layers: (
      <>
        <path d="m7 16 17-9 17 9-17 9Z" {...fill} />
        <path d="m7 24 17 9 17-9M7 32l17 9 17-9" />
        <path d="M24 25v8" opacity=".45" />
      </>
    ),
    search: (
      <>
        <circle cx="21" cy="21" r="12" {...fill} />
        <path d="m30 30 10 10M16 21h10M21 16v10" />
        <path d="M7 10V6h4M35 6h5v5" opacity=".45" />
      </>
    ),
    replica: (
      <>
        <rect x="7" y="7" width="24" height="24" rx="5" {...fill} />
        <path d="M17 36v1a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V21a4 4 0 0 0-4-4h-1M14 19h10M19 14v10" />
      </>
    ),
    fingerprint: (
      <>
        <path d="M10 22a14 14 0 0 1 28 0v8M16 39c3-5 2-10 2-17a6 6 0 0 1 12 0v10c0 4 1 6 3 9M10 28v4c0 4-2 6-2 6M24 22v10c0 5-1 8-2 10M16 9a16 16 0 0 1 16 0" />
        <circle
          cx="24"
          cy="22"
          r="3"
          fill="currentColor"
          fillOpacity=".2"
          stroke="none"
        />
      </>
    ),
    withdraw: (
      <>
        <path
          d="M27 6H13a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V18L27 6Z"
          {...fill}
        />
        <path d="M27 6v12h12M17 30h14" />
      </>
    ),
    govern: (
      <>
        <path d="m24 6 10 6v12l-10 6-10-6V12Z" {...fill} />
        <path d="m14 12 10 6 10-6M24 18v12M24 30v5M14 24l-6 9M34 24l6 9" />
        <circle cx="24" cy="39" r="3" />
        <circle cx="6" cy="37" r="3" />
        <circle cx="42" cy="37" r="3" />
      </>
    ),
    shield: (
      <>
        <path d="m24 5 15 7v11c0 10-15 19-15 19S9 33 9 23V12Z" {...fill} />
        <path d="m17 23 5 5 10-11" />
      </>
    ),
    exchange: (
      <>
        <rect x="5" y="11" width="38" height="26" rx="6" {...fill} />
        <path d="M13 20h21m-5-5 5 5-5 5M35 29H14m5-5-5 5 5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="24" cy="24" r="17" {...fill} />
        <path d="M24 13v12l8 5M24 7v3M41 24h-3" />
      </>
    ),
    link: (
      <>
        <path
          d="m20 28 8-8M17 31l-3 3a8 8 0 0 1-11-11l8-8a8 8 0 0 1 11 0M31 17l3-3a8 8 0 0 1 11 11l-8 8a8 8 0 0 1-11 0"
          transform="translate(2 2) scale(.9)"
        />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.layers}
    </svg>
  );
}

function JourneyRail({ active, paused, setPaused }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="tp-journey-rail" data-expanded={expanded}>
      <span className="tp-rail-heading">Explore the token</span>
      <button
        className="tp-rail-toggle"
        aria-expanded={expanded}
        aria-controls="tp-rail-links"
        onClick={() => setExpanded(!expanded)}
      >
        <span>Explore the token</span>
        <span>
          {floors[active].label}
          <span className="tp-rail-chevron" />
        </span>
      </button>
      <nav
        id="tp-rail-links"
        className="tp-rail-links"
        aria-label="Token chapters"
      >
        <span className="tp-rail-track" aria-hidden="true">
          <i style={{ transform: `translateY(${active * 50}px)` }} />
        </span>
        {floors.map((f, i) => (
          <a
            key={f.id}
            href={`#${f.id}`}
            onClick={() => setExpanded(false)}
            aria-current={active === i ? "location" : undefined}
          >
            <span className="tp-rail-number">0{i}</span>
            <span>{f.label}</span>
          </a>
        ))}
      </nav>
      <button
        className="tp-rail-motion"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={
          paused
            ? "Enable token page animations"
            : "Pause token page animations"
        }
      >
        <span className="tp-motion-wave" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{paused ? "Motion paused" : "Motion on"}</span>
      </button>
    </aside>
  );
}

function useTokenJourney(root, tour, reduced, paused) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const page = root.current;
    const sections = floors.map((f) => page.querySelector(`#${f.id}`));
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.46;
      let next = 0;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= line) next = index;
      });
      setActive((previous) => (previous === next ? previous : next));
      const rect = tour.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (150 - rect.top) / Math.max(1, rect.height - window.innerHeight),
        ),
      );
      page.style.setProperty("--journey", progress);
      if (!reduced && !paused) page.style.setProperty("--depth", progress);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [root, tour, reduced, paused]);
  useEffect(() => {
    if (reduced || paused) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tp-in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.07 },
    );
    root.current.querySelectorAll("[data-tp-reveal]").forEach((node) => {
      node.classList.add("tp-wait");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      root.current
        ?.querySelectorAll(".tp-wait")
        .forEach((node) => node.classList.remove("tp-wait"));
    };
  }, [root, reduced, paused]);
  return active;
}

function ChapterHeading({ number, label, title, children }) {
  return (
    <header className="tp-chapter-heading" data-tp-reveal>
      <span className="tp-eyebrow">
        <span>{number}</span> / {label}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

function UtilityExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const item = utilities[active];
  function move(event) {
    const keys = {
      ArrowRight: (active + 1) % utilities.length,
      ArrowLeft: (active + utilities.length - 1) % utilities.length,
      Home: 0,
      End: utilities.length - 1,
    };
    if (keys[event.key] === undefined) return;
    event.preventDefault();
    setActive(keys[event.key]);
    tabs.current[keys[event.key]]?.focus();
  }
  return (
    <div
      className="service-utility tp-glass"
      data-mode={item.id}
      data-tp-reveal
    >
      <div
        className="service-utility-tabs"
        role="tablist"
        aria-label="Token utilities"
        onKeyDown={move}
      >
        {utilities.map((u, i) => (
          <button
            key={u.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`service-tab-${u.id}`}
            aria-selected={i === active}
            aria-controls="service-utility-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            <Icon name={u.icon} size={22} />
            <span>{u.name}</span>
          </button>
        ))}
      </div>
      <div
        id="service-utility-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${item.id}`}
        tabIndex={0}
        className="service-utility-panel"
      >
        <div className="service-utility-main" key={item.id}>
          <div>
            <span className="tp-kicker">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
          <div
            className={`service-object service-object-${item.id}`}
            aria-hidden="true"
          >
            <div className="service-object-orbit" />
            <div className="service-object-core">
              <Icon name={item.icon} size={58} />
            </div>
            <span className="service-object-chip">
              {item.id === "lock" ? "TOKEN" : "USD"}
            </span>
          </div>
        </div>
        <ol className="service-steps">
          {item.steps.map(([title, detail], i) => (
            <li key={title}>
              <span className="service-step-number">0{i + 1}</span>
              <div>
                <h4>{title}</h4>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="service-utility-note">{item.note}</p>
      </div>
    </div>
  );
}

function CreditDetails() {
  return (
    <div className="service-credit-surface tp-glass" data-tp-reveal>
      <div className="service-credit-equation">
        <div>
          <strong>1</strong>
          <span>service credit</span>
        </div>
        <span className="service-equals">=</span>
        <div>
          <strong>$1</strong>
          <span>of eligible services</span>
        </div>
      </div>
      <p className="service-credit-caption">
        At the published rate card. Storage capacity and operation counts depend
        on the service selected.
      </p>
      <div className="service-credit-notes">
        <article>
          <Icon name="shield" size={26} />
          <h3>Funded before issue</h3>
          <p>
            Each accepted lock reserves its credits against a funded service
            budget.
          </p>
        </article>
        <article>
          <Icon name="layers" size={26} />
          <h3>Separate balances</h3>
          <p>
            Locked tokens and service credits are tracked separately. Using
            credits does not spend locked tokens.
          </p>
        </article>
        <article>
          <Icon name="link" size={26} />
          <h3>Agent budgets</h3>
          <p>
            Assign credits to authorised agents. Spending permission does not
            grant access to memory.
          </p>
        </article>
      </div>
      <div className="token-credit-services">
        <span>Eligible uses</span>
        <ul>
          <li>Memory plans</li>
          <li>Storage renewals</li>
          <li>Additional usage</li>
          <li>Agent budgets</li>
        </ul>
      </div>
      <p className="service-credit-foot">
        Lock-earned credits cannot be transferred or redeemed for cash.
      </p>
    </div>
  );
}

function Tokenomics() {
  return (
    <div className="service-tokenomics tp-glass" data-tp-reveal>
      <dl className="service-token-facts">
        {[
          ["Total supply", "TBD"],
          ["Network", "TBD"],
          ["Launch date", "TBD"],
          ["Lock terms", "TBD"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <TokenAllocation />
      <details className="service-parameter-details">
        <summary>
          <span>Supply, release and contract details</span>
          <span className="tp-disclosure-plus" aria-hidden="true" />
        </summary>
        <dl>
          {[
            "Maximum supply",
            "Initial circulating supply",
            "Token standard",
            "Contract address",
            "Vesting and cliffs",
            "Unlock schedule",
            "Emission schedule",
            "Lock terms and credit rates",
            "Trading venues",
            "Buyback or burn policy",
          ].map((label) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>TBD</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
}

export default function Token() {
  const root = useRef(null),
    intro = useRef(null),
    tour = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const active = useTokenJourney(root, tour, reduced, paused);
  return (
    <>
      <Navbar />
      <main
        className="tp-token tp-editorial tp-service"
        ref={root}
        data-motion={reduced || paused ? "off" : "on"}
        data-reduced={reduced ? "true" : "false"}
      >
        <TokenLighthouse3D
          root={root}
          intro={intro}
          tour={tour}
          disabled={reduced || paused}
          reduced={reduced}
        />
        <div className="tp-scene-shade" aria-hidden="true" />
        <div className="tp-flight-intro" ref={intro}>
          <section className="tp-hero tp-shell" id="token-overview">
            <div className="token-studio-light" aria-hidden="true" />
            <div className="tp-hero-copy">
              <h1>
                The Lighthouse
                <br />
                <em>token.</em>
              </h1>
              <p>
                Two proposed uses: lock tokens for service credits, or spend
                tokens on memory and storage.
              </p>
              <div className="token-hero-paths">
                <a href="#token-utility">
                  <span>
                    <Icon name="shield" size={20} /> Lock for credits{" "}
                  </span>
                  <p>
                    Use service credits. Withdraw your tokens when the lock
                    ends.
                  </p>
                </a>
                <a href="#token-utility">
                  <span>
                    <Icon name="exchange" size={20} /> Pay for services{" "}
                  </span>
                  <p>
                    Spend tokens on plans, storage renewals and extra usage.
                  </p>
                </a>
              </div>
              <div className="tp-actions">
                <a className="tp-button" href="#token-utility">
                  How it works
                </a>
              </div>
            </div>
            <div className="tp-hero-visual" aria-hidden="true">
              <div className="tp-hero-halo" />
              <img
                className="tp-hero-tower"
                src="/assets/lighthouse-glass.webp"
                alt=""
                width="1024"
                height="1536"
              />
            </div>
            <div className="tp-hero-bottom">
              <a className="tp-descent-cue" href="#token-enter">
                <span className="tp-descent-line" />
                Scroll to explore
              </a>
              <span className="service-hero-meta">MEMORY & STORAGE</span>
            </div>
            <div className="tp-flight-progress" aria-hidden="true">
              <span />
            </div>
            <a className="tp-skip-flight" href="#token-utility">
              Skip to details
            </a>
          </section>
          <span className="tp-entry-anchor" id="token-enter" />
        </div>
        <div className="tp-tour tp-shell" ref={tour}>
          <JourneyRail active={active} paused={paused} setPaused={setPaused} />
          <div className="tp-chapters">
            <section className="tp-chapter" id="token-utility">
              <ChapterHeading
                number="01"
                label="Utility"
                title="Two ways to use the token."
              >
                The proposed model separates locked tokens from tokens spent on
                a service. Fiat and supported stablecoin payments remain
                available.
              </ChapterHeading>
              <UtilityExplorer />
            </section>
            <section className="tp-chapter" id="token-credits">
              <ChapterHeading
                number="02"
                label="Service credits"
                title="A balance for your services."
              >
                Credits measure usage in USD. They are separate from your tokens
                and from access to your data.
              </ChapterHeading>
              <CreditDetails />
            </section>
            <section className="tp-chapter" id="token-allocation">
              <ChapterHeading
                number="03"
                label="Tokenomics"
                title="Token allocation."
              >
                Explore the allocation categories. Supply, shares and release
                terms remain TBD.
              </ChapterHeading>
              <Tokenomics />
              <div className="service-resources">
                <a
                  href="https://docs.lighthouse.storage/memory/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Memory documentation
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
