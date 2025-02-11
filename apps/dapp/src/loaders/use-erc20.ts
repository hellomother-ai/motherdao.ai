import React from "react";
import { Address, erc20Abi as abi, isAddress } from "viem";
import { useReadContracts } from "wagmi";

/** Reads ERC20 details onchain */
export default function useERC20({
  chainId,
  address,
}: {
  chainId: number;
  address: Address;
}) {
  const contract = { abi, address, chainId };

  const response = useReadContracts({
    query: { enabled: !!chainId && isAddress(address) },
    contracts: [
      { ...contract, functionName: "decimals" },
      { ...contract, functionName: "symbol" },
      { ...contract, functionName: "name" },
      { ...contract, functionName: "totalSupply" },
    ],
  });

  const [decimals, symbol, name, totalSupply] =
    response.data?.map((d) => d.result) ?? [];

  const token = React.useMemo(
    () => ({ decimals, symbol, name, address, chainId, totalSupply }),
    [decimals, symbol, name, address, chainId, totalSupply],
  );

  return {
    response,
    isError: response.data?.some((d) => d.error),
    token,
  };
}
