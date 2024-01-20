import {
  NftFeatureCompare,
  NftHeroContainer,
  PartnerCarousel,
  Testimonials,
  Footer,
  RelatedBlogs,
  Header,
  NftSteps,
} from "../containers";
import { Metadata } from "../components";
import { NftLandingPageData } from "../utils/Data/SiteContent";

export default function NFT() {
  return (
    <>
      <Metadata title="Lighthouse Storage | NFT" />
      <div className={"bodyContainer"}>
        <Header />
        <div>
          <div className="contentContainer">
            <NftHeroContainer />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <PartnerCarousel
              data={NftLandingPageData?.clientsLogo}
              title={"More than 25,000 teams use"}
            />
          </div>
        </div>
        <div className="">
          <div className="container">
            <NftFeatureCompare />
          </div>
        </div>
        <div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <NftSteps />
          </div>
        </div>
        {/*<div style={{ minHeight: "auto" }}>
          <div className="contentContainer container">
            <RelatedBlogs />
          </div>
        </div> */}
        <Footer />
      </div>
    </>
  );
}
