import { CardSpotlight } from "../components/ui/cardSpotlight";

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
    <div className="styleContainer grid gap-6 grid-cols-1 relative z-16 my-2 mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="w-full h-full"
          data-aos="fade-right"
          data-aos-delay={150 * index}
          data-aos-once="true"
        >
          <div className="w-full h-full rounded-[20px] font-inherit text-[var(--txt-clr)] py-2 px-4">
            <div className="w-full h-full border border-[#1f1d248e] rounded-[20px]  flex flex-col-reverse md:flex-row justify-start gap-2 md:gap-6 bg-[var(--featureCard-bg-clr)] md:items-center">
              <div className="w-[17rem] min-h-[15rem] h-full flex items-end justify-center overflow-hidden">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-6 p-6 py-12 text-right">
                <p className="text-3xl font-semibold leading-[130%] m-0">
                  {feature.title}
                </p>
                <div className="text-xl font-normal leading-[130%] m-0 flex flex-wrap justify-end gap-3">
                  {feature.description.map((desc, index) => (
                    <span
                      key={index}
                      className="font-normal m-0 bg-gray-100 text-gray-800 text-base font-medium px-3.5 py-2.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    >
                      {desc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
