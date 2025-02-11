import { useEffect } from "react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useAuction } from "./use-auction";
import { useSdk } from "@axis-finance/sdk/react";
import { Auction } from "@axis-finance/types";

export function useClaimBids(auction: Auction) {
  const { address: userAddress } = useAccount();
  const sdk = useSdk();

  const bids = auction.bids
    .filter(
      (b) =>
        b.bidder.toLowerCase() === userAddress?.toLowerCase() &&
        b.status !== "claimed" &&
        b.status !== "refunded",
    )
    .map((b) => Number(b.bidId));

  const { abi, address, functionName, args } = sdk.claimBids({
    lotId: Number(auction.lotId),
    bids,
    auctionType: auction.auctionType,
    chainId: auction.chainId,
  });

  const claimCall = useSimulateContract({
    abi,
    address,
    functionName,
    args,
    chainId: auction.chainId,
  });

  const claimTx = useWriteContract();
  const claimReceipt = useWaitForTransactionReceipt({ hash: claimTx.data });
  const { refetch: refetchAuction } = useAuction(
    auction.chainId,
    auction.lotId,
  );

  // When someone claims their bids, refetch the auction from the subgraph so the dapp has the latest data
  // TODO: we should optimistically update the auction bids here instead
  useEffect(() => {
    if (claimReceipt.isSuccess) {
      setTimeout(() => refetchAuction(), 2500);
    }
  }, [claimReceipt.isSuccess, refetchAuction]);

  const handleClaim = () => {
    if (claimCall.data) {
      claimTx.writeContract(claimCall.data.request!);
    }
  };

  const isWaiting =
    claimTx.isPending ||
    claimReceipt.isLoading ||
    claimCall.isPending ||
    claimCall.isLoading;

  const error = [claimReceipt, claimTx, claimCall].find(
    (m) => m.isError,
  )?.error;

  return {
    handleClaim,
    claimCall,
    claimReceipt,
    claimTx,
    isWaiting,
    error,
  };
}
