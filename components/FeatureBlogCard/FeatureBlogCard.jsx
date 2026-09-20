import React from "react";
import { mediaUrl } from "../../utils/Data/config";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function FeatureBlogCard({ blog, delay = 0 }) {
  const stripMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/[#_*~`>]/g, "") // remove basic markers
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // extract link text
      .trim();
  };

  return (
    <article 
      className="group flex flex-col h-full bg-surface rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border-b-4 border-transparent hover:border-accent/30 cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={delay}
      onClick={() => {
        window.open(
          `/blogs/${encodeURIComponent(blog?.attributes?.title?.trim())}`,
          "_blank"
        );
      }}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt={blog?.attributes?.title} 
          src={mediaUrl + blog?.attributes?.coverImage?.data?.attributes?.url}
        />
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a4c8ff]">Article</span>
          <span className="text-[10px] text-muted flex items-center">
            <span className="material-symbols-outlined text-xs mr-1">calendar_today</span>
            {formatDate(blog?.attributes?.publishedAt)}
          </span>
        </div>
        <h3 className="text-xl font-headline font-bold mb-3 text-ink leading-snug group-hover:text-accent transition-colors">
          {blog?.attributes?.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-6 leading-relaxed">
          {stripMarkdown(blog?.attributes?.description)}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-line/15">
          <span className="text-xs font-medium text-muted">5 min read</span>
          <span className="material-symbols-outlined text-accent group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </div>
    </article>
  );
}

export default FeatureBlogCard;
