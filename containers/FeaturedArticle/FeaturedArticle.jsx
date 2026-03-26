import React, { useEffect, useState } from "react";
import { ImageBox } from "../../components";
import { mediaUrl } from "../../utils/Data/config";
import Style from "./FeaturedArticle.module.scss";

function FeaturedArticle({ blogsData }) {
  const [latestBlog, setLatestBlog] = useState(null);
  useEffect(() => {
    let sorted = blogsData.sort(function (a, b) {
      return (
        new Date(b?.attributes?.publishedAt) -
        new Date(a?.attributes?.publishedAt)
      );
    });
    setLatestBlog(sorted[0]);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="mb-20" data-aos="fade-up">
      {latestBlog && (
        <div 
          className="group relative overflow-hidden rounded-[1.5rem] bg-[#1b1c1c] transition-all duration-500 hover:shadow-[0_0_64px_0_rgba(218,185,255,0.1)] cursor-pointer"
          onClick={() => {
            window.open(`/blogs/${latestBlog?.attributes?.title?.trim()}`, "_blank");
          }}
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-3/5 overflow-hidden">
              <img 
                className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={latestBlog?.attributes?.title || "Featured Blog"} 
                src={mediaUrl + latestBlog?.attributes?.coverImage?.data?.attributes?.url}
              />
            </div>
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-[#b170ff]/20 text-[#dab9ff] text-xs font-bold uppercase tracking-widest mb-6">Engineering</span>
                <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight mb-4 text-[#e4e2e2] group-hover:text-[#dab9ff] transition-colors">
                  {latestBlog?.attributes?.title}
                </h2>
                <p className="text-[#cec2d7] mb-8 line-clamp-3 leading-relaxed">
                  {latestBlog?.attributes?.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t border-[#4c4354]/15">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#343535] overflow-hidden text-[#dab9ff] font-bold text-lg">
                    {latestBlog?.attributes?.author?.[0] || "L"}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#e4e2e2]">{latestBlog?.attributes?.author || "Lighthouse Team"}</div>
                    <div className="text-xs text-[#cec2d7]">{formatDate(latestBlog?.attributes?.publishedAt)}</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-[#cec2d7] flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span>
                  5 min read
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FeaturedArticle;
