import { useReducedMotion } from "../hooks/useReducedMotion";

const investors = [
  ["Balaji Srinivasan", "balaji-srinivasan", "https://cryptorank.io/funds/balaji-srinivasan/rounds"],
  ["Protocol Labs", "protocol-labs", "https://cryptorank.io/funds/protocol-labs/rounds"],
  ["Big Brain Holdings", "big-brain-holdings", "https://cryptorank.io/funds/big-brain-holdings/rounds"],
  ["LongHash Ventures", "longhash-ventures", "https://cryptorank.io/funds/longhashvc/rounds"],
  ["Fenbushi Capital", "fenbushi-capital", "https://cryptorank.io/funds/fenbushi-capital/rounds"],
  ["NGC Ventures", "ngc-ventures", "https://cryptorank.io/funds/ngc-ventures/rounds"],
  ["Walrus Foundation", "walrus", "https://walrus.xyz/about/"],
  ["Mask Network", "mask-network", "https://cryptorank.io/funds/mask-network/rounds"],
  ["HASH CIB", "hashcib", "https://cryptorank.io/funds/hash-cib/rounds"],
];

export default function Investors({ hero = false }) {
  const reducedMotion = useReducedMotion();
  return <section className={`investors ${hero ? "hero-investors" : ""} ${reducedMotion ? "investors-reduced" : ""}`} aria-labelledby="investors-heading">
    <svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}><defs><filter id="investor-white" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.2126 -.7152 -.0722 0 1"/><feComposite in2="SourceAlpha" operator="in"/></filter><filter id="investor-white-light" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 0"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs></svg>
    <div className="investors-top"><h2 id="investors-heading">BACKED BY</h2></div>
    <div className="investors-layout">
      <div className="investor-window" role="region" aria-label="Lighthouse investors" tabIndex="0">
        <div className="investor-track">{[0,1].map(copy => <ul className="investor-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{investors.map(([name,slug,url]) => <li key={slug}><a className={`investor-logo investor-${slug} ${slug === "balaji-srinivasan" ? "investor-balaji" : ""} ${slug === "walrus" ? "investor-walrus" : ""}`} href={url} target="_blank" rel="noopener noreferrer" tabIndex={copy === 1 ? -1 : 0}>
          {slug !== "balaji-srinivasan" && <img src={`/assets/investors/${slug}.${slug === "walrus" ? "svg" : ["big-brain-holdings", "fenbushi-capital"].includes(slug) ? "webp" : "png"}`} width={slug === "walrus" ? 100 : 40} height="40" alt={slug === "walrus" ? name : ""} loading={hero ? "eager" : "lazy"} />}
          {slug !== "walrus" && <span>{name}</span>}
        </a></li>)}</ul>)}</div>
      </div>
    </div>
  </section>;
}
