import {
  EventBlogBanner,
  FeatureCardList,
  FeatureCompare,
  Footer,
  Header,
  HomeBanner,
  MainEventSection,
  OurTeam,
  PartnerCarousel,
  ReachUs,
  Roadmap,
} from "../containers";

export default function About() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <MainEventSection />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set2"></div>
        <div className="bigShadow__set2"></div>
        <div className="contentContainer container">
          <Roadmap />
        </div>
      </div>
      <div className="sectionContainer" style={{ minHeight: "50vh" }}>
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer container">
          <OurTeam />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set2"></div>
        <div className="bigShadow__set2"></div>
        <div className="contentContainer container">
          <ReachUs />
        </div>
      </div>
      <div className="sectionContainer">
        <div className="smallShadow__set1"></div>
        <div className="bigShadow__set1"></div>
        <div className="contentContainer">
          <EventBlogBanner />
        </div>
      </div>
      <Footer />
    </div>
  );
}
