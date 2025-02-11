import { type AuctionStatus, AuctionType } from "@axis-finance/types";
import type { GetBatchAuctionLotQuery } from "@axis-finance/subgraph-client";
import { getAuctionType } from "modules/auction/utils/get-auction-type";

const AUCTION_TYPE_PROPERTY_MAP = {
  [AuctionType.SEALED_BID]: "encryptedMarginalPrice",
  [AuctionType.FIXED_PRICE_BATCH]: "fixedPrice",
} as const;

const updateStatus = (
  cachedAuction: GetBatchAuctionLotQuery,
  status: AuctionStatus,
): GetBatchAuctionLotQuery => {
  const auctionType = getAuctionType(
    cachedAuction.batchAuctionLot?.auctionType,
  ) as AuctionType;
  const auctionTypePropertyName = AUCTION_TYPE_PROPERTY_MAP[auctionType];

  return {
    ...cachedAuction,
    batchAuctionLot: {
      ...cachedAuction.batchAuctionLot!,
      [auctionTypePropertyName]: {
        ...cachedAuction.batchAuctionLot![auctionTypePropertyName],
        status,
      },
    },
  } satisfies GetBatchAuctionLotQuery;
};

export { updateStatus };
