import {
  AuctionStatus,
  type NonNullSubgraphAuction,
} from "@axis-finance/types";

/**
 * Determines the auction status dynamically.
 * The subgraph doesn't receive an event when an auction starts or concludes, so
 * we need to derive this on the frontend.
 */
export function getAuctionStatus(
  auction: NonNullSubgraphAuction,
): AuctionStatus {
  const subgraphAuction = auction as NonNullSubgraphAuction;

  const { start, conclusion } = subgraphAuction;

  const isConcluded =
    Date.now() > new Date(Number(conclusion) * 1000).getTime();

  const isLive =
    !isConcluded && Date.now() > new Date(Number(start) * 1000).getTime();

  const subgraphStatus = (
    subgraphAuction?.encryptedMarginalPrice?.status ||
    subgraphAuction?.fixedPrice?.status
  )?.toLowerCase();

  // All auctions are "live" once their start time has passed
  if (subgraphStatus === "created" && isLive) return "live";

  // An EMP auction could be past its conclusion date and not yet decrypted
  if (subgraphStatus === "created" && isConcluded) return "concluded";

  return subgraphStatus as AuctionStatus;
}
