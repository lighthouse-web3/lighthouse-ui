"use client";
import { ThreeDMarquee } from "../components/ui/3d-marquee";

export default function HeroParallax() {
  const images = () => {
    const images = [];
    for (let i = 0; i < 20; i++) {
      images.push(`/turby/turby_${i + 1}.jpeg`);
    }
    for (let i = 0; i < 20; i++) {
      images.push(`/turby/turby_${i + 1}.jpeg`);
    }

    return images;
  };

  return (
    <div className="relative mx-auto  z-1 flex h-screen w-full  flex-col items-center justify-center overflow-hidden ">
      <h1
        className="relative z-20 text-center text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 bg-opacity-90 leading-tight"
        data-aos="fade-up"
      >
        Meet Turby
      </h1>
      <p
        className="relative z-20 text-center text-xl sm:text-lg md:text-2xl text-neutral-200 mt-4"
        data-aos="fade-up"
      >
        The mascot of Lighthouse
      </p>
      <div
        className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-8"
        data-aos="fade-up"
      >
        <button
          className="p-[3px] relative cursor-pointer"
          onClick={() => {
            window.location.href = "/turby_mint";
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[4px] relative group transition duration-200 text-white hover:bg-transparent text-xl font-bold">
            Mint Turby
          </div>
        </button>
        {/* <button className="fillBtn__purple ptr">Read more</button> */}
      </div>
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/80" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images()}
      />
    </div>
  );
}
