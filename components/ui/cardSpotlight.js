import { IconGift } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { BackgroundGradient } from "./background-gradient";

export const CardSpotlight = ({ title, description, icon }) => {
  return (
    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <img
        src={`${icon}`}
        alt="icons-turby"
        height="300"
        width="300"
        className="object-contain"
      />
      <p className="text-base sm:text-xl md:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
        {title}
      </p>

      <p className="text-m text-neutral-600 dark:text-neutral-400">
        <ul className="list-none sm:list-disc text-m text-neutral-600 dark:text-neutral-400 pl-0 sm:pl-5">
          {description.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </p>
    </BackgroundGradient>
  );
};
