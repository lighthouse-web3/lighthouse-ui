import { useEffect, useRef } from "react";

const cards = [
  {
    label: "01 / MEMORY",
    title: "Skip the reintroduction.",
    description:
      "Your project brief, preferences and past decisions shouldn’t disappear when a chat ends. Keep the useful context ready for your next agent.",
    meta: "PERSISTENT CONTEXT",
    kind: "memory",
  },
  {
    label: "02 / PROOF",
    title: "Check what comes back.",
    description:
      "Each stored memory has a content identifier. Check that the content you retrieve matches what was saved, with a reference you can trace back to.",
    meta: "VERIFIABLE CONTENT",
    kind: "proof",
  },
  {
    label: "03 / CONTROL",
    title: "The right context. The right agent.",
    description:
      "Share the project brief with your writing agent. Keep personal notes separate. Choose the context each agent gets, instead of handing over everything.",
    meta: "SELECTIVE SHARING",
    kind: "control",
  },
];

function Example({ kind }) {
  if (kind === "memory")
    return (
      <div className="memory-example">
        <div className="example-heading">
          <span>PROJECT CONTEXT</span>
        </div>
        <div className="context-row">
          <span>Brief</span>
          <strong>Launch the new website</strong>
        </div>
        <div className="context-row">
          <span>Voice</span>
          <strong>Clear, direct, human</strong>
        </div>
        <div className="context-row">
          <span>Decision</span>
          <strong>Lead with the product demo</strong>
        </div>
        <div className="example-foot">
          <span className="small-check">✓</span> Ready for the next conversation
        </div>
      </div>
    );
  if (kind === "proof")
    return (
      <div className="memory-example">
        <div className="example-heading">
          <span>CONTENT CHECK</span>
        </div>
        <div className="proof-file">
          <span className="file-symbol">≡</span>
          <div>
            <strong>project-brief.md</strong>
            <span>Saved memory</span>
          </div>
          <span className="proof-badge">✓ Match</span>
        </div>
        <div className="hash-row">
          <span>Stored</span>
          <code>bafy…7k2m</code>
        </div>
        <div className="hash-row">
          <span>Retrieved</span>
          <code>bafy…7k2m</code>
        </div>
        <div className="example-foot">
          Confirms content integrity, not factual accuracy.
        </div>
      </div>
    );
  return (
    <div className="memory-example">
      <div className="example-heading">
        <span>SHARING SCOPE</span>
      </div>
      <div className="scope-row">
        <div>
          <strong>Project brief</strong>
          <span>Writing agent</span>
        </div>
        <span className="scope-tag">Shared</span>
      </div>
      <div className="scope-row">
        <div>
          <strong>Brand guidelines</strong>
          <span>Design agent</span>
        </div>
        <span className="scope-tag">Shared</span>
      </div>
      <div className="scope-row">
        <div>
          <strong>Personal notes</strong>
          <span>Only you</span>
        </div>
        <span className="scope-tag private">Private</span>
      </div>
    </div>
  );
}

export default function Principles({ motionDisabled = false }) {
  const stageRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const cards = [...stage.querySelectorAll(".principle")];
    const origin = stage.querySelector(".beacon-origin");
    const beam = stage.querySelector(".lighthouse-beam");
    let frame = 0,
      angle = null,
      length = null,
      lastTime = 0;
    const update = (time) => {
      frame = 0;
      const bounds = stage.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) {
        lastTime = 0;
        return;
      }
      const lamp = origin.getBoundingClientRect();
      let active = 0,
        nearest = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const distance = Math.abs(r.top + r.height / 2 - innerHeight * 0.54);
        if (distance < nearest) {
          nearest = distance;
          active = i;
        }
      });
      cards.forEach((card, i) =>
        card.classList.toggle("illuminated", i === active),
      );
      stage.dataset.active = active;
      const r = cards[active].getBoundingClientRect();
      const x = lamp.left + lamp.width / 2,
        y = lamp.top + lamp.height / 2;
      const targetX = innerWidth <= 760 ? r.left + r.width / 2 : r.right - 12;
      const dx = targetX - x,
        dy = r.top + r.height / 2 - y;
      const targetAngle = Math.atan2(dy, dx),
        targetLength = Math.hypot(dx, dy);
      if (angle === null || motionDisabled) {
        angle = targetAngle;
        length = targetLength;
      }
      // Follow the shortest arc across ±π; exponential easing is frame-rate independent.
      const delta = Math.atan2(
        Math.sin(targetAngle - angle),
        Math.cos(targetAngle - angle),
      );
      const dt = lastTime ? Math.min(time - lastTime, 40) : 16;
      const ease = 1 - Math.exp(-dt / 150);
      angle += delta * ease;
      length += (targetLength - length) * ease;
      // The beam lives inside the sticky lantern: scroll never changes its origin.
      beam.style.width = `${length + 24}px`;
      beam.style.transform = `rotate(${angle}rad)`;
      lastTime = time;
      if (
        !motionDisabled &&
        (Math.abs(delta) > 0.001 || Math.abs(targetLength - length) > 0.5)
      )
        frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const img = stage.querySelector("img");
    img.addEventListener("load", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      img.removeEventListener("load", schedule);
    };
  }, [motionDisabled]);

  return (
    <section
      className={`principles section ${motionDisabled ? "beacon-still" : ""}`}
      id="foundation"
    >
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">03 / A FOUNDATION YOU CAN TRUST</span>
          <h2>
            More context.
            <br />
            <span>Less starting over.</span>
          </h2>
        </div>
        <p>
          Built on Lighthouse’s decentralized storage.
          <br />
          Keep it. Verify it. Choose where it goes.
        </p>
      </div>
      <div className="lighthouse-stage" ref={stageRef}>
        <div className="lighthouse-watch" aria-hidden="true">
          <div className="lighthouse-sculpture">
            <img
              src="/memory/lighthouse-glass.png"
              alt=""
              width="1024"
              height="1536"
            />
            <div className="beacon-anchor">
              <div className="lighthouse-beam">
                <div className="beam-volume" />
                <div className="beam-core" />
              </div>
              <span className="beacon-aura" />
              <span className="beacon-origin" />
            </div>
            <div className="beacon-steps">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="principle-grid">
          {cards.map((card, i) => (
            <article
              key={card.kind}
              className={`principle ${i === 0 ? "illuminated" : ""}`}
            >
              <span className="principle-number">{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Example kind={card.kind} />
              <span className="card-meta">{card.meta}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
