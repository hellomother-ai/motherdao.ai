import { formatUnits } from "viem";
import type { Address, BatchAuctionBid } from "@axis-finance/types";
import type { GetBatchAuctionLotQuery } from "@axis-finance/subgraph-client";

/**
 * Creates a fake bid entry on an auction.
 * Used after the bid transaction succeeds to mitigate subgraph update delays.
 */
const createOptimisticBid = (
  cachedAuction: GetBatchAuctionLotQuery,
  bidId: string,
  bidder: Address,
  amountIn: bigint,
  amountOut: bigint,
): BatchAuctionBid => {
  const auction = cachedAuction.batchAuctionLot!;
  const quoteTokenDecimals = Number(auction.quoteToken.decimals);
  const amountInDecimal = Number(formatUnits(amountIn, quoteTokenDecimals));
  const amountOutDecimal = Number(
    formatUnits(amountOut, Number(auction.baseToken.decimals)),
  );
  const submittedPrice = (amountInDecimal / amountOutDecimal).toString();

  return {
    bidId,
    bidder,
    blockTimestamp: Math.floor(Date.now() / 1000).toString(),
    date: new Date().toISOString(),
    amountIn: formatUnits(amountIn, quoteTokenDecimals),
    rawAmountIn: amountIn.toString(),
    rawAmountOut: amountOut.toString(),
    rawMarginalPrice: null,
    rawSubmittedPrice: null,
    submittedPrice,
    settledAmountIn: null,
    settledAmountInRefunded: null,
    settledAmountOut: null,
    status: "submitted",
    outcome: null,
    referrer: null,
    claimed: null,
  };
};

/**
 * Takes the current subgraph cache of an auction and inserts a new bid it.
 */
const insertBid = (
  cachedAuction: GetBatchAuctionLotQuery,
  bidId: string,
  bidder: Address,
  amountIn: bigint,
  amountOut: bigint,
): GetBatchAuctionLotQuery => {
  return {
    ...cachedAuction,
    batchAuctionLot: {
      ...cachedAuction.batchAuctionLot!,
      bids: cachedAuction.batchAuctionLot!.bids.concat(
        createOptimisticBid(cachedAuction, bidId, bidder, amountIn, amountOut),
      ),
    },
  } satisfies GetBatchAuctionLotQuery;
};

export { insertBid };
