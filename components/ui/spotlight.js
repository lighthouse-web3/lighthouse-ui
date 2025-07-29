"use client";
import React, { useEffect, useState } from "react";
import { useAnimate } from "motion/react";
import { motion } from "motion/react";

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -450,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 10,
  xOffset = 500,
} = {}) => {
  const [scope, animate] = useAnimate();
  const [direction, setDirection] = useState(0);

  // Toggle direction every `duration` seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === 0 ? 1 : 0));
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  // Trigger animation on direction change
  useEffect(() => {
    const leftX = direction === 0 ? xOffset : -xOffset;
    const rightX = direction === 0 ? -xOffset : xOffset;

    animate(
      'div[data-role="left"]',
      { x: leftX },
      { duration, ease: "easeInOut" }
    );
    animate(
      'div[data-role="right"]',
      { x: rightX },
      { duration, ease: "easeInOut" }
    );
  }, [direction, animate, duration, xOffset]);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Left side spotlight */}
      <div
        data-role="left"
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            transform: `rotate(-45deg) translate(5%, -50%)`,
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="origin-top-left absolute top-0 left-0"
        />
        <div
          style={{
            transform: `rotate(-45deg) translate(-180%, -70%)`,
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="origin-top-left absolute top-0 left-0"
        />
      </div>

      {/* Right side spotlight */}
      <div
        data-role="right"
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          style={{
            transform: `rotate(45deg) translate(-5%, -50%)`,
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="origin-top-right absolute top-0 right-0"
        />
        <div
          style={{
            transform: `rotate(45deg) translate(180%, -70%)`,
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="origin-top-right absolute top-0 right-0"
        />
      </div>
    </motion.div>
  );
};
