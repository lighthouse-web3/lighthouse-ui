import Investors from "./Investors";
export default function Hero() {
  return (
    <section className="hero hero-with-backers" id="home">
      <div className="hero-backdrop" id="hero-video" aria-hidden="true">
        <video
          className="hero-film"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/lighthouse-hero-poster.jpg"
        >
          <source src="/assets/lighthouse-hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="video-film-overlay"></div>
        <div className="hero-grain"></div>
      </div>
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-intro">
        <h1>
          Give every agent
          <br />
          <span>a persistent brain</span>
        </h1>
        <p className="hero-copy">
          Long-term memory for AI agents. Save project context, preferences and
          decisions, then retrieve what matters in the next session.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="https://memory.lighthouse.storage/">
            Try the memory demo
          </a>
          <a
            className="text-link"
            href="https://docs.lighthouse.storage/memory/quick-start"
            target="_blank"
            rel="noopener"
          >
            Read the quick start
          </a>
        </div>
      </div>
      <Investors hero />
    </section>
  );
}
