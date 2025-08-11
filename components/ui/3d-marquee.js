"use client";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "../../utils/services/helper";

export const ThreeDMarquee = ({ images, className }) => {
  const [chunks, setChunks] = useState([]);
  const [chunkSize, setChunkSize] = useState(0);
  const [directionFlags, setDirectionFlags] = useState([]); // 0 -> down (100), 1 -> up (-100)

  // Compute chunk size once images load
  useEffect(() => {
    const size = Math.ceil((images?.length || 0) / 4);
    setChunkSize(size || 0);
  }, [images]);

  // Slice into 4 columns & set initial directions
  useEffect(() => {
    if (!chunkSize) return;
    const arr = Array.from({ length: 4 }, (_, i) =>
      images.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
    setChunks(arr);
    setDirectionFlags(arr.map((_, idx) => (idx % 2 === 0 ? 0 : 1)));
  }, [images, chunkSize]);

  // Flip directions every 3s
  useEffect(() => {
    if (!chunks.length) return;
    const interval = setInterval(() => {
      setDirectionFlags((prev) => prev.map((dir) => (dir === 0 ? 1 : 0)));
    }, 3000);
    return () => clearInterval(interval);
  }, [chunks.length]);

  // Precompute per-column style (target + duration) whenever flags change
  const columnStyles = useMemo(() => {
    return directionFlags.map((dir) => {
      const target = dir === 0 ? 100 : -100; // px
      const duration = dir === 0 ? 3 : 6; // seconds
      return {
        transform: `translateY(${target}px)`,
        transitionProperty: "transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)", // easeInOut-ish
        transitionDuration: `${duration}s`,
        willChange: "transform",
      };
    });
  }, [directionFlags]);

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[2200px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[75%] grid size-full origin-top-left grid-cols-4 gap-10 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <div
                key={colIndex}
                data-col={colIndex}
                className="flex flex-col items-start gap-8"
                style={columnStyles[colIndex]}
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={`${colIndex}-${imageIndex}`}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <img
                      src={image}
                      alt=""
                      className="aspect-[700/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reduced-motion helpers */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-col] {
            transition-duration: 0.001s !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
