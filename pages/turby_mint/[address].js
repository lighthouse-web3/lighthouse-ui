import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Metadata } from "../../components";
import { Footer, Header } from "../../containers";
import Styles from "../../styles/turby_mint.module.scss"; // Reusing styles from main page
import { ConfettiButton } from "../../components/ui/confetti-button";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";

export default function TurbyProfilePage() {
  const router = useRouter();
  const { address } = router.query;
  const isSuccess = router.query.success === "true";

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Helper to truncate wallet address
  const truncateAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  useEffect(() => {
    if (address) {
      fetchNFTs();
    }
  }, [address]);

  useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      // Run confetti twice
      setTimeout(() => {
        // Trigger second burst if needed via logic or just let the button handle it
      }, 1000);
    }
  }, [isSuccess]);

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/fetch_turby_nfts", {
        ownerAddress: address,
      });
      setNfts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalMinted = nfts.length;
  // Assuming strict price of 0.01 ETH per mint as per main page config
  const mintPrice = 0.01;
  const totalValue = totalMinted * mintPrice;

  return (
    <>
      <Metadata title={`Turby Profile | ${truncateAddress(address)}`} />
      <div className="bodyContainer">
        <Header />

        <main className={Styles.mintContainer}>
          <div className={Styles.heroBackground}>
            <div className={Styles.heroOverlay} />
            {/* Using same bg image for consistency */}
            <img
              src="https://ipfs.io/ipfs/bafybeidece5bblxlfzthzr2oi6js7brqbp25mbiwqwr43y5hs4txxuerie"
              alt="Turby NFT"
              className={Styles.heroImage}
            />
          </div>

          <div className={Styles.contentWrapper}>
            {/* Success Notification */}
            {isSuccess && showConfetti && (
              <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex items-center justify-center">
                <ConfettiButton
                  options={{
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                  }}
                  className="hidden" // Hidden button to trigger confetti via ref/effect if needed,
                  // OR we can just use the component to auto-fire if we adapted it.
                  // The ConfettiButton component we fixed has manual triggers.
                  // Let's rely on the one inside the component or simple logic.
                >
                  <span className="sr-only">Fire Confetti</span>
                </ConfettiButton>
                <ConfettiAutoFire run={true} />
              </div>
            )}

            {isSuccess && (
              <div className="w-full max-w-2xl mx-auto mb-8 bg-[#20bb5520] border border-[#20bb55] rounded-xl p-4 text-center backdrop-blur-md">
                <h2 className="text-[#20bb55] font-bold text-xl mb-1">
                  Mint Successful!
                </h2>
                <p className="text-[var(--txt-secondary-clr)]">
                  Congratulations on your new Turby NFT!
                </p>
              </div>
            )}

            <div
              className={Styles.mintCard}
              style={{ maxWidth: "1000px", width: "100%" }}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--card-border-clr)]">
                <div className="flex items-center gap-4">
                  <Link href="/turby_mint">
                    <a className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card-bg-clr)] hover:bg-[var(--card-bg-hover-clr)] transition-colors text-[var(--txt-clr)]">
                      <IconArrowLeft size={20} />
                    </a>
                  </Link>
                  <div>
                    <div className="text-2xl font-bold text-[var(--txt-clr)] mb-1 text-left ml-2">
                      My Turby Collection
                    </div>
                    <div className="text-[var(--txt-secondary-clr)] text-sm font-mono bg-[var(--card-bg-clr)] py-1 px-3 rounded-md inline-block">
                      {address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[var(--card-bg-clr)] rounded-xl p-6 border border-[var(--card-border-clr)] text-center">
                  <div className="text-3xl font-bold text-[var(--txt-clr)] mb-2">
                    {totalMinted}
                  </div>
                  <div className="text-[var(--txt-secondary-clr)] uppercase text-xs tracking-wider">
                    Total Minted
                  </div>
                </div>
                <div className="bg-[var(--card-bg-clr)] rounded-xl p-6 border border-[var(--card-border-clr)] text-center">
                  <div className="text-3xl font-bold text-[var(--txt-clr)] mb-2">
                    {totalValue.toFixed(4)} ETH
                  </div>
                  <div className="text-[var(--txt-secondary-clr)] uppercase text-xs tracking-wider">
                    Total Value
                  </div>
                </div>
              </div>

              {/* NFT Grid */}
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--txt-clr)]"></div>
                </div>
              ) : nfts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nfts.map((nft) => (
                    <div
                      key={nft.tokenId}
                      className="bg-[var(--card-bg-clr)] rounded-xl overflow-hidden border border-[var(--card-border-clr)] hover:border-[#6450E3] transition-colors group"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        {nft.image ? (
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[var(--card-bg-clr)] text-[var(--txt-secondary-clr)]">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-[var(--txt-clr)] truncate">
                          {nft.name || `Turby #${nft.tokenId}`}
                        </h3>
                        <p className="text-[var(--txt-secondary-clr)] text-sm mt-1">
                          Token ID: {nft.tokenId}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-[var(--txt-secondary-clr)]">
                  <p>No Turby NFTs found in this wallet.</p>
                  <Link href="/turby_mint">
                    <a className="inline-block mt-4 text-[#6450E3] hover:underline">
                      Mint your first Turby now!
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Simple component to auto-trigger confetti
function ConfettiAutoFire({ run }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && run) {
      import("canvas-confetti").then((confetti) => {
        const fire = (defaults, opts) => {
          confetti.default({
            origin: { y: 0.6 },
            ...defaults,
            ...opts,
          });
        };

        const shoot = () => {
          fire(
            { spread: 26, startVelocity: 55 },
            { particleCount: 200, spread: 100 },
          );
          fire({ spread: 60 }, { particleCount: 150, spread: 100 });
        };

        shoot();
        setTimeout(shoot, 400); // Second burst
        setTimeout(shoot, 800); // Third burst for good measure
      });
    }
  }, [mounted, run]);

  return null;
}
