import { useRef, useState } from "react";
import { clients } from "../data/clients";
const examples = [
  {
    id: "sdk",
    label: "Memory SDK",
    icon: "code",
    file: "memory.mjs",
    language: "Node.js",
    install:
      "npm install @lighthouse-ai/core @lighthouse-ai/engine-batched @lighthouse-ai/store-lighthouse @lighthouse-ai/embed-local",
    code: `import { createStorage, createEmbedder } from '@lighthouse-ai/core';
import { BatchedEngine } from '@lighthouse-ai/engine-batched';
import '@lighthouse-ai/store-lighthouse';
import '@lighthouse-ai/embed-local';

// Connect your agent to persistent memory.
const memory = new BatchedEngine(
  await createStorage('lh-ipfs-filecoin', {
    apiKey: process.env.LIGHTHOUSE_API_KEY,
  }),
  { namespace: 'my-agent', embedder: await createEmbedder('local') }
);

// Save context and persist it to the network.
await memory.remember('Our project uses TypeScript.', {
  tags: ['project'],
});
await memory.flush();

// Retrieve the context when your agent needs it.
const context = await memory.recall('What language do we use?');
console.log(context);`,
    note: "Set LIGHTHOUSE_API_KEY in your environment. This example stores public, unencrypted memory.",
    docs: "https://docs.lighthouse.storage/memory/sdk/overview",
  },
  {
    id: "mcp",
    label: "MCP connection",
    icon: "connect",
    file: "mcp.json",
    language: "MCP config",
    code: `{
  "mcpServers": {
    "lighthouse-memory": {
      "type": "http",
      "url": "https://memory-api.lighthouse.storage/mcp",
      "headers": {
        "Authorization": "Bearer <CLERK_JWT>"
      }
    }
  }
}`,
    note: "For clients that support HTTP MCP. Replace <CLERK_JWT> with your Lighthouse session token; follow the guide for your client.",
    docs: "https://docs.lighthouse.storage/memory/mcp/overview",
  },
  {
    id: "private",
    label: "Encrypted memory",
    icon: "lock",
    file: "private-memory.mjs",
    language: "Node.js",
    install: "npm install @lighthouse-ai/engine-memwal",
    code: `import { MemwalMemory } from '@lighthouse-ai/engine-memwal';

// Load your Walrus memory configuration.
// Set MEMWAL_PRIVATE_KEY and MEMWAL_ACCOUNT_ID.
// Set MEMWAL_IPFS_PIN=off to disable public mirrors.
const memory = await MemwalMemory.fromEnv();

// Store context with SEAL encryption on Walrus.
await memory.remember('Our launch review is on Friday.', {
  tags: ['project', 'schedule'],
});

// Recall relevant context for the next conversation.
const context = await memory.recall('When is the launch review?');
console.log(context);`,
    note: "Memwal encrypts Walrus blobs with SEAL. Set MEMWAL_IPFS_PIN=off to disable public IPFS mirrors; index snapshots remain unencrypted. Configure your Memwal credentials first.",
    docs: "https://docs.lighthouse.storage/memory/sdk/engine-memwal",
  },
];

function Icon({ type }) {
  const paths = {
    code: (
      <>
        <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
      </>
    ),
    connect: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="2" />
        <rect x="15" y="15" width="6" height="6" rx="2" />
        <path d="M6 9v6a3 3 0 0 0 3 3h6M15 6h3v3" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </>
    ),
  };
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function Highlight({ line }) {
  if (line.trimStart().startsWith("//"))
    return <span className="build-code-comment">{line}</span>;
  return line
    .split(
      /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b(?:import|from|const|await|new)\b)/g,
    )
    .map((part, i) => (
      <span
        key={i}
        className={
          /^["']/.test(part)
            ? "build-code-string"
            : /^(import|from|const|await|new)$/.test(part)
              ? "build-code-keyword"
              : undefined
        }
      >
        {part}
      </span>
    ));
}

function ClientCarousel() {
  if (!clients.length) return null;
  const repeated = Array.from(
    { length: Math.max(1, Math.ceil(7 / clients.length)) },
    () => clients,
  ).flat();
  return (
    <div
      className="client-carousel"
      role="region"
      aria-label="Teams building on Lighthouse"
      tabIndex={0}
    >
      <div className="client-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="client-group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {repeated.map((client, index) => (
              <li key={`${client.name}-${index}`}>
                <span
                  className="client-logo"
                  aria-hidden={index >= clients.length ? true : undefined}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                  />
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function BuildWithLighthouse() {
  const [selected, setSelected] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  const tabs = useRef([]);
  const example = examples[selected];
  function choose(index) {
    setSelected(index);
    setCopyStatus("");
  }
  function moveTab(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % examples.length;
    if (event.key === "ArrowLeft")
      next = (index + examples.length - 1) % examples.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = examples.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }
  async function copyCode() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(example.code);
      } else {
        const focused = document.activeElement;
        const field = document.createElement("textarea");
        field.value = example.code;
        field.setAttribute("readonly", "");
        field.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        focused?.focus({ preventScroll: true });
        if (!copied) throw new Error("Copy unavailable");
      }
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Select the code to copy");
    }
  }
  return (
    <section
      className="build-section build-section-split section"
      id="build"
      aria-labelledby="build-title"
    >
      <div className="build-heading reveal">
        <span className="eyebrow">02 / BUILD YOUR AGENT’S BRAIN</span>
        <h2 id="build-title">
          Add memory
          <br />
          <span>to your application.</span>
        </h2>
        <p>
          Use the SDK in your code, connect an MCP client, or choose encrypted
          memory on Walrus. Start with the setup that fits your application.
        </p>
      </div>
      <div className="build-split-layout">
        <div className="build-workspace reveal">
          <div
            className="build-tabs"
            role="tablist"
            aria-label="Lighthouse integration options"
          >
            {examples.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                role="tab"
                id={`build-tab-${item.id}`}
                aria-controls={`build-panel-${item.id}`}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={(event) => moveTab(event, index)}
              >
                <Icon type={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
          <div
            className="build-editor"
            role="tabpanel"
            id={`build-panel-${example.id}`}
            aria-labelledby={`build-tab-${example.id}`}
            tabIndex="0"
          >
            <div className="build-editor-bar">
              <span className="build-window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="build-filename">{example.file}</span>
              <span className="build-language">{example.language}</span>
              <button
                className="build-copy"
                onClick={copyCode}
                aria-label="Copy code"
              >
                <Icon type="copy" />
                <span>{copyStatus || "Copy"}</span>
              </button>
              <span className="build-sr-only" role="status">
                {copyStatus}
              </span>
            </div>
            {example.install && (
              <div className="build-install">
                <span aria-hidden="true">$</span>
                <code>{example.install}</code>
              </div>
            )}
            <div className="build-code-scroll" key={example.id}>
              <pre>
                <code>
                  {example.code.split("\n").map((line, index) => (
                    <span className="build-code-line" key={index}>
                      <span className="build-line-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span>
                        <Highlight line={line} />
                        {"\n"}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <div className="build-editor-foot">
              <p>{example.note}</p>
              <a href={example.docs} target="_blank" rel="noopener noreferrer">
                Read the guide
              </a>
            </div>
          </div>
        </div>
        <aside
          className="builders-community reveal"
          id="builders"
          aria-label="Lighthouse network metrics"
        >
          <span className="build-proof-label">
            <span aria-hidden="true" /> The network in numbers
          </span>
          <div className="builders-metrics">
            <h3>
              <strong>34,000</strong>
              <span>Builders on Lighthouse</span>
            </h3>
            <h3>
              <strong>50 TiB</strong>
              <span>Data stored across the network</span>
            </h3>
          </div>
        </aside>
      </div>
      <div className="build-client-proof reveal">
        <span className="build-client-label">Built on Lighthouse</span>
        <ClientCarousel />
      </div>
    </section>
  );
}
