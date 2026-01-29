import { fetchOwnedNFTs } from "../../ai_context/fetch_nft";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { ownerAddress } = req.body;

  if (!ownerAddress) {
    return res.status(400).json({ message: "Owner address is required" });
  }

  // Use server-side environment variable for Alchemy
  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const network = "base-sepolia";
  const contractAddress = "0xef81468b1caA25Df98efB436C62450b10A34819a";

  try {
    const nfts = await fetchOwnedNFTs(
      alchemyApiKey,
      network,
      contractAddress,
      ownerAddress,
    );
    res.status(200).json(nfts);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ message: "Failed to fetch NFTs" });
  }
}
