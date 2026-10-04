import { useRef } from "react";

export default function AgentNode({
  agent,
  position,
  selected,
  canvasRef,
  onSelect,
  onMove,
}) {
  const drag = useRef(null);
  const dragged = useRef(false);

  function move(event) {
    if (!drag.current) return;
    const distance =
      Math.abs(event.clientX - drag.current.x) +
      Math.abs(event.clientY - drag.current.y);
    if (distance <= 8 && !dragged.current) return;
    dragged.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const bound = (value) => Math.max(6, Math.min(94, value));
    onMove({
      x: bound(((event.clientX - rect.left) / rect.width) * 100),
      y: bound(((event.clientY - rect.top) / rect.height) * 100),
    });
  }

  return (
    <button
      type="button"
      className={`agent-node${selected ? " selected" : ""}`}
      aria-label={`Select ${agent.name} in the memory demo`}
      aria-pressed={selected}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={() => {
        if (!dragged.current) onSelect();
        dragged.current = false;
      }}
      onPointerDown={(event) => {
        drag.current = { x: event.clientX, y: event.clientY };
        dragged.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={move}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
        dragged.current = true;
      }}
    >
      <span className="agent-symbol">
        <img
          src={agent.logo}
          alt=""
          width="29"
          height="29"
          loading="lazy"
          draggable={false}
        />
      </span>
      <span className="agent-name">{agent.name}</span>
    </button>
  );
}
