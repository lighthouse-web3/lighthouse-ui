import React from "react";

function FeatureCardList() {
  return (
    <section className="py-32 px-8 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[#dab9ff]/5"></div>
      <div className="absolute -right-64 -bottom-64 w-[600px] h-[600px] bg-[#dab9ff]/10 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10" data-aos="fade-up">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline tracking-tighter mb-8 leading-[0.9] text-[#e4e2e2]">
          Experience the power of <br/>
          <span className="text-[#dab9ff]">affordable permanent storage</span>
        </h2>
        
        <p className="text-xl text-[#cec2d7] max-w-2xl mx-auto mb-12">
          Join thousands of developers building a more permanent, private, and decentralized internet with Lighthouse.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <button 
            className="bg-[#dab9ff] text-[#470084] px-12 py-5 rounded-xl text-lg font-bold font-sans hover:scale-[1.05] transition-transform shadow-[0_30px_60px_rgba(218,185,255,0.2)]"
            onClick={() => {
              window.open("https://files.lighthouse.storage/", "__blank");
            }}
          >
            Start Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureCardList;
