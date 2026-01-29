import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

/**
 * Wagmi/RainbowKit configuration for wallet connection
 * Base Sepolia is used for the Turby NFT minting
 */

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepolia],
  [publicProvider()],
);

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";
console.log(projectId);

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      injectedWallet({ projectId, chains }),
      phantomWallet({ chains }),
      // walletConnectWallet({ projectId, chains }),
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
