import React, { useEffect, useRef } from "react";

const MouseFollowingEyes = () => {
  const containerRef = useRef(null);
  const eyeRefs = useRef([]);
  const pupilRefs = useRef([]);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      // Cancel previous animation frame for smooth movement
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
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

          // Calculate distance from center
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Limit movement to keep pupil within eye bounds
          const maxMoveX = R - r;
          const maxMoveY = eyeArea.height / 2 - pupilArea.height / 2;

          // Calculate normalized movement with easing
          const moveX = Math.min(maxMoveX, Math.max(-maxMoveX, dx * 0.2));
          const moveY = Math.min(maxMoveY, Math.max(-maxMoveY, dy * 0.2));

          // Move pupil without rotation - only translate
          pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
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
          { left: 80, top: 60 },
          { left: 190, top: 60 },
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
            <ellipse
              ref={(el) => (eyeRefs.current[index] = el)}
              cx="16.5"
              cy="35"
              rx="14"
              ry="22"
              fill="black"
            />
            <ellipse
              ref={(el) => (pupilRefs.current[index] = el)}
              cx="16.5"
              cy="35"
              rx="7.5"
              ry="12"
              fill="white"
              style={{
                transition: "transform 0.1s ease-out",
              }}
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default MouseFollowingEyes;
