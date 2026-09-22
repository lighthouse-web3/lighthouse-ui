export default function Footer() {
  return (
    <footer>
      <div className="footer-top reveal">
        <a className="brand" href="/" aria-label="Lighthouse home">
          <img
            className="brand-logo"
            src="/memory/lighthouse-logo.svg"
            alt="Lighthouse"
            width="218"
            height="66"
          />
        </a>
        <p>The verifiable memory layer for AI agents.</p>
        <div>
          <a
            href="https://docs.lighthouse.storage/"
            target="_blank"
            rel="noopener"
          >
            Documentation ↗
          </a>
          <a href="/storage">Lighthouse Storage ↗</a>
          <a href="mailto:mail@lighthouse.storage">Contact ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lighthouse Storage</span>
        <a href="/#home">Back to top ↑</a>
      </div>
      <div className="footer-word reveal" aria-hidden="true">
        LIGHTHOUSE
      </div>
    </footer>
  );
}
