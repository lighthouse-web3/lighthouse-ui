import dynamic from "next/dynamic";

export const Footer = dynamic(() => import("./Footer/Footer"));
export const Header = dynamic(() => import("./Header/Header"));
export const HomeBanner = dynamic(() => import("./HomeBanner/HomeBanner"));
export const FeatureCompare = dynamic(() =>
  import("./FeatureCompare/FeatureCompare")
);
export const PartnerCarousel = dynamic(() =>
  import("./PartnerCarousel/PartnerCarousel")
);

export const FeatureCardList = dynamic(() =>
  import("./FeatureCardList/FeatureCardList")
);

export const FeaturedArticle = dynamic(() =>
  import("./FeaturedArticle/FeaturedArticle")
);
export const MostPopularBlogs = dynamic(() =>
  import("./MostPopularBlogs/MostPopularBlogs")
);
export const BlogView = dynamic(() => import("./BlogView/BlogView"));
export const NewsBar = dynamic(() => import("./NewsBar/NewsBar"));

export const DocContainer = dynamic(() =>
  import("./Doc-container/DocContainer")
);
export const DocContainer2 = dynamic(() =>
  import("./Doc-container2/DocContainer")
);
export const Testimonials = dynamic(() =>
  import("./Testimonials/Testimonials")
);
export const FAQContainer = dynamic(() =>
  import("./Faq-container/FaqContainer")
);
export const HoverContainer = dynamic(() =>
  import("./HoverContainer/HoverContainer")
);
export const LighthouseSuit = dynamic(() =>
  import("./LighthouseSuit/LighthouseSuit")
);
export const Pricing = dynamic(() => import("./Pricing/Pricing"));
export const EcosystemBanner = dynamic(() =>
  import("./EcosystemBanner/EcosystemBanner")
);
export const EcosystemGrid = dynamic(() =>
  import("./EcosystemGrid/EcosystemGrid")
);
export const MascotBox = dynamic(() => import("./MascotBox/MascotBox"));
export const LogoMarquee = dynamic(() => import("./LogoMarquee/LogoMarquee"));
export const PricingTable = dynamic(() =>
  import("./PricingTable/PricingTable")
);
export const HeroParallax = dynamic(() => import("./HeroParallax"));
