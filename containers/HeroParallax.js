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
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Turby is coming to
        <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white  decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          Lighthouse
        </span>
        {/* — Mint the Madness!{" "} */}
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        {/* You are not your job, you&apos;re not how much money you have in the
        bank. You are not the car you drive. You&apos;re not the contents of
        your wallet. */}
      </p>
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[4px] relative group transition duration-200 text-white hover:bg-transparent text-sm font-bold">
            Join the waitlist
          </div>
        </button>
        <button className="fillBtn__purple ptr">Read more</button>
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
