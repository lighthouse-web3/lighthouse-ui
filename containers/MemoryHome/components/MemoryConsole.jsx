import { useState } from "react";

export default function MemoryConsole({ agent, memory, status, onSave }) {
  const [draft, setDraft] = useState(
    "Keep my answers concise. Use British English.",
  );
  const title =
    status === "saved"
      ? "Memory saved to the Lighthouse demo."
      : memory
        ? `${agent.name} can read the shared memory.`
        : `Ready to remember with ${agent.name}.`;
  const detail =
    status === "saved"
      ? `Now choose another agent to retrieve: “${memory.text}”`
      : memory
        ? `“${memory.text}” · Saved via ${memory.writer} in this demo.`
        : "Save a sample memory, then select another agent to retrieve it.";

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
        <span className="small-icon">{agent.symbol}</span>
        <div>
          <span className="overline">SELECTED AGENT</span>
          <strong>{agent.name}</strong>
        </div>
        <span className="demo-pill">Demo session</span>
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
            {status === "saved" ? "Saved ✓" : "Save memory ↗"}
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
