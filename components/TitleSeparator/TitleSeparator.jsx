import React from "react";

function TitleSeparator({ topTitle, title, style }) {
  return (
    <div
      className="flex flex-col items-center gap-4 mt-8 w-full px-4 text-[#e4e2e2] mb-12"
      style={style}
      data-aos="fade-up"
      data-aos-delay={150}
    >
      {topTitle && (
        <p className="text-4xl md:text-5xl lg:w-5xl text-center font-bold font-sans tracking-tighter">
          {topTitle}
        </p>
      )}
      {title && (
        <h2 className="text-center mx-auto text-sm lg:text-lg lg:w-3xl text-[#cec2d7] leading-relaxed">
          {title}
        </h2>
      )}
    </div>
  );
}

export default TitleSeparator;
