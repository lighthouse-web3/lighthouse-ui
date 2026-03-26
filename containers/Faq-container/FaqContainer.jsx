import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { LandingPageData } from "../../utils/Data/SiteContent";
import { baseUrl } from "../../utils/Data/config";

// optional props: type = "main" | "pricing" | "turby"
function FAQContainer({ type = "main", customData = null }) {
  const [isOpen, setIsOpen] = useState(0);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (customData) {
      setFaqs(customData);
    } else if (type === "pricing") {
      setFaqs(LandingPageData.PricingFAQs);
    } else if (type === "turby") {
      setFaqs(LandingPageData.TurbyFAQs);
    } else {
      (async () => {
        try {
          const res = await axios.get(`${baseUrl}/faqs?populate=*`);
          let faqData = res["status"] === 200 ? res["data"]?.["data"] : null;
          if (faqData) {
            const mainSiteFaq = faqData.filter(
              (faq) => faq.attributes.Platform === "Mainsite",
            );
            setFaqs(mainSiteFaq);
          }
        } catch (error) {
          console.error("Failed to load FAQs", error);
        }
      })();
    }
  }, [type, customData]);

  const getTitle = () => {
    if (type === "pricing") return "Pricing FAQs";
    if (type === "turby") return "Turby NFT FAQs";
    return "Frequently Asked Questions";
  };

  return (
    <section className="py-24 px-8 bg-[#131314] font-sans text-[#e4e2e2]">
      <div className="max-w-3xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-bold font-sans tracking-tighter mb-12 text-center text-[#e4e2e2]"
          data-aos="fade-up"
        >
          {getTitle()}
        </h2>

        <div className="space-y-4">
          {faqs?.map((item, index) => {
            const isActive = isOpen === index;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={100 * Math.min(index, 5)}
              >
                <div
                  className={`bg-[#1b1c1c] p-6 rounded-xl border border-[#4c4354]/10 transition-all duration-300 ${!isActive ? "opacity-70 hover:opacity-100" : ""}`}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(isActive ? null : index)}
                  >
                    <h4 className={`font-bold font-sans text-lg pr-4 ${isActive ? "text-[#dab9ff]" : "text-[#e4e2e2]"}`}>
                      {item?.attributes?.question}
                    </h4>
                    <div className={`text-2xl transition-transform duration-300 ${isActive ? "text-[#dab9ff] rotate-180" : "text-[#cec2d7]"}`}>
                      {isActive ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
                    </div>
                  </div>
                  
                  <div 
                    className={`mt-4 text-[#cec2d7] leading-relaxed transition-all duration-300 overflow-hidden ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0 mt-0"}`}
                  >
                    <p dangerouslySetInnerHTML={{ __html: item?.attributes?.answer }}></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {type !== "turby" && (
          <div 
            className="mt-16 p-10 bg-[#1b1c1c] rounded-2xl border border-[#dab9ff]/20 text-center shadow-[0_20px_40px_rgba(218,185,255,0.03)]"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-bold font-sans mb-4 text-[#e4e2e2]">Let's Talk !</h3>
            <p className="text-[#cec2d7] mb-8 max-w-lg mx-auto leading-relaxed">
              Didn’t find what you were looking for?<br />
              Our team is happy to help you out.
            </p>
            <button
              className="bg-[#dab9ff] text-[#470084] px-8 py-3 rounded-xl font-bold font-sans hover:bg-[#c79ef5] transition-colors shadow-lg"
              onClick={() => {
                window.open(
                  "https://airtable.com/app0KP7ENgYlLDcJ0/shrPFC2TgojuOAYO4",
                  "__blank",
                );
              }}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQContainer;
