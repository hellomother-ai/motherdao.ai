import type { BatchAuction, BatchAuctionBid, Token } from "@axis-finance/types";
import { formatUnits } from "viem";

const BID_OUTCOME = {
  WON: "won",
  PARTIAL_FILL: "won - partial fill",
  LOST: "lost",
} as const;

const REFUNDED_BID_STATUS = "refunded" as const;

type SortedBid = {
  price: number;
  amountIn: number;
  amountOut: number;
  settledAmountOut: number;
  cumulativeAmountIn: number;
  timestamp: number;
  outcome: string | undefined | null;
};

const sortBids = (bids: BatchAuctionBid[], quoteToken: Token): SortedBid[] => {
  const sortedBids = bids
    .filter(({ status }) => status !== REFUNDED_BID_STATUS)
    .flatMap((bid) => {
      const price = Number(bid.submittedPrice);
      const timestamp = Number(bid.blockTimestamp) * 1000;
      const amountIn = Number(bid.amountIn);
      const amountOut = Number(
        formatUnits(BigInt(bid.rawAmountOut ?? 0n), quoteToken.decimals),
      );
      const settledAmountOut = Number(bid.settledAmountOut);

      if (bid.outcome === BID_OUTCOME.PARTIAL_FILL) {
        /**
         *  Split the partial bid in two, for rendering on the chart:
         *  - one for the successful part of the bid
         *  - one for the unsuccessful part of the bid
         */
        return [
          {
            price,
            amountIn: Number(bid.settledAmountIn),
            amountOut,
            settledAmountOut,
            cumulativeAmountIn: 0,
            timestamp,
            outcome: BID_OUTCOME.PARTIAL_FILL,
          },
          {
            price,
            amountIn: amountIn - Number(bid.settledAmountIn),
            amountOut,
            settledAmountOut: 0,
            cumulativeAmountIn: 0,
            timestamp,
            outcome: BID_OUTCOME.LOST,
          },
        ];
      }

      return {
        price,
        amountIn,
        amountOut,
        settledAmountOut,
        cumulativeAmountIn: 0,
        timestamp,
        outcome: bid.outcome,
      };
    });

  // Order by price descending
  sortedBids.sort((a, b) => b.price - a.price);

  // Track cumulative bid amounts
  let cumulativeAmountIn = 0;
  sortedBids.forEach((bid) => {
    cumulativeAmountIn += bid.amountIn;
    bid.cumulativeAmountIn = cumulativeAmountIn;
  });

  return sortedBids;
};

const useSortedBids = (auction: BatchAuction | undefined): SortedBid[] => {
  if (!auction) return [];

  const sortedBids = sortBids(auction.bids, auction.quoteToken);

  // Insert initial data point for drawing the first bid corner
  sortedBids.unshift({
    amountIn: 0,
    amountOut: 0,
    settledAmountOut: 0,
    timestamp: 0,
    cumulativeAmountIn: 0,
    price: sortedBids.length ? sortedBids[0].price : 0,
    outcome: "won",
  });

  return sortedBids;
};

export { type SortedBid, useSortedBids, BID_OUTCOME };
