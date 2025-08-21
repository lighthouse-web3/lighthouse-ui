import React, { useEffect, useRef } from "react";

const MouseFollowingEyes = () => {
  const containerRef = useRef(null);
  const eyeRefs = useRef([]);
  const pupilRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      pupilRefs.current.forEach((pupil, index) => {
        const eyeball = eyeRefs.current[index];
        if (!pupil || !eyeball) return;

        const eyeArea = eyeball.getBoundingClientRect();
        const pupilArea = pupil.getBoundingClientRect();

        const R = eyeArea.width / 2;
        const r = pupilArea.width / 2;

        const centerX = eyeArea.left + R;
        const centerY = eyeArea.top + R;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const theta = Math.atan2(dy, dx);
        const angle = theta * (180 / Math.PI);

        // Move pupil in direction of cursor
        pupil.style.transform = `translateX(${R - r}px) rotate(${angle}deg)`;
        pupil.style.transformOrigin = `${r}px center`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="block">
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {[
          { left: 80, top: 70 },
          { left: 190, top: 70 },
        ].map((pos, index) => (
          <svg
            key={index}
            width="33"
            height="70"
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
            }}
          >
            <circle
              ref={(el) => (eyeRefs.current[index] = el)}
              cx="16.5"
              cy="35"
              r="16.5"
              fill="black"
            />
            <circle
              ref={(el) => (pupilRefs.current[index] = el)}
              cx="16.5"
              cy="35"
              r="7.5"
              fill="white"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default MouseFollowingEyes;
