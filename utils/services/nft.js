const LIGHTHOUSE_GATEWAY = "https://gateway.lighthouse.storage/ipfs/";

const CONFIG = {
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: "base-sepolia", // "base" for mainnet
  contractAddress: "0xef81468b1caA25Df98efB436C62450b10A34819a",
  ownerAddress: "0x0035cd0CA79A5b156d5443b698655DBDc5403B45",
};

/**
 * Convert any IPFS URL to Lighthouse gateway URL
 * Handles:
 *   - ipfs://CID/path
 *   - https://ipfs.io/ipfs/CID/path
 *   - https://alchemy.mypinata.cloud/ipfs/CID/path
 *   - https://gateway.lighthouse.storage/ipfs/CID/path (already correct)
 */
function toLighthouseGateway(url) {
  if (!url) return null;

  // Already using Lighthouse gateway
  if (url.startsWith(LIGHTHOUSE_GATEWAY)) {
    return url;
  }

  // Handle ipfs:// protocol
  if (url.startsWith("ipfs://")) {
    return LIGHTHOUSE_GATEWAY + url.slice(7); // Remove "ipfs://"
  }

  // Handle other IPFS gateways (extract CID and path)
  const ipfsMatch = url.match(/\/ipfs\/(.+)$/);
  if (ipfsMatch) {
    return LIGHTHOUSE_GATEWAY + ipfsMatch[1];
  }

  // Return as-is if not an IPFS URL
  return url;
}

/**
 * Fetch metadata JSON from a URL
 */
async function fetchMetadata(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch metadata from ${url}:`, error.message);
    return null;
  }
}

/**
 * Fetch owned NFTs with token IDs, URIs, and images
 */
async function fetchOwnedNFTs(
  alchemyApiKey,
  network,
  contractAddress,
  ownerAddress,
) {
  const alchemy = new Alchemy({
    apiKey: alchemyApiKey,
    network: network === "base" ? Network.BASE_MAINNET : Network.BASE_SEPOLIA,
  });

  // Fetch NFTs owned by address for this contract
  const response = await alchemy.nft.getNftsForOwner(ownerAddress, {
    contractAddresses: [contractAddress],
    omitMetadata: false,
  });

  // Process each NFT
  const nfts = [];

  for (const nft of response.ownedNfts) {
    const tokenId = parseInt(nft.tokenId);
    const assetIndex = ((tokenId - 1) % 3333) + 1;

    // Get the raw tokenURI and convert to Lighthouse gateway
    const rawTokenURI = nft.tokenUri;
    const tokenURI = toLighthouseGateway(rawTokenURI);

    // Fetch metadata from Lighthouse gateway
    const metadata = await fetchMetadata(tokenURI);

    // Get image URL and convert to Lighthouse gateway
    const rawImage = metadata?.image || null;
    const image = toLighthouseGateway(rawImage);

    nfts.push({
      tokenId,
      assetIndex,
      tokenURI,
      image,
      name: metadata?.name,
    });
  }

  return nfts;

  /*
  Output:
  [
  {
    "tokenId": 1,
    "assetIndex": 1,
    "tokenURI": "https://gateway.lighthouse.storage/ipfs/bafybeia6jpellhwnaimsxoxgaberubv4ljtw2uaa7niyld5kahv7thwsxq/1.json",
    "image": "https://gateway.lighthouse.storage/ipfs/bafybeigbwxqoxlgad3bf5o5e7e6qvj35tluqur6kl7euwze76j2bkd6hcq/1.png",
    "name": "Turby"
  },
  {
    "tokenId": 2,
    "assetIndex": 2,
    "tokenURI": "https://gateway.lighthouse.storage/ipfs/bafybeia6jpellhwnaimsxoxgaberubv4ljtw2uaa7niyld5kahv7thwsxq/2.json",
    "image": "https://gateway.lighthouse.storage/ipfs/bafybeigbwxqoxlgad3bf5o5e7e6qvj35tluqur6kl7euwze76j2bkd6hcq/2.png",
    "name": "Turby"
  },
  {
    "tokenId": 4,
    "assetIndex": 4,
    "tokenURI": "https://gateway.lighthouse.storage/ipfs/bafybeia6jpellhwnaimsxoxgaberubv4ljtw2uaa7niyld5kahv7thwsxq/4.json",
    "image": "https://gateway.lighthouse.storage/ipfs/bafybeigbwxqoxlgad3bf5o5e7e6qvj35tluqur6kl7euwze76j2bkd6hcq/4.png",
    "name": "Turby"
  },
  ...
  ]
  */
}

// Export for use in other files
export { fetchOwnedNFTs, toLighthouseGateway };
