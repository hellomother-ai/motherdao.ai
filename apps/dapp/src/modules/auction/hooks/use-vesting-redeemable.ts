import { abis } from "@axis-finance/abis";
import { Address, isAddress } from "viem";
import { useReadContract } from "wagmi";

export function useVestingRedeemable({
  account,
  tokenId,
  chainId,
  derivativeModuleAddress,
}: {
  account?: Address;
  tokenId?: bigint;
  chainId?: number;
  derivativeModuleAddress?: Address;
}) {
  const response = useReadContract({
    abi: abis.batchLinearVesting,
    address:
      derivativeModuleAddress && isAddress(derivativeModuleAddress)
        ? derivativeModuleAddress
        : undefined,
    chainId: chainId,
    functionName: "redeemable",
    args: [account!, tokenId || 0n],
    query: { enabled: !!account && !!tokenId && !!derivativeModuleAddress },
  });

  return {
    ...response,
    data: response.isSuccess ? response.data : undefined,
  };
}
