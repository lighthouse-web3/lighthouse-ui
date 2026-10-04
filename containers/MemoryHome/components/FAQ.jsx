import { useState } from "react";
const questions = [
  [
    "What do you mean by a persistent brain?",
    "A persistent brain is the memory your agent can return to across sessions. Lighthouse stores and retrieves the context your application chooses to save. Your AI model handles reasoning and responses; Lighthouse provides the memory behind them.",
  ],
  [
    "How do I connect an agent?",
    <>
      Use the{" "}
      <a href="https://docs.lighthouse.storage/memory/quick-start">
        Memory SDK
      </a>{" "}
      in your application, or connect a supported client through{" "}
      <a href="https://docs.lighthouse.storage/memory/mcp/overview">
        Model Context Protocol (MCP)
      </a>
      . The setup guide covers the connection and credentials each option needs.
    </>,
  ],
  [
    "Can different agents share memory?",
    "Connected agents can use a shared memory backend. Each application needs a supported integration and the right configuration. Switching models alone does not connect their existing chat histories.",
  ],
  [
    "Is every memory encrypted?",
    <>
      No. Batched memory and index snapshots are unencrypted. Memwal encrypts
      its Walrus blobs with SEAL, but optional IPFS mirrors are public. Choose
      the setup before storing sensitive information. See the{" "}
      <a href="https://docs.lighthouse.storage/memory/sdk/engine-memwal">
        encryption details
      </a>
      .
    </>,
  ],
  [
    "What does verifiable memory mean?",
    "Content identifiers, or CIDs, let you check that retrieved records match the saved content. They check content integrity. They do not establish whether a statement is true or an agent’s answer is correct.",
  ],
  [
    "Does forgetting a memory erase the stored data?",
    "Not necessarily. Forgetting and deletion depend on the memory engine. Removing a record from an index does not erase an existing stored blob. Plan retention and deletion for the storage option you use.",
  ],
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section
      className="home-faq section"
      id="faq"
      aria-labelledby="home-faq-title"
    >
      <div className="home-faq-meta">
        <span className="eyebrow">05 / QUESTIONS</span>
        <span>MEMORY AND STORAGE</span>
      </div>
      <div className="home-faq-layout">
        <div className="home-faq-intro">
          <h2 id="home-faq-title">
            Before you
            <br />
            <span>connect.</span>
          </h2>
          <p>How memory works, what is shared and which setup to choose.</p>
        </div>
        <div className="home-faq-list">
          {questions.map(([question, answer], index) => (
            <article
              className={`home-faq-item ${open === index ? "is-open" : ""}`}
              key={question}
            >
              <h3>
                <button
                  id={`faq-question-${index}`}
                  aria-expanded={open === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span className="home-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{question}</span>
                  <svg
                    className="home-faq-chevron"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h3>
              <div
                className="home-faq-answer"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={open !== index}
              >
                <p>{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
