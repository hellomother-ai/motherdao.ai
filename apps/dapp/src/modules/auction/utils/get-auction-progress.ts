import { Auction } from "@axis-finance/types";
import { getPrice } from "./auction-details";
import { getMinRaiseForAuction, getTargetRaise } from "../auction-metric";
import { formatUnits } from "viem";

export function calculateAuctionProgress(auction: Auction) {
  const rawCurrentAmount = auction.bids.reduce((total, b) => {
    return (total += BigInt(b.rawAmountIn));
  }, 0n);

  const preSettlementAmount = +formatUnits(
    rawCurrentAmount,
    auction.quoteToken.decimals,
  );

  const isSettled = auction.status === "settled";

  //We need the auction to settle to identify the partial fills
  //purchased property will be resolved after settlement and carry the correct amount
  const currentAmount = isSettled ? +auction.purchased : preSettlementAmount;

  const minRaise = getMinRaiseForAuction(auction) ?? 0;
  const targetAmount = getTargetRaise(auction, getPrice(auction)) ?? 0;

  const minTarget = Math.round((minRaise / targetAmount) * 100);
  const current = Math.min(
    Math.round((preSettlementAmount / targetAmount) * 100),
    100,
  );

  return {
    /** The current percentual progress of an auction's raise*/
    current,
    /** The minimum percentual target raise of an auction*/
    minTarget,
    /** The current nominal progress of an auction's raise*/
    currentAmount,
    /** The nominal target of an auction's raise*/
    targetAmount,
  };
}
