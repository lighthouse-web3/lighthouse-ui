import { MdArrowOutward } from "react-icons/md";
export default function ClosingCTA() {
  return (
    <section className="closing section reveal">
      <div className="closing-glow" aria-hidden="true"></div>
      <img
        className="tubry wave-tubry"
        src="/memory/tubry-wave.png"
        alt="Tubry waving over the edge of the Lighthouse panel"
        width="550"
        height="550"
        loading="lazy"
      />
      <span className="eyebrow">EVERY GOOD IDEA DESERVES A MEMORY.</span>
      <h2>
        Your next agent.
        <br />
        <span>Already up to speed.</span>
      </h2>
      <div className="hero-actions">
        <a
          className="button primary"
          href="https://docs.lighthouse.storage/"
          target="_blank"
          rel="noopener"
        >
          Build with Lighthouse <MdArrowOutward />
        </a>
        <a className="text-link" href="mailto:mail@lighthouse.storage">
          Talk to us <MdArrowOutward />
        </a>
      </div>
    </section>
  );
}
