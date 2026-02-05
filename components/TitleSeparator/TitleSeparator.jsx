import React from "react";

function TitleSeparator({ topTitle, title, style }) {
  return (
    <div
      className="flex flex-col items-center gap-4 mt-[5%] w-full px-4 text-[var(--txt-clr)] mb-10"
      style={style}
      data-aos="fade-up"
      data-aos-delay={150}
    >
      {topTitle && (
        <p className="font-semibold text-3xl md:text-5xl lg:w-5xl text-center">
          {topTitle}
        </p>
      )}
      <h2 className="text-center mx-auto text-sm lg:text-lg lg:w-3xl">
        {title}
      </h2>
    </div>
  );
}

export default TitleSeparator;
