import { formatUnits, type Address } from "viem";
import { useReadContract } from "wagmi";
import { getAuctionHouse } from "utils/contracts";
import type { Auction } from "@axis-finance/types";
import { abis } from "@axis-finance/abis";

export function useReferralRewards({
  address,
  auction,
}: {
  address?: Address;
  auction: Auction;
}): number | undefined {
  const chainId = auction.chainId;
  const rewardTokenAddress = auction.quoteToken.address;
  const auctionType = auction.auctionType;

  const auctionHouseAddress = getAuctionHouse({ chainId, auctionType }).address;

  const rewardsBigInt = useReadContract({
    abi: abis.batchAuctionHouse,
    address: auctionHouseAddress,
    chainId,
    functionName: "getRewards",
    args: [address!, rewardTokenAddress!],
    query: { enabled: address != null && rewardTokenAddress != null },
  });

  const rewards = rewardsBigInt.isSuccess
    ? Number(formatUnits(rewardsBigInt.data, auction.baseToken.decimals))
    : undefined;

  return rewards;
}
