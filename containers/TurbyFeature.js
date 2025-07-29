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
      icon: <IconGift className="h-10 w-10" />,
    },
    {
      title: "Storage Benefits",
      description: [
        "Free storage credits monthly",
        "Priority support",
        "Advanced analytics dashboard",
        "Custom storage solutions",
      ],
      icon: <IconDatabaseImport className="h-10 w-10" />,
    },
    {
      title: "Future Rewards",
      description: [
        "Governance voting rights",
        "Future NFT airdrops",
        "Revenue sharing opportunities",
        "Exclusive merchandise",
      ],
      icon: <IconCurrencyDollar className="h-10 w-10" />,
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
    <div
      key={index}
      className="bg-[var(--featureCard-bg-clr)] p-4 rounded-lg shadow-md flex flex-col items-start text-[var(--txt-clr)]"
    >
      <div className="text-3xl text-primary mb-4">{icon}</div>
      <h4 className="font-semibold text-xl mb-4">{title}</h4>
      <ul className="text-lg font-normal text-gray-400 list-disc list-inside">
        {description.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
