import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  braveWallet,
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
  uniswapWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

/**
 * Wagmi/RainbowKit configuration for wallet connection
 * Base Sepolia is used for the Turby NFT minting
 */

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, baseSepolia],
  [publicProvider()],
);

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";
console.log(projectId);
const appName = "Lighthouse";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      // Base wallet uses Coinbase Wallet in RainbowKit v1
      metaMaskWallet({ projectId, chains }),
      phantomWallet({ chains }),
      braveWallet({ chains }),
      rabbyWallet({ chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      okxWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      uniswapWallet({ projectId, chains }),
      coinbaseWallet({ appName, chains }),
      injectedWallet({ chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  chains,
  publicClient,
  webSocketPublicClient,
});

export { chains };
