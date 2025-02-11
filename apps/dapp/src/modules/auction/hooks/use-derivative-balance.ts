import { abis } from "@axis-finance/abis";
import { Address } from "@axis-finance/types";
import { isAddress } from "viem";
import { useReadContract } from "wagmi";

export function useDerivativeBalance({
  account,
  tokenId,
  chainId,
  derivativeModuleAddress,
}: {
  account: Address;
  tokenId: bigint;
  chainId: number;
  derivativeModuleAddress: Address;
}) {
  const response = useReadContract({
    abi: abis.batchLinearVesting,
    address: isAddress(derivativeModuleAddress)
      ? derivativeModuleAddress
      : undefined,
    chainId: chainId,
    functionName: "balanceOf",
    args: [account, tokenId],
    query: { enabled: !!account && !!tokenId && !!derivativeModuleAddress },
  });

  return {
    ...response,
    data: response.isSuccess ? response.data : undefined,
  };
}
