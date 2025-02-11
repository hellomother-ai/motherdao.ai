import { axisContracts } from "@axis-finance/deployments";
import {
  Auction,
  AuctionType,
  AxisContractNames,
  AxisCallbackNames,
  AxisModuleContractNames,
  CallbacksType,
} from "@axis-finance/types";
import { Address } from "viem";

const auctionHouseMap = {
  [AuctionType.SEALED_BID]: "batchAuctionHouse",
  [AuctionType.FIXED_PRICE_BATCH]: "batchAuctionHouse",
} as const;

export const moduleMap = {
  [AuctionType.SEALED_BID]: "encryptedMarginalPrice",
  [AuctionType.FIXED_PRICE_BATCH]: "fixedPriceBatch",
} as const;

export function getContractsByModuleType(auction: Auction) {
  const auctionModule = moduleMap[
    auction.auctionType
  ] as AxisModuleContractNames;

  const abi = axisContracts.abis[auctionModule];
  const address = axisContracts.addresses[auction.chainId][auctionModule];

  if (!abi || !address) {
    throw new Error(`Can't find abi/address for ${auction.auctionType}`);
  }

  return { abi, address };
}

export function getAuctionHouse(
  auction: Pick<Auction, "chainId" | "auctionType">,
) {
  //TODO: find a better way to handle this, see useAuction for usecase
  if (!auction.auctionType || !auction.chainId) {
    return {
      abi: axisContracts.abis.batchAuctionHouse,
      address: "0x" as Address,
    };
  }
  const contractName = auctionHouseMap[
    auction.auctionType
  ] satisfies AxisContractNames;

  return {
    abi: axisContracts.abis[contractName],
    address: axisContracts.addresses[auction.chainId][contractName] as Address,
  };
}

export const callbackMap: Record<CallbacksType, string> = {
  [CallbacksType.NONE]: "",
  [CallbacksType.CUSTOM]: "",
  [CallbacksType.MERKLE_ALLOWLIST]: "merkleAllowlist",
  [CallbacksType.CAPPED_MERKLE_ALLOWLIST]: "cappedMerkleAllowlist",
  [CallbacksType.TOKEN_ALLOWLIST]: "tokenAllowlist",
  [CallbacksType.ALLOCATED_MERKLE_ALLOWLIST]: "allocatedMerkleAllowlist",
  [CallbacksType.UNIV2_DTL]: "uniV2Dtl",
  [CallbacksType.UNIV3_DTL]: "uniV3Dtl",
  [CallbacksType.BASELINE]: "baseline",
  [CallbacksType.BASELINE_ALLOWLIST]: "baselineAllowlist",
  [CallbacksType.BASELINE_ALLOCATED_ALLOWLIST]: "baselineAllocatedAllowlist",
  [CallbacksType.BASELINE_CAPPED_ALLOWLIST]: "baselineCappedAllowlist",
  [CallbacksType.BASELINE_TOKEN_ALLOWLIST]: "baselineTokenAllowlist",
  [CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST]:
    "uniV3DtlWithAllocatedAllowlist",
};

/** Labels for callback contract options */
export const callbackLabels: Record<CallbacksType, string> = {
  [CallbacksType.NONE]: "None",
  [CallbacksType.CUSTOM]: "Custom",
  [CallbacksType.MERKLE_ALLOWLIST]: "Offchain Allowlist",
  [CallbacksType.CAPPED_MERKLE_ALLOWLIST]: "Offchain Allowlist with Spend Cap",
  [CallbacksType.ALLOCATED_MERKLE_ALLOWLIST]:
    "Offchain Allowlist with Allocations",
  [CallbacksType.TOKEN_ALLOWLIST]: "Token Allowlist",
  [CallbacksType.UNIV2_DTL]: "Deposit to Uniswap V2 Pool",
  [CallbacksType.UNIV3_DTL]: "Deposit to Uniswap V3 Pool",
  [CallbacksType.BASELINE]: "Deposit to Baseline Market",
  [CallbacksType.BASELINE_ALLOWLIST]:
    "Deposit to Baseline Market with Allowlist",
  [CallbacksType.BASELINE_ALLOCATED_ALLOWLIST]:
    "Deposit to Baseline Market with Allocated Allowlist",
  [CallbacksType.BASELINE_CAPPED_ALLOWLIST]:
    "Deposit to Baseline Market with Capped Allowlist",
  [CallbacksType.BASELINE_TOKEN_ALLOWLIST]:
    "Deposit to Baseline Market with Token Allowlist",
  [CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST]:
    "Deposit to Uniswap V3 Pool with Allocated Allowlist",
};

/**
 * Gets the latest callback contract for a given chain and callback type.
 *
 * As there can be multiple callbacks for a given type (i.e. baseline has multiple),
 * the last one in the list is returned. This is useful for auction creation, where the latest version is desired.
 *
 * @param chainId The chain ID to get the callback contract for.
 * @param callbackType The callback type to get the contract for.
 * @returns The ABI and address of the callback contract.
 */
export function getLatestCallback(
  chainId: number,
  callbackType: CallbacksType,
) {
  const contractName = callbackMap[callbackType] as AxisCallbackNames;

  const addresses = axisContracts.addresses[chainId][contractName];

  if (!addresses || addresses.length === 0) {
    return {
      abi: axisContracts.abis[contractName],
      address: "0x" as Address,
    };
  }

  return {
    abi: axisContracts.abis[contractName],
    address: addresses[addresses.length - 1],
  };
}

/**
 * Gets the callback contract for a given chain and callback type.
 *
 * As there can be multiple callbacks for a given type (i.e. baseline has multiple),
 * the last one in the list is returned.
 *
 * @param chainId The chain ID to get the callback contract for.
 * @param callbackType The callback type to get the contract for.
 * @returns The ABI and addresses of the callback contracts.
 */
export function getCallbacks(chainId: number, callbackType: CallbacksType) {
  const contractName = callbackMap[callbackType] as AxisCallbackNames;

  const addresses = axisContracts.addresses[chainId][contractName];

  return {
    abi: axisContracts.abis[contractName],
    address: addresses || [],
  };
}
