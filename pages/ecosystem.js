import { useEffect, useState } from "react";
import { Metadata } from "../components";
import { EcosystemBanner, EcosystemGrid, Footer, Header } from "../containers";

export default function Ecosystem() {
    return (
      <>
        <Metadata title="Lighthouse Storage - Store Data Permanently & Securely" />
        <div className={"bodyContainer"}>
          {/* <NewsBar /> */}
          <Header />
          <div className="">
          <div className="container">
          <EcosystemBanner/>
          </div>
          <div className="container">
          <EcosystemGrid/>
          </div>
        </div>

          <Footer />
        </div>
      </>
    );
  }