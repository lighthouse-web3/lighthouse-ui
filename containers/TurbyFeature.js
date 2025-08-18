import { CardSpotlight } from "../components/ui/cardSpotlight";
import { cn } from "../utils/services/helper";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconDatabaseImport,
  IconEaseInOut,
  IconGift,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function TurbyFeatures() {
  const features = [
    {
      title: "Exclusive Access",
      description: [
        "Early access to new features",
        "Private Discord channels",
        "Beta testing opportunities",
        "Exclusive events and AMAs",
      ],
      icon: "/icons/turby/exclusive.png",
    },
    {
      title: "Storage Benefits",
      description: [
        "Free storage credits monthly",
        "Priority support",
        "Advanced analytics dashboard",
        "Custom storage solutions",
      ],
      icon: "/icons/turby/storage.png",
    },
    {
      title: "Future Rewards",
      description: [
        "Governance voting rights",
        "Future NFT airdrops",
        "Revenue sharing opportunities",
        "Exclusive merchandise",
      ],
      icon: "/icons/turby/reward.png",
    },
  ];
  return (
    <div className="styleContainer grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-16 my-10 mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div key={index} className="rounded-lg">
      <CardSpotlight title={title} description={description} icon={icon} />
    </div>
  );
};
