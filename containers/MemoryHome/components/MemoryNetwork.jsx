import { Fragment, useEffect, useRef, useState } from "react";
import { agents } from "../data/agents";
import AgentNode from "./AgentNode";
import MemoryConsole from "./MemoryConsole";

function curve(position) {
  const x = position.x * 12,
    y = position.y * 6;
  return `M ${x} ${y} Q ${600 + (x - 600) * 0.35} ${300 + (y - 300) * 0.65 + 22} 600 300`;
}

function MemoryPulse({ path, incoming }) {
  return (
    <circle r="3" className="pulse-dot">
      <animateMotion
        dur="1.05s"
        path={path}
        keyPoints={incoming ? "0;1" : "1;0"}
        keyTimes="0;1"
        calcMode="linear"
        fill="freeze"
      />
      <animate
        attributeName="opacity"
        values="1;1;0"
        keyTimes="0;0.9;1"
        dur="1.05s"
        fill="freeze"
      />
    </circle>
  );
}

/** Frontend illustration only. Replace onSave with an API call for real storage. */
export default function MemoryNetwork({
  motionDisabled,
  paused,
  reducedMotion,
  onToggleMotion,
}) {
  const canvasRef = useRef(null);
  const pulseId = useRef(0);
  const [selected, setSelected] = useState(1);
  const [positions, setPositions] = useState(() =>
    agents.map(({ x, y }) => ({ x, y })),
  );
  const [memory, setMemory] = useState(null);
  const [status, setStatus] = useState("ready");
  const [pulse, setPulse] = useState(null);
  const [saveCount, setSaveCount] = useState(0);

  useEffect(() => {
    if (motionDisabled) return;
    let tick = 0;
    const timer = setInterval(() => {
      const bounds = canvasRef.current?.getBoundingClientRect();
      if (
        document.visibilityState !== "visible" ||
        !bounds ||
        bounds.bottom < 0 ||
        bounds.top > window.innerHeight
      )
        return;
      setPulse({
        id: ++pulseId.current,
        index: tick % agents.length,
        incoming: tick % 2 === 0,
      });
      tick++;
    }, 1800);
    return () => clearInterval(timer);
  }, [motionDisabled]);

  useEffect(() => {
    if (status !== "saved") return;
    const timer = setTimeout(() => setStatus("ready"), 1800);
    return () => clearTimeout(timer);
  }, [status, saveCount]);

  function selectAgent(index) {
    setSelected(index);
    setStatus("ready");
    if (memory) setPulse({ id: ++pulseId.current, index, incoming: false });
  }

  function saveMemory(text) {
    setMemory({ text, writer: agents[selected].name });
    setStatus("saved");
    setSaveCount((count) => count + 1);
    setPulse({ id: ++pulseId.current, index: selected, incoming: true });
  }

  function tilt(event) {
    if (motionDisabled || event.pointerType === "touch" || event.buttons)
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `rotateY(${((event.clientX - rect.left) / rect.width - 0.5) * 2}deg) rotateX(${-((event.clientY - rect.top) / rect.height - 0.5) * 2}deg)`;
  }

  return (
    <section className="network-section" id="memory">
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">01 / THE MEMORY NETWORK</span>
          <h2>
            Different minds.
            <br />
            <span>Shared memory.</span>
          </h2>
        </div>
        <p>
          Connect the dots between your agents.
          <br />
          Select a model. Save a memory.
          <br />
          Pick another and watch it carry over.
        </p>
      </div>
      <div className="network-wrap reveal">
        <div className="network-top">
          <span className="network-tag">INTERACTIVE DEMO</span>
          <button
            type="button"
            className="quiet"
            aria-pressed={paused || reducedMotion}
            disabled={reducedMotion}
            onClick={onToggleMotion}
          >
            {reducedMotion
              ? "Reduced motion"
              : paused
                ? "Resume motion ▷"
                : "Pause motion Ⅱ"}
          </button>
        </div>
        <div
          className="network-canvas"
          ref={canvasRef}
          aria-label="Interactive shared memory network"
          onPointerMove={tilt}
          onPointerLeave={(event) => {
            event.currentTarget.style.transform = "none";
          }}
        >
          <svg
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="coreGlow">
                <stop stopColor="#c4a6ff" stopOpacity=".24" />
                <stop offset="1" stopColor="#bba1ff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lineGlow">
                <stop stopColor="#9484aa" stopOpacity=".15" />
                <stop offset=".5" stopColor="#cebaff" stopOpacity=".7" />
                <stop offset="1" stopColor="#a991d0" stopOpacity=".2" />
              </linearGradient>
            </defs>
            <ellipse
              cx="600"
              cy="300"
              rx="280"
              ry="260"
              fill="url(#coreGlow)"
            />
            {positions.map((position, index) => {
              const next = positions[(index + 1) % positions.length];
              return (
                <Fragment key={agents[index].id}>
                  <path
                    d={curve(position)}
                    className={`thread${index === selected ? " active" : ""}`}
                  />
                  <path
                    className="cross-thread"
                    d={`M ${position.x * 12} ${position.y * 6} Q ${(position.x + next.x) * 6} ${(position.y + next.y) * 3 + 20} ${next.x * 12} ${next.y * 6}`}
                  />
                </Fragment>
              );
            })}
            {pulse && !motionDisabled && (
              <MemoryPulse
                key={pulse.id}
                path={curve(positions[pulse.index])}
                incoming={pulse.incoming}
              />
            )}
          </svg>
          <div
            key={saveCount}
            className={`core${status === "saved" ? " flash" : ""}`}
          >
            <span className="core-ring ring-one" />
            <span className="core-ring ring-two" />
            <div className="core-glass">
              <span className="brand-mark" />
            </div>
            <strong>LIGHTHOUSE</strong>
            <span className="core-label">SHARED MEMORY</span>
          </div>
          {agents.map((agent, index) => (
            <AgentNode
              key={agent.id}
              agent={agent}
              position={positions[index]}
              selected={selected === index}
              canvasRef={canvasRef}
              onSelect={() => selectAgent(index)}
              onMove={(position) =>
                setPositions((current) =>
                  current.map((old, i) => (i === index ? position : old)),
                )
              }
            />
          ))}
        </div>
        <MemoryConsole
          agent={agents[selected]}
          memory={memory}
          status={status}
          onSave={saveMemory}
        />
        <div className="network-caption">
          <span>One memory layer. Your choice of agents.</span>
        </div>
      </div>
    </section>
  );
}
