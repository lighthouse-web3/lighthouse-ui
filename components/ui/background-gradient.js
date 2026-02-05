import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/services/helper";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  cycleMs = 5000, // total time for 0% -> 100% -> 0%
}) => {
  const [bgX, setBgX] = useState(0); // percentage position X
  const dirRef = useRef(1);
  const runningRef = useRef(false);

  useEffect(() => {
    if (!animate || runningRef.current) return;
    runningRef.current = true;

    const fps = 60;
    const interval = 1000 / fps;

    // 0->100->0 is 200 "percent units"
    const totalSteps = Math.max(1, Math.round(cycleMs / interval));
    const deltaPerTick = 200 / totalSteps;

    let x = 0;
    dirRef.current = 1;

    const id = setInterval(() => {
      x += dirRef.current * deltaPerTick;

      if (x >= 100) {
        x = 100;
        dirRef.current = -1;
      } else if (x <= 0) {
        x = 0;
        dirRef.current = 1;
      }

      setBgX(x);
    }, interval);

    return () => {
      clearInterval(id);
      runningRef.current = false;
    };
  }, [animate, cycleMs]);

  const lighthouseGradient = [
    "radial-gradient(circle farthest-side at 0% 100%, rgba(139, 92, 246, 0.55), transparent 60%)",
    "radial-gradient(circle farthest-side at 100% 0%, rgba(168, 85, 247, 0.5), transparent 60%)",
    "radial-gradient(circle farthest-side at 100% 100%, rgba(236, 72, 153, 0.48), transparent 60%)",
    "linear-gradient(0deg, rgba(20, 19, 22, 0.92), rgba(20, 19, 22, 0.92))",
  ].join(", ");

  const bgStyle = {
    backgroundImage: lighthouseGradient,
    backgroundSize: animate ? "400% 400%" : undefined,
    backgroundPosition: animate ? `${bgX}% 50%` : undefined,
    backgroundRepeat: "no-repeat",
    willChange: "background-position",
  };

  return (
    <div
      className={cn(
        "relative p-[4px] group overflow-hidden",
        containerClassName
      )}
    >
      {/* Glow layer - contained within card boundaries */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-90 transition duration-500"
        )}
        style={bgStyle}
      />
      {/* Solid layer */}
      <div
        className={cn("absolute inset-0 rounded-3xl z-[1]")}
        style={bgStyle}
      />
      {/* Content: mobile center, desktop left */}
      <div
        className={cn(
          "relative z-10 text-center  flex flex-col items-center",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
