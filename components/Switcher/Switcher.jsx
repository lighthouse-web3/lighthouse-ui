"use client";
import React from "react";

function Switcher({
  title1,
  title2,
  title3,
  title4,
  activeTitle,
  setActiveTitle,
}) {
  const titles = [title1, title2, title3, title4].filter(Boolean);

  return (
    <div className="inline-flex items-center p-1 bg-[#343535] rounded-full border border-[#4c4354]/10 mb-8 mx-auto w-max flex-wrap justify-center">
      {titles.map((title) => (
        <button
          key={title}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
            activeTitle === title
              ? "bg-[#dab9ff] text-[#470084]"
              : "text-[#cec2d7] hover:text-[#e4e2e2]"
          }`}
          onClick={() => setActiveTitle(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

export default Switcher;
