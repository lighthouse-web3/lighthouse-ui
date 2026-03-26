import React, { useState, useContext } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import ThemeContext from "../../utils/services/Themecontext";
import { ImageBox } from "../../components";

const badgeOptions = [
  "Artificial Intelligence (AI)",
  "DePIN",
  "NFTs",
  "Social / Gaming",
  "Data Availability (DA)",
  "L1 / L2",
];

const ecosystemData = [
  // === AI ===
  {
    name: "Singularity",
    description:
      "Decentralized AI network creating beneficial AI systems via blockchain and open collaboration.",
    icon: "/client/singularity.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://singularitynet.io/",
    telegram: "https://telegram.me/singularitynet",
    twitter: "https://twitter.com/singularitynet",
  },
  {
    name: "Ocean Protocol",
    description:
      "Protocol to unlock private data for AI and computation with control and transparency.",
    icon: "/client/ocean.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://oceanprotocol.com/",
    telegram: "https://t.me/OceanProtocol_Community",
    twitter: "https://twitter.com/oceanprotocol",
  },
  {
    name: "TopAI Network",
    description:
      "AI-focused decentralized network supporting scalable intelligent applications.",
    icon: "/client/top-ai.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://topai.network",
    telegram: "https://t.me/topaiofficial",
    twitter: "https://x.com/topnetwork_top",
  },
  {
    name: "Eternal AI",
    description:
      "Decentralized framework enabling AI agents to collaborate, evolve, and persist autonomously over time.",
    icon: "/client/eternal-ai.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://eternalai.org/",
    telegram: null,
    twitter: "https://x.com/cryptoeternalai",
    image: "/client/screenshot/eternal-ai.png",
  },
  {
    name: "Open Bagel",
    description:
      "Bagel.net is a Web3-native communication platform enabling secure, token-gated audio rooms and real-time community interactions for DAOs and crypto communities.",
    icon: "/client/bagel.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://www.bagel.net/",
    telegram: null,
    twitter: "https://x.com/BagelOpenAI",
  },
  {
    name: "nuklai",
    description:
      "Nukl.ai is an AI orchestration platform for gaming, enabling developers to integrate, manage, and scale intelligent NPCs and game agents effortlessly.",
    icon: "/client/nuklai.svg",
    tags: ["Artificial Intelligence (AI)"],
    website: "https://www.nukl.ai/",
    telegram: "https://t.co/KV0trjRjhg",
    twitter: "https://x.com/NuklaiData",
  },

  // === DA ===
  {
    name: "Syscoin",
    description:
      "Layer 1/2 blockchain supporting decentralized apps with efficient data availability.",
    icon: "/client/syscoin.svg",
    tags: ["Data Availability (DA)"],
    website: "https://syscoin.org/",
    telegram: "https://t.me/Syscoin_Official",
    twitter: "https://twitter.com/syscoin",
  },
  {
    name: "BVM Network",
    description:
      "Modular blockchain ecosystem focused on data availability and rollup infrastructure.",
    icon: "/client/bvm-network.svg",
    tags: ["Data Availability (DA)"],
    website: "https://bvm.network/",
    telegram: null,
    twitter: "https://x.com/BVMnetwork",
  },
  {
    name: "Cardano",
    description:
      "Third-generation proof-of-stake blockchain for scalable and secure smart contracts.",
    icon: "/client/cardano.svg",
    tags: ["Data Availability (DA)"],
    website: "https://cardano.org",
    telegram: "https://t.me/Cardano",
    twitter: "https://twitter.com/Cardano_CF",
  },
  {
    name: "Archivista",
    description:
      "Archivista.ai is an AI-powered platform that automates document processing, extraction, and classification to streamline enterprise workflows and data management.",
    icon: "/client/archivista.svg",
    tags: ["Data Availability (DA)"],
    website: "https://www.archivista.ai/",
    telegram: "",
    twitter: "https://x.com/archivistainc",
  },

  // === NFTs ===
  {
    name: "NFT Storage",
    description:
      "Decentralized NFT data storage using IPFS and Filecoin for permanence and auditability.",
    icon: "/client/nft_storage.svg",
    tags: ["NFTs"],
    website: "https://nft.storage/",
    telegram: null,
    twitter: "https://x.com/NFTdotStorage",
    image: "/client/screenshot/nft-storage.png",
  },
  {
    name: "FileMarket",
    description:
      "NFT marketplace for creators to store and trade digital assets securely.",
    icon: "/client/filemarket.svg",
    tags: ["NFTs"],
    website: "https://filemarket.xyz/",
    telegram: "https://t.me/FileMarketChat",
    twitter: "https://twitter.com/filemarket_xyz",
  },
  {
    name: "Ok Contract",
    description:
      "Smart contract and NFT issuance platform for blockchain-based creators.",
    icon: "/client/ok-contract.svg",
    tags: ["NFTs"],
    website: "https://okcontract.com/",
    telegram: "https://t.me/okcontractofficial",
    twitter: "https://x.com/intent/user?screen_name=okcontract",
  },
  {
    name: "Alexandria Books",
    description:
      "Alexandria Books is an online bookstore offering a curated selection of thought-provoking, empowering, and diverse reads across genres and age groups.",
    icon: "/client/alexandria.svg",
    tags: ["NFTs"],
    website: "https://www.alexandriabooks.com/",
    telegram: null,
    twitter: "https://x.com/alexandrialabs",
  },
  {
    name: "Scratchable Monads",
    description: "First scratchable and interactive NFT collection on Monad.",
    icon: "/client/monad.svg",
    tags: ["NFTs"],
    website: "https://www.monad.xyz/",
    telegram: null,
    twitter: "https://x.com/scratchablemon",
  },

  // === Social/Gaming ===
  {
    name: "Mask Network",
    description:
      "Bridge Web2 and Web3 via encrypted posts and dApp integration on social platforms.",
    icon: "/client/mask.svg",
    tags: ["Social / Gaming"],
    website: "https://www.mask.io/",
    telegram: "https://t.me/maskbook_group#telegram",
    twitter: "https://x.com/realMaskNetwork",
  },
  {
    name: "Lync",
    description:
      "Identity and social-layer gaming infrastructure built for Web3 communities.",
    icon: "/client/lync.svg",
    tags: ["Social / Gaming"],
    website: "https://lync.world/",
    telegram: "https://t.me/PlasmOfficial",
    twitter: "https://twitter.com/Lyncworld",
  },
  {
    name: "IsoTopic",
    description:
      "NFT game platform for asset-driven gameplay and social storytelling.",
    icon: "/client/isotopic.svg",
    tags: ["Social / Gaming"],
    website: "https://isotopic.io/",
    telegram: "https://t.me/+agHbqwIuW95jMzdk",
    twitter: "https://twitter.com/isotopic12",
  },
  {
    name: "itheum",
    description:
      "ItHeum is a Web3 data platform enabling ownership, control, and monetization of personal data using decentralized and blockchain-based technologies.",
    icon: "/client/itheum.svg",
    tags: ["Social / Gaming"],
    website: "https://www.itheum.io/",
    telegram: "https://t.me/itheum",
    twitter: "https://twitter.com/itheum",
    image: "/client/screenshot/itheum.png",
  },
  {
    name: "Wild Friends",
    description:
      "Gamified NFT ecosystem with customizable avatars and community adventures.",
    icon: "/client/wild-friends.svg",
    tags: ["Social / Gaming"],
    website: "https://twitter.com/NetworkMeson",
    telegram: "https://t.me/+LC_kZ0o1EBNjY2Qx",
    twitter: "https://x.com/wildfriendsgame",
  },
  {
    name: "intotheverse",
    description:
      "Into The Verse is a Web3-based sci-fi action game featuring NFT integration, immersive gameplay, and a decentralized player-driven metaverse economy.",
    icon: "/client/intotheverse.svg",
    tags: ["Social / Gaming"],
    website: "https://intotheverse.xyz/game",
    telegram: "https://t.me/+DMcO1fw_hc40Nzll",
    twitter: "https://x.com/intotheverse_?lang=en",
  },

  // === DePIN (Infra) ===
  {
    name: "WebHash",
    description:
      "Decentralized hashing and indexing service for Web3 content discovery.",
    icon: "/client/webhash.svg",
    tags: ["DePIN"],
    website: "https://webhash.com/",
    telegram: null,
    twitter: "https://x.com/webhash_eth",
    image: "/client/screenshot/webhash.png",
  },
  {
    name: "Aethir",
    description:
      "DePIN-based cloud GPU infrastructure for real-time compute and edge rendering.",
    icon: "/client/aethir.png",
    tags: ["DePIN"],
    website: "https://aethir.com",
    telegram: "https://t.me/AethirCommunity",
    twitter: "https://twitter.com/AethirCloud",
  },
  {
    name: "Aethir",
    description:
      "DePIN-based cloud GPU infrastructure for real-time compute and edge rendering.",
    icon: "/client/aethir.png",
    tags: ["Data Availability (DA)"],
    website: "https://aethir.com",
    telegram: "https://t.me/AethirCommunity",
    twitter: "https://twitter.com/AethirCloud",
    image: "/client/screenshot/aethir.png",
  },
  {
    name: "Silence Laboratories",
    description:
      "Crypto-secure infrastructure for privacy-preserving computation and authentication.",
    icon: "/client/silence.svg",
    tags: ["DePIN"],
    website: "https://www.silencelaboratories.com/",
    telegram: null,
    twitter: "https://twitter.com/silencelabs_sl",
  },
  {
    name: "Zeeve",
    description: "Scalable blockchain deployment and node management platform.",
    icon: "/client/zeeve.svg",
    tags: ["Data Availability (DA)"],
    website: "https://www.zeeve.io/",
    telegram: "https://t.me/ZeeveDeeptech",
    twitter: "https://twitter.com/0xZeeve",
  },
  {
    name: "DataverseOS",
    description: "Decentralized OS for self-sovereign data storage and usage.",
    icon: "/client/dataverse_os.svg",
    tags: ["DePIN"],
    website: null,
    telegram: null,
    twitter: "https://x.com/dataverseos",
  },
  {
    name: "StackOS",
    description: "Decentralized cloud platform to deploy full-stack dApps.",
    icon: "/client/stackos.svg",
    tags: ["DePIN"],
    website: "https://app.stackos.io/",
    telegram: null,
    twitter: null,
  },
  {
    name: "Meson Network",
    description:
      "Bandwidth marketplace protocol for decentralized internet infrastructure.",
    icon: "/client/meson-network.svg",
    tags: ["DePIN"],
    website: "https://www.meson.network/",
    telegram: "https://t.me/mesonnetwork",
    twitter: "https://twitter.com/NetworkMeson",
  },

  // === L1 / L2 ===
  {
    name: "Filecoin",
    description:
      "Decentralized storage network incentivizing global data hosting with verifiability.",
    icon: "/client/filecoin.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
  {
    name: "Polygon",
    description:
      "Ethereum-compatible L2 scaling solution with multiple frameworks and zk-rollups.",
    icon: "/client/polygon.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
  {
    name: "Astar Network",
    description:
      "Multi-chain dApp hub supporting WASM and EVM for Web3 developers.",
    icon: "/client/astar.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
  {
    name: "Coreum",
    description:
      "Enterprise-ready L1 blockchain for tokenized assets and DeFi applications.",
    icon: "/client/coreum.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
  {
    name: "Binance",
    description:
      "BSC is a fast, low-cost Layer 1 supporting smart contracts and dApps.",
    icon: "/client/binance.svg",
    tags: ["L1 / L2"],
    website: "https://www.binance.com",
    telegram: "https://t.me/binanceexchange",
    twitter: "https://twitter.com/binance",
  },
  {
    name: "Base",
    description:
      "Secure Ethereum L2 built by Coinbase, optimized for developers and dApps.",
    icon: "/client/base.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
  {
    name: "Optimism",
    description: "Scalable Ethereum Layer 2 powered by optimistic rollups.",
    icon: "/client/optimism.svg",
    tags: ["L1 / L2"],
    website: null,
    telegram: null,
    twitter: null,
  },
];

const EcosystemGrid = () => {
  const [activeTag, setActiveTag] = useState("Artificial Intelligence (AI)");
  const filtered = ecosystemData.filter((item) =>
    item.tags.includes(activeTag)
  );
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <section className="w-full">
      {/* Category Badges / Filtering Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {badgeOptions.map((tag) => (
          <button
            key={tag}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 border ${
              activeTag === tag
                ? "bg-[#1b1c1c] text-[#dab9ff] border-[#dab9ff]/30 shadow-[0_0_15px_rgba(218,185,255,0.1)]"
                : "bg-transparent text-[#cec2d7] border-transparent hover:bg-[#1b1c1c]/60 hover:border-[#4c4354]/30"
            }`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Highlighted Ecosystem Partners */}
      {filtered.filter((item) => item.image).length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filtered
            .filter((item) => item.image)
            .map((item, idx) => (
              <div key={idx} className="relative group bg-[#1b1c1c] rounded-2xl overflow-hidden border border-[#4c4354]/15 hover:border-[#dab9ff]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col sm:flex-row items-center p-8 gap-8">
                {/* Main Image */}
                <div className="w-full sm:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg border border-[#4c4354]/10 bg-[#131314]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 w-full h-full justify-center">
                  <div className="mb-6">
                    <ImageBox
                      src={item?.icon}
                      width={"150px"}
                      height={"40px"}
                      style={
                        theme === "dark"
                          ? { filter: "brightness(100%)" }
                          : { filter: "brightness(10%)" }
                      }
                      aspectRatio={true}
                    />
                  </div>
                  <p className="text-[#cec2d7] text-sm leading-relaxed mb-8 flex-grow">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <span
                      className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors p-2 bg-[#131314] rounded-full border border-[#4c4354]/20"
                      onClick={() => window.open(item.website, "_blank")}
                    >
                      <SlGlobe className="text-xl" />
                    </span>
                    {item.telegram && (
                      <span
                        className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors p-2 bg-[#131314] rounded-full border border-[#4c4354]/20"
                        onClick={() => window.open(item.telegram, "_blank")}
                      >
                        <FaTelegramPlane className="text-xl" />
                      </span>
                    )}
                    {item.twitter && (
                      <span
                        className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors p-2 bg-[#131314] rounded-full border border-[#4c4354]/20"
                        onClick={() => window.open(item.twitter, "_blank")}
                      >
                        <RiTwitterXLine className="text-xl" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Standard Ecosystem Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered
          .filter((item) => !item.image)
          .map((item, idx) => (
            <div key={idx} className="group bg-[#1b1c1c] p-8 rounded-xl border border-[#4c4354]/15 hover:border-[#dab9ff]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden">
              <div className="flex justify-between items-start mb-8 z-10">
                <div className="h-14 flex items-center justify-start max-w-[150px]">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    style={
                      theme === "dark"
                        ? { filter: "brightness(100%)" }
                        : { filter: "brightness(10%)" }
                    }
                  />
                </div>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-3 text-[#e4e2e2] group-hover:text-[#dab9ff] transition-colors">{item.name}</h3>
              <p className="text-[#cec2d7] text-sm leading-relaxed mb-8 flex-grow z-10">
                {item.description}
              </p>
              <div className="flex items-center gap-4 mt-auto w-fit z-10 pt-6 border-t border-[#4c4354]/15 w-full">
                <span
                  className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors"
                  onClick={() => window.open(item.website, "_blank")}
                >
                  <SlGlobe className="text-xl" />
                </span>
                {item.telegram && (
                  <span
                    className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors"
                    onClick={() => window.open(item.telegram, "_blank")}
                  >
                    <FaTelegramPlane className="text-xl" />
                  </span>
                )}
                {item.twitter && (
                  <span
                    className="text-[#cec2d7] hover:text-[#dab9ff] cursor-pointer transition-colors"
                    onClick={() => window.open(item.twitter, "_blank")}
                  >
                    <RiTwitterXLine className="text-xl" />
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default EcosystemGrid;
