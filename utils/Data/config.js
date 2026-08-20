export const baseUrl = "https://cms.lighthouse.storage/api";
export const mediaUrl = "https://cms.lighthouse.storage";

/** Canonical origin. Must match robots.txt and the sitemap, with no trailing slash. */
export const SITE_URL = "https://www.lighthouse.storage";

/**
 * IndexNow key. The API verifies ownership by fetching
 * `${SITE_URL}/${indexNowKey}.txt` and checking it contains this exact string,
 * so public/<key>.txt must be renamed alongside any change here.
 */
export const indexNowKey = "e9eae92d9262f352adcaac354e0d5cd6";
export const NFTcontractAddress = "0x6300eA10619651E33505629e2b6077FD55d65444";
// export const NFTcontractAddress = "0xef81468b1caA25Df98efB436C62450b10A34819a";
export const NFTNetwork = "base";
// export const NFTNetwork = "base-sepolia";
