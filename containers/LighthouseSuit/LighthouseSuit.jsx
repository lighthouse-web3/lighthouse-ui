import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function LighthouseSuit({ data }) {
  const isCodeBox = data.title === "SDK & CLI";
  const isReversed = data.index % 2 !== 0;

  return (
    <div className="py-20 font-sans text-[#e4e2e2]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-8">
        <div className={`flex flex-col ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tighter mb-6 text-[#dab9ff]">{data.title}</h2>
          <p className="text-lg text-[#cec2d7] mb-8 leading-relaxed">{data.description}</p>
          <ul className="space-y-4 mb-10">
            {data.featureCard.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <FiCheckCircle className="text-[#dab9ff] text-xl min-w-[20px]" />
                <span className="font-medium text-[#e4e2e2]">{feature.title}</span>
              </li>
            ))}
          </ul>
          <div>
            <button 
              className="bg-[#343535] text-[#e4e2e2] px-8 py-3 rounded-lg font-bold font-sans hover:bg-[#4c4354] transition-colors"
              onClick={() => window.open(data.link, "_blank")}
            >
              {data.buttonText}
            </button>
          </div>
        </div>

        <div className={`flex justify-center w-full ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
          {isCodeBox ? (
            <div className="bg-[#131314] p-1 rounded-2xl border border-[#4c4354]/20 shadow-2xl w-full">
              <div className="bg-[#1b1c1c] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#343535]/50 border-b border-[#4c4354]/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                  </div>
                  <span className="text-xs text-[#cec2d7]/60 font-mono ml-4">lighthouse-sdk --upload</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                  <p className="text-[#a4c8ff]"><span className="text-[#dab9ff]">import</span> lighthouse <span className="text-[#dab9ff]">from</span> <span className="text-[#a4c8ff]">'@lighthouse-web3/sdk'</span>;</p>
                  <p className="mt-4"><span className="text-[#cec2d7]/40">// Upload a file with encryption</span></p>
                  <p><span className="text-[#dab9ff]">const</span> response = <span className="text-[#dab9ff]">await</span> lighthouse.uploadEncrypted(</p>
                  <p className="pl-4">path, </p>
                  <p className="pl-4">apiKey, </p>
                  <p className="pl-4">publicKey,</p>
                  <p className="pl-4">signedMessage</p>
                  <p>);</p>
                  <p className="mt-4 text-[#cec2d7]/40">// Returns a hash (CID) for your permanent data</p>
                  <p><span className="text-[#dab9ff]">console</span>.log(response.data.Hash);</p>
                </div>
              </div>
            </div>
          ) : (
            <img src={data.icon} alt={data.title} className="w-full max-w-lg h-auto rounded-xl object-contain" />
          )}
        </div>
      </div>
    </div>
  );
}
