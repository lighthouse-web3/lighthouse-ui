import axios from "axios";
import React, { useEffect, useState } from "react";
import { Metadata } from "../../components";
import {
  FeaturedArticle,
  Footer,
  Header,
  MostPopularBlogs,
} from "../../containers";
import { baseUrl } from "../../utils/Data/config";

export const getStaticProps = async () => {
  let blogsData = null;
  try {
    const res = await axios.get(
      `${baseUrl}/blogs?pagination[pageSize]=50&populate=*`
    );
    blogsData = res["status"] === 200 ? res["data"]?.["data"] : null;
    console.log(blogsData);
  } catch (error) {}
  return {
    props: {
      blogsData,
    },
  };
};

function Blogs({ blogsData }) {
  return (
    <>
      <Metadata title="Lighthouse Storage | Blogs" />

      <div className="bg-[#131314] text-[#e4e2e2] font-sans min-h-screen flex flex-col">
        <Header />
        
        <main className="pt-32 pb-20 px-6 w-full max-w-screen-2xl mx-auto flex-1">
          {/* Header Section */}
          <header className="mb-16">
            <div className="inline-flex items-center space-x-2 mb-4 px-3 py-1 rounded-full bg-[#1b1c1c] border border-[#4c4354]/15">
              <span className="w-2 h-2 rounded-full bg-[#dab9ff] animate-pulse"></span>
              <span className="text-xs font-sans uppercase tracking-widest text-[#cec2d7]">Lighthouse Obsidian Journal</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-6 text-[#e4e2e2]">
              Digital<br/>Obsidian.
            </h1>
            <p className="max-w-xl text-lg text-[#cec2d7] leading-relaxed">
              Insights into decentralized storage, engineering breakthroughs, and the future of the Lighthouse ecosystem.
            </p>
          </header>

          {blogsData && <FeaturedArticle blogsData={blogsData} />}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-6 py-2 rounded-full bg-[#dab9ff] text-[#470084] font-bold text-sm tracking-tight transition-all cursor-pointer">All Posts</button>
            <button className="px-6 py-2 rounded-full bg-[#2a2a2a] text-[#cec2d7] hover:text-[#dab9ff] font-medium text-sm tracking-tight transition-all cursor-pointer">Engineering</button>
            <button className="px-6 py-2 rounded-full bg-[#2a2a2a] text-[#cec2d7] hover:text-[#dab9ff] font-medium text-sm tracking-tight transition-all cursor-pointer">AI</button>
            <button className="px-6 py-2 rounded-full bg-[#2a2a2a] text-[#cec2d7] hover:text-[#dab9ff] font-medium text-sm tracking-tight transition-all cursor-pointer">Ecosystem</button>
            <button className="px-6 py-2 rounded-full bg-[#2a2a2a] text-[#cec2d7] hover:text-[#dab9ff] font-medium text-sm tracking-tight transition-all cursor-pointer">Community</button>
          </div>

          {blogsData && <MostPopularBlogs blogsData={blogsData} />}

          {/* Newsletter Section */}
          <section className="mt-32 p-12 rounded-2xl bg-[#1b1c1c] border border-[#4c4354]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#dab9ff]/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl font-headline font-bold text-[#e4e2e2] mb-4">Stay at the Horizon.</h2>
                <p className="text-[#cec2d7]">Get the latest technical deep dives and ecosystem updates delivered straight to your inbox.</p>
              </div>
              <div className="w-full max-w-md">
                <div className="flex gap-2">
                  <input className="flex-grow bg-[#343535] border-none rounded-lg outline-none focus:ring-2 focus:ring-[#dab9ff] text-[#e4e2e2] placeholder:text-[#cec2d7]/50 px-4" placeholder="Enter your email" type="email" />
                  <button className="bg-[#dab9ff] text-[#470084] font-bold px-8 py-3 rounded-lg hover:brightness-110 transition-all cursor-pointer">Subscribe</button>
                </div>
                <p className="mt-3 text-[10px] text-[#cec2d7]/60 text-center md:text-left">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Blogs;
