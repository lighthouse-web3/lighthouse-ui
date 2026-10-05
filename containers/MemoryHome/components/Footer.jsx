import { useState } from "react";
export default function Footer() {
  const [notice, setNotice] = useState("");
  function subscribe(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get(
      "memory-newsletter-email",
    );
    window.location.href =
      "mailto:mail@lighthouse.storage?subject=Newsletter%20subscription&body=" +
      encodeURIComponent(
        "Please subscribe me to the Lighthouse newsletter: " + email,
      );
    setNotice("Send the subscription request in your email app.");
  }
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grid reveal">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label="Lighthouse home">
            <img
              className="brand-logo"
              src="/assets/lighthouse-logo.svg"
              alt="Lighthouse"
              width="218"
              height="66"
            />
          </a>
          <p>
            The memory behind your agent’s brain. Built on decentralised
            storage.
          </p>
          <div className="footer-socials">
            <a
              href="https://t.me/LighthouseStorage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
              </svg>
            </a>
            <a
              href="https://discord.com/invite/c4a4CGCdJG"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
              </svg>
            </a>
            <a
              href="https://x.com/lighthouseweb3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/lighthouse-web3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/lighthouseweb3/?igshid=MDM4ZDc5MmU%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </a>
          </div>
          <a className="footer-mail" href="mailto:mail@lighthouse.storage">
            mail@lighthouse.storage
          </a>
        </div>
        <div className="footer-col">
          <h3>Sitemap</h3>
          <a href="/">Memory</a>
          <a href="/storage">Storage</a>
          <a href="/use-cases">Use cases</a>
          <a href="/#faq">FAQs</a>
          <a href="/blogs">Blogs</a>
          <a href="https://docs.lighthouse.storage/">Documentation</a>
          <a
            href="https://docs.lighthouse.storage/memory/intro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Memory docs
          </a>
        </div>
        <div className="footer-col">
          <h3>Help</h3>
          <a
            href="https://airtable.com/shrPFC2TgojuOAYO4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact us
          </a>
          <a
            href="https://explorer.lighthouse.storage/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorer
          </a>
          <a
            href="https://docs.google.com/forms/d/16STP-KPftGBCaF5MjQuXBVBOqShIxScFtuPhCAlQJM8/viewform?ts=64a7c2b5&amp;edit_requested=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report Online Abuse
          </a>
          <a
            href="https://calendly.com/nanditmehra/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
          <a
            href="https://gateway.lighthouse.storage/ipfs/bafkreidx6qtkebzxqjgcei5vhbfsfk2uf7iyaypppgvmhophv7q255x6x4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and conditions
          </a>
        </div>
        <form className="footer-col footer-newsletter" onSubmit={subscribe}>
          <h3>Newsletter</h3>
          <p className="footer-newsletter-status">Request updates by email.</p>
          <input
            required
            aria-label="Email address for newsletter"
            type="email"
            placeholder="user@mail.com"
            id="memory-newsletter-email"
            name="memory-newsletter-email"
            autoComplete="email"
          />
          <button type="submit">Subscribe</button>
          <p className="footer-newsletter-status" role="status">
            {notice}
          </p>
        </form>
      </div>
      <div className="footer-bottom">
        <span>
          © Copyright 2026, All Rights Reserved by Lighthouse Storage
        </span>
        <a href="/#home">Back to top</a>
      </div>
      <div className="footer-word reveal" aria-hidden="true">
        LIGHTHOUSE
      </div>
    </footer>
  );
}
