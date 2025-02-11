import { axisContracts } from "@axis-finance/deployments";
import { Address, CallbacksType } from "@axis-finance/types";
import { getCallbacks } from "utils/contracts";
import { fromBasisPoints } from "utils/number";
import { useReadContract, useReadContracts } from "wagmi";

/**
 * Returns the configuration of a Baseline DTL callback
 *
 * The `poolPercent` and `floorReservesPercent` are returned as decimal values, where 1 = 100%.
 */
export function useBaselineDTLCallback({
  chainId,
  lotId,
  callback,
}: {
  chainId?: number;
  lotId?: string;
  callback?: Address;
}) {
  // Determine if the callback is a baseline DTL callback
  const callbackLower = (callback || "").toLowerCase();
  const baselineAddresses = getCallbacks(
    chainId || 0,
    CallbacksType.BASELINE,
  ).address.map((address: string) => address.toLowerCase());
  const baselineAllowlistAddresses = getCallbacks(
    chainId || 0,
    CallbacksType.BASELINE_ALLOWLIST,
  ).address.map((address: string) => address.toLowerCase());
  const baselineAllocatedAllowlistAddresses = getCallbacks(
    chainId || 0,
    CallbacksType.BASELINE_ALLOCATED_ALLOWLIST,
  ).address.map((address: string) => address.toLowerCase());
  const baselineCappedAllowlistAddresses = getCallbacks(
    chainId || 0,
    CallbacksType.BASELINE_CAPPED_ALLOWLIST,
  ).address.map((address: string) => address.toLowerCase());
  const baselineTokenAllowlistAddresses = getCallbacks(
    chainId || 0,
    CallbacksType.BASELINE_TOKEN_ALLOWLIST,
  ).address.map((address: string) => address.toLowerCase());
  const isBaselineDTLCallback =
    baselineAddresses.includes(callbackLower) ||
    baselineAllowlistAddresses.includes(callbackLower) ||
    baselineAllocatedAllowlistAddresses.includes(callbackLower) ||
    baselineCappedAllowlistAddresses.includes(callbackLower) ||
    baselineTokenAllowlistAddresses.includes(callbackLower);

  // Determine if callback's lot id matches the lot id of the auction
  const { data: baselineLotId } = useReadContract({
    abi: axisContracts.abis.baseline,
    address: callback,
    chainId,
    functionName: "lotId",
    args: [],
  });
  const lotIdMatches = baselineLotId
    ? baselineLotId.toString() === lotId
    : false;

  const response = useReadContracts({
    contracts: [
      {
        abi: axisContracts.abis.baseline,
        address: callback,
        chainId,
        functionName: "auctionComplete",
      },
      {
        abi: axisContracts.abis.baseline,
        address: callback,
        chainId,
        functionName: "poolPercent",
      },
      {
        abi: axisContracts.abis.baseline,
        address: callback,
        chainId,
        functionName: "floorReservesPercent",
      },
      {
        abi: axisContracts.abis.baseline,
        address: callback,
        chainId,
        functionName: "recipient",
      },
      {
        abi: axisContracts.abis.baseline,
        address: callback,
        chainId,
        functionName: "poolTargetTick",
      },
    ],
    query: {
      enabled: isBaselineDTLCallback && lotIdMatches,
    },
  });

  return {
    ...response,
    data:
      response.isSuccess &&
      response.data[0].result !== undefined &&
      response.data[1].result !== undefined &&
      response.data[2].result !== undefined &&
      response.data[3].result !== undefined &&
      response.data[4].result !== undefined
        ? {
            auctionComplete: response.data[0].result,
            poolPercent: fromBasisPoints(response.data[1].result) / 100,
            floorReservesPercent:
              fromBasisPoints(response.data[2].result) / 100,
            recipient: response.data[3].result,
            poolTargetTick: response.data[4].result,
          }
        : undefined,
  };
}
