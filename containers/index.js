import dynamic from "next/dynamic";

export const Footer = dynamic(() => import("./Footer/Footer"));
export const Header = dynamic(() => import("./Header/Header"));
export const HomeBanner = dynamic(() => import("./HomeBanner/HomeBanner"));
export const NftHeroContainer = dynamic(() =>
  import("./NftHeroContainer/NftHeroContainer")
);
export const FeatureCompare = dynamic(() =>
  import("./FeatureCompare/FeatureCompare")
);
export const NftFeatureCompare = dynamic(() =>
  import("./NftFeatureCompare/NftFeatureCompare")
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
export const NftSteps = dynamic(() => import("./NftSteps/NftSteps"));
export const FAQContainer = dynamic(() =>
  import("./Faq-container/FaqContainer")
);
export const HoverContainer = dynamic(() =>
  import("./HoverContainer/HoverContainer")
);
