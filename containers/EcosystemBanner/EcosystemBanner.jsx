import React from "react";

const EcosystemBanner = () => {
  return (
    <section className="relative w-full mb-12 lg:mb-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dab9ff]/10 border border-[#4c4354]/15 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#dab9ff] animate-pulse"></span>
        <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#dab9ff]">
          Digital Standard
        </span>
      </div>
      <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter mb-8 text-[#e4e2e2]">
        Explore the <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dab9ff] to-[#a4c8ff]">
          Lighthouse Ecosystem.
        </span>
      </h1>
      <p className="text-xl font-sans text-[#cec2d7] max-w-2xl leading-relaxed">
        Harnessing the power of decentralized network, Lighthouse empowers
        developers, data contributors, and users with secure, transparent, and
        scalable infrastructure.
      </p>
    </section>
  );
};

export default EcosystemBanner;
