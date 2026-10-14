import { useState } from "react";
import { allocations, tokenFacts } from "../data/tokenEconomy";

// Each slice spans its share of the circle. The design drop drew five equal
// slices while every share was TBD.
const slices = allocations.reduce((list, a) => {
  const start = list.length ? list[list.length - 1].end : 0;
  return [...list, { start, end: start + (a.share / 100) * 360 }];
}, []);

const formatShare = (share) => `${share}%`;
const tokenCount = (share) =>
  Math.round((share / 100) * tokenFacts.totalSupply).toLocaleString("en-GB");

const polar = (radius, angle) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return [180 + radius * Math.cos(radians), 180 + radius * Math.sin(radians)];
};

function segment(index) {
  const start = slices[index].start + 3;
  const end = slices[index].end - 3;
  const large = end - start > 180 ? 1 : 0;
  const a = polar(142, start),
    b = polar(142, end);
  const c = polar(100, end),
    d = polar(100, start);
  return `M ${a} A 142 142 0 ${large} 1 ${b} L ${c} A 100 100 0 ${large} 0 ${d} Z`;
}

export default function TokenAllocation() {
  const [active, setActive] = useState(0);
  const item = allocations[active];
  return (
    <div className="allocation-composition">
      <figure className="allocation-figure">
        <div className="allocation-orbit" aria-hidden="true">
          <svg viewBox="0 0 360 375" className="allocation-pie">
            <defs>
              {allocations.map((a, i) => (
                <linearGradient
                  key={a.name}
                  id={`allocation-metal-${i}`}
                  x1="0"
                  y1="0"
                  x2=".8"
                  y2="1"
                >
                  <stop stopColor={a.color} offset="0" />
                  <stop stopColor={a.color} offset=".56" />
                  <stop stopColor="#463855" offset="1" />
                </linearGradient>
              ))}
            </defs>
            <circle cx="180" cy="180" r="162" className="allocation-guide" />
            <circle
              cx="180"
              cy="180"
              r="90"
              className="allocation-inner-guide"
            />
            <g transform="translate(0 10)" className="allocation-pie-depth">
              {allocations.map((a, i) => (
                <path key={a.name} d={segment(i)} fill={a.color} />
              ))}
            </g>
            {allocations.map((a, i) => {
              const middle = (slices[i].start + slices[i].end) / 2;
              const angle = ((middle - 90) * Math.PI) / 180;
              const selected = active === i;
              return (
                <path
                  key={a.name}
                  d={segment(i)}
                  fill={`url(#allocation-metal-${i})`}
                  className="allocation-slice"
                  data-active={selected}
                  style={{
                    transform: selected
                      ? `translate(${Math.cos(angle) * 5}px, ${Math.sin(angle) * 5}px)`
                      : "translate(0,0)",
                  }}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
              );
            })}
          </svg>
          <div className="allocation-centre">
            <span>Allocation</span>
            <strong>{formatShare(item.share)}</strong>
            <i style={{ background: item.color }} />
          </div>
        </div>
        <div className="allocation-selection" aria-live="polite">
          <span style={{ color: item.color }}>{item.name}</span>
          <p>
            {tokenCount(item.share)} tokens of {tokenFacts.totalSupplyLabel}{" "}
            total supply
          </p>
        </div>
      </figure>
      <div
        className="allocation-key"
        aria-label={`Allocation of the ${tokenFacts.totalSupplyLabel} total supply by category`}
      >
        <div className="allocation-key-heading">
          <span>Category</span>
          <span>Share</span>
        </div>
        {allocations.map((a, i) => (
          <button
            key={a.name}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onPointerEnter={() => setActive(i)}
            style={{ "--allocation-color": a.color }}
          >
            <i aria-hidden="true" />
            <span>{a.name}</span>
            <strong>{formatShare(a.share)}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
