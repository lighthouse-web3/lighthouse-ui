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
      className="w-full h-full"
      data-aos="fade-up"
      data-aos-delay={150 * index}
      data-aos-once="true"
    >
      <CardSpotlight title={title} description={description} icon={icon} />
    </div>
  );
};
