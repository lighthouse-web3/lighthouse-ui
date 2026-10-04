import LinkArrow from "./LinkArrow";
import { useState } from "react";

export default function MemoryConsole({
  agent,
  agents,
  onSelectAgent,
  memory,
  status,
  onSave,
}) {
  const [draft, setDraft] = useState(
    "Keep my answers concise. Use British English.",
  );
  const title =
    status === "saved"
      ? "Memory saved to the Lighthouse demo."
      : memory
        ? `Shared memory in the ${agent.name} demo.`
        : `${agent.name} selected for this demo.`;
  const detail =
    status === "saved"
      ? `Now choose another agent to retrieve: “${memory.text}”`
      : memory
        ? `“${memory.text}” · Saved via ${memory.writer} in this demo.`
        : "Sample text stays in this page. Save it, then select another agent.";

  function submit(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.memory;
    input.setCustomValidity(draft.trim() ? "" : "Add a memory first.");
    if (!input.reportValidity()) return;
    onSave(draft.trim());
  }

  return (
    <div className="memory-console">
      <div className="console-title">
        <span className="small-icon">
          <img
            src={agent.logo}
            alt={`${agent.name} logo`}
            width="28"
            height="28"
          />
        </span>
        <div className="agent-select-field">
          <label className="overline" htmlFor="memory-agent">
            Selected agent
          </label>
          <div className="agent-select-wrap">
            <select
              id="memory-agent"
              name="agent"
              value={agent.id}
              onChange={(event) => onSelectAgent(event.target.value)}
            >
              {agents.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <form onSubmit={submit}>
        <label htmlFor="memory-input">What should your agents remember?</label>
        <div className="input-row">
          <input
            id="memory-input"
            name="memory"
            maxLength={180}
            value={draft}
            autoComplete="off"
            onChange={(event) => {
              setDraft(event.target.value);
              event.target.setCustomValidity("");
            }}
          />
          <button className="button primary" type="submit">
            {status === "saved" ? (
              "Saved ✓"
            ) : (
              <>
                Save memory <LinkArrow />
              </>
            )}
          </button>
        </div>
      </form>
      <div className="memory-result" aria-live="polite">
        <span className="result-check">✓</span>
        <div>
          <span>{title}</span>
          <p>{detail}</p>
        </div>
      </div>
    </div>
  );
}
