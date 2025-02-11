import { BatchAuction } from "@axis-finance/types";
import { verifiedFetch } from "@helia/verified-fetch";
import { CID } from "multiformats/cid";
import { formatAuctionInfo } from "utils/format-auction-info";

export async function fetchAuctionMetadata(auction: BatchAuction) {
  if (auction.info) return auction;

  //Cant fetch if no hash is present
  if (!auction.created.infoHash) {
    return auction;
  }

  //Only V1 hashes (baf...) are support so we need to convert
  const isV0 = auction.created.infoHash.toLowerCase().startsWith("qm");
  const cid = isV0
    ? CID.parse(auction.created.infoHash).toV1().toString()
    : auction.created.infoHash;

  try {
    const response = await verifiedFetch(`ipfs://${cid}`);

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const info = await response.json();
      return {
        ...auction,
        info: formatAuctionInfo(info),
      };
    }

    if (contentType.includes("application/octet-stream")) {
      const text = await response.text();

      try {
        //Format subgraph info into the expected format
        const info = formatAuctionInfo(JSON.parse(text));

        return { ...auction, info };
      } catch (e) {
        console.warn("Failed to parse octet-stream as JSON:", {
          cid,
          text,
          e,
          auction,
        });
        return auction;
      }
    }

    return auction;
  } catch (error) {
    console.error("VERIFIED_FETCH_ERROR:", error, { auction, cid });
    return auction;
  }
}
