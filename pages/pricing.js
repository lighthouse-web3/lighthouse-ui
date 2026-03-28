import { useEffect } from "react";
import { Metadata, TitleSeparator } from "../components";
import {
  FAQContainer,
  Footer,
  Header,
  LogoMarquee,
  Pricing,
  PricingTable,
} from "../containers";

export default function PricingPage() {
  return (
    <>
      <Metadata title="Lighthouse Storage | Pricing" />
      <div className={"bodyContainer"}>
        <Header />
        <div className="sectionContainer">
          <div className="contentContainer styleContainer">
            <Pricing />
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-8 mb-24 w-full">
            <div className="bg-[#1b1c1c] border border-[#4c4354]/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_48px_0_rgba(218,185,255,0.03)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#dab9ff]/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="z-10 relative flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dab9ff]/10 border border-[#4c4354]/15 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#dab9ff] animate-pulse"></span>
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#dab9ff]">Customize</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e4e2e2] mb-3">Pay For What You Need</h2>
                <p className="text-[#cec2d7] font-sans text-lg max-w-xl">
                  Tailor your decentralized storage plan exactly to your project&apos;s data scale and infrastructural requirements.
                </p>
              </div>
              
              <div className="z-10 relative flex-shrink-0 w-full md:w-auto">
                <button 
                  onClick={() => window.open('https://airtable.com/app0KP7ENgYlLDcJ0/shrPFC2TgojuOAYO4', '_blank')}
                  className="w-full md:w-auto bg-gradient-to-br from-[#dab9ff] to-[#a4c8ff] text-[#2a0053] px-8 py-4 rounded-xl text-base font-bold font-sans hover:scale-[1.02] transition-transform shadow-[0_10px_30px_rgba(218,185,255,0.2)]"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>

          <LogoMarquee />

          <div className="contentContainer mt-16">
            <FAQContainer type="pricing" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
