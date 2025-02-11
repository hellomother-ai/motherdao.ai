import { Address, erc20Abi as abi, isAddress } from "viem";
import { useReadContract } from "wagmi";

/** Reads ERC20 details onchain */
export default function useERC20Balance({
  chainId,
  tokenAddress,
  balanceAddress,
}: {
  chainId?: number;
  tokenAddress?: Address;
  balanceAddress?: Address;
}) {
  const balanceResponse = useReadContract({
    query: {
      enabled:
        !!chainId &&
        !!tokenAddress &&
        !!balanceAddress &&
        isAddress(tokenAddress) &&
        isAddress(balanceAddress),
    },
    abi,
    address: tokenAddress,
    chainId,
    functionName: "balanceOf",
    args: balanceAddress ? [balanceAddress] : undefined,
  });

  const decimalsResponse = useReadContract({
    query: {
      enabled: !!chainId && !!tokenAddress && isAddress(tokenAddress),
    },
    abi,
    address: tokenAddress,
    chainId,
    functionName: "decimals",
  });

  return {
    balance: balanceResponse.data,
    decimals: decimalsResponse.data,
    isLoading: balanceResponse.isLoading || decimalsResponse.isLoading,
    isError: balanceResponse.isError || decimalsResponse.isError,
    refetch: balanceResponse.refetch,
  };
}
