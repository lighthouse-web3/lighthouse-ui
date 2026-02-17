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
  IconPlus,
  IconMinus,
  IconUser,
} from "@tabler/icons-react";
import { SiOpensea } from "react-icons/si";
import { RiScanFill } from "react-icons/ri";

import { formatEther, parseEther } from "viem";
import { useRouter } from "next/router";
import Link from "next/link";
import FAQContainer from "../containers/Faq-container/FaqContainer";
import { turbyMintStaticContent } from "../utils/Data/TurbyContent";

// RainbowKit/Wagmi hooks (v1 API)
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

// Helper to truncate wallet address
const truncateAddress = (addr) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

import { TURBY_ABI } from "../utils/abi/turbyABI";
import { NFTcontractAddress, NFTNetwork } from "../utils/Data/config";

// NFT Configuration - Update these values
const NFT_CONFIG = {
  ...turbyMintStaticContent,
  contractAddress: NFTcontractAddress,
};

export default function TurbyMintPage() {
  // RainbowKit/Wagmi hooks
  const { address, isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { data: balanceData } = useBalance({
    address: address,
    chainId: NFTNetwork === "base" ? base.id : baseSepolia.id,
    watch: true,
  });
  console.log("balanceData", balanceData);
  console.log(NFTNetwork === "base" ? base.id : baseSepolia.id);

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
  const maxPerTx = typeof maxPerTxData === "bigint" ? maxPerTxData : BigInt(0);
  console.log(maxPerTx, "max per tx");

  const maxPerWallet =
    typeof maxPerWalletData === "bigint" ? maxPerWalletData : BigInt(0);
  const alreadyMinted =
    typeof mintedByWalletData === "bigint" ? mintedByWalletData : BigInt(0);

  const remainingWallet =
    maxPerWallet > 0
      ? maxPerWallet > alreadyMinted
        ? maxPerWallet - alreadyMinted
        : BigInt(0)
      : null;

  // Infinite supply logic:
  // We don't check a global remainingSupply.
  // Initial maxAllowed is constrained by maxPerTx.
  // If maxPerTx is 0 (formatted as "Unlimited"), we pick a reasonable safety cap for the UI (e.g. 50).
  let maxAllowed = maxPerTx > 0 ? maxPerTx : BigInt(50);
  console.log(maxAllowed, "max allowed");

  // If there's a wallet limit, that's the hard ceiling (if we haven't already hit it).
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

  // Network Switching Logic
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const targetChainId = NFTNetwork === "base" ? base.id : baseSepolia.id;

  useEffect(() => {
    if (isConnected && chain?.id !== targetChainId && switchNetwork) {
      switchNetwork(targetChainId);
    }
  }, [isConnected, chain, switchNetwork, targetChainId]);

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
    chainId: NFTNetwork === "base" ? base.id : baseSepolia.id,
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
  const incrementQuantity = () => {
    setMintQuantityInput((prev) => {
      const current = parseInt(prev, 10) || 0;
      if (current >= inputMax) return String(inputMax);
      return String(current + 1);
    });
  };

  const decrementQuantity = () => {
    setMintQuantityInput((prev) => {
      const current = parseInt(prev, 10) || 0;
      if (current <= 1) return "1";
      return String(current - 1);
    });
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

    if (isSoldOut) {
      return;
    }

    try {
      const tx = await mintWrite();
      if (tx && tx.hash) {
        await router.push(`/turby_mint/${address}?success=true`);
      }
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
      : isSoldOut
        ? "Limit Reached"
        : !hasSufficientBalance
          ? "Insufficient ETH balance"
          : isMinting
            ? "Minting..."
            : isConfirming
              ? "Confirming..."
              : `Mint ${mintQuantity} NFT${mintQuantity > 1 ? "s" : ""}`;

  console.log(isConnected);
  console.log(isMintEnded);
  console.log(isSoldOut);
  console.log(hasSufficientBalance);
  console.log(!mintWrite, "mint write");

  const isMintActionDisabled =
    isConnected &&
    (isSoldOut || !hasSufficientBalance || isMinting || isConfirming);

  console.log(isMintActionDisabled, "isMintActionDisabled");

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

              {/* sqaure image of turby gif -> /turby_mint/turby.gif */}
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/turby/turby_gif.gif"
                  alt="Turby NFT"
                  className={Styles.turbyGif}
                />
              </div>

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
                  href={NFT_CONFIG.socialLinks.baseScan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <RiScanFill size={20} style={{ rotate: "314deg" }} />
                </a>
                <a
                  href={NFT_CONFIG.socialLinks.opensea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <SiOpensea size={20} />
                </a>
                {/* <a
                  href={NFT_CONFIG.socialLinks.contactMail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Styles.socialIcon}
                >
                  <IconMail size={20} />
                </a> */}
              </div>

              {/* Stats Row */}
              <div className={Styles.statsRow}>
                <div className={Styles.statItem}>
                  <span className={Styles.statValue}>
                    {mintedCount.toString()}
                  </span>
                  <span className={Styles.statLabel}>NFTs Minted</span>
                </div>
                <div className={Styles.statItem}>
                  <span className={Styles.statValue}>{displayPrice} ETH</span>
                  <span className={Styles.statLabel}>Price / NFT</span>
                </div>
              </div>

              {/* Mint Section - Only show when connected */}
              {isConnected && !isMintEnded && (
                <div className={Styles.mintSection}>
                  {/* Connected Wallet Info */}
                  <div className={Styles.walletInfo}>
                    <div className={Styles.walletAddress}>
                      <span className={Styles.walletLabel}>Connected:</span>
                      <Link href={`/turby_mint/${address}`}>
                        <a className={Styles.walletValue}>
                          {truncateAddress(address)}
                        </a>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/turby_mint/${address}`}>
                        <a
                          className={Styles.profileBtn}
                          style={{ marginRight: "8px", textDecoration: "none" }}
                          title="View Profile"
                        >
                          <IconUser size={18} />
                          <span>Profile</span>
                        </a>
                      </Link>
                      <button
                        className={Styles.disconnectBtn}
                        onClick={() => disconnect()}
                        title="Disconnect wallet"
                      >
                        <IconLogout size={18} />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>

                  <div className={`${Styles.quantityRow} !mb-2`}>
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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center border border-[var(--card-border-clr)] rounded-lg overflow-hidden h-[42px]">
                      <button
                        onClick={decrementQuantity}
                        disabled={mintQuantity <= 1 || isSoldOut}
                        className="px-3 py-2 hover:bg-[var(--card-bg-hover-clr)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--txt-clr)]"
                      >
                        <IconMinus size={18} />
                      </button>
                      <div className="w-12 text-center text-[var(--txt-clr)] font-medium bg-transparent border-x border-[var(--card-border-clr)] h-full flex items-center justify-center">
                        {mintQuantity}
                      </div>
                      <button
                        onClick={incrementQuantity}
                        disabled={mintQuantity >= inputMax || isSoldOut}
                        className="px-3 py-2 hover:bg-[var(--card-bg-hover-clr)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--txt-clr)]"
                      >
                        <IconPlus size={18} />
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-sm text-[var(--txt-secondary-clr)]">
                      <div className={Styles.limitItem}>
                        <span>Minted by you: </span>
                        <Link href={`/turby_mint/${address}`}>
                          <a className="text-[#6450E3] hover:underline font-medium">
                            {alreadyMinted.toString()}
                          </a>
                        </Link>
                      </div>
                      <span className={Styles.limitItem}>
                        Available now: {maxMintable > 0 ? maxMintable : 0}
                      </span>
                    </div>
                  </div>

                  {/* Limits moved to tooltip or just shown above if needed, but user asked to remove max/tx from below input. 
                      However, we still need to show them somewhere? The prompt implies "rest of the rules should be applied here 
                      as well such as max per transaction , max per wallet etc" which we did in logic. 
                      "Use (...) faq object - which covers all the rules of minting eg. max per transactions & max per wallet"
                      So maybe we remove the text display completely? "remove max per transaction and max per wallet from below the input bar"
                      I will remove the old limitRow.
                   */}

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
                disabled={isMintActionDisabled}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </main>

        {/* FAQ Section - Full height */}
        <div className="flex items-center">
          <div className="contentContainer styleContainer flex-1">
            <FAQContainer type="turby" />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
