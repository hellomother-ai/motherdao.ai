import { axisContracts } from "@axis-finance/deployments";
import { Auction } from "@axis-finance/types";
import React from "react";
import { useReadContract } from "wagmi";

export function useBidIndex(auction: Auction, bidId: bigint = -1n) {
  const address = axisContracts.addresses[auction.chainId].batchCatalogue;
  const abi = axisContracts.abis.batchCatalogue;
  const [startingIndex, setStartingIndex] = React.useState(0n);
  const BID_COUNT = 100n;

  const numBidsQuery = useReadContract({
    address,
    abi,
    functionName: "getNumBids",
    args: [BigInt(auction.lotId)],
  });

  const bidsQuery = useReadContract({
    address,
    abi,
    functionName: "getBidIds",
    args: [BigInt(auction.lotId), startingIndex, BID_COUNT],
    query: {
      enabled: numBidsQuery.isSuccess,
    },
  });

  React.useEffect(() => {
    if (
      bidsQuery.isSuccess &&
      startingIndex + BID_COUNT < (numBidsQuery.data ?? 0n)
    ) {
      // Update query args to trigger a re-read
      setStartingIndex((index) => index + BID_COUNT);
    }
  }, [bidsQuery.isSuccess]);

  return {
    index: bidsQuery.data?.findIndex((b: bigint) => b === bidId),
    ...bidsQuery,
  };
}
