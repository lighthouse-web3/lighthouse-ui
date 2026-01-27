"use client";
import { useState } from "react";
import { Metadata } from "../components";
import { Footer, Header } from "../containers";
import Styles from "../styles/turby_mint.module.scss";
import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandX,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconMail,
  IconInstagram,
} from "@tabler/icons-react";

// RainbowKit/Wagmi hooks (v1 API)
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

// Helper to truncate wallet address
const truncateAddress = (addr) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

// NFT Configuration - Update these values
const NFT_CONFIG = {
  name: "MINT TURBY",
  chain: "Base Sepolia",
  description:
    "Turby is a unique NFT turtle, a symbol of our community for Lighthouse. Cute, quirky, and truly yours—join the Web3 movement and own a piece of the future with on-chain permanence and personality!",
  totalSupply: 3333,
  mintedCount: 133, // This should be fetched from contract
  price: 0.0001, // ETH
  contractAddress: "YOUR_CONTRACT_ADDRESS_HERE", // Update with actual contract
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/lighthouse-web3",
    twitter: "https://twitter.com/lighthouseweb3",
    telegram: "https://t.me/LighthouseStorage",
    discord: "https://discord.com/invite/c4a4CGCdJG",
    instagram:
      "https://www.instagram.com/lighthouseweb3/?igshid=MDM4ZDc5MmU%3D",
    contactMail: "mail@lighthouse.storage",
  },
};

export default function TurbyMintPage() {
  // RainbowKit/Wagmi hooks
  const { address, isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({
    address: address,
    chainId: baseSepolia.id,
    watch: true,
  });

  const [mintQuantity, setMintQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Get ETH balance
  const ethBalance = balanceData ? parseFloat(balanceData.formatted) : 0;

  // Check if user has sufficient balance
  const requiredAmount = NFT_CONFIG.price * mintQuantity;
  const hasSufficientBalance = ethBalance >= requiredAmount;

  // Handle mint quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxMintable = NFT_CONFIG.totalSupply - NFT_CONFIG.mintedCount;
    setMintQuantity(Math.max(1, Math.min(value, maxMintable)));
  };

  // Handle mint action
  const handleMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    // TODO: Implement actual minting logic with contract interaction
    console.log("Minting", mintQuantity, "NFTs");
    console.log("To address:", address);
  };

  // Truncate description for "See more" functionality
  const truncatedDescription = NFT_CONFIG.description.slice(0, 80) + "...";

  return (
    <>
      <Metadata title="Lighthouse Turby | Mint NFT" />
      <div className="bodyContainer">
        <Header />

        <main className={Styles.mintContainer}>
          {/* Background Image Section */}
          <div className={Styles.heroBackground}>
            <div className={Styles.heroOverlay} />
            <img
              src="/turby/turby_1.jpeg"
              alt="Turby NFT"
              className={Styles.heroImage}
            />
          </div>

          {/* Content Section */}
          <div className={Styles.contentWrapper}>
            <div className={Styles.mintCard}>
              {/* Title */}
              <h1 className={Styles.title}>{NFT_CONFIG.name}</h1>

              {/* Chain Badge */}
              <div className={Styles.chainBadge}>
                <span className={Styles.chainLabel}>Chain:</span>
                <span className={Styles.chainIcon}>●</span>
                <span className={Styles.chainName}>{NFT_CONFIG.chain}</span>
              </div>

              {/* Description */}
              <div className={Styles.description}>
                <p>
                  {isDescriptionExpanded
                    ? NFT_CONFIG.description
                    : truncatedDescription}
                </p>
                <button
                  className={Styles.seeMoreBtn}
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? "See less" : "See more"}
                  {isDescriptionExpanded ? (
                    <IconChevronUp size={16} />
                  ) : (
                    <IconChevronDown size={16} />
                  )}
                </button>
              </div>

              {/* Social Icons */}
              <div className={Styles.socialIcons}>
                <a
                  href={NFT_CONFIG.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <IconBrandX size={20} />
                </a>
                <a
                  href={NFT_CONFIG.socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <IconBrandDiscord size={20} />
                </a>
                <a
                  href={NFT_CONFIG.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <IconBrandTelegram size={20} />
                </a>
                <a
                  href={NFT_CONFIG.socialLinks.contactMail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <IconMail size={20} />
                </a>
              </div>

              {/* Stats Row */}
              <div className={Styles.statsRow}>
                <div className={Styles.statItem}>
                  <span className={Styles.statValue}>
                    {NFT_CONFIG.mintedCount} / {NFT_CONFIG.totalSupply}
                  </span>
                  <span className={Styles.statLabel}>Tokens</span>
                </div>
                <div className={Styles.statItem}>
                  <span className={Styles.statValue}>
                    {NFT_CONFIG.price} ETH
                  </span>
                  <span className={Styles.statLabel}>Price</span>
                </div>
              </div>

              {/* Mint Section - Only show when connected */}
              {isConnected && (
                <div className={Styles.mintSection}>
                  {/* Connected Wallet Info */}
                  <div className={Styles.walletInfo}>
                    <div className={Styles.walletAddress}>
                      <span className={Styles.walletLabel}>Connected:</span>
                      <span className={Styles.walletValue}>
                        {truncateAddress(address)}
                      </span>
                    </div>
                    <button
                      className={Styles.disconnectBtn}
                      onClick={() => disconnect()}
                      title="Disconnect wallet"
                    >
                      <IconLogout size={18} />
                      <span>Disconnect</span>
                    </button>
                  </div>

                  {/* Quantity Input */}
                  <div className={Styles.quantityRow}>
                    <div className={Styles.quantityLabel}>
                      <span>How many to mint?</span>
                      <div className="tooltipWrapper">
                        <IconInfoCircle size={16} />
                        <div className="tooltipContent">
                          Enter the number of NFTs you want to mint
                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    type="number"
                    value={mintQuantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={NFT_CONFIG.totalSupply - NFT_CONFIG.mintedCount}
                    className={Styles.quantityInput}
                  />

                  {/* ETH Balance Display */}
                  <div className={Styles.balanceRow}>
                    <span className={Styles.balanceLabel}>Your Balance:</span>
                    <span className={Styles.balanceValue}>
                      {ethBalance.toFixed(6)} ETH
                    </span>
                  </div>
                </div>
              )}

              {/* Connect/Mint Button */}
              <button
                className={`${Styles.mintButton} ${
                  isConnected && !hasSufficientBalance
                    ? Styles.insufficientBalance
                    : ""
                }`}
                onClick={handleMint}
                disabled={isConnected && !hasSufficientBalance}
              >
                {isConnecting
                  ? "Connecting..."
                  : !isConnected
                    ? "Connect Wallet"
                    : !hasSufficientBalance
                      ? "Insufficient ETH balance"
                      : `Mint ${mintQuantity} NFT${mintQuantity > 1 ? "s" : ""}`}
              </button>

              {/* Powered By */}
              {/* <div className={Styles.poweredBy}>
                <span>Powered by</span>
                <img src="/logo.svg" alt="Lighthouse" height={20} />
              </div> */}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
