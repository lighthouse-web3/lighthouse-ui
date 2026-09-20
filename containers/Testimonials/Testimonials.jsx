import React from "react";
import { testimonialSection } from "../../utils/Data/SiteContent";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <section className="py-24 px-8 bg-bg font-sans text-ink">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tighter mb-4 text-ink">
            Trusted by Builders
          </h2>
          <p className="text-muted">
            See what the decentralized community is saying about Lighthouse.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialSection?.testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-surface border border-line/10 cursor-pointer hover:border-accent/30 transition-all flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={100 * index}
              onClick={() => {
                if (item.link) window.open(item.link, "_blank");
              }}
            >
              <div>
                <div className="flex gap-1 text-accent mb-6">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="italic text-lg mb-8 leading-relaxed text-ink">
                  "{item.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-surface-2 overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={item.img}
                    alt={item.person}
                  />
                </div>
                <div>
                  <div className="font-bold text-ink">{item.person}</div>
                  <div className="text-xs text-muted/60 font-sans font-bold uppercase tracking-widest mt-1">
                    {item.designation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
