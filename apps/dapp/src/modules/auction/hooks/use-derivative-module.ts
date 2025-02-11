import { AuctionType } from "@axis-finance/types";
import { getAuctionHouse } from "utils/contracts";
import { isAddress } from "viem";
import { useReadContract } from "wagmi";

export function useDerivativeModule({
  lotId,
  chainId,
  auctionType,
}: {
  lotId: string;
  chainId: number;
  auctionType: AuctionType;
}) {
  const auctionHouse = getAuctionHouse({ chainId, auctionType });

  // Fetch the address of the derivative module
  const response = useReadContract({
    abi: auctionHouse.abi,
    address: isAddress(auctionHouse.address) ? auctionHouse.address : undefined,
    chainId: chainId,
    functionName: "getDerivativeModuleForId",
    args: [BigInt(lotId ?? 0n)],
    query: { enabled: !!lotId && !!chainId },
  });

  return {
    ...response,
    data: response.isSuccess ? response.data : undefined,
  };
}
