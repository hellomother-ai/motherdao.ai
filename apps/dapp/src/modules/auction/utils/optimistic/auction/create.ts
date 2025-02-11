import type { GetBatchAuctionLotQuery } from "@axis-finance/subgraph-client";
import type { NonNullSubgraphAuction } from "@axis-finance/types";

const create = (
  optimisticAuction: NonNullSubgraphAuction,
): GetBatchAuctionLotQuery => ({
  batchAuctionLot: optimisticAuction,
});

export { create };
