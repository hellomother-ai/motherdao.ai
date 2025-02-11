import { AuctionType } from "@axis-finance/types";

export const auctionHouseTypes: Record<AuctionType, string> = {
  [AuctionType.SEALED_BID]: "batch",
  [AuctionType.FIXED_PRICE_BATCH]: "batch",
};

export function getAuctionType(auctionRef?: string) {
  if (!auctionRef) return;
  const key = auctionRef;
  const type = key.toLowerCase().includes("emp")
    ? AuctionType.SEALED_BID
    : AuctionType.FIXED_PRICE_BATCH;

  if (!type) {
    throw new Error(
      `Unable to find AuctionType for hex:${auctionRef}->decoded:${key}`,
    );
  }

  return type;
}
