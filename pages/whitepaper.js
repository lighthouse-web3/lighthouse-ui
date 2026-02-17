import React from "react";
import { whitepaperContent } from "../utils/Data/StaticPageContent";

const Whitepaper = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={whitepaperContent.previewUrl}
        width="100%"
        height="100%"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default Whitepaper;
