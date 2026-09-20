import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { LandingPageData } from "../../utils/Data/SiteContent";

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
      setFaqs(LandingPageData.MainSiteFAQs);
    }
  }, [type, customData]);

  const getTitle = () => {
    if (type === "pricing") return "Pricing FAQs";
    if (type === "turby") return "Turby NFT FAQs";
    return "Frequently Asked Questions";
  };

  return (
    <section className="py-24 px-8 bg-bg  text-ink">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-center text-ink"
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
                  className={`bg-surface p-6 rounded-xl border border-line/10 transition-all duration-300 ${!isActive ? "opacity-70 hover:opacity-100" : ""}`}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(isActive ? null : index)}
                  >
                    <h4
                      className={`font-bold font-sans text-lg pr-4 ${isActive ? "text-accent" : "text-ink"}`}
                    >
                      {item?.attributes?.question}
                    </h4>
                    <div
                      className={`text-2xl transition-transform duration-300 ${isActive ? "text-accent rotate-180" : "text-muted"}`}
                    >
                      {isActive ? (
                        <AiOutlineMinusCircle />
                      ) : (
                        <AiOutlinePlusCircle />
                      )}
                    </div>
                  </div>

                  <div
                    className={`mt-4 text-muted leading-relaxed transition-all duration-300 overflow-hidden ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0 mt-0"}`}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.attributes?.answer,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* {type !== "turby" && (
          <div 
            className="mt-16 p-10 bg-surface rounded-2xl border border-accent/20 text-center shadow-[0_20px_40px_rgba(206,180,251,0.03)]"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-bold font-sans mb-4 text-ink">Let's Talk !</h3>
            <p className="text-muted mb-8 max-w-lg mx-auto leading-relaxed">
              Didn’t find what you were looking for?<br />
              Our team is happy to help you out.
            </p>
            <button
              className="bg-accent text-[#470084] px-8 py-3 rounded-xl font-bold font-sans hover:bg-[#c79ef5] transition-colors shadow-lg"
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
        )} */}
      </div>
    </section>
  );
}

export default FAQContainer;
