export const disclaimerText =
  "Filecoin Storage Deals are Live via our SDK and Files Dapp";

export const LandingPageData = {
  HeroSection: {
    title: "Store Files Perpetually",
    subTitle:
      "Lighthouse allows the users to store on Filecoin for a lifetime at a fixed price",
    sideImage: "/globe.png",
  },
  KeyFeatures: [
    {
      icon: "/featureIcon/feature6.png",
      title: "Pay once and store forever",
    },
    {
      icon: "/featureIcon/feature5.png",
      title: "Store files on IPFS and Filecoin",
    },
    {
      icon: "/featureIcon/feature1.png",
      title: "Encryption & Access control functionality",
    },
    {
      icon: "/featureIcon/feature4.png",
      title: "Dedicated IPFS gateways for fast retrievals",
    },
    {
      icon: "/featureIcon/feature3.png",
      title: "Image resize to save bandwidth",
    },
    {
      icon: "/featureIcon/feature2.png",
      title: "Fast Gateway that streams even 4k videos",
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
  ],
  StorageFeature: [
    {
      icon: "/suitsIcon/suitsIcon1.png",
      title: "Lighthouse Files",
      description:
        "Pay once and store forever cost model is a pretty new storage cost model which is different from existing protocols. ",
    },
    {
      icon: "/suitsIcon/suitsIcon2.png",
      title: "Lighthouse SDK",
      description:
        "Pay once and store forever cost model is a pretty new storage cost model which is different from existing protocols. ",
    },

    {
      icon: "/suitsIcon/suitsIcon3.png",
      title: "Lighthouse CLI",
      description:
        "Pay once and store forever cost model is a pretty new storage cost model which is different from existing protocols. ",
    },
    {
      icon: "/suitsIcon/suitsIcon4.png",
      title: "Lighthouse Kavach",
      description:
        "Pay once and store forever cost model is a pretty new storage cost model which is different from existing protocols. ",
    },
  ],

  FAQs: [
    {
      question: "What does it mean by permanent storage?",
      answer:
        "The permanent storage means you pay once for your files storage and its meant to be stored forever. No need of recurrently paying for your files.\n",
    },
    {
      question: "How long will data be stored on Lighthouse?",
      answer:
        "As we approach our mainnet, we tend to be pretty transparent on the estimated number of years your data will be stored. For example, at start, your data might be estimated to be stored for 25 years but as the endowment pool grows over time given the economic model of Lighthouse, the time for which your files are stored should also keep on increasing. If the economic model works as we are proposing it to be, your files shouldn’t be needed to paid for again for a very very long period of time",
    },
    {
      question: "	What are the upload or file size restrictions on Lighthouse?",
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
        "We definitely understand that not all use cases will require storing data permanently. Files can be deleted off from our hot storage and other filecoin miners. However, this doesn’t prevent nodes in the IPFS decentralised storage network from retaining copies of data indefinitely. If you are looking for use cases involving editing the files, you can contact us via email or discord, we can discuss how you can achieve that using mutable references.\n",
    },
    {
      question: "What does it cost to store data to Lighthouse?",
      answer:
        'Currently we have an incentivization program for projects to get free storage to store on Lighthouse.  <a href="https://airtable.com/shrPFC2TgojuOAYO4"> Fill up this form  </a>.  Although the actual cost per GB will be dynamic and we estimate it to be around $5 / GB or less. More info on exact cost will be calculated as we approach mainnet',
    },
    {
      question: "How can I pay for the Lighthouse?",
      answer:
        "You can pay per file depending on the file size or top up the associated API key with prepaid storage space in multiple tokens like polygon, USDC, USDT, DAI, other native chain tokens\n",
    },
    {
      question: "How is it different from IPFS and Filecoin?",
      answer:
        "IPFS is a distributed storage network famous for its content-addressing way of referencing files which makes it tamper-proof. There is no way to pay an IPFS node to store your files in an IPFS token (because there is no such token :P). \nThat’s why Filecoin is built on IPFS and allows anyone to pay using Filecoin tokens to storage miners to store your files. Although, Lighthouse is built on IPFS and Filecoin miner network, there are couple of value adds that Lighthouse brings in\n\n1. Permanent storage - in filecoin you have to recurrently pay for your files else the miner will drop your files. Lighthouse solves this by bringing in permanent storage ability\n\n2. Ease of interaction - Lighthouse abstracts away complexities of directly using filecoin and dealing with filecoin miner network\n\n3. Private files - IPFS and Filecoin by default are public storage networks and anyone can see data you upload. Building your own encryption layer is not an easy job. Lighthouse by default provides the user a layer of encryption and access control for encrypting your files/data along with sharing to authorised users.\n",
    },
    {
      question: "How is it different from Arweave?",
      answer:
        "Lighthouse aims to be a cheaper storage option than Arweave for permanent storage along with verifiable storage guarantees and facilitate more scalable storage abilities\n",
    },
    {
      question: "Which chains does it support?",
      answer:
        "Users can interact with the following chains to pay for storage and get verifiable record of storage on Lighthouse\n\n1. Ethereum\n2. Polygon\n3. BSC\n4. Fantom\n5. Optimism\n6. More coming soon\n",
    },
  ],

  Documentation: {
    title: "Lighthouse Documentation",
    subtitle:
      "Lighthouse is a perpetual decentralized file storage protocol that allows the ability to pay once and store forever",
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
  contactMail: "mail@lighthouse.storage",
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
      text: "Terms & Conditions",
      path: null,
      link: null,
    },
    {
      text: "Private Policy",
      path: null,
      link: null,
    },
  ],
};

export const testimonialSection = {
  title: "What creators are saying about Lighthouse",
  subTitle:
    "Testimonials from creative professionals who rely on Lighthouse to shine a light on their work.",
  testimonials: [
    {
      quote:
        "Filecoin/Lighthouse incentivized storage promotes data availability market competition for modular blockchains like Syscoin/Ethereum. Cheaper and secure than cloud storage, ensuring long-term data liveness guarantees for network participants.",
      person: "Jagdeep sidhu",
      designation: "syscoin",
    },
    {
      quote:
        "Using Lighthouse Storage has been a game changer for our projects. Its exceptional speed and reliability have surpassed all other storage solutions we've tried, making it our go-to choice for our storage needs.",
      person: "Vivek pal",
      designation: "Shastra OS",
    },
    {
      quote:
        "Implementing Lighthouse Protocol was a breeze! Clear documentation and step-by-step instructions made integration fast. Kudos to the team for great Devrel support. Excited to use it again and recommend to others.",
      person: "Akashya",
      designation: "Strive",
    },
    {
      quote:
        "Lighthouse is the missing piece in the web3 ecosystem that enables OKcontract users to directly upload and pin to IPFS transparently and permanently.",
      person: "Henri",
      designation: "OKContract",
    },
  ],
};

export const documentationCards = [
  {
    title: "Introduction",
    subTitle: "Learn about lighthouse and how it is diffrent",
    link: "https://docs.lighthouse.storage/lighthouse-1/",
  },
  {
    title: "CLI Commands",
    subTitle:
      "Learn to install the package globally on your system using our npm package",
    link: "https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands",
  },
  {
    title: "Code Examples",
    subTitle: "Go through our detailed code examples",
    link: "https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands",
  },
  {
    title: "Developers Link",
    subTitle: "Explore all our public repositories",
    link: "https://github.com/lighthouse-web3",
  },
];
