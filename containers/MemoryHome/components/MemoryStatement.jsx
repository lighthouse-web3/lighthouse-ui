export default function MemoryStatement() {
  return (
    <section className="statement section">
      <span className="eyebrow reveal">CONTEXT SHOULDN’T START OVER.</span>
      <h2 className="reveal">
        New agent.
        <br />
        Same <span className="shine">understanding.</span>
      </h2>
      <p className="reveal">
        Ideas, preferences, decisions. They belong with you.
        <br />
        Lighthouse gives your agents a shared place to remember.
      </p>
      <div className="tubry-handoff">
        <span className="handoff-orbit orbit-one" aria-hidden="true"></span>
        <span className="handoff-orbit orbit-two" aria-hidden="true"></span>
        <img
          src="/memory/tubry-orb.png"
          alt="Tubry sitting with a glowing memory orb, fully visible from head to feet"
          width="700"
          height="770"
          loading="lazy"
        />
      </div>
    </section>
  );
}
