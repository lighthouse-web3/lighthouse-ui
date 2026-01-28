"use client";
import { useEffect, useState } from "react";
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
import { formatEther, parseEther } from "viem";

// RainbowKit/Wagmi hooks (v1 API)
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

// Helper to truncate wallet address
const truncateAddress = (addr) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const TURBY_ABI = [
  {
    inputs: [],
    name: "mintPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPerTransaction",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPerWallet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "numberMinted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintEnded",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "quantity", type: "uint256" }],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

// NFT Configuration - Update these values
const NFT_CONFIG = {
  name: "MINT TURBY",
  chain: "Base Sepolia",
  description:
    "Turby is a unique NFT turtle, a symbol of our community for Lighthouse. Cute, quirky, and truly yours—join the Web3 movement and own a piece of the future with on-chain permanence and personality!",
  totalSupply: 3333,
  mintedCount: 133,
  price: 0.0001, // ETH fallback
  contractAddress: "0xef81468b1caA25Df98efB436C62450b10A34819a",
  socialLinks: {
    twitter: "https://twitter.com/lighthouseweb3",
    telegram: "https://t.me/LighthouseStorage",
    discord: "https://discord.com/invite/c4a4CGCdJG",
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

  const [mintQuantityInput, setMintQuantityInput] = useState("1");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { data: mintPriceData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "mintPrice",
    watch: true,
  });

  const { data: maxPerTxData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "maxPerTransaction",
    watch: true,
  });

  const { data: maxPerWalletData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "maxPerWallet",
    watch: true,
  });

  const { data: mintedByWalletData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "numberMinted",
    args: address ? [address] : undefined,
    enabled: Boolean(address),
    watch: true,
  });

  const { data: mintEndedData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "mintEnded",
  });

  const { data: totalSupplyData } = useContractRead({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "totalSupply",
    watch: true,
  });

  const mintPriceWei =
    typeof mintPriceData === "bigint"
      ? mintPriceData
      : parseEther(NFT_CONFIG.price.toString());
  const mintedCount =
    typeof totalSupplyData === "bigint"
      ? totalSupplyData
      : BigInt(NFT_CONFIG.mintedCount);
  const maxPerTx =
    typeof maxPerTxData === "bigint" ? maxPerTxData : BigInt(0);
  const maxPerWallet =
    typeof maxPerWalletData === "bigint" ? maxPerWalletData : BigInt(0);
  const alreadyMinted =
    typeof mintedByWalletData === "bigint" ? mintedByWalletData : BigInt(0);

  const totalSupplyLimit = BigInt(NFT_CONFIG.totalSupply);
  const remainingSupply =
    totalSupplyLimit > mintedCount
      ? totalSupplyLimit - mintedCount
      : BigInt(0);
  const remainingWallet =
    maxPerWallet > 0
      ? maxPerWallet > alreadyMinted
        ? maxPerWallet - alreadyMinted
        : BigInt(0)
      : null;

  let maxAllowed = remainingSupply;
  if (maxPerTx > 0 && maxAllowed > maxPerTx) {
    maxAllowed = maxPerTx;
  }
  if (remainingWallet !== null && maxAllowed > remainingWallet) {
    maxAllowed = remainingWallet;
  }

  const maxMintable = Number(maxAllowed);
  const inputMax = maxMintable > 0 ? maxMintable : 1;
  const isSoldOut = maxMintable <= 0;
  const isMintEnded = Boolean(mintEndedData);
  const parsedQuantity = Number.parseInt(mintQuantityInput, 10);
  const rawQuantity = Number.isNaN(parsedQuantity) ? 0 : parsedQuantity;
  const mintQuantity = Math.max(1, Math.min(rawQuantity || 1, inputMax));
  const totalCostWei = mintPriceWei * BigInt(mintQuantity);

  // Get ETH balance
  const ethBalance = balanceData ? parseFloat(balanceData.formatted) : 0;
  const balanceValue = balanceData?.value ?? BigInt(0);

  // Check if user has sufficient balance
  const hasSufficientBalance = balanceValue >= totalCostWei;

  useEffect(() => {
    setMintQuantityInput((current) => {
      const parsed = Number.parseInt(current, 10);
      if (Number.isNaN(parsed)) return current;
      if (parsed > inputMax) return String(inputMax);
      if (parsed < 1) return "1";
      return current;
    });
  }, [inputMax]);

  const canPrepareMint =
    isConnected &&
    !isMintEnded &&
    !isSoldOut &&
    mintQuantity > 0 &&
    mintQuantity <= maxMintable &&
    hasSufficientBalance;

  const { config: mintConfig } = usePrepareContractWrite({
    address: NFT_CONFIG.contractAddress,
    abi: TURBY_ABI,
    functionName: "mint",
    args: [BigInt(mintQuantity)],
    value: totalCostWei,
    chainId: baseSepolia.id,
    enabled: canPrepareMint,
  });

  const {
    writeAsync: mintWrite,
    data: mintTxData,
    isLoading: isMinting,
  } = useContractWrite(mintConfig);

  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: mintTxData?.hash,
  });

  // Handle mint quantity change
  const handleQuantityChange = (e) => {
    setMintQuantityInput(e.target.value);
  };

  const handleQuantityBlur = () => {
    const parsed = Number.parseInt(mintQuantityInput, 10);
    const safeValue = Number.isNaN(parsed) ? 1 : parsed;
    const clamped = Math.max(1, Math.min(safeValue, inputMax));
    setMintQuantityInput(String(clamped));
  };

  // Handle mint action
  const handleMint = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (isMintEnded || isSoldOut || !mintWrite) {
      return;
    }

    try {
      await mintWrite();
    } catch (error) {
      console.error(error);
    }
  };

  // Truncate description for "See more" functionality
  const truncatedDescription = NFT_CONFIG.description.slice(0, 80) + "...";

  const displayPrice = formatEther(mintPriceWei);
  const displayMaxPerTx = maxPerTx > 0 ? maxPerTx.toString() : "Unlimited";
  const displayMaxPerWallet =
    maxPerWallet > 0 ? maxPerWallet.toString() : "Unlimited";

  const buttonLabel = isConnecting
    ? "Connecting..."
    : !isConnected
      ? "Connect Wallet"
      : isMintEnded
        ? "Minting window is over"
        : isSoldOut
          ? "Sold out"
          : !hasSufficientBalance
            ? "Insufficient ETH balance"
            : isMinting
              ? "Minting..."
              : isConfirming
                ? "Confirming..."
                : `Mint ${mintQuantity} NFT${mintQuantity > 1 ? "s" : ""}`;

  const isMintActionDisabled =
    isConnected &&
    (isMintEnded ||
      isSoldOut ||
      !hasSufficientBalance ||
      isMinting ||
      isConfirming ||
      !mintWrite);

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
              src="https://ipfs.io/ipfs/bafybeidece5bblxlfzthzr2oi6js7brqbp25mbiwqwr43y5hs4txxuerie"
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
                    {mintedCount.toString()} / {NFT_CONFIG.totalSupply}
                  </span>
                  <span className={Styles.statLabel}>Tokens</span>
                </div>
                <div className={Styles.statItem}>
                  <span className={Styles.statValue}>
                    {displayPrice} ETH
                  </span>
                  <span className={Styles.statLabel}>Price</span>
                </div>
              </div>

              {/* Mint Section - Only show when connected */}
              {isConnected && !isMintEnded && (
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
                    value={mintQuantityInput}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    min={1}
                    max={inputMax}
                    disabled={isSoldOut}
                    className={Styles.quantityInput}
                  />

                  <div className={Styles.limitRow}>
                    <span className={Styles.limitItem}>
                      Max/tx: {displayMaxPerTx}
                    </span>
                    <span className={Styles.limitItem}>
                      Max/wallet: {displayMaxPerWallet}
                    </span>
                    <span className={Styles.limitItem}>
                      Minted by you: {alreadyMinted.toString()}
                    </span>
                    <span className={Styles.limitItem}>
                      Available now: {maxMintable > 0 ? maxMintable : 0}
                    </span>
                  </div>

                  {/* ETH Balance Display */}
                  <div className={Styles.balanceRow}>
                    <span className={Styles.balanceLabel}>Your Balance:</span>
                    <span className={Styles.balanceValue}>
                      {ethBalance.toFixed(6)} ETH
                    </span>
                  </div>
                </div>
              )}

              {isConnected && isMintEnded && (
                <div className={Styles.mintClosedBanner}>
                  Minting window is over.
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
                disabled={isMintActionDisabled}
              >
                {buttonLabel}
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
