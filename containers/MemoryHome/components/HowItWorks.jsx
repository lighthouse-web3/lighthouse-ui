import MemoryPortal from "./MemoryPortal";
export default function HowItWorks({ motionDisabled }) {
  return (
    <section className="continuity section" id="how">
      <div className="continuity-copy reveal">
        <span className="eyebrow">03 / HOW SHARED MEMORY WORKS</span>
        <h2>
          Pick up
          <br />
          where you
          <br />
          <span>left off.</span>
        </h2>
        <p>
          Give your agent a persistent brain through the Memory SDK or a
          supported MCP connection. Save the context you choose and retrieve
          relevant records in later sessions. Each application needs its own
          connection.
        </p>
        <a
          href="https://docs.lighthouse.storage/memory/mcp/overview"
          className="text-link"
        >
          Connect through MCP
        </a>
      </div>
      <MemoryPortal motionDisabled={motionDisabled} />
    </section>
  );
}
