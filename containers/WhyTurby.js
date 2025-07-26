import React from "react";

export default function WhyTurby() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-12">
      {/* Left Side: Features List */}
      <div className="flex-1 max-w-lg px-4">
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            1. Always In Sync
          </h3>
          <p className="text-gray-500 text-base md:text-lg">
            Gain access to the demographics, psychographics, and location of
            unique people who talk about your brand.
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            2. Work With Any Team
          </h3>
          <p className="text-gray-500 text-base md:text-lg">
            Unify data from Facebook, Instagram, Twitter, LinkedIn, and Youtube
            to gain rich insights from easy-to-use reports.
          </p>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            3. A Productivity Platform
          </h3>
          <p className="text-gray-500 text-base md:text-lg">
            Track actions taken on your website that originated from social, and
            understand the impact on your bottom line.
          </p>
        </div>
      </div>
      {/* Right Side: Card */}
      <div className="flex-1 max-w-lg w-full px-4">
        <div className="bg-neutral-900 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
          <div className="text-center w-full">
            <p className="font-semibold text-base mb-2 tracking-wide">
              SOCIAL ACTIVITIES
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Working on Wallstreet is Not So Easy
            </h2>
            <p className="text-gray-200 mb-6">
              There&apos;s nothing I really wanted to do in life that I
              wasn&apos;t able to get good at. I&apos;m not really specifically
              talented at anything except for the ability to learn.
            </p>
            <button className="bg-white text-neutral-900 font-semibold rounded-md px-6 py-2 mt-2 shadow hover:bg-gray-100 transition">
              BUTTON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
