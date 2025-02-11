import { Auction, CallbacksType } from "@axis-finance/types";
import { axisContracts } from "@axis-finance/deployments";
import { zeroAddress } from "viem";

export function getCallbacksType(auction: Auction): CallbacksType {
  // If no callback is set, return none
  if (!auction.callbacks || auction.callbacks === zeroAddress) {
    return CallbacksType.NONE;
  }

  const callbacksLower = auction.callbacks.toLowerCase();

  // Load the chain addresses
  const chainAddresses = axisContracts.addresses[auction.chainId];

  // Check if the callback address on the auction matches one of the first-party callbacks
  if (
    chainAddresses.merkleAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.MERKLE_ALLOWLIST;
  }

  if (
    chainAddresses.cappedMerkleAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.CAPPED_MERKLE_ALLOWLIST;
  }

  if (
    chainAddresses.allocatedMerkleAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.ALLOCATED_MERKLE_ALLOWLIST;
  }

  if (
    chainAddresses.tokenAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.TOKEN_ALLOWLIST;
  }

  if (
    chainAddresses.uniV2Dtl.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.UNIV2_DTL;
  }

  if (
    chainAddresses.uniV3Dtl.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.UNIV3_DTL;
  }

  if (
    chainAddresses.uniswapV3DtlWithAllocatedMerkleAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST;
  }

  if (
    chainAddresses.baseline.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.BASELINE;
  }

  if (
    chainAddresses.baselineAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.BASELINE_ALLOWLIST;
  }

  if (
    chainAddresses.baselineAllocatedAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.BASELINE_ALLOCATED_ALLOWLIST;
  }

  if (
    chainAddresses.baselineCappedAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.BASELINE_CAPPED_ALLOWLIST;
  }

  if (
    chainAddresses.baselineTokenAllowlist.some(
      (addr: string) => addr.toLowerCase() === callbacksLower,
    )
  ) {
    return CallbacksType.BASELINE_TOKEN_ALLOWLIST;
  }

  return CallbacksType.CUSTOM;
}
