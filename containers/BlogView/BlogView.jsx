import React from "react";
import { mediaUrl } from "../../utils/Data/config";
import ReactMarkdown from "react-markdown";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function BlogView({ blogData }) {
  if (!blogData) return null;

  return (
    <article className="w-full flex flex-col items-center" data-aos="fade-up">
      {/* Editorial Header */}
      <header className="mb-12 text-left w-full max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 mb-6 px-3 py-1 rounded-full bg-[#1b1c1c] border border-[#4c4354]/15">
          <span className="w-2 h-2 rounded-full bg-[#dab9ff] animate-pulse"></span>
          <span className="text-xs font-sans uppercase tracking-widest text-[#cec2d7]">
            Lighthouse Journal
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight mb-8 text-[#e4e2e2] leading-[1.1]">
          {blogData?.title}
        </h1>

        <div className="flex flex-col md:flex-row items-center md:justify-start gap-6 pt-8 border-t border-[#4c4354]/15">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#343535] overflow-hidden text-[#dab9ff] font-bold text-xl">
              {blogData?.author?.[0] || "L"}
            </div>
            <div className="text-left">
              <div className="text-base font-bold text-[#e4e2e2]">
                {blogData?.author || "Lighthouse Team"}
              </div>
              <div className="text-sm text-[#cec2d7]">
                {formatDate(blogData?.publishedAt)}
              </div>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-[#4c4354]/30"></div>
          <div className="text-sm font-medium text-[#cec2d7] flex items-center self-start md:self-auto w-full md:w-auto">
            <span className="material-symbols-outlined text-base mr-2">
              schedule
            </span>
            8 min read
          </div>
        </div>
      </header>

      {/* Banner Image */}
      {blogData?.coverImage?.data && (
        <div className="w-full max-w-5xl mx-auto mb-16 rounded-[2rem] overflow-hidden bg-[#1b1c1c] border border-[#4c4354]/10 shadow-[0_0_48px_0_rgba(218,185,255,0.05)]">
          <img
            src={mediaUrl + blogData.coverImage.data.attributes.url}
            alt={blogData?.title}
            className="w-full h-auto max-h-[700px] object-cover"
          />
        </div>
      )}

      {/* Markdown Content */}
      <div
        className="
          max-w-4xl mx-auto w-full
          pb-20 px-4 md:px-0
          text-[#cec2d7] font-sans text-lg md:text-xl leading-[1.8]
          [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-headline [&_h2]:font-bold [&_h2]:text-[#e4e2e2] [&_h2]:mt-16 [&_h2]:mb-6
          [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-headline [&_h3]:font-bold [&_h3]:text-[#e4e2e2] [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:pb-4 [&_h3]:border-b [&_h3]:border-[#4c4354]/30
          [&_h4]:text-xl [&_h4]:font-sans [&_h4]:font-semibold [&_h4]:text-[#e4e2e2] [&_h4]:mt-8 [&_h4]:mb-4
          [&_p]:mb-8
          [&_a]:text-[#dab9ff] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-[#b170ff] [&_a]:transition-colors
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_ul_li]:mb-3
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol_li]:mb-3
          [&_strong]:text-[#e4e2e2] [&_strong]:font-bold
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#dab9ff]/50 [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-8 [&_blockquote]:text-[#e4e2e2] [&_blockquote]:italic [&_blockquote]:bg-[#1b1c1c]/50 [&_blockquote]:rounded-r-lg
          [&_pre]:bg-[#1b1c1c] [&_pre]:p-6 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[#4c4354]/20 [&_pre]:my-8
          [&_code]:font-mono [&_code]:text-base [&_code]:text-[#a4c8ff] [&_code]:bg-[#343535]/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
          [&_pre_code]:bg-transparent [&_pre_code]:text-[#cec2d7] [&_pre_code]:p-0 [&_pre_code]:text-sm
          [&_img]:w-full [&_img]:max-w-4xl [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-12 [&_img]:border [&_img]:border-[#4c4354]/10 [&_img]:mx-auto
        "
      >
        <ReactMarkdown
          linkTarget={"_blank"}
          children={blogData?.description?.replaceAll(
            "/uploads/",
            `${mediaUrl}/uploads/`,
          )}
        />
      </div>
    </article>
  );
}

export default BlogView;
