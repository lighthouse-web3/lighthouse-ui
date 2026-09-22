import { MdArrowOutward } from "react-icons/md";
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-backdrop" id="hero-video" aria-hidden="true">
        <video
          className="hero-film"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/memory/lighthouse-hero-poster.jpg"
        >
          <source src="/memory/lighthouse-hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="video-film-overlay"></div>
        <div className="hero-grain"></div>
      </div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-intro">
        <h1>
          Give every agent
          <br />
          <span>a persistent brain.</span>
        </h1>
        <p className="hero-copy">
          One verifiable memory layer for the context your agents need to remember,
          carry and build on.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#memory">
            Explore shared memory <MdArrowOutward />
          </a>
          <a
            className="text-link"
            href="https://docs.lighthouse.storage/memory/intro"
            target="_blank"
            rel="noopener"
          >
            Build on Lighthouse <MdArrowOutward />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <span>
          <i></i>PERSISTENT CONTEXT
        </span>
        <span>
          <i></i>PORTABLE ACROSS AGENTS
        </span>
        <span>
          <i></i>VERIFIABLE BY DESIGN
        </span>
      </div>
      <a
        className="video-explore"
        href="#memory"
        aria-label="Explore the memory network"
      >
        ↓
      </a>
    </section>
  );
}
