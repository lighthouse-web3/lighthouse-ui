import { useEffect, useState } from "react";
import { Metadata } from "../components";
import { EcosystemBanner, EcosystemGrid, Footer, Header } from "../containers";

export default function Ecosystem() {
  return (
    <div className="flex flex-col min-h-screen bg-[#131314] text-[#e4e2e2]">
      <Metadata title="Lighthouse Storage - Store Data Permanently & Securely" />
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-screen-2xl mx-auto flex-1 w-full space-y-32">
        <EcosystemBanner />
        <EcosystemGrid />
      </main>
      <Footer />
    </div>
  );
}
