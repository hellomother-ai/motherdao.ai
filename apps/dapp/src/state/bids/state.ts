import { atomWithStorage } from "jotai/utils";
import { Address } from "viem";

export type BidWithAmountOut = { bidId: string; amountOut: string };

export type StorageBid = {
  address: Address;
  auctionId: string;
} & BidWithAmountOut;

/**
 * @name UserStoredBids
 * Mapping - Address -> AuctionId -> Array<BidWithAmountOut>
 */
export type UserStoredBids = Record<
  Address,
  Record<string, BidWithAmountOut[]>
>;

export const userBidsAtom = atomWithStorage<UserStoredBids>("user_bids", {});
