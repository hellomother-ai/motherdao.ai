import { AuctionType } from "@axis-finance/types";

export const auctionMetadata: Record<
  AuctionType,
  { label: string; tooltip: string; value: AuctionType }
> = {
  [AuctionType.SEALED_BID]: {
    value: AuctionType.SEALED_BID,
    label: "EMP Launch",
    tooltip:
      "Encrypted Marginal Price Auction is a fully on-chain, sealed-bid, batch auction system built on the Axis Protocol that uses ECIES encryption and a multi-step settlement process to avoid issues of previous sealed bid auction designs.",
  },
  [AuctionType.FIXED_PRICE_BATCH]: {
    value: AuctionType.FIXED_PRICE_BATCH,
    label: "Fixed-Price Batch",
    tooltip:
      "Fixed-Price batch is a fully on-chain, fixed-price batch auction system",
  },
};

export function getAuctionMetadata(type: AuctionType) {
  return auctionMetadata[type];
}
