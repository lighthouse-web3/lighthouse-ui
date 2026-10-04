export default function ClosingCTA() {
  return (
    <section className="closing section reveal">
      <div className="closing-glow" aria-hidden="true"></div>
      <img
        className="tubry wave-tubry"
        src="/assets/tubry-wave.webp"
        alt="Tubry waving over the edge of the Lighthouse panel"
        width="550"
        height="550"
        loading="lazy"
      />
      <span className="eyebrow">START WITH LIGHTHOUSE MEMORY</span>
      <h2>
        Give your agent a brain.
        <br />
        <span>Start with one memory.</span>
      </h2>
      <div className="hero-actions">
        {/* Changed from the design drop, which led with the quick start and
            sent "Talk to us" to a mailto. The contact form is the same one
            the footer's "Contact us" opens. */}
        <a
          className="button primary"
          href="https://airtable.com/shrPFC2TgojuOAYO4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Talk to us
        </a>
        <a
          className="text-link"
          href="https://docs.lighthouse.storage/memory/quick-start"
          target="_blank"
          rel="noopener"
        >
          Open the quick start
        </a>
      </div>
    </section>
  );
}
