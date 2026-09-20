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
    <div className="inline-flex items-center p-1 bg-surface-2 rounded-full border border-line/10 mb-8 mx-auto w-max flex-wrap justify-center">
      {titles.map((title) => (
        <button
          key={title}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
            activeTitle === title
              ? "bg-accent text-[#470084]"
              : "text-muted hover:text-ink"
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
