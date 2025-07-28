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
    <div className="styleContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-16 my-10 mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 list-disc list-inside">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    </div>
  );
};
