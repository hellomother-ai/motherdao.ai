import { encodeAbiParameters, isAddress } from "viem";
import { useReadContract } from "wagmi";
import type { Token } from "@axis-finance/types";
import { abis } from "@axis-finance/abis";

export function useVestingTokenId({
  linearVestingStartTimestamp,
  linearVestingExpiryTimestamp,
  baseToken,
  derivativeModuleAddress,
}: {
  linearVestingStartTimestamp?: number;
  linearVestingExpiryTimestamp?: number;
  baseToken: Token;
  derivativeModuleAddress?: string;
}) {
  // Fetch the tokenId of the vesting token
  const response = useReadContract({
    abi: abis.batchLinearVesting,
    address:
      derivativeModuleAddress && isAddress(derivativeModuleAddress)
        ? derivativeModuleAddress
        : undefined,
    functionName: "computeId",
    args: [
      baseToken.address, // base token
      encodeAbiParameters(
        [
          { name: "start", type: "uint48" }, // vesting start
          { name: "end", type: "uint48" }, // vesting end
        ],
        [linearVestingStartTimestamp ?? 0, linearVestingExpiryTimestamp ?? 0],
      ),
    ],
    query: {
      enabled:
        !!derivativeModuleAddress &&
        Number.isInteger(linearVestingStartTimestamp) &&
        Number.isInteger(linearVestingExpiryTimestamp),
    },
  });

  return {
    ...response,
    data: response.isSuccess ? response.data : undefined,
  };
}
