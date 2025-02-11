import { useQueryClient } from "@tanstack/react-query";
import type { Auction, AuctionId } from "@axis-finance/types";
import React, { useRef } from "react";
import { parseUnits, toHex } from "viem";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { getAuctionQueryKey } from "modules/auction/hooks/use-auction";
import { getAuctionHouse } from "utils/contracts";
import { GetBatchAuctionLotQuery } from "@axis-finance/subgraph-client";
import {
  auction as auctionCache,
  optimisticUpdate,
} from "modules/auction/utils/optimistic";

type SettleAuctionProps = {
  auction: Auction;
  callbackData?: `0x${string}`;
};

/** Used to settle an auction after decryption*/
export function useSettleAuction({
  auction,
  callbackData,
}: SettleAuctionProps) {
  const { address, abi } = getAuctionHouse(auction);
  const queryKey = getAuctionQueryKey(auction.id as AuctionId);

  const { data: settleCall, ...settleCallStatus } = useSimulateContract({
    abi,
    address,
    functionName: "settle",
    chainId: auction.chainId,
    args: [
      parseUnits(auction.lotId, 0),
      100n, // number of bids to settle at once, TODO replace with value based on chain & gas limits
      callbackData || toHex(""),
    ],
  });

  const settleTx = useWriteContract();
  const settleReceipt = useWaitForTransactionReceipt({ hash: settleTx.data });

  const handleSettle = () => settleTx.writeContract(settleCall!.request);

  const queryClient = useQueryClient();
  const settleTxnSucceeded = useRef(false);

  React.useEffect(() => {
    if (settleTxnSucceeded.current || !settleReceipt.isSuccess) {
      return;
    }

    settleTxnSucceeded.current = true;

    // Optimistically update the auction status to "settled"
    optimisticUpdate(
      queryClient,
      queryKey,
      (cachedAuction: GetBatchAuctionLotQuery) =>
        auctionCache.updateStatus(cachedAuction, "settled"),
    );
  }, [settleReceipt.isSuccess, queryClient, queryKey]);

  const error = [settleCallStatus, settleTx, settleReceipt].find(
    (tx) => tx.isError,
  )?.error;

  return {
    handleSettle,
    settleTx,
    settleReceipt,
    settleCallStatus,
    error,
  };
}
