export const disclaimerText =
  "Filecoin Storage Deals are Live via our SDK and Files Dapp";

export const LandingPageData = {
  HeroSection: {
    title: "Store Files Permanently",
    subTitle: "Secure, Reliable, & Lightning-Fast with Lighthouse.",
  },
  KeyFeatures: [
    {
      icon: "/featureIcon/feature_6.svg",
      width: "6rem",
      title: "Perpetual Storage for a One-Time Investment",
      subTitle: `Embrace perpetual storage with IPFS and Filecoin's advanced services.`,
    },
    {
      icon: "/featureIcon/feature_5.svg",
      width: "8rem",

      title: "Decentralized Storage Solutions for Your Files",
      subTitle: `Harness the power of IPFS and Filecoin to securely store your files on a decentralized network.`,
    },
    {
      icon: "/featureIcon/feature_1.svg",
      width: "6rem",

      title: "Encryption & Access control functionality",
      subTitle:
        "Keep your data safe and with token gated access on a public network.",
    },
    {
      icon: "/featureIcon/feature_4.svg",
      width: "8rem",

      title: "Dedicated IPFS gateways for fast retrievals",
      subTitle:
        "Experience lightning-fast retrievals with our dedicated IPFS Gateways.",
    },
    {
      icon: "/featureIcon/feature_3.svg",
      width: "6rem",

      title: "Decentralized image resizing",
      subTitle:
        "Save bandwidth, optimize with blockchain-powered solutions seamlessly  without sacrificing image quality.",
    },
    {
      icon: "/featureIcon/feature_2.svg",
      width: "6rem",

      title: "High-Speed IPFS Video Gateway",
      subTitle:
        "Enjoy 4k video streaming at lightning speed with our decentralized storage and dedicated IPFS gateway.",
    },
  ],

  clientsLogo: [
    {
      icon: "https://gateway.lighthouse.storage/ipfs/QmNiJJTjDs7r4KEbGo6JyxbS3WPR4LY1dgQL5oB1YVMiM1",
      link: "",
    },
    {
      icon: "https://gateway.lighthouse.storage/ipfs/QmNwGq4kLHHrdCvW2EPH4e3nXvadHGpAnkjLA5ZoGUWB8R",
      link: "",
    },

    {
      icon: "https://gateway.lighthouse.storage/ipfs/Qmf3QKQasp4U1FcafBk5rzt4craEjAjZXfpsYR6joBFCA4",
      link: "",
    },
    {
      icon: "/client/dataverse_os.svg",
      link: "",
    },
    // {
    //   icon: "https://gateway.lighthouse.storage/ipfs/QmNUyLh1XDU8R84PGep1zUbjqJzYV4dayMcdM6ZmA4m3Tk",
    //   link: "",
    // },
    {
      icon: "/client/mask.svg",
      link: "",
    },
    {
      icon: "/client/filemarket.svg",
      link: "",
    },
    {
      icon: "/client/filecoin.svg",
      link: "",
    },
    {
      icon: "/client/silence.svg",
      link: "",
    },
    {
      icon: "/client/nft_storage.svg",
      link: "",
    },
  ],
  StorageFeature: [
    {
      icon: "/suitsIcon/suitsIcon1.svg",
      title: "Lighthouse Files",
      description:
        "Easy to use application that allows you to Login, Store and Share files securely across the web",
      link: "https://files.lighthouse.storage/",
    },
    {
      icon: "/suitsIcon/suitsIcon2.svg",
      title: "Lighthouse SDK",
      description:
        "Lighthouse Software Developer Kit comprises of all the tools developers need to integrate Lighthouse.",
      link: "https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key",
    },

    {
      icon: "/suitsIcon/suitsIcon3.svg",
      title: "Lighthouse CLI",
      description:
        "All Lighthouse features available through the convenience of the Command Line Interface ",
      link: "https://docs.lighthouse.storage/lighthouse-1/cli-tool/overview",
    },
    {
      icon: "/suitsIcon/suitsIcon4.svg",
      title: "Lighthouse Kavach",
      description:
        "Store private files on the distributed web with secure encryption and access control features through Lighthouse Kavach",
      link: "https://docs.lighthouse.storage/lighthouse-1/how-to/upload-encrypted-data",
    },
  ],

  FAQs: [
    {
      question: "What does it mean by permanent storage?",
      answer:
        "Permanent storage means you pay once for your files storage and it's meant to be stored forever. No need to recurrently pay for your files.\n",
    },
    {
      question: "How long will data be stored on Lighthouse?",
      answer:
        "As we approach our mainnet, we tend to be pretty transparent on the estimated number of years your data will be stored. For example, at the start, your data might be estimated to be stored for 25 years but as the endowment pool grows over time given the economic model of Lighthouse, the time for which your files are stored should also keep on increasing. If the economic model works as we are proposing it to be, your files shouldn’t be needed to pay for again for a very very long period of time",
    },
    {
      question: " What are the upload or file size restrictions on Lighthouse?",
      answer:
        "You can store up to 32GB in size per individual upload. Each upload can include a single file or a directory of files.",
    },
    {
      question: "Can I upload private/sensitive data to Lighthouse?",
      answer:
        "Yes, you will have to encrypt it before uploading using encryption and access control features available at Lighthouse. Refer to our documentation for this.\n",
    },
    {
      question: "Can I edit/delete files uploaded to Lighthouse?",
      answer:
        "We definitely understand that not all use cases will require storing data permanently. Files can be deleted from our hot storage and other filecoin miners. However, this doesn’t prevent nodes in the IPFS decentralised storage network from retaining copies of data indefinitely. If you are looking for use cases involving editing the files, you can contact us via email or discord, we can discuss how you can achieve that using mutable references.\n",
    },
    {
      question: "What does it cost to store data to Lighthouse?",
      answer:
        'Currently we have an incentivization program for projects to get free storage to store on Lighthouse.  <a href="https://airtable.com/shrPFC2TgojuOAYO4"> Fill up this form  </a>.  Although the actual cost per GB will be dynamic and we estimate it to be around $5 / GB or less. More info on the exact cost will be calculated as we approach mainnet',
    },
    {
      question: "How can I pay for the Lighthouse?",
      answer:
        "You can pay per file depending on the file size or top up the associated API key with prepaid storage space in multiple tokens like polygon, USDC, USDT, DAI, other native chain tokens\n",
    },
    {
      question: "How is it different from IPFS and Filecoin?",
      answer:
        "IPFS is a distributed storage network famous for its content-addressing way of referencing files which makes it tamper-proof. There is no way to pay an IPFS node to store your files in an IPFS token (because there is no such token :P). \nThat’s why Filecoin is built on IPFS and allows anyone to pay using Filecoin tokens to storage miners to store your files. Although Lighthouse is built on IPFS and Filecoin miner network, there is a couple of value adds that Lighthouse brings in\n\n1. Permanent storage - in filecoin you have to recurrently pay for your files else the miner will drop your files. Lighthouse solves this by bringing in permanent storage ability\n\n2. Ease of interaction - Lighthouse abstracts away complexities of directly using filecoin and dealing with filecoin miner network\n\n3. Private files - IPFS and Filecoin by default are public storage networks and anyone can see the data you upload. Building your own encryption layer is not an easy job. Lighthouse by default provides the user a layer of encryption and access control for encrypting your files/data along with sharing to authorised users.\n",
    },
    {
      question: "How is it different from Arweave?",
      answer:
        "Lighthouse aims to be a cheaper storage option than Arweave for permanent storage along with verifiable storage guarantees and facilitate more scalable storage abilities\n",
    },
    {
      question: "Which chains does it support?",
      answer:
        "Users can interact with the following chains to pay for storage and get a verifiable record of storage on Lighthouse\n\n1. Ethereum\n2. Polygon\n3. BSC\n4. Fantom\n5. Optimism\n6. More coming soon\n",
    },
  ],

  Documentation: {
    title: "Lighthouse Documentation",
    subtitle:
      "Lighthouse is permanent storage protocol that allows the ability to pay once and store forever",
    bannerImage:
      "https://gateway.lighthouse.storage/ipfs/QmSdS3Zxk64vC28LhNy4jJrcYzD4ziqPB69UaR1ufNXib7",
    videURL: "",
    cardTitle: "",
    cardSubtitle: "",
    cards: [{ title: "", subtitle: "", link: "" }],
  },
};

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/lighthouse-web3",
  twitter: "https://twitter.com/lighthouseweb3",
  telegram: "https://t.me/LighthouseStorage",
  discord: "https://discord.com/invite/c4a4CGCdJG",
  instagram: "https://www.instagram.com/lighthouseweb3/?igshid=MDM4ZDc5MmU%3D",
  contactMail: "nandit@lighthouse.storage",
  contactLink: "https://airtable.com/shrPFC2TgojuOAYO4",
};

export const footerData = {
  sitemap: [
    {
      text: "Home",
      path: "/",
      link: null,
    },
    {
      text: "FAQ's",
      path: "/faq",
      link: null,
    },
    {
      text: "Blogs",
      path: "/blogs",
      link: null,
    },
    {
      text: "Documentation",
      path: "/documentation",
      link: null,
    },
  ],
  otherLinks: [
    {
      text: "Contact us",
      path: null,
      link: "https://airtable.com/shrPFC2TgojuOAYO4",
    },
    {
      text: "Report Online Abuse",
      path: null,
      link: "https://docs.google.com/forms/d/16STP-KPftGBCaF5MjQuXBVBOqShIxScFtuPhCAlQJM8/viewform?ts=64a7c2b5&edit_requested=true",
    },

    {
      text: "Talk to Expert",
      path: null,
      link: "https://calendly.com/aditya-lighthouse/30min?month=2023-07",
    },
  ],
};

export const testimonialSection = {
  title: "What <span>builders</span> are saying about <span>Lighthouse</span>",
  subTitle:
    "Testimonials from creative professionals who rely on Lighthouse to shine a light on their work.",
  testimonials: [
    {
      quote:
        "Lighthouse with Macha delivers optimal Decentralized Storage on IPFS and Filecoin. The seamless integration and exceptional speed make it our top pick for Web3 Storage. As a reliable Filecoin Storage Provider, Lighthouse stands out for NFT Data Security, solidifying its role in our decentralized storage infrastructure for Web3.",
      person: "Saksham",
      designation: "MetaWork Labs",
      img: "/testimonial/saksham.jpg",
      link: "https://twitter.com/saxmjain?s=21&t=nUsbImMLxK72iJU2a3rdjQ",
    },
    {
      quote:
        "Lighthouse, with its incentivized storage, fuels data availability market competition in the realm of modular blockchains like Syscoin. It stands as a more affordable and secure choice compared to cloud storage, ensuring extended data liveness guarantees for participants in the network. Embrace decentralized storage solutions for heightened security and efficiency in blockchain data management.",
      person: "Jagdeep sidhu",
      designation: "Syscoin",
      img: "/testimonial/jagdeep.jpg",
      link: "https://twitter.com/realSidhuJag",
    },
    {
      quote:
        "Lighthouse perpetual storage is the best practice in the FVM community. By integrating Lighthouse SDK, DataverseOS ecosystem dApps can access functions of programmable storage and store user files on Filecoin and customize payment solutions easily!",
      person: "Qibing Li",
      designation: "DataverseOS",
      img: "/testimonial/Qibing.jpg",
      link: "",
    },
    {
      quote:
        "The encryption and on-chain access control mechanism enabled by Lighthouse is instrumental to our design and engineering work at Daln. Integrating the SDK into our UI was a breeze.",
      person: "Karen",
      designation: "Daln",
      img: "/testimonial/karen.png",
      link: "",
    },
    {
      quote:
        "Lighthouse is the missing piece in the web3 ecosystem that enables OKcontract users to directly upload and pin to IPFS transparently and permanently.",
      person: "Henri",
      designation: "OKContract",
      img: "/testimonial/henri.jpg",
      link: "https://twitter.com/henri__OK",
    },
    {
      quote:
        "Great product, inspired team with clear vision. Their permanent storage functionality is one of a kind scaling quickly with demands of FileMarket user growth",
      person: "lya Orlov",
      designation: "FileMarket",
      img: "/testimonial/lya.png",
      link: "https://twitter.com/UnderKong",
    },
  ],
};

export const documentationCards = [
  {
    title: "Introduction",
    subTitle: "Learn about Lighthouse and Get Started Quickly with examples",
    link: "https://docs.lighthouse.storage/lighthouse-1/",
  },
  {
    title: "CLI Commands",
    subTitle:
      "Learn to install the CLI globally on your system using our npm package",

    link: "https://docs.lighthouse.storage/lighthouse-1/how-to/overview",
  },
  {
    title: "Code Examples",

    subTitle:
      "Many easy to use tutorial and code examples to build your favourite applications",
    link: "https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key",
  },
  {
    title: "Developers Link",
    subTitle:
      "Check our open-source Github repos to learn more and contribute to Lighthouse",
    link: "https://github.com/lighthouse-web3",
  },
];
