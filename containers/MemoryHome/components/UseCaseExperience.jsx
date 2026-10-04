import { useEffect, useRef, useState } from "react";
import { useCases } from "../data/usecases";
import { usecaseDetails } from "../data/usecaseDetails";

const presentation = {
  "trading-agents": {
    title: ["Memory for", "trading agents."],
    agent: "Strategy agent",
    task: "Review a market signal",
    context: "Strategy context",
    outcome: "Review prepared",
    verbs: ["Read the signal", "Recall the strategy", "Prepare the review"],
    short: "Save strategy, constraints and decisions for the next review.",
    icon: "chart",
  },
  "prediction-markets": {
    title: ["Memory for", "forecasting agents."],
    agent: "Research agent",
    task: "Review new evidence",
    context: "Research context",
    outcome: "Assessment prepared",
    verbs: [
      "Read the evidence",
      "Recall the assumptions",
      "Revisit the forecast",
    ],
    short: "Keep the evidence and reasoning behind each forecast connected.",
    icon: "branch",
  },
  "tokenised-assets": {
    title: ["Memory for", "asset research."],
    agent: "Asset research agent",
    task: "Review an issuer update",
    context: "Asset context",
    outcome: "Change review prepared",
    verbs: ["Read the update", "Recall the documents", "Compare the changes"],
    short: "Document versions, issuer updates and the history behind an asset.",
    icon: "layers",
  },
  "physical-ai": {
    title: ["Persistent memory", "for physical AI."],
    agent: "Operations agent",
    task: "Prepare a replacement unit",
    context: "Operational context",
    outcome: "Operator review required",
    verbs: ["Read the handover", "Recover the records", "Validate before use"],
    short: "A proposed memory foundation for robots, devices and fleets.",
    icon: "robot",
  },
};
const href = (slug) => `/use-cases/${slug}`;
const art = (slug) => `/assets/usecase-${slug}.webp`;

function Glyph({ type = "layers", size = 20 }) {
  const shapes = {
    chart: (
      <>
        <path d="M3 3v18h18M6 15l4-5 4 3 6-8M16 5h4v4" />
      </>
    ),
    branch: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="19" r="2" />
        <path d="M6 7v10M8 16c6 0 10-3 10-8" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    robot: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="4" />
        <path d="M12 3v4M1 12v4M23 12v4M8 16h8M8 11v1M16 11v1" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    pause: (
      <>
        <path d="M9 6v12M15 6v12" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    close: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6m-6 0 6-6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[type]}
    </svg>
  );
}

function CaseSwitcher({ item }) {
  return (
    <div className="ucx-switcher">
      <a href="/use-cases">Use cases</a>
      <span aria-hidden="true">/</span>
      <div className="ucx-select-wrap">
        <select
          aria-label="Choose a use case"
          value={item.slug}
          onChange={(event) => {
            window.location.href = href(event.target.value);
          }}
        >
          {useCases.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section
      className="ucx-trust ucx-shell"
      aria-label="Lighthouse builder community"
      data-ucx-reveal
    >
      <div>
        <strong>34,000</strong>
        <span>Builders on Lighthouse</span>
      </div>
      <p>
        Saved context.
        <br />
        <span>Available to connected applications.</span>
      </p>
    </section>
  );
}

function MemoryDemo({ item, reducedMotion }) {
  const d = usecaseDetails[item.slug],
    p = presentation[item.slug];
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef(null),
    tabRefs = useRef([]);
  const running = !paused && !reducedMotion && inView;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setStage((s) => (s + 1) % 3), 6500);
    return () => clearTimeout(timer);
  }, [running, stage]);
  function selectStage(index) {
    setStage(index);
    setPaused(true);
  }
  function onKeys(event, index) {
    const keys = {
      ArrowRight: (index + 1) % 3,
      ArrowLeft: (index + 2) % 3,
      Home: 0,
      End: 2,
    };
    if (keys[event.key] === undefined) return;
    event.preventDefault();
    selectStage(keys[event.key]);
    tabRefs.current[keys[event.key]]?.focus();
  }
  return (
    <div
      className={`ucx-demo ucx-demo-stage-${stage} ${running ? "ucx-demo-running" : ""}`}
      ref={root}
      id="memory-example"
    >
      <div className="ucx-demo-top">
        <span>
          <i aria-hidden="true" />{" "}
          {item.planned ? "PROPOSED WORKFLOW" : "WORKFLOW EXAMPLE"}
        </span>
        <span>{item.name}</span>
      </div>
      <div
        className="ucx-demo-body"
        role="tabpanel"
        id="ucx-demo-panel"
        aria-labelledby={`ucx-demo-tab-${stage}`}
        tabIndex={0}
      >
        <div className="ucx-chat">
          <div className="ucx-agent">
            <span className="ucx-agent-icon">
              <Glyph type={p.icon} />
            </span>
            <div>
              <strong>{p.agent}</strong>
              <small>{p.task}</small>
            </div>
            <span className="ucx-agent-dots" aria-hidden="true">
              ···
            </span>
          </div>
          <div className="ucx-user-message">
            <span>REQUEST</span>
            <p>{d.prompt}</p>
          </div>
          <div
            className={`ucx-agent-message ${stage === 2 ? "ucx-response-ready" : ""}`}
          >
            <img
              src="/assets/lighthouse-mark.svg"
              alt=""
              width="22"
              height="29"
            />
            <div>
              <span>
                {stage === 2
                  ? p.outcome
                  : stage === 1
                    ? "Recalling relevant context"
                    : "Context starts here"}
              </span>
              <p key={stage}>
                {stage === 2
                  ? d.response
                  : stage === 1
                    ? `Bringing ${p.context.toLowerCase()} into this session.`
                    : "The next response starts with what your agent already knows."}
              </p>
              {stage < 2 && (
                <div className="ucx-thinking" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ucx-connector" aria-hidden="true">
          <div className="ucx-connector-line" />
          <div className="ucx-connector-core">
            <Glyph type={stage === 2 ? "check" : "layers"} size={19} />
          </div>
          <div className="ucx-connector-line" />
        </div>
        <div className="ucx-memory">
          <div className="ucx-memory-heading">
            <span className="ucx-kicker">LIGHTHOUSE MEMORY</span>
            <span className="ucx-memory-count">03 RECORDS</span>
          </div>
          <h3>{p.context}</h3>
          <div className="ucx-memory-records">
            {d.memories.map(([title, body], i) => (
              <article
                key={title}
                style={{ "--ucx-record-delay": `${i * 140}ms` }}
              >
                <div>
                  <span className="ucx-record-icon">
                    <Glyph type={stage > 0 ? "check" : "layers"} size={14} />
                  </span>
                  <h4>{title}</h4>
                  <span className="ucx-record-number">0{i + 1}</span>
                </div>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="ucx-memory-status">
            <span aria-hidden="true" />
            {stage === 0
              ? "Context available to recall"
              : stage === 1
                ? "Relevant records recalled"
                : "Context carried into the response"}
          </div>
        </div>
      </div>
      <div className="ucx-demo-controls">
        <div
          className="ucx-demo-tabs"
          role="tablist"
          aria-label="Memory workflow stages"
        >
          {p.verbs.map((label, i) => (
            <button
              key={label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`ucx-demo-tab-${i}`}
              role="tab"
              aria-selected={stage === i}
              aria-controls="ucx-demo-panel"
              tabIndex={stage === i ? 0 : -1}
              onClick={() => selectStage(i)}
              onKeyDown={(event) => onKeys(event, i)}
            >
              <span>0{i + 1}</span>
              <strong>{label}</strong>
              {stage === i && (
                <i
                  key={`${stage}-${running}`}
                  className="ucx-stage-progress"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
        {!reducedMotion && (
          <button
            className="ucx-play-toggle"
            aria-label={
              paused ? "Play workflow animation" : "Pause workflow animation"
            }
            onClick={() => setPaused((value) => !value)}
          >
            <Glyph type={paused ? "play" : "pause"} size={15} />
          </button>
        )}
      </div>
      <p className="ucx-demo-note">
        {item.planned
          ? "Reference scenario for a planned integration. An operator validates recovered records before use."
          : "Example inputs and responses showing how memory fits into this workflow."}
      </p>
    </div>
  );
}

function FeatureVisual({ records, index }) {
  if (index === 1)
    return (
      <div className="ucx-feature-visual ucx-recall-visual" aria-hidden="true">
        <div className="ucx-orbit">
          <span />
          <span />
        </div>
        <div className="ucx-recall-core">
          <img
            src="/assets/lighthouse-mark.svg"
            alt=""
            width="29"
            height="38"
          />
        </div>
        {records.map((record, i) => (
          <div key={record} className={`ucx-recall-tag ucx-tag-${i}`}>
            <i />
            {record}
          </div>
        ))}
      </div>
    );
  if (index === 2)
    return (
      <div
        className="ucx-feature-visual ucx-timeline-visual"
        aria-hidden="true"
      >
        {records.map((record, i) => (
          <div key={record}>
            <span className="ucx-timeline-dot" />
            <span>0{i + 1}</span>
            <strong>{record}</strong>
            <Glyph type="check" size={14} />
          </div>
        ))}
      </div>
    );
  if (index === 3)
    return (
      <div className="ucx-feature-visual ucx-scope-visual" aria-hidden="true">
        <div className="ucx-scope-source">
          <Glyph type="layers" size={22} />
          <span>Shared context</span>
        </div>
        <div className="ucx-scope-nodes">
          {records.map((record) => (
            <div key={record}>
              <i />
              <span>{record}</span>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="ucx-feature-visual ucx-stack-visual" aria-hidden="true">
      {records.map((record, i) => (
        <div key={record} style={{ "--ucx-stack-index": i }}>
          <Glyph type="layers" size={16} />
          <span>{record}</span>
          <i />
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ label, first, second, description }) {
  return (
    <div className="ucx-section-title" data-ucx-reveal>
      <span className="ucx-pill">{label}</span>
      <h2>
        {first}
        {second && (
          <>
            <br />
            <span>{second}</span>
          </>
        )}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Closing({ item }) {
  return (
    <section className="ucx-closing ucx-shell" data-ucx-reveal>
      <div>
        <span className="ucx-kicker">BUILD WITH LIGHTHOUSE</span>
        <h2>
          {item ? (
            usecaseDetails[item.slug].cta
          ) : (
            <>
              Start with the SDK.
              <br />
              <span>Connect through MCP.</span>
            </>
          )}
        </h2>
        <div className="ucx-actions">
          <a
            className="ucx-button"
            href={
              item?.planned
                ? "mailto:mail@lighthouse.storage"
                : "https://docs.lighthouse.storage/memory/intro"
            }
          >
            {item?.planned ? "Discuss your use case" : "Read the memory docs"}
          </a>
          {!item?.planned && (
            <a className="ucx-text-link" href="mailto:mail@lighthouse.storage">
              Talk to our team
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function CaseDirectory() {
  return (
    <>
      <section className="ucx-directory-hero ucx-shell">
        <span className="ucx-pill">AI AGENT MEMORY USE CASES</span>
        <h1>
          What an agent’s brain
          <br />
          <span>can remember.</span>
        </h1>
        <p>
          Give your agent lasting context for research, decisions and
          operations.
          <br />
          See what to save, how to retrieve it and where to start.
        </p>
        <div className="ucx-directory-links">
          {useCases.map((c) => (
            <a key={c.slug} href={href(c.slug)}>
              <Glyph type={presentation[c.slug].icon} size={15} />
              {c.name}
            </a>
          ))}
        </div>
      </section>
      <section
        className="ucx-case-grid ucx-shell"
        aria-label="Explore Lighthouse use cases"
      >
        {useCases.map((c) => (
          <a
            className="ucx-case-card"
            href={href(c.slug)}
            id={`case-${c.slug}`}
            key={c.slug}
            data-ucx-reveal
          >
            <div className="ucx-card-top">
              <span className="ucx-kicker">
                {c.number} / {c.name}
              </span>
            </div>
            <div className="ucx-card-art">
              <img
                src={art(c.slug)}
                alt=""
                width="1024"
                height="1024"
                loading="lazy"
              />
              <span className="ucx-art-orbit" />
              <div className="ucx-art-caption">
                <span />
                <span>
                  {c.planned
                    ? "Proposed reference integration"
                    : "Example agent workflow"}
                </span>
              </div>
            </div>
            <div className="ucx-card-copy">
              <h2>
                {c.lead}
                <br />
                <span>{c.headline}</span>
              </h2>
              <p>{presentation[c.slug].short}</p>
              <span className="ucx-card-cta">Explore the workflow</span>
            </div>
          </a>
        ))}
      </section>
      <TrustStrip />
      <section className="ucx-directory-foundation ucx-shell" data-ucx-reveal>
        <div>
          <span className="ucx-kicker">SAVE, RETRIEVE, REVIEW</span>
          <h2>
            Three steps.
            <br />
            <span>A record to return to.</span>
          </h2>
        </div>
        <div>
          {[
            [
              "01",
              "Remember",
              "Keep useful observations, decisions and source references.",
            ],
            ["02", "Recall", "Bring relevant context into the next session."],
            ["03", "Review", "Trace the records behind a response."],
          ].map(([n, t, b]) => (
            <article key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}

export function CaseDetail({ item, reducedMotion }) {
  const d = usecaseDetails[item.slug],
    p = presentation[item.slug];
  return (
    <>
      <section className="ucx-detail-hero ucx-shell">
        <CaseSwitcher item={item} />
        <h1>
          {p.title[0]}
          <br />
          <span>{p.title[1]}</span>
        </h1>
        <p className="ucx-hero-copy">{item.description}</p>
        <div className="ucx-actions">
          <a
            className="ucx-button"
            href={
              item.planned
                ? "mailto:mail@lighthouse.storage"
                : "https://docs.lighthouse.storage/memory/intro"
            }
          >
            {item.planned
              ? "Plan your integration"
              : "Read the integration docs"}{" "}
          </a>
          <a className="ucx-text-link" href="#memory-example">
            View the workflow example
          </a>
        </div>
        {item.planned && (
          <span className="ucx-planned">Planned reference integration</span>
        )}
        <MemoryDemo item={item} reducedMotion={reducedMotion} />
      </section>
      <TrustStrip />
      <nav className="ucx-local-nav" aria-label="On this page">
        <a href="#problems">The problem</a>
        <a href="#capabilities">With memory</a>
        <a href="#workflow">The workflow</a>
        <a href="#questions">Questions</a>
      </nav>
      <section className="ucx-section ucx-shell" id="problems">
        <SectionTitle
          label="THE PROBLEM"
          first="What gets lost"
          second="between sessions."
        />
        <div className="ucx-problem-grid">
          {d.problems.map(([title, body], i) => (
            <article key={title} data-ucx-reveal>
              <div className="ucx-problem-icon">
                <Glyph type="close" size={20} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <div
                className={`ucx-fragment-art ucx-fragment-${i}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
                <span />
              </div>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="ucx-section ucx-shell" id="capabilities">
        <SectionTitle
          label={item.planned ? "THE PROPOSED FOUNDATION" : "WITH LIGHTHOUSE"}
          first="What an agent’s brain"
          second={item.planned ? "could remember." : "can remember."}
          description={d.intro}
        />
        <div className="ucx-features">
          {d.features.map(([title, body, label, records], i) => (
            <article key={title} data-ucx-reveal>
              <span className="ucx-kicker">
                0{i + 1} / {label}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              <FeatureVisual records={records} index={i} />
            </article>
          ))}
        </div>
      </section>
      <section className="ucx-workflow ucx-shell" id="workflow">
        <div data-ucx-reveal>
          <span className="ucx-pill">
            {item.planned ? "PROPOSED WORKFLOW" : "THE WORKFLOW"}
          </span>
          <h2>
            How the workflow
            <br />
            <span>uses memory.</span>
          </h2>
          <p>{d.title}</p>
          <img
            src={art(item.slug)}
            alt=""
            width="1024"
            height="1024"
            loading="lazy"
          />
        </div>
        <ol>
          {d.workflow.map(([title, body], i) => (
            <li key={title} data-ucx-reveal>
              <span className="ucx-step-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="ucx-boundary-note ucx-shell">
        <span>WHAT LIGHTHOUSE PROVIDES</span>
        <p>{item.note}</p>
      </div>
      <section className="ucx-integration ucx-shell" data-ucx-reveal>
        <div>
          <span className="ucx-kicker">IMPLEMENTATION</span>
          <h2>
            Set up the records.
            <br />
            <span>Connect your application.</span>
          </h2>
          <p>
            Choose what to store, how to retrieve it and which checks your
            application must perform.
          </p>
          {!item.planned && (
            <a
              href="https://docs.lighthouse.storage/memory/intro"
              className="ucx-text-link"
            >
              Read the memory docs
            </a>
          )}
        </div>
        <div className="ucx-integration-list">
          {d.build.map((text, i) => (
            <div key={text}>
              <span>0{i + 1}</span>
              <p>{text}</p>
              <Glyph type="check" size={16} />
            </div>
          ))}
        </div>
      </section>
      <section className="ucx-questions ucx-shell" id="questions">
        <div data-ucx-reveal>
          <span className="ucx-kicker">COMMON QUESTIONS</span>
          <h2>
            Before
            <br />
            <span>you build.</span>
          </h2>
        </div>
        <div className="ucx-accordion">
          {d.faqs.map(([q, a]) => (
            <details name="ucx-faq" key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="ucx-related ucx-shell">
        <div className="ucx-related-heading">
          <span className="ucx-kicker">RELATED USE CASES</span>
          <a href="/use-cases" className="ucx-text-link">
            All use cases
          </a>
        </div>
        <div>
          {useCases
            .filter((c) => c.slug !== item.slug)
            .map((c) => (
              <a href={href(c.slug)} key={c.slug} data-ucx-reveal>
                <img
                  src={art(c.slug)}
                  alt=""
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
                <div>
                  <span>{c.name}</span>
                </div>
              </a>
            ))}
        </div>
      </section>
      <Closing item={item} />
    </>
  );
}
